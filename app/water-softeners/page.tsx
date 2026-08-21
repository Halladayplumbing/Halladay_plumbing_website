import { CheckCircle2, Droplets } from "lucide-react";
import { getActiveOfferForService } from "@/data/offers";
import { getFormById } from "@/data/forms";
import { getFaqsFor } from "@/data/faqs";
import { getPrimaryServiceArea } from "@/data/serviceAreas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { OfferCard } from "@/components/OfferCard";
import { QualificationForm } from "@/components/forms/QualificationForm";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { ReviewsGrid } from "@/components/ReviewsGrid";
import { RelatedServices } from "@/components/RelatedServices";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StructuredData } from "@/components/StructuredData";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Water Softener Installation in Cedar City, UT",
  description:
    "Whole-house water softener installation for Cedar City and Southern Utah homes. Protect fixtures, appliances, and your plumbing from hard water.",
  path: "/water-softeners/",
});

const signs = [
  "White mineral deposits on fixtures",
  "Spotting on glassware and dishes",
  "Scale buildup around faucets",
  "Soap and detergent not lathering well",
  "Buildup inside the shower or tub",
  "Buildup inside water-using appliances",
  "Scale accumulating inside a water heater",
  "Skin or hair feeling dry after washing",
];

const benefits = [
  "Reduce mineral scale throughout your plumbing",
  "Help protect fixtures from hard-water buildup",
  "Help protect water-using appliances",
  "Reduce hard-water residue on dishes and glassware",
  "Improve how well soap and detergent work",
  "Reduce the cleaning caused by scale and spotting",
];

const installSteps = [
  "Evaluate your water and home's requirements",
  "Recommend a system sized appropriately for your household",
  "Install the equipment",
  "Configure the system for your water",
  "Explain how to operate and maintain it",
];

export default function WaterSoftenersPage() {
  const offer = getActiveOfferForService("water-softeners");
  const primaryArea = getPrimaryServiceArea();
  const form = getFormById("water-softener")!;

  return (
    <>
      <StructuredData
        data={serviceSchema({
          name: "Water Softener Installation",
          description: "Whole-house water softener installation for Cedar City and Southern Utah homes.",
          url: "/water-softeners/",
        })}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Water Softeners", href: "/water-softeners/" }]} />

      <PageHero
        eyebrow="Water Softener Installation"
        headline={`Water Softener Installation in ${primaryArea.city}, ${primaryArea.state}`}
        subheadline="Hard water takes a toll on your appliances, fixtures, faucets, showers, and water heater over time. A properly installed water softener protects your home's plumbing system at the source."
        imageLabel="Whole-house water softener system installed in a Cedar City home"
        primaryCta={
          <CTAButton href="#qualify" size="lg">
            Get a Water Softener Estimate
          </CTAButton>
        }
        secondaryCta={<PhoneButton size="lg" variant="outline" className="!border-primary !text-primary" />}
      />

      {/* Hard water education */}
      <section className="py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="mb-3 flex items-center gap-2 text-primary">
              <Droplets className="h-6 w-6" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide">Hard Water 101</span>
            </div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              What Hard Water Is — And Why It&apos;s Common in Southern Utah
            </h2>
            <p className="mt-4 text-ink-muted">
              &ldquo;Hard water&rdquo; refers to water carrying a higher level of dissolved minerals,
              mainly calcium and magnesium. It&apos;s common throughout Southern Utah because of the
              region&apos;s natural geology and groundwater sources.
            </p>
            <p className="mt-4 text-ink-muted">
              As hard water moves through your home&apos;s plumbing, those minerals don&apos;t just
              disappear — they build up on the inside of pipes, on fixtures, inside appliances, and
              inside your water heater. Over time, that buildup is what homeowners notice as scale,
              spotting, and reduced efficiency.
            </p>
          </div>
          <PlaceholderImage label="Diagram or photo showing hard-water mineral buildup on a fixture" aspect="aspect-[4/3]" />
        </div>
      </section>

      {/* Signs checklist */}
      <section className="bg-surface py-14 lg:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Signs of Hard Water in Your Home</h2>
          <p className="mt-3 max-w-2xl text-ink-muted">If any of these sound familiar, hard water may be affecting your home.</p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {signs.map((s) => (
              <div key={s} className="flex items-start gap-2 rounded-lg border border-border bg-background p-4 text-sm text-ink">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">What a Water Softener Helps With</h2>
            <p className="mt-4 text-ink-muted">
              A whole-house water softener treats water as it enters your home, reducing the
              minerals responsible for hard-water buildup before they ever reach your fixtures.
            </p>
            <ul className="mt-6 space-y-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Installation Process</p>
            <ol className="mt-4 space-y-4">
              {installSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-ink">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {offer && (
        <section className="bg-primary-light py-14 lg:py-20">
          <div className="container-page mx-auto max-w-2xl">
            <OfferCard offer={offer} variant="featured" ctaHref="#qualify" />
          </div>
        </section>
      )}

      <section id="qualify" className="scroll-mt-24 bg-surface py-14 lg:py-20">
        <div className="container-page mx-auto max-w-xl">
          <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">Get My Water Softener Estimate</h2>
          <p className="mt-2 text-center text-ink-muted">
            Tell us a bit about your home and we&apos;ll follow up with a recommendation.
          </p>
          <div className="mt-8">
            <QualificationForm config={form} offerId={offer?.id} funnelId="organic" thankYouPath="/thank-you/water-softener/" />
          </div>
        </div>
      </section>

      <WhyHalladayInline />
      <ReviewsGrid tag="water-softeners" />
      <RelatedServices serviceIds={["water-heaters", "water-treatment", "plumbing-maintenance"]} />

      <section className="border-t border-border py-10">
        <div className="container-page text-sm text-ink-muted">
          Proudly installing water softeners in{" "}
          <a href={`/service-areas/${primaryArea.slug}/`} className="font-semibold text-primary hover:underline">
            {primaryArea.city}, {primaryArea.state}
          </a>{" "}
          and the surrounding Southern Utah area.
        </div>
      </section>

      <FAQAccordion faqs={getFaqsFor("water-softeners")} title="Water Softener FAQs" />
      <FinalCTA
        headline="Ready to Protect Your Home From Hard Water?"
        body="Get a water softener estimate from Halladay Plumbing."
      />
    </>
  );
}
