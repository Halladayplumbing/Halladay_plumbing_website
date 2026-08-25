import Link from "next/link";
import { MapPin } from "lucide-react";
import {
  getActiveServiceAreas,
  getActiveServiceAreasByRegion,
  getPrimaryServiceArea,
  getServiceAreaHref,
} from "@/data/serviceAreas";
import { getFaqsFor } from "@/data/faqs";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { ServiceAreaChecker } from "@/components/ServiceAreaChecker";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Areas We Serve | Southern Utah Plumber",
  description:
    "Halladay Plumbing serves Cedar City and Southern Utah, including St. George, Hurricane, Enoch, Parowan, Panguitch, Duck Creek Village, Kanarraville, and New Harmony.",
  path: "/service-areas/",
});

export default function ServiceAreasHubPage() {
  const primaryArea = getPrimaryServiceArea();
  const regions = getActiveServiceAreasByRegion().map((r) => ({
    ...r,
    areas: r.areas.filter((a) => !a.isPrimary),
  }));
  // Established hub towns only, for the short "Professional water
  // softener installation for X, Y, Z" line below — not the first four
  // of a ~50-item alphabetical/regional list.
  const highlightCities = getActiveServiceAreas()
    .filter((a) => a.footerHighlight && !a.isPrimary)
    .slice(0, 4)
    .map((a) => a.city);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/service-areas/" }]} />

      <PageHero
        eyebrow="Areas We Serve"
        headline="Serving Cedar City and Southern Utah"
        subheadline={`Halladay Plumbing is based in ${primaryArea.city} and serves homeowners and businesses throughout the surrounding Southern Utah communities below.`}
        imageLabel={`Halladay Plumbing service area — ${primaryArea.city} and Southern Utah`}
        primaryCta={
          <CTAButton href="/contact/" size="lg">
            Request Plumbing Service
          </CTAButton>
        }
        secondaryCta={<PhoneButton size="lg" variant="outline" className="!border-primary !text-primary" />}
      />

      <section className="py-14 lg:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">Check Your Area</h2>
          <p className="mt-2 text-center text-ink-muted">
            Enter your city to confirm Halladay Plumbing serves your area.
          </p>
          <div className="mt-8">
            <ServiceAreaChecker />
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Where We Work</h2>
          </div>
          <div className="mt-10">
            <ServiceAreaMap />
          </div>
        </div>
      </section>

      {/* Cedar City featured prominently as the primary market */}
      <section className="py-14 lg:py-20">
        <div className="container-page">
          <Link
            href={getServiceAreaHref(primaryArea)}
            className="group flex flex-col items-start justify-between gap-4 rounded-lg border-2 border-primary bg-primary-light p-8 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Primary Service Area</p>
              <p className="mt-2 text-2xl font-extrabold text-ink">
                {primaryArea.city}, {primaryArea.state}
              </p>
              <p className="mt-1 text-ink-muted">
                {primaryArea.localNotes ?? "Halladay Plumbing's home base for residential and commercial plumbing."}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-5 py-3 font-semibold text-white group-hover:bg-primary-dark">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              View {primaryArea.city} Plumbing
            </span>
          </Link>

          <h2 className="mt-14 text-2xl font-extrabold text-ink sm:text-3xl">Also Serving</h2>
          <p className="mt-2 text-ink-muted">
            Halladay Plumbing&apos;s service radius reaches well beyond Cedar City — grouped below
            by region.
          </p>

          <div className="mt-8 space-y-10">
            {regions.map((region) => (
              <div key={region.name}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{region.name}</h3>
                {region.note && <p className="mt-1 text-xs text-ink-muted">{region.note}</p>}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {region.areas.map((area) => (
                    <Link
                      key={area.slug}
                      href={getServiceAreaHref(area)}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <span className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <span className="font-semibold text-ink">
                          {area.city}, {area.state}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-primary">
                        {area.hasDedicatedPage ? "View Area →" : "Request Service →"}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-light py-14 lg:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Hard Water Throughout Southern Utah</h2>
          <p className="mt-4 text-ink-muted">
            Professional water softener installation for {primaryArea.city}, {highlightCities.join(", ")}{" "}
            and surrounding Southern Utah communities.
          </p>
          <CTAButton href="/water-softeners/" size="lg" className="mt-6">
            Learn About Water Softeners
          </CTAButton>
        </div>
      </section>

      <WhyHalladayInline />
      <TestimonialCarousel />
      <FAQAccordion faqs={getFaqsFor("homepage")} title="Service Area FAQs" />
      <FinalCTA headline="Need a Plumber in Southern Utah?" />
    </>
  );
}
