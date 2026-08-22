"use client";

import { usePathname } from "next/navigation";
import { MobileStickyCTA } from "./MobileStickyCTA";

export function StickyCTAController() {
  const pathname = usePathname();
  // On paid landing pages, point the sticky "Schedule Service" action at
  // the funnel's own qualification form instead of the generic contact
  // page, keeping the visitor inside the single-purpose funnel.
  const isFunnel = Boolean(pathname?.startsWith("/lp/"));

  return <MobileStickyCTA scheduleHref={isFunnel ? "#qualify" : "/contact/"} />;
}
