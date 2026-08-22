"use client";

import { CTAButton } from "./CTAButton";
import { PhoneButton } from "./PhoneButton";

interface MobileStickyCTAProps {
  scheduleHref?: string;
}

// Sticky bottom conversion bar, mobile-only.
export function MobileStickyCTA({ scheduleHref = "/contact/" }: MobileStickyCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-border bg-background p-2 shadow-lg xl:hidden">
      <PhoneButton variant="outline" className="!border-primary !text-primary" label="Call Now" size="md" showIcon />
      <CTAButton href={scheduleHref} variant="accent" size="md" className="w-full">
        Schedule Service
      </CTAButton>
    </div>
  );
}
