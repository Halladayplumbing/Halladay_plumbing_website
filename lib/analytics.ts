"use client";

// Thin analytics abstraction. Pushes to GTM dataLayer (which can fan out
// to GA4, Google Ads, and Meta Pixel via GTM triggers) and also calls
// gtag/fbq directly when those global functions are present, so the site
// works whether GTM, gtag.js, or the Meta Pixel snippet is loaded.
//
// No PII (name, phone, email, address) is ever sent to advertising
// platforms via these events — only anonymous behavioral/event data.

export type AnalyticsEvent =
  // Phone/text — canonical GA4 event names (G-CSMNSQBYHM); which line
  // was called travels as a `service` param instead of a separate event
  // name per line — see components/PhoneButton.tsx.
  | "phone_clicked"
  | "text_clicked"
  | "cta_clicked"
  | "schedule_service_click"
  | "landing_page_view"
  // Qualification / lead forms
  | "form_view"
  | "form_start"
  | "form_started"
  | "form_step_complete"
  | "form_complete"
  | "form_completed"
  | "qualifier_started"
  | "qualifier_completed"
  | "service_selected"
  // Service-area checker
  | "service_area_checked"
  | "service_area_qualified"
  // Water softener funnel (assessment = this site's qualification form)
  | "water_softener_page_view"
  | "water_softener_assessment_started"
  | "water_softener_assessment_completed"
  // Reserved for future tools not yet built on this site (hard-water
  // calculator, cost estimator, a standalone offer checker, a multi-step
  // booking flow) — the vocabulary is ready so those tools can fire
  // these without any analytics-layer changes once they exist.
  | "hard_water_calculator_started"
  | "hard_water_calculator_completed"
  | "offer_checker_started"
  | "offer_checker_completed"
  | "cost_estimator_started"
  | "cost_estimator_completed"
  | "booking_started"
  | "booking_completed"
  | "booking_step_completed"
  // Leads by service
  | "water_softener_lead"
  | "water_heater_lead"
  | "drain_cleaning_lead"
  | "leak_repair_lead"
  | "commercial_plumbing_lead"
  | "plumbing_repair_lead"
  | "new_construction_lead"
  // Offers
  | "offer_view"
  | "offer_click"
  | "offer_claim"
  | "offer_qualified";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  // GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  // gtag.js (GA4 / Google Ads) direct call, if loaded independently of GTM
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }

  // Meta Pixel — map internal event names to standard/custom Meta events
  if (typeof window.fbq === "function") {
    const leadEvents: AnalyticsEvent[] = [
      "water_softener_lead",
      "water_heater_lead",
      "drain_cleaning_lead",
      "leak_repair_lead",
      "commercial_plumbing_lead",
      "plumbing_repair_lead",
      "new_construction_lead",
    ];
    if (leadEvents.includes(event)) {
      window.fbq("track", "Lead", { content_name: event, ...params });
    } else {
      window.fbq("trackCustom", event, params);
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params);
  }
}
