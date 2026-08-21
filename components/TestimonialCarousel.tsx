"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { getReviewsByTag } from "@/data/reviews";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

// Auto-rotating testimonial carousel for prominent social-proof
// placement (homepage). Pulls straight from data/reviews.ts — populate
// or reorder that file and this updates automatically, no component
// changes needed. Pauses on hover/focus and respects
// prefers-reduced-motion; degrades to a single static card when there's
// only one review, and hides entirely when there are none (same
// no-fabrication behavior as ReviewsGrid).
export function TestimonialCarousel({ tag, title = "What Southern Utah Homeowners Say" }: { tag?: string; title?: string }) {
  const items = getReviewsByTag(tag);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (i: number) => {
      if (items.length === 0) return;
      setIndex(((i % items.length) + items.length) % items.length);
    },
    [items.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (items.length <= 1) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || paused) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, paused]);

  if (items.length === 0) return null;

  const current = items[index];

  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-title font-extrabold text-ink">{title}</h2>
          {business.reviews.googleRating && business.reviews.googleReviewCount && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(business.reviews.googleRating!)
                        ? "h-5 w-5 fill-accent text-accent"
                        : "h-5 w-5 text-border"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-ink">
                {business.reviews.googleRating.toFixed(1)} on Google &middot; {business.reviews.googleReviewCount} reviews
              </span>
            </div>
          )}
        </div>

        <div
          className="relative mx-auto mt-10 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={title}
            className="rounded-lg border border-border bg-background p-8 shadow-md sm:p-10"
          >
            <Quote className="h-8 w-8 text-primary/30" aria-hidden="true" />

            <div aria-live="polite" className="mt-2">
              <div className="flex" aria-label={`${current.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={i < current.rating ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-border"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-lg leading-relaxed text-ink">&ldquo;{current.text}&rdquo;</blockquote>
              <p className="mt-5 text-sm font-semibold text-ink-muted">
                {current.author} <span className="font-normal">&middot; Google review</span>
              </p>
            </div>
          </div>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background p-2 shadow-sm hover:bg-surface sm:flex"
              >
                <ChevronLeft className="h-5 w-5 text-ink" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background p-2 shadow-sm hover:bg-surface sm:flex"
              >
                <ChevronRight className="h-5 w-5 text-ink" aria-hidden="true" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show testimonial ${i + 1} of ${items.length}`}
                    aria-current={i === index}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-200",
                      i === index ? "w-6 bg-primary" : "w-2.5 bg-border hover:bg-primary/40",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {business.reviews.googlePlaceUrl && (
          <p className="mt-6 text-center">
            <a href={business.reviews.googlePlaceUrl} className="text-sm font-semibold text-primary hover:underline">
              See all reviews on Google
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
