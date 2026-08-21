import { NextResponse } from "next/server";
import type { Lead } from "@/lib/leads";
import { isRateLimited } from "@/lib/rateLimit";

// Single integration point for lead delivery. The frontend never talks to
// a CRM directly — it POSTs a Lead object here. To connect a real CRM
// (Jobber, ServiceTitan, Housecall Pro, GoHighLevel, HubSpot, a
// Zapier/Make catch hook, or a custom system), set LEAD_WEBHOOK_URL in
// the environment; this route will forward the normalized lead payload
// to it as JSON. Without that env var set, submissions are validated and
// logged server-side only (safe default for local/dev).

const MAX_STRING_LENGTH = 500;

function sanitizeString(value: unknown, maxLength = MAX_STRING_LENGTH): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function isValidEmail(email: string): boolean {
  if (!email) return true; // optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
  const phone = sanitizeString(body?.contact?.phone, 30);
  const email = sanitizeString(body?.contact?.email, 254);

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
      lastName: sanitizeString(body?.contact?.lastName, 80) || undefined,
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
    leadType: sanitizeString(body?.leadType, 60) || "general_lead",
    leadPriority: (["urgent", "high", "standard", "nurture"] as const).includes(
      body?.leadPriority as "urgent" | "high" | "standard" | "nurture",
    )
      ? (body!.leadPriority as "urgent" | "high" | "standard" | "nurture")
      : "standard",
    qualificationAnswers:
      typeof body?.qualificationAnswers === "object" && body?.qualificationAnswers !== null
        ? body.qualificationAnswers
        : {},
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
