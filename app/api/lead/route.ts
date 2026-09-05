import { NextResponse } from "next/server";
import type { Lead } from "@/lib/leads";
import { isRateLimited } from "@/lib/rateLimit";
import { forms } from "@/data/forms";

// Single integration point for lead delivery. The frontend never talks to
// a CRM directly — it POSTs a Lead object here. To connect a real CRM
// (Jobber, ServiceTitan, Housecall Pro, GoHighLevel, HubSpot, a
// Zapier/Make catch hook, or a custom system), set LEAD_WEBHOOK_URL in
// the environment; this route will forward the normalized lead payload
// to it as JSON. Without that env var set, submissions are validated and
// logged server-side only (safe default for local/dev). Note: GHL itself
// does NOT go through this webhook — see components/AnalyticsScripts.tsx
// and .env.example's LEAD_WEBHOOK_URL comment.

const MAX_STRING_LENGTH = 500;

// Leads carrying this type go through the stricter anti-bot gate below
// (honeypot + Turnstile + required-field + allowlisted-qualifier checks).
// See data/forms.ts's water-softener entry (antiBot: true) and
// components/forms/QualificationForm.tsx. Every other leadType keeps the
// original, looser validation beneath this block untouched.
const ANTI_BOT_LEAD_TYPE = "water_softener_lead";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Cloudflare's own published always-pass TEST secret (paired with the
// TEST site key in QualificationForm.tsx) — not sensitive, documented at
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/.
// Only used as a local-dev fallback; never applies in production.
const DEV_TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA";
const TURNSTILE_SECRET_KEY =
  process.env.TURNSTILE_SECRET_KEY || (process.env.NODE_ENV === "production" ? undefined : DEV_TURNSTILE_SECRET_KEY);

// Allowlisted qualifier values for the anti-bot-protected form, sourced
// directly from data/forms.ts so this can't silently drift out of sync
// with the actual questions/options a visitor is shown.
const waterSoftenerForm = forms.find((f) => f.leadType === ANTI_BOT_LEAD_TYPE);
const ALLOWED_QUALIFIER_VALUES: Record<string, Set<string>> = {};
for (const s of waterSoftenerForm?.steps ?? []) {
  if (s.options) ALLOWED_QUALIFIER_VALUES[s.id] = new Set(s.options.map((o) => o.value));
}

function sanitizeString(value: unknown, maxLength = MAX_STRING_LENGTH): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function isValidEmail(email: string): boolean {
  if (!email) return true; // optional field (for leadTypes where it's optional)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return false;
  try {
    const body = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[lead] Turnstile verification request failed", err);
    return false;
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: Partial<Lead>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const firstName = sanitizeString(body?.contact?.firstName, 80);
  const lastName = sanitizeString(body?.contact?.lastName, 80);
  const phone = sanitizeString(body?.contact?.phone, 30);
  const email = sanitizeString(body?.contact?.email, 254);
  const leadType = sanitizeString(body?.leadType, 60) || "general_lead";
  const qualificationAnswers =
    typeof body?.qualificationAnswers === "object" && body?.qualificationAnswers !== null ? body.qualificationAnswers : {};

  // --- Anti-bot gate: only for the protected leadType. Every other
  // submission path (every other service's QualificationForm, ContactForm,
  // etc.) is completely unaffected by everything in this block. ---
  if (leadType === ANTI_BOT_LEAD_TYPE) {
    // Honeypot — any value means a bot filled a field real users never
    // see. Reject without indicating why. Checked here independently of
    // the client-side check; never trust the client alone.
    const honeypot = sanitizeString(body?.website, 200);
    if (honeypot) {
      return NextResponse.json({ error: "Unable to process this request." }, { status: 400 });
    }

    // Every one of these is genuinely required for this form — not just
    // "first name and phone" like the generic path below.
    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }
    if (!isValidEmail(email) || !email) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Qualifier answers must be present and, where we know the valid
    // option set, one of the actual allowed values — not arbitrary text.
    for (const key of ["homeowner", "need", "location"]) {
      const answer = qualificationAnswers[key as keyof typeof qualificationAnswers];
      if (typeof answer !== "string" || !answer.trim()) {
        return NextResponse.json({ error: "Please complete all qualifying questions." }, { status: 400 });
      }
      const allowed = ALLOWED_QUALIFIER_VALUES[key];
      if (allowed && !allowed.has(answer)) {
        return NextResponse.json({ error: "Please complete all qualifying questions." }, { status: 400 });
      }
    }

    // Turnstile — mandatory for this form. A missing production secret
    // fails closed (rejects every submission) rather than silently
    // skipping verification; see .env.example for where to set it.
    if (!TURNSTILE_SECRET_KEY) {
      console.error("[lead] TURNSTILE_SECRET_KEY is not configured — rejecting protected submission.");
      return NextResponse.json({ error: "This form isn't accepting submissions right now. Please call us instead." }, { status: 503 });
    }

    const turnstileToken = sanitizeString(body?.turnstileToken, 2048);
    if (!turnstileToken) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    const turnstileOk = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }
  }

  // --- Original, looser validation — unchanged, still applies to every
  // leadType (including the anti-bot one, redundantly but harmlessly). ---
  if (!firstName || !phone) {
    return NextResponse.json({ error: "First name and phone are required." }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const lead: Lead = {
    contact: {
      firstName,
      lastName: lastName || undefined,
      phone,
      email: email || undefined,
      preferredContact: (["phone", "text", "email"] as const).includes(
        body?.contact?.preferredContact as "phone" | "text" | "email",
      )
        ? (body!.contact!.preferredContact as "phone" | "text" | "email")
        : undefined,
      city: sanitizeString(body?.contact?.city, 100) || undefined,
      address: sanitizeString(body?.contact?.address, 200) || undefined,
      company: sanitizeString(body?.contact?.company, 150) || undefined,
    },
    service: sanitizeString(body?.service, 60) || "unknown",
    leadType,
    leadPriority: (["urgent", "high", "standard", "nurture"] as const).includes(
      body?.leadPriority as "urgent" | "high" | "standard" | "nurture",
    )
      ? (body!.leadPriority as "urgent" | "high" | "standard" | "nurture")
      : "standard",
    qualificationAnswers,
    leadContext: {
      urgency: sanitizeString(body?.leadContext?.urgency, 60) || undefined,
      propertyType: sanitizeString(body?.leadContext?.propertyType, 60) || undefined,
      city: sanitizeString(body?.leadContext?.city, 100) || undefined,
    },
    attribution: typeof body?.attribution === "object" && body?.attribution !== null ? body.attribution : {},
    funnel: {
      id: sanitizeString(body?.funnel?.id, 80) || "organic",
      page: sanitizeString(body?.funnel?.page, 200),
      offerId: sanitizeString(body?.funnel?.offerId, 80) || undefined,
    },
    timestamp: new Date().toISOString(),
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_SECRET
            ? { "X-Lead-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        console.error("[lead webhook] non-2xx response", res.status);
        return NextResponse.json({ error: "Unable to deliver lead right now." }, { status: 502 });
      }
    } catch (err) {
      console.error("[lead webhook] delivery failed", err);
      return NextResponse.json({ error: "Unable to deliver lead right now." }, { status: 502 });
    }
  } else {
    // No CRM/webhook configured yet — log server-side so the lead is not
    // lost during local development or before integration is wired up.
    console.log("[lead] LEAD_WEBHOOK_URL not set — logging lead only:", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
