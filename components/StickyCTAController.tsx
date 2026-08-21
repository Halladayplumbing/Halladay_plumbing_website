"use client";

import { usePathname } from "next/navigation";
import { MobileStickyCTA } from "./MobileStickyCTA";

// Determines whether the current route is emergency-focused so the
// global sticky mobile bar can swap to the dominant emergency CTA
// without every page needing to render its own copy of the bar.
const EMERGENCY_PATH_FRAGMENTS = ["/emergency-plumber-cedar-city-ut", "/lp/emergency-plumber", "/thank-you/emergency"];

export function StickyCTAController() {
  const pathname = usePathname();
  const isEmergency = EMERGENCY_PATH_FRAGMENTS.some((fragment) => pathname?.startsWith(fragment));
  // On paid landing pages, point the sticky "Schedule Service" action at
  // the funnel's own qualification form instead of the generic contact
  // page, keeping the visitor inside the single-purpose funnel.
  const isFunnel = Boolean(pathname?.startsWith("/lp/"));

  return <MobileStickyCTA emergency={isEmergency} scheduleHref={isFunnel ? "#qualify" : "/contact/"} />;
}
