import { getReviewsByTag } from "@/data/reviews";
import { business } from "@/data/business";
import { ReviewCard } from "./ReviewCard";

// Hides itself entirely when there is no real review data yet, rather
// than showing fabricated testimonials. Once Halladay/Lusso Media supply
// verified Google reviews in data/reviews.ts, this section activates
// automatically across every page that renders it.
export function ReviewsGrid({ tag, title = "What Cedar City Homeowners Say" }: { tag?: string; title?: string }) {
  const filtered = getReviewsByTag(tag);
  if (filtered.length === 0) return null;

  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-title font-extrabold text-ink">{title}</h2>
          {business.reviews.googlePlaceUrl && (
            <a
              href={business.reviews.googlePlaceUrl}
              className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
              See all reviews on Google
            </a>
          )}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 9).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
