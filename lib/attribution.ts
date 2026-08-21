"use client";

// Captures marketing attribution (UTMs, gclid/fbclid, landing page,
// referrer) on first touch and persists it in sessionStorage so it can be
// attached to any lead submitted later in the session, regardless of how
// many pages/funnel steps the visitor moves through.

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landingPage?: string;
  referrer?: string;
}

const STORAGE_KEY = "halladay_attribution";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const existingRaw = window.sessionStorage.getItem(STORAGE_KEY);
  const existing: Attribution = existingRaw ? JSON.parse(existingRaw) : {};

  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {};
  let hasNewParam = false;

  for (const key of TRACKED_PARAMS) {
    const value = params.get(key);
    if (value) {
      incoming[key] = sanitizeParam(value);
      hasNewParam = true;
    }
  }

  // First-touch attribution: only set landingPage/referrer once per
  // session. Newer UTM params on a later page (e.g. a second ad click in
  // the same session) do overwrite, matching common last-click-on-params
  // behavior for paid campaigns.
  const merged: Attribution = {
    ...existing,
    ...incoming,
    landingPage: existing.landingPage ?? window.location.pathname,
    referrer: existing.referrer ?? document.referrer ?? "",
  };

  if (hasNewParam || !existingRaw) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  }

  return merged;
}

export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function sanitizeParam(value: string): string {
  // Strip anything that isn't a safe token character — defense in depth
  // since these values eventually get sent to a webhook/CRM.
  return value.replace(/[^a-zA-Z0-9_\-.%]/g, "").slice(0, 200);
}
