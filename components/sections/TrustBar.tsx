import { Star } from "lucide-react";
import { business } from "@/data/business";

// Renders quantitative review data (rating/count) only when confirmed.
// Falls back to qualitative trust points so the section still adds
// credibility without a fabricated number.
export function TrustBar() {
  const { googleRating, googleReviewCount } = business.reviews;

  return (
    <section className="border-b border-border bg-background py-6">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
        {googleRating && googleReviewCount ? (
          <div className="flex items-center gap-2">
            <div className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(googleRating)
                      ? "h-5 w-5 fill-accent text-accent"
                      : "h-5 w-5 text-border"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-ink">
              {googleRating.toFixed(1)} on Google &middot; {googleReviewCount} reviews
            </span>
          </div>
        ) : null}

        <span className="text-sm font-medium text-ink-muted">Residential &amp; Commercial Plumbing</span>
        <span className="text-sm font-medium text-ink-muted">
          Serving {business.primaryCity} &amp; {business.serviceRegion}
        </span>
      </div>
    </section>
  );
}
