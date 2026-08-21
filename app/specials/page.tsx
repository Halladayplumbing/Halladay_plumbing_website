import { getActiveOffers } from "@/data/offers";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { OfferCard } from "@/components/OfferCard";
import { CTAButton } from "@/components/CTAButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Specials",
  description: "Current plumbing specials and offers from Halladay Plumbing in Cedar City, UT.",
  path: "/specials/",
});

export default function SpecialsPage() {
  const offers = getActiveOffers();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Specials", href: "/specials/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-section-title font-extrabold text-ink">Current Specials</h1>
            <p className="mt-4 text-lg text-ink-muted">
              Active offers from Halladay Plumbing. Expired offers are removed automatically.
            </p>
          </div>

          {offers.length > 0 ? (
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} variant="horizontal" ctaHref={`/contact/?offer=${offer.id}`} />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-12 max-w-xl rounded-lg border border-border bg-surface p-10 text-center">
              <p className="text-ink-muted">
                There are no active specials right now. Contact Halladay Plumbing directly to ask
                about current pricing and availability.
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
