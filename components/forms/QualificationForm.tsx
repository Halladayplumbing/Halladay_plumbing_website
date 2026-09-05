"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import type { QualificationFormConfig } from "@/data/forms";
import { ProgressIndicator } from "./ProgressIndicator";
import { OptionCard } from "./OptionCard";
import { Button } from "@/components/ui/Button";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";
import { submitLead, type Lead } from "@/lib/leads";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface QualificationFormProps {
  config: QualificationFormConfig;
  offerId?: string;
  funnelId?: string; // funnel slug, or "organic" / "contact-page"
  thankYouPath?: string;
}

interface ContactValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  company: string;
  preferredContact: "phone" | "text" | "email";
}

// Snapshot of everything the transient, post-verification <form> needs to
// render already fully populated — captured once, at the moment /api/lead
// returns success, so the transient form never depends on live component
// state that could theoretically change after the fact.
interface TransientLeadData {
  serviceId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  homeownerLabel: string;
  needLabel: string;
  locationLabel: string;
}

// Single-select answers auto-advance to the next question (like a Meta
// lead-ad form) after a short pause so the user sees their tap register
// before the card transitions. Multi-select and contact steps still use
// an explicit button since more than one action is expected there.
const AUTO_ADVANCE_MS = 380;

// Cloudflare's own published always-pass TEST keys (documented at
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/) —
// not secrets, safe to ship as a local-dev fallback so the full
// widget -> token -> server-verify flow can be exercised without real
// credentials. Production must set NEXT_PUBLIC_TURNSTILE_SITE_KEY /
// TURNSTILE_SECRET_KEY (see .env.example) — this fallback never applies
// when NODE_ENV is production.
const DEV_TURNSTILE_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || (process.env.NODE_ENV === "production" ? undefined : DEV_TURNSTILE_SITE_KEY);

const leadEventByLeadType: Record<string, AnalyticsEvent> = {
  water_softener_lead: "water_softener_lead",
  water_heater_lead: "water_heater_lead",
  drain_cleaning_lead: "drain_cleaning_lead",
  leak_repair_lead: "leak_repair_lead",
  commercial_plumbing_lead: "commercial_plumbing_lead",
  plumbing_repair_lead: "plumbing_repair_lead",
  new_construction_lead: "new_construction_lead",
};

function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isPlausiblePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function QualificationForm({ config, offerId, funnelId = "organic", thankYouPath }: QualificationFormProps) {
  const router = useRouter();
  const antiBot = Boolean(config.antiBot);

  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [contact, setContact] = useState<ContactValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    company: "",
    preferredContact: "phone",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Synchronous re-entrancy guard. `submitting` state alone isn't enough:
  // React batches the setSubmitting(true) update, so several rapid clicks
  // (a fast double-tap, or a script clicking the button several times in
  // a tight loop) can all read the pre-update `submitting` value before
  // any of them commits — confirmed by testing a rapid 4x click, which
  // produced 4 /api/lead requests before this guard was added. A ref
  // updates immediately, so the second call in the same tick already
  // sees it flipped.
  const submittingRef = useRef(false);
  const started = useRef(false);
  const viewed = useRef(false);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Anti-bot state — inert/unused entirely unless config.antiBot is true.
  const [honeypot, setHoneypot] = useState("");
  const [turnstileScriptReady, setTurnstileScriptReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  // --- Transient post-verification form (antiBot forms only) ---
  //
  // For an antiBot form, NO <form> element exists anywhere in this
  // component's output until /api/lead has already returned success. The
  // quiz steps and the contact-info inputs both render inside a plain
  // <div> (see the root return below) specifically so that GHL External
  // Tracking — which detects forms via document.querySelectorAll("form")
  // on load plus a MutationObserver watching for newly-added <form> nodes
  // — has literally nothing to find, attach to, or read from while the
  // visitor is still filling anything in. Only once the server has
  // validated and accepted the lead do we mount a real, fully-populated
  // <form> (see `transientLead` below) and fire exactly one native submit
  // at it ourselves — the only submission GHL's tracker will ever observe
  // for this form.
  const [leadAccepted, setLeadAccepted] = useState(false);
  const [transientLead, setTransientLead] = useState<TransientLeadData | null>(null);
  const transientFormRef = useRef<HTMLFormElement>(null);
  const transientSubmitTriggered = useRef(false);
  const pendingPriorityRef = useRef<typeof config.defaultPriority>(config.defaultPriority);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackEvent("form_view", { form_id: config.id, service: config.serviceId });
  }, [config.id, config.serviceId]);

  // Clear any pending auto-advance if the component unmounts mid-timer
  // (e.g. user clicks Back right after selecting an option).
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  const step = config.steps[stepIndex];
  const totalSteps = config.steps.length;
  const isLastStep = stepIndex === totalSteps - 1;

  // Renders the Cloudflare Turnstile widget into its container once the
  // script has loaded and the visitor has reached the contact step (no
  // point running it earlier — most visitors won't get that far, and
  // Managed mode typically resolves well before someone finishes typing
  // their info anyway). Only does anything for antiBot forms.
  useEffect(() => {
    if (!antiBot || !turnstileScriptReady) return;
    if (step.type !== "contact") return;
    if (turnstileWidgetId.current) return;
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !turnstileContainerRef.current) return;

    turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(null),
      "error-callback": () => setTurnstileToken(null),
    });
  }, [antiBot, turnstileScriptReady, step.type]);

  useEffect(() => {
    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
      }
    };
  }, []);

  // Fires the ONE real native submit GHL's tracker will ever see for this
  // form — but only after React has actually committed the transient
  // <form> into the DOM (this effect runs after that commit; it is a
  // separate function from the one that called setLeadAccepted/
  // setTransientLead, never the same synchronous call stack). GHL External
  // Tracking detects new forms via a MutationObserver on document.body;
  // MutationObserver callbacks are queued as a microtask at the point the
  // DOM mutation happens, and microtasks run in the order they were
  // queued. So queueing our own follow-up as a microtask here (rather
  // than calling requestSubmit() synchronously in this effect) lets any
  // already-queued MutationObserver microtask run first, per the DOM
  // spec's own ordering guarantee — not a setTimeout guess. See the
  // engagement notes on this component for the full trace of GHL's
  // tracker internals this is built against.
  useEffect(() => {
    if (!antiBot || !leadAccepted || !transientLead) return;
    if (transientSubmitTriggered.current) return;
    transientSubmitTriggered.current = true;

    console.debug("[antibot] transient form committed, scheduling submit microtask", {
      formId: config.id,
    });

    queueMicrotask(() => {
      const formEl = transientFormRef.current;
      console.debug("[antibot] microtask fired, requesting native submit", { formPresent: Boolean(formEl) });
      formEl?.requestSubmit();
      console.debug("[antibot] native submit dispatched — GHL's capture-phase listener has already run by now");
      fireCompletionAnalytics(pendingPriorityRef.current);
      router.push(thankYouPath ?? "/thank-you/");
    });
    // fireCompletionAnalytics is a plain function redefined every render
    // (not memoized) and reads no state this effect needs to react to —
    // deliberately left out of the dependency array so it doesn't churn
    // this effect. transientSubmitTriggered above still guarantees the
    // submit/analytics/redirect sequence runs exactly once regardless.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antiBot, leadAccepted, transientLead, config.id, router, thankYouPath]);

  function resetTurnstile() {
    setTurnstileToken(null);
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  }

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form_id: config.id, service: config.serviceId });
    trackEvent("qualifier_started", { form_id: config.id, service: config.serviceId });
    if (config.serviceId === "water-softeners") {
      trackEvent("water_softener_assessment_started", { form_id: config.id });
    }
  }

  // Advances to the next step (or submits on the last step). Callers are
  // responsible for having already confirmed the current step is valid —
  // this does not re-check canAdvance() so it's safe to call from a
  // setTimeout closure right after an answer is recorded. For antiBot
  // forms, this never reaches the "submit" branch — the last step's
  // button is type="button" there and goes through handleProtectedSubmit
  // instead (see below), never through advance()/handleContinueClick().
  function advance(fromStep: typeof step) {
    trackEvent("form_step_complete", { form_id: config.id, step: fromStep.id, step_index: stepIndex + 1 });
    setDirection(1);
    if (fromStep.id === config.steps[totalSteps - 1].id) {
      handleSubmit();
    } else {
      setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
    }
  }

  function selectSingle(value: string) {
    markStarted();
    setAnswers((prev) => ({ ...prev, [step.id]: value }));

    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    const currentStep = step;
    autoAdvanceTimer.current = setTimeout(() => advance(currentStep), AUTO_ADVANCE_MS);
  }

  function toggleMulti(value: string) {
    markStarted();
    setAnswers((prev) => {
      const current = Array.isArray(prev[step.id]) ? (prev[step.id] as string[]) : [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [step.id]: next };
    });
  }

  function canAdvance(): boolean {
    if (step.type === "contact") {
      if (antiBot) {
        // Stricter, fully-required set for the protected form — every
        // qualifying answer must already be present (guaranteed by the
        // earlier steps' own gating, checked again here defensively) and
        // every contact field must be non-empty and plausibly valid.
        return Boolean(
          contact.firstName.trim() &&
            contact.lastName.trim() &&
            contact.phone.trim() &&
            isPlausiblePhone(contact.phone) &&
            contact.email.trim() &&
            isValidEmailFormat(contact.email) &&
            answers["homeowner"] &&
            answers["need"] &&
            answers["location"],
        );
      }
      return Boolean(contact.firstName.trim() && contact.phone.trim());
    }
    const value = answers[step.id];
    if (step.type === "multi-select") return Array.isArray(value) && value.length > 0;
    return typeof value === "string" && value.length > 0;
  }

  function handleContinueClick() {
    if (!canAdvance()) return;
    advance(step);
  }

  // The form's native onSubmit — used only by non-antiBot forms, which
  // still wrap everything in one persistent <form> exactly as before
  // (unaffected by any of the antiBot changes below). Reached via the
  // final step's type="submit" button (see isLastStep below), and
  // mirrors exactly what advance() does for the last step. AntiBot forms
  // never render this <form> at all during the qualifier/contact phases,
  // so this handler simply isn't wired to anything for them — see
  // handleTransientFormSubmit for the transient form's own onSubmit.
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLastStep || !canAdvance() || submitting) return;
    trackEvent("form_step_complete", { form_id: config.id, step: step.id, step_index: stepIndex + 1 });
    setDirection(1);
    handleSubmit();
  }

  // onSubmit for the transient, post-verification <form> (antiBot forms
  // only). By the time this React (bubble-phase) handler runs, GHL's
  // capture-phase listener — attached directly to this exact form node by
  // its MutationObserver — has already fired and already read the fully
  // populated fields. preventDefault() here only stops the browser's own
  // default action (a full-page GET navigation, since this form has no
  // real action/method wired up) — it does not and cannot retroactively
  // hide anything from GHL, nor does it need to.
  function handleTransientFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function goBack() {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    if (stepIndex === 0) return;
    setDirection(-1);
    setStepIndex((i) => i - 1);
  }

  function buildLead(extra?: { turnstileToken?: string; website?: string }): Lead {
    const attribution = captureAttribution();
    return {
      contact: {
        firstName: contact.firstName,
        lastName: contact.lastName || undefined,
        phone: contact.phone,
        email: contact.email || undefined,
        city: contact.city || undefined,
        company: contact.company || undefined,
        preferredContact: contact.preferredContact,
      },
      service: config.serviceId,
      leadType: config.leadType,
      leadPriority: config.defaultPriority,
      qualificationAnswers: answers,
      leadContext: {
        urgency: (answers["timeline"] as string) || (answers["urgency"] as string) || undefined,
        propertyType: (answers["property-type"] as string) || undefined,
        // Falls back to a "location" qualifying-question answer (e.g. the
        // water-softener form's simplified flow) when the contact step
        // itself doesn't ask for city — see hideCityField.
        city: contact.city || (answers["location"] as string) || undefined,
      },
      attribution,
      funnel: {
        id: funnelId,
        page: typeof window !== "undefined" ? window.location.pathname : "",
        offerId,
      },
      timestamp: new Date().toISOString(),
      ...extra,
    };
  }

  function fireCompletionAnalytics(priority: typeof config.defaultPriority) {
    trackEvent("form_complete", { form_id: config.id, service: config.serviceId, lead_priority: priority });
    trackEvent("qualifier_completed", { form_id: config.id, service: config.serviceId, lead_priority: priority });
    if (config.serviceId === "water-softeners") {
      trackEvent("water_softener_assessment_completed", { form_id: config.id, lead_priority: priority });
    }
    const leadEvent = leadEventByLeadType[config.leadType];
    if (leadEvent) trackEvent(leadEvent, { lead_priority: priority, funnel_id: funnelId });
  }

  // Original submission path — unchanged, still used as-is by every
  // non-antiBot form via the native onSubmit above.
  async function handleSubmit() {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError(null);

    const lead = buildLead();
    const result = await submitLead(lead);
    setSubmitting(false);

    if (!result.ok) {
      submittingRef.current = false;
      setSubmitError(result.error ?? "Something went wrong. Please call us instead.");
      return;
    }

    fireCompletionAnalytics(lead.leadPriority);
    router.push(thankYouPath ?? "/thank-you/");
  }

  // Protected submission path — antiBot forms only. Runs full
  // client-side validation, the honeypot check, and requires a verified
  // Turnstile token BEFORE calling /api/lead. Up to this point, no <form>
  // element exists anywhere in this component for GHL to observe. Only
  // once the server confirms success does this snapshot the finished
  // lead and mount the transient <form> (setTransientLead +
  // setLeadAccepted below) — the effect above then fires the one real
  // native submit once that form has actually committed to the DOM. If
  // ANY check here fails, none of that happens: no form is ever mounted,
  // no submit event is ever possible, nothing reaches GHL, no analytics
  // fire, and there is no redirect.
  async function handleProtectedSubmit() {
    if (submittingRef.current) return;
    if (!canAdvance()) return;

    // Claim the guard immediately, before anything async or even the
    // honeypot check — a second synchronous click in the same tick must
    // bail out here, not fall through to a duplicate honeypot/Turnstile
    // check or a duplicate request.
    submittingRef.current = true;

    trackEvent("form_step_complete", { form_id: config.id, step: step.id, step_index: stepIndex + 1 });

    // Honeypot tripped — a bot filled a field real users never see.
    // Reject completely silently: no error, no API call, no analytics,
    // no redirect, and critically, no <form> is ever mounted for GHL to
    // observe.
    if (honeypot.trim()) {
      submittingRef.current = false;
      return;
    }

    if (!turnstileToken) {
      submittingRef.current = false;
      setSubmitError("Please wait a moment and try again.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const lead = buildLead({ turnstileToken, website: honeypot });
    const result = await submitLead(lead);
    setSubmitting(false);

    if (!result.ok) {
      submittingRef.current = false;
      setSubmitError(result.error ?? "We couldn't submit your request. Please try again.");
      resetTurnstile();
      return;
    }

    console.debug("[antibot] /api/lead accepted — snapshotting lead and mounting transient form", {
      formId: config.id,
    });

    // Server accepted the lead. Snapshot exactly the values GHL's tracker
    // will read (same values buildLead() just sent to /api/lead) and
    // mount the transient <form> already fully populated with them — per
    // the hardened architecture, the form must never enter the DOM empty
    // and then get filled in afterward. Deliberately does NOT call
    // requestSubmit() here: this is still the same synchronous handler
    // that triggers the mount, and the transient <form> ref isn't
    // attached to a DOM node yet at this point in the code. The
    // dedicated effect above — which only runs after React commits this
    // state change to the DOM — takes over from here.
    pendingPriorityRef.current = lead.leadPriority;
    setTransientLead({
      serviceId: config.serviceId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      email: contact.email,
      homeownerLabel: answerLabel("homeowner", (answers["homeowner"] as string) ?? ""),
      needLabel: answerLabel("need", (answers["need"] as string) ?? ""),
      locationLabel: answerLabel("location", (answers["location"] as string) ?? ""),
    });
    setLeadAccepted(true);
  }

  function handleContactStepKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Enter") return;
    if (!antiBot || !isLastStep) return;
    // Prevents the keypress from doing anything else (e.g. toggling a
    // focused <select>) and routes Enter through the exact same protected
    // path as clicking the button — never a shortcut around validation,
    // the honeypot, or Turnstile.
    e.preventDefault();
    handleProtectedSubmit();
  }

  // Single-select steps auto-advance and hide the Continue button — the
  // tap itself is the action, matching native lead-ad form behavior.
  const showContinueButton = step.type !== "single-select" || submitting;

  // Looks up the human-readable label for a qualifying-question answer
  // (falls back to the raw value if no matching option is found).
  function answerLabel(stepId: string, value: string): string {
    const matchingStep = config.steps.find((s) => s.id === stepId);
    return matchingStep?.options?.find((o) => o.value === value)?.label ?? value;
  }

  const protectedButtonDisabled = !canAdvance() || submitting || (antiBot && !turnstileToken);

  // The wizard's visible content — progress bar, current step, error
  // message, nav buttons, microcopy. Identical for every form; only the
  // element it's wrapped in differs (see below). Pulled out to a variable
  // so an antiBot form can render it inside a plain <div> (no <form>
  // anywhere for GHL to see) while every other form keeps rendering it
  // inside the original persistent <form>, unchanged.
  const wizardBody = (
    <>
      {/* Hidden qualifier/service fields for GHL's form-scanning script —
          non-antiBot forms only. An antiBot form deliberately renders NO
          hidden fields (and no <form> at all) during the qualifier/contact
          phases; see the transient <form> below for where these same
          fields reappear, fully populated, only after server verification
          succeeds. */}
      {!antiBot && (
        <>
          <input type="hidden" name="service" value={config.serviceId} />
          {Object.entries(answers).map(([stepId, value]) => (
            <input
              key={stepId}
              type="hidden"
              name={`qualifier_${stepId}`}
              value={Array.isArray(value) ? value.map((v) => answerLabel(stepId, v)).join(", ") : answerLabel(stepId, value)}
            />
          ))}
        </>
      )}

      <ProgressIndicator step={stepIndex + 1} total={totalSteps} />

        <div className="overflow-hidden">
          <div
            key={stepIndex}
            className={cn(direction === 1 ? "animate-step-forward" : "animate-step-back")}
          >
            <h2 className="text-xl font-bold text-ink sm:text-2xl">{step.title}</h2>
            {step.helpText && <p className="mt-1 text-sm text-ink-muted">{step.helpText}</p>}

            <div className="mt-6">
              {step.type === "single-select" && step.options && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {step.options.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      selected={answers[step.id] === opt.value}
                      onClick={() => selectSingle(opt.value)}
                    />
                  ))}
                </div>
              )}

              {step.type === "multi-select" && step.options && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {step.options.map((opt) => {
                    const selectedValues = Array.isArray(answers[step.id]) ? (answers[step.id] as string[]) : [];
                    return (
                      <OptionCard
                        key={opt.value}
                        multi
                        label={opt.label}
                        selected={selectedValues.includes(opt.value)}
                        onClick={() => toggleMulti(opt.value)}
                      />
                    );
                  })}
                </div>
              )}

              {step.type === "contact" && (
                <div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  onKeyDown={antiBot ? handleContactStepKeyDown : undefined}
                >
                  <Field label="First name" required>
                    <input
                      type="text"
                      name="firstName"
                      required
                      autoComplete="given-name"
                      value={contact.firstName}
                      onChange={(e) => {
                        markStarted();
                        setContact((c) => ({ ...c, firstName: e.target.value }));
                      }}
                      className="form-input"
                    />
                  </Field>
                  <Field label="Last name">
                    <input
                      type="text"
                      name="lastName"
                      autoComplete="family-name"
                      value={contact.lastName}
                      onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
                      className="form-input"
                    />
                  </Field>
                  <Field label="Phone" required>
                    <input
                      type="tel"
                      name="phone"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      value={contact.phone}
                      onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                      className="form-input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                      value={contact.email}
                      onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                      className="form-input"
                    />
                  </Field>
                  {step.showCompanyField && (
                    <Field label="Company / Builder name">
                      <input
                        type="text"
                        name="company"
                        autoComplete="organization"
                        value={contact.company}
                        onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                        className="form-input"
                      />
                    </Field>
                  )}
                  {!step.hideCityField && (
                    <Field label="City">
                      <input
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        value={contact.city}
                        onChange={(e) => setContact((c) => ({ ...c, city: e.target.value }))}
                        className="form-input"
                      />
                    </Field>
                  )}
                  <Field label="Preferred contact method">
                    <select
                      name="preferredContact"
                      value={contact.preferredContact}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, preferredContact: e.target.value as ContactValues["preferredContact"] }))
                      }
                      className="form-input"
                    >
                      <option value="phone">Phone call</option>
                      <option value="text">Text message</option>
                      <option value="email">Email</option>
                    </select>
                  </Field>

                  {antiBot && (
                    <>
                      {/* Honeypot — visually off-screen (not display:none
                          or type="hidden", both of which many bots skip),
                          out of tab order, unlabeled to real users. Named
                          "website" — plausible-looking to a bot, meaningless
                          to a homeowner who never sees it. Checked again
                          server-side in /api/lead; this client check is
                          just the fast path. */}
                      <div className="absolute -left-[9999px]" aria-hidden="true">
                        <label>
                          Website
                          <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                          />
                        </label>
                      </div>

                      {/* Cloudflare Turnstile mounts here once its script
                          loads (see the <Script> above). Managed mode is
                          usually invisible for real visitors; Cloudflare
                          renders a small challenge inline here only if it
                          decides one is warranted. */}
                      <div ref={turnstileContainerRef} className="sm:col-span-2" />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {submitError && (
          <p className="mt-4 rounded-md bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
            {submitError} Call us at{" "}
            <a href="tel:4353571340" className="underline">
              435-357-1340
            </a>
            .
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          {stepIndex > 0 ? (
            <Button type="button" variant="ghost" size="md" onClick={goBack} icon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {showContinueButton && (
            <Button
              // Only the final (contact) step's button can ever submit —
              // and even then, only via type="submit" for a normal form.
              // For an antiBot form this button is ALWAYS type="button":
              // clicking it runs handleProtectedSubmit(), which is the
              // only thing that can ever lead to a real submit — and even
              // then only indirectly, via the transient <form> mounted
              // after /api/lead succeeds (see the effect above). Every
              // earlier step stays type="button" with its own onClick
              // regardless, exactly as before.
              type={antiBot ? "button" : isLastStep ? "submit" : "button"}
              variant="accent"
              size="lg"
              onClick={
                isLastStep ? (antiBot ? handleProtectedSubmit : undefined) : handleContinueClick
              }
              disabled={antiBot && isLastStep ? protectedButtonDisabled : !canAdvance() || submitting}
              icon={
                submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : isLastStep ? undefined : (
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                )
              }
            >
              {isLastStep ? config.ctaText : "Continue"}
            </Button>
          )}
        </div>

      {isLastStep && step.microcopy && (
        <p className="mt-3 text-center text-xs text-ink-muted">{step.microcopy}</p>
      )}
    </>
  );

  return (
    <>
      {antiBot && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setTurnstileScriptReady(true)}
        />
      )}

      {antiBot ? (
        // No <form> element here at all — the qualifier and contact-entry
        // UI live in a plain <div> for the entire duration a visitor could
        // interact with them, so there is nothing for GHL's tracker
        // (initial querySelectorAll("form") scan, plus its MutationObserver
        // watching for new <form> nodes) to find until after server
        // verification succeeds. See the transient <form> further below.
        <div
          id="halladay-qualification-form"
          className="rounded-lg border border-border bg-background p-6 shadow-md sm:p-8"
        >
          {wizardBody}
        </div>
      ) : (
        <form
          id="halladay-qualification-form"
          name="halladay-qualification-form"
          onSubmit={handleFormSubmit}
          noValidate
          className="rounded-lg border border-border bg-background p-6 shadow-md sm:p-8"
        >
          {wizardBody}
        </form>
      )}

      {/* Transient, post-verification <form> — antiBot forms only. Does
          not exist in the DOM until /api/lead has already returned
          success (leadAccepted + transientLead are only ever set together,
          from handleProtectedSubmit, after that success). It is mounted
          already fully populated — see the values below, all captured at
          the moment of success — and the effect above fires exactly one
          real requestSubmit() against it once React has committed it to
          the DOM. Visually and functionally inert: nobody is meant to see
          or interact with it, it exists only for GHL's tracker to observe
          the one real submission, and it disappears when the redirect
          that follows unmounts this whole component. */}
      {antiBot && leadAccepted && transientLead && (
        <form
          ref={transientFormRef}
          aria-hidden="true"
          onSubmit={handleTransientFormSubmit}
          style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          <input type="hidden" name="service" value={transientLead.serviceId} readOnly />
          <input type="hidden" name="qualifier_homeowner" value={transientLead.homeownerLabel} readOnly />
          <input type="hidden" name="qualifier_need" value={transientLead.needLabel} readOnly />
          <input type="hidden" name="qualifier_location" value={transientLead.locationLabel} readOnly />
          <input type="text" name="firstName" value={transientLead.firstName} readOnly />
          <input type="text" name="lastName" value={transientLead.lastName} readOnly />
          <input type="tel" name="phone" value={transientLead.phone} readOnly />
          <input type="email" name="email" value={transientLead.email} readOnly />
        </form>
      )}
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      {required && <span className="text-danger"> *</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
