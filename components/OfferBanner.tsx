"use client";

import { Tag } from "lucide-react";
import type { Offer } from "@/data/offers";
import { CTAButton } from "./CTAButton";

// Slim, high-visibility strip for an active offer — used above the fold
// on funnel pages or as a promo strip on service pages.
export function OfferBanner({ offer, ctaHref = "/contact/" }: { offer: Offer; ctaHref?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-accent px-4 py-3 text-center text-white sm:flex-row sm:justify-between sm:text-left">
      <span className="flex items-center gap-2 text-sm font-semibold">
        <Tag className="h-4 w-4 shrink-0" aria-hidden="true" />
        {offer.headline}
        {offer.scarcity && <span className="hidden sm:inline">&middot; {offer.scarcity.label}</span>}
      </span>
      <CTAButton
        href={ctaHref}
        variant="outline"
        size="md"
        trackAs="offer_claim"
        trackParams={{ offer_id: offer.id, placement: "banner" }}
        className="!border-white !text-white hover:!bg-white/10"
      >
        {offer.ctaText}
      </CTAButton>
    </div>
  );
}
