// Lead data model + submission abstraction.
//
// The frontend never talks to a specific CRM directly. It builds a Lead
// object and POSTs it to /api/lead. That route is the single integration
// point — swap it to call Jobber, ServiceTitan, Housecall Pro,
// GoHighLevel, a Zapier/Make catch hook, HubSpot, or a custom webhook
// without touching any form component.

import type { Attribution } from "./attribution";

export type LeadPriority = "urgent" | "high" | "standard" | "nurture";

export interface Lead {
  contact: {
    firstName: string;
    lastName?: string;
    phone: string;
    email?: string;
    preferredContact?: "phone" | "text" | "email";
    city?: string;
    address?: string;
    // Builder/GC company name — collected on forms with showCompanyField
    // (e.g. new construction).
    company?: string;
  };

  service: string; // service id
  leadType: string; // e.g. water_softener_lead
  leadPriority: LeadPriority;

  qualificationAnswers: Record<string, string | string[]>;

  leadContext: {
    urgency?: string;
    propertyType?: string;
    city?: string;
  };

  attribution: Attribution;

  funnel: {
    id: string; // funnel slug or "organic" / "contact-page"
    page: string;
    offerId?: string;
  };

  timestamp: string;

  // Anti-bot fields — only populated by forms with antiBot protection
  // enabled (currently just the water-softener QualificationForm). Left
  // undefined by every other form; /api/lead only enforces them for
  // leadType "water_softener_lead", so no other submission path is
  // affected.
  turnstileToken?: string;
  /** Honeypot value — must be empty. Any value present means a bot filled a field real users never see. */
  website?: string;
}

export interface LeadSubmissionResult {
  ok: boolean;
  error?: string;
}

export async function submitLead(lead: Lead): Promise<LeadSubmissionResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body?.error ?? `Request failed (${res.status})` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}
