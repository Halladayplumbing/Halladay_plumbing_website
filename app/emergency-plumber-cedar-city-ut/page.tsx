import { PhoneOff, Waves, Droplets, ArrowUpFromLine, Flame, ShowerHead } from "lucide-react";
import { getServiceById } from "@/data/services";
import { getFaqsFor } from "@/data/faqs";
import { getPrimaryServiceArea } from "@/data/serviceAreas";
import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { PhoneButton } from "@/components/PhoneButton";
import { CTAButton } from "@/components/CTAButton";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { ReviewsGrid } from "@/components/ReviewsGrid";
import { RelatedServices } from "@/components/RelatedServices";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StructuredData } from "@/components/StructuredData";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("emergency-plumbing")!;

export const metadata = pageMetadata({
  title: "Emergency Plumber in Cedar City, UT",
  description:
    "Emergency plumbing service for Cedar City and Southern Utah — burst pipes, active leaks, sewer backups, and other urgent plumbing issues.",
  path: "/emergency-plumber-cedar-city-ut/",
});

const emergencies = [
  {
    icon: Waves,
    title: "Burst Pipes",
    body: "A burst pipe can release a large amount of water quickly. Shut off your main water supply if you can safely reach it, then call us.",
  },
  {
    icon: Droplets,
    title: "Active Leaks",
    body: "A leak that's actively flowing — under a sink, from a wall, or from a fixture — should be addressed right away to limit damage.",
  },
  {
    icon: ArrowUpFromLine,
    title: "Sewer Backups",
    body: "A sewer backup affecting drains or toilets is a health and property concern that needs prompt attention.",
  },
  {
    icon: ShowerHead,
    title: "Overflowing Fixtures",
    body: "A toilet, tub, or sink that won't stop overflowing can cause water damage fast — shut off the fixture's supply valve if you can.",
  },
  {
    icon: Flame,
    title: "Water Heater Leaks",
    body: "A leaking water heater can indicate tank failure and should be evaluated promptly, especially near gas or electrical connections.",
  },
  {
    icon: PhoneOff,
    title: "Major Drain Backups",
    body: "Multiple drains backing up at once often points to a main line issue that needs urgent attention.",
  },
];

const safetySteps = [
  "Shut off the affected fixture if you can safely reach the valve.",
  "Shut off the main water supply if necessary and you know where the shutoff is.",
  "Move valuables and belongings away from active water.",
  "Stay away from electrical outlets or equipment affected by water.",
  "Call Halladay Plumbing.",
];

export default function EmergencyPlumberPage() {
  const primaryArea = getPrimaryServiceArea();

  return (
    <>
      <StructuredData
        data={serviceSchema({
          name: "Emergency Plumbing",
          description: "Emergency plumbing service for Cedar City and Southern Utah.",
          url: "/emergency-plumber-cedar-city-ut/",
        })}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Emergency Plumbing", href: "/emergency-plumber-cedar-city-ut/" }]} />

      <PageHero
        tone="emergency"
        eyebrow="Emergency Plumbing"
        headline={`Emergency Plumber in ${primaryArea.city}, ${primaryArea.state}`}
        subheadline={`When you're dealing with an urgent plumbing issue, Halladay Plumbing provides emergency plumbing service for ${primaryArea.city} and confirmed surrounding areas.`}
        imageLabel="Plumber responding to an urgent residential plumbing call"
        primaryCta={
          <PhoneButton
            emergency
            size="lg"
            variant="accent"
            label="Call Emergency Line"
            className="!bg-white !text-danger hover:!bg-white/90"
          />
        }
        secondaryCta={
          <CTAButton
            href="/contact/?service=emergency-plumbing"
            size="lg"
            variant="outline"
            className="!border-white !text-white hover:!bg-white/10"
          >
            Request Emergency Service
          </CTAButton>
        }
      />

      {!business.phones.emergency.enabled && (
        <div className="bg-warning/10 py-3 text-center text-sm text-warning">
          A dedicated emergency line will be added here once Halladay provides one — the main
          number above reaches Halladay Plumbing now.
        </div>
      )}

      <section className="py-14 lg:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Plumbing Emergencies We Handle</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {emergencies.map((e) => (
              <div key={e.title} className="rounded-lg border border-border bg-background p-6 shadow-sm">
                <e.icon className="h-7 w-7 text-danger" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-ink">{e.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">What to Do While You Call a Plumber</h2>
          <ol className="mt-6 space-y-4">
            {safetySteps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-ink">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-danger text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-muted">
            This is general guidance, not a substitute for professional help. If you&apos;re unsure
            or the situation feels unsafe, call us right away.
          </p>
        </div>
      </section>

      <section className="bg-danger py-12 text-center text-white">
        <div className="container-page mx-auto max-w-xl">
          <h2 className="text-xl font-bold sm:text-2xl">Dealing With a Plumbing Emergency Right Now?</h2>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <PhoneButton emergency size="lg" variant="accent" className="!bg-white !text-danger hover:!bg-white/90" />
            <CTAButton
              href="/contact/?service=emergency-plumbing"
              size="lg"
              variant="outline"
              className="!border-white !text-white hover:!bg-white/10"
            >
              Request Emergency Service
            </CTAButton>
          </div>
        </div>
      </section>

      <WhyHalladayInline />
      <ReviewsGrid tag="emergency-plumbing" />
      <RelatedServices serviceIds={service.relatedServices} />
      <FAQAccordion faqs={getFaqsFor("emergency-plumbing")} title="Emergency Plumbing FAQs" />
    </>
  );
}
