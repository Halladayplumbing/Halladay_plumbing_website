import { reviews } from "@/data/reviews";
import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewCard } from "@/components/ReviewCard";
import { CTAButton } from "@/components/CTAButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Reviews",
  description: "Customer reviews for Halladay Plumbing in Cedar City, UT.",
  path: "/reviews/",
});

export default function ReviewsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews", href: "/reviews/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-section-title font-extrabold text-ink">Customer Reviews</h1>
            {business.reviews.googlePlaceUrl && (
              <a
                href={business.reviews.googlePlaceUrl}
                className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
              >
                See our reviews on Google
              </a>
            )}
          </div>

          {reviews.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-12 max-w-xl rounded-lg border border-border bg-surface p-10 text-center">
              <p className="text-ink-muted">
                Verified customer reviews will appear here once they&apos;re published from
                Halladay&apos;s Google Business Profile.
              </p>
              <CTAButton href="/contact/" size="lg" className="mt-6">
                Contact Us
              </CTAButton>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
