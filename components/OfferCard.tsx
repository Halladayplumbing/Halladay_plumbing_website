"use client";

import { useEffect, useRef } from "react";
import { Tag } from "lucide-react";
import type { Offer } from "@/data/offers";
import { CTAButton } from "./CTAButton";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type OfferVariant = "standard" | "featured" | "horizontal" | "funnel" | "sticky" | "compact";

interface OfferCardProps {
  offer: Offer;
  variant?: OfferVariant;
  ctaHref?: string;
  className?: string;
}

export function OfferCard({ offer, variant = "standard", ctaHref = "/contact/", className }: OfferCardProps) {
  const seen = useRef(false);

  useEffect(() => {
    if (seen.current) return;
    seen.current = true;
    trackEvent("offer_view", { offer_id: offer.id, variant });
  }, [offer.id, variant]);

  const isHorizontal = variant === "horizontal" || variant === "funnel";
  const isCompact = variant === "compact" || variant === "sticky";
  const isFeatured = variant === "featured";

  return (
    <div
      className={cn(
        "rounded-lg border bg-background shadow-sm",
        isFeatured ? "border-accent bg-accent/5" : "border-border",
        isHorizontal ? "flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between" : "p-6",
        isCompact && "p-4",
        className,
      )}
    >
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Tag className="h-4 w-4 text-accent" aria-hidden="true" />
          {offer.eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
              {offer.eyebrow}
            </span>
          )}
        </div>
        <p className={cn("font-extrabold text-ink", isCompact ? "text-lg" : "text-xl")}>
          {offer.headline}
        </p>
        {offer.description && !isCompact && (
          <p className="mt-2 text-sm text-ink-muted">{offer.description}</p>
        )}
        {offer.scarcity && (
          <p className="mt-2 text-xs font-semibold text-warning">{offer.scarcity.label}</p>
        )}
        {offer.terms && !isCompact && (
          <p className="mt-3 text-xs text-ink-muted">{offer.terms}</p>
        )}
      </div>

      <CTAButton
        href={ctaHref}
        variant="accent"
        size={isCompact ? "md" : "lg"}
        trackAs="offer_claim"
        trackParams={{ offer_id: offer.id }}
        className={cn(!isHorizontal && "mt-5 w-full")}
      >
        {offer.ctaText}
      </CTAButton>
    </div>
  );
}
