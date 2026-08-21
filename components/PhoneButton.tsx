"use client";

import { Phone } from "lucide-react";
import { business } from "@/data/business";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface PhoneButtonProps {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "md" | "lg";
  emergency?: boolean;
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
  emergency = false,
  className,
  label,
  showIcon = true,
}: PhoneButtonProps) {
  const phone = emergency && business.phones.emergency.enabled ? business.phones.emergency : business.phones.main;

  const display = label ?? (emergency ? `Call Emergency Plumbing: ${phone.display}` : `Call ${phone.display}`);

  return (
    <a
      href={`tel:${phone.e164}`}
      className={cn(base, size === "lg" ? sizesLg[variant] : variants[variant], className)}
      onClick={() =>
        trackEvent(emergency ? "emergency_phone_click" : "phone_click", {
          phone_number: phone.display,
        })
      }
    >
      {showIcon && <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />}
      <span>{display}</span>
    </a>
  );
}
