"use client";

// Thin analytics abstraction. Pushes to GTM dataLayer (which can fan out
// to GA4, Google Ads, and Meta Pixel via GTM triggers) and also calls
// gtag/fbq directly when those global functions are present, so the site
// works whether GTM, gtag.js, or the Meta Pixel snippet is loaded.
//
// No PII (name, phone, email, address) is ever sent to advertising
// platforms via these events — only anonymous behavioral/event data.

export type AnalyticsEvent =
  | "phone_click"
  | "emergency_phone_click"
  | "new_builds_phone_click"
  | "schedule_service_click"
  | "form_view"
  | "form_start"
  | "form_step_complete"
  | "form_complete"
  | "water_softener_lead"
  | "water_heater_lead"
  | "drain_cleaning_lead"
  | "leak_repair_lead"
  | "commercial_plumbing_lead"
  | "emergency_plumbing_lead"
  | "plumbing_repair_lead"
  | "new_construction_lead"
  | "offer_view"
  | "offer_click"
  | "offer_claim"
  | "landing_page_view";

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
      "emergency_plumbing_lead",
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
