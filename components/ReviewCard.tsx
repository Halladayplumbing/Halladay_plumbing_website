import { Star } from "lucide-react";
import type { Review } from "@/data/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border bg-background p-6 shadow-sm">
      <div className="flex" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < review.rating ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-border"}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-sm text-ink">&ldquo;{review.text}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-ink-muted">
        {review.author} <span className="font-normal text-ink-muted">&middot; Google</span>
      </figcaption>
    </figure>
  );
}
