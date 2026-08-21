"use client";

import { CTAButton } from "./CTAButton";
import { PhoneButton } from "./PhoneButton";

interface MobileStickyCTAProps {
  emergency?: boolean;
  scheduleHref?: string;
}

// Sticky bottom conversion bar, mobile-only. On emergency pages, pass
// emergency to make the emergency phone CTA the dominant action.
export function MobileStickyCTA({ emergency = false, scheduleHref = "/contact/" }: MobileStickyCTAProps) {
  if (emergency) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-danger p-2 shadow-lg xl:hidden">
        <PhoneButton
          emergency
          variant="accent"
          size="lg"
          className="w-full !bg-white !text-danger hover:!bg-white/90"
          label="Call Emergency Plumber"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-border bg-background p-2 shadow-lg xl:hidden">
      <PhoneButton variant="outline" className="!border-primary !text-primary" label="Call Now" size="md" showIcon />
      <CTAButton href={scheduleHref} variant="accent" size="md" className="w-full">
        Schedule Service
      </CTAButton>
    </div>
  );
}
