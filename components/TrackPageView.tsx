"use client";

import { useEffect, useRef } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

// Fires a single named event once when a (server-rendered) page mounts —
// for events tied to a specific page rather than a user interaction,
// e.g. "landing_page_view" on a funnel or "water_softener_page_view" on
// the water softener pages. Renders nothing.
export function TrackPageView({ event, params }: { event: AnalyticsEvent; params?: Record<string, unknown> }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return null;
}
