"use client";

import { Phone } from "lucide-react";
import { business, type PhoneNumber } from "@/data/business";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface PhoneButtonProps {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "md" | "lg";
  // Explicit phone line to use instead of the main line — e.g.
  // business.phones.newBuilds for the new-construction line.
  phone?: PhoneNumber;
  trackAs?: AnalyticsEvent;
  className?: string;
  label?: string;
  showIcon?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto";

const variants: Record<string, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark px-5 py-3 text-base",
  accent: "bg-accent text-white hover:bg-accent-dark px-5 py-3 text-base",
  outline: "border-2 border-white text-white hover:bg-white/10 px-5 py-3 text-base",
  ghost: "text-primary hover:bg-primary-light px-5 py-3 text-base",
};

const sizesLg: Record<string, string> = {
  primary: "px-7 py-4 text-lg",
  accent: "px-7 py-4 text-lg",
  outline: "px-7 py-4 text-lg",
  ghost: "px-7 py-4 text-lg",
};

export function PhoneButton({
  variant = "primary",
  size = "md",
  phone: phoneOverride,
  trackAs,
  className,
  label,
  showIcon = true,
}: PhoneButtonProps) {
  const phone = phoneOverride ?? business.phones.main;

  const display = label ?? `Call ${phone.display}`;
  // "phone_clicked" is the canonical GA4 event name (spec: G-CSMNSQBYHM's
  // event vocabulary); `service` carries which line was called instead
  // of a separate event name per line, so this stays one clean event.
  const event: AnalyticsEvent = trackAs ?? "phone_clicked";
  const service = phoneOverride === business.phones.newBuilds ? "new-construction" : "main";

  return (
    <a
      href={`tel:${phone.e164}`}
      className={cn(base, size === "lg" ? sizesLg[variant] : variants[variant], className)}
      onClick={() => trackEvent(event, { service, phone_number: phone.display })}
    >
      {showIcon && <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />}
      <span>{display}</span>
    </a>
  );
}
