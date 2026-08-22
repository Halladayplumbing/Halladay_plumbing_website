"use client";

import { CalendarClock } from "lucide-react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

interface BookingLauncherProps {
  label?: string;
  className?: string;
}

// Opens Halladay's real Housecall Pro booking page in a new tab. This is
// NOT a parallel scheduling backend — no appointment data is captured or
// stored on this site; Housecall Pro is Halladay's own system. Because
// booking there is reviewed manually by Halladay's team, this component
// and all copy near it must never claim the appointment is confirmed.
export function BookingLauncher({ label = "Request Service Through Housecall Pro", className }: BookingLauncherProps) {
  function handleClick() {
    trackEvent("housecallpro_opened");
    trackEvent("request_service_clicked");
    window.open(business.housecallProUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={className}>
      <Button variant="primary" size="lg" onClick={handleClick} icon={<CalendarClock className="h-5 w-5" aria-hidden="true" />}>
        {label}
      </Button>
      <p className="mt-2 text-xs text-ink-muted">
        Opens Halladay&apos;s scheduling page in a new tab. Submitting a request does not confirm an
        appointment time — Halladay&apos;s team reviews and confirms scheduling directly.
      </p>
    </div>
  );
}
