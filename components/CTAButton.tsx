"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "md" | "lg";
  icon?: ReactNode;
  className?: string;
  trackAs?: AnalyticsEvent;
  trackParams?: Record<string, unknown>;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto";

const variants: Record<string, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  accent: "bg-accent text-white hover:bg-accent-dark",
  outline: "border-2 border-white text-white hover:bg-white/10",
  ghost: "text-primary hover:bg-primary-light",
};

const sizes: Record<string, string> = {
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  trackAs = "schedule_service_click",
  trackParams,
}: CTAButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const onClick = () => trackEvent(trackAs, trackParams);

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {icon}
      {children}
    </Link>
  );
}
