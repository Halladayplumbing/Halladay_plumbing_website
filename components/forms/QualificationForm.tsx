"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import type { QualificationFormConfig } from "@/data/forms";
import { ProgressIndicator } from "./ProgressIndicator";
import { OptionCard } from "./OptionCard";
import { PhoneButton } from "@/components/PhoneButton";
import { Button } from "@/components/ui/Button";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";
import { submitLead, type Lead, type LeadPriority } from "@/lib/leads";

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
  preferredContact: "phone" | "text" | "email";
}

const leadEventByLeadType: Record<string, AnalyticsEvent> = {
  water_softener_lead: "water_softener_lead",
  water_heater_lead: "water_heater_lead",
  drain_cleaning_lead: "drain_cleaning_lead",
  leak_repair_lead: "leak_repair_lead",
  commercial_plumbing_lead: "commercial_plumbing_lead",
  emergency_plumbing_lead: "emergency_plumbing_lead",
  plumbing_repair_lead: "plumbing_repair_lead",
};

export function QualificationForm({ config, offerId, funnelId = "organic", thankYouPath }: QualificationFormProps) {
  const router = useRouter();

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [contact, setContact] = useState<ContactValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    preferredContact: "phone",
  });
  const [emergencyFlagged, setEmergencyFlagged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const started = useRef(false);
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackEvent("form_view", { form_id: config.id, service: config.serviceId });
  }, [config.id, config.serviceId]);

  const step = config.steps[stepIndex];
  const totalSteps = config.steps.length;
  const isLastStep = stepIndex === totalSteps - 1;

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form_id: config.id, service: config.serviceId });
  }

  function selectSingle(value: string, isEmergencyFlag?: boolean) {
    markStarted();
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
    if (isEmergencyFlag) setEmergencyFlagged(true);
  }

  function toggleMulti(value: string, isEmergencyFlag?: boolean) {
    markStarted();
    setAnswers((prev) => {
      const current = Array.isArray(prev[step.id]) ? (prev[step.id] as string[]) : [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [step.id]: next };
    });
    if (isEmergencyFlag) setEmergencyFlagged(true);
  }

  function canAdvance(): boolean {
    if (step.type === "contact") {
      return Boolean(contact.firstName.trim() && contact.phone.trim());
    }
    const value = answers[step.id];
    if (step.type === "multi-select") return Array.isArray(value) && value.length > 0;
    return typeof value === "string" && value.length > 0;
  }

  function goNext() {
    if (!canAdvance()) return;
    trackEvent("form_step_complete", { form_id: config.id, step: step.id, step_index: stepIndex + 1 });
    if (isLastStep) {
      handleSubmit();
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (stepIndex === 0) return;
    setStepIndex((i) => i - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);

    const attribution = captureAttribution();
    const priority: LeadPriority = emergencyFlagged ? "urgent" : config.defaultPriority;

    const lead: Lead = {
      contact: {
        firstName: contact.firstName,
        lastName: contact.lastName || undefined,
        phone: contact.phone,
        email: contact.email || undefined,
        city: contact.city || undefined,
        preferredContact: contact.preferredContact,
      },
      service: config.serviceId,
      leadType: config.leadType,
      leadPriority: priority,
      qualificationAnswers: answers,
      leadContext: {
        urgency: (answers["timeline"] as string) || (answers["urgency"] as string) || undefined,
        propertyType: (answers["property-type"] as string) || undefined,
        city: contact.city || undefined,
      },
      attribution,
      funnel: {
        id: funnelId,
        page: typeof window !== "undefined" ? window.location.pathname : "",
        offerId,
      },
      timestamp: new Date().toISOString(),
    };

    const result = await submitLead(lead);
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error ?? "Something went wrong. Please call us instead.");
      return;
    }

    trackEvent("form_complete", { form_id: config.id, service: config.serviceId, lead_priority: priority });
    const leadEvent = leadEventByLeadType[config.leadType];
    if (leadEvent) trackEvent(leadEvent, { lead_priority: priority, funnel_id: funnelId });

    router.push(thankYouPath ?? "/thank-you/");
  }

  return (
    <div className="rounded-lg border border-border bg-background p-6 shadow-md sm:p-8">
      <ProgressIndicator step={stepIndex + 1} total={totalSteps} />

      {emergencyFlagged && (
        <div className="mb-6 flex flex-col gap-3 rounded-md border-2 border-danger bg-danger/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold text-danger">
            <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
            This sounds urgent. Calling is the fastest way to reach us.
          </p>
          <PhoneButton emergency size="md" variant="accent" />
        </div>
      )}

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
                onClick={() => selectSingle(opt.value, opt.isEmergencyFlag)}
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
                  onClick={() => toggleMulti(opt.value, opt.isEmergencyFlag)}
                />
              );
            })}
          </div>
        )}

        {step.type === "contact" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="First name" required>
              <input
                type="text"
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
                autoComplete="family-name"
                value={contact.lastName}
                onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
                className="form-input"
              />
            </Field>
            <Field label="Phone" required>
              <input
                type="tel"
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
                inputMode="email"
                autoComplete="email"
                value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                className="form-input"
              />
            </Field>
            <Field label="City">
              <input
                type="text"
                autoComplete="address-level2"
                value={contact.city}
                onChange={(e) => setContact((c) => ({ ...c, city: e.target.value }))}
                className="form-input"
              />
            </Field>
            <Field label="Preferred contact method">
              <select
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
          </div>
        )}
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
          <Button variant="ghost" size="md" onClick={goBack} icon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button
          variant="accent"
          size="lg"
          onClick={goNext}
          disabled={!canAdvance() || submitting}
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
      </div>
    </div>
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
