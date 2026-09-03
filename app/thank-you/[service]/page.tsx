import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { business } from "@/data/business";
import { getActiveOfferForService } from "@/data/offers";
import { PhoneButton } from "@/components/PhoneButton";
import { CTAButton } from "@/components/CTAButton";
import { OfferCard } from "@/components/OfferCard";
import { pageMetadata } from "@/lib/seo";

interface NextStep {
  title: string;
  body: string;
}

interface ChecklistCategory {
  name: string;
  items: string[];
}

interface ThankYouConfig {
  slug: string;
  headline: string;
  nextStep: string;
  serviceId?: string;
  useNewBuildsPhone?: boolean;
  // Optional richer "what happens after this" content — currently only
  // populated for water-softener (see the funnel-simplification brief).
  // Left undefined for every other service, so those pages render
  // exactly as before.
  nextSteps?: NextStep[];
  checklistIntro?: string;
  checklistCategories?: ChecklistCategory[];
  checklistOutro?: string;
}

const configs: ThankYouConfig[] = [
  {
    slug: "water-softener",
    headline: "Your Request Has Been Received",
    nextStep:
      "A member of the Halladay Plumbing team will give you a call to learn a little more about what's going on and schedule a time for your assessment.",
    serviceId: "water-softeners",
    nextSteps: [
      {
        title: "We'll give you a call",
        body: "We'll ask a few questions about what you're experiencing and confirm the details of the home.",
      },
      {
        title: "We'll schedule your assessment",
        body: "We'll find a time that works for you.",
      },
      {
        title: "We'll inspect the water and plumbing systems",
        body: "We'll work through the key plumbing and water components in the home and document anything that may need attention.",
      },
    ],
    checklistIntro:
      "During the assessment, we'll work through the main plumbing and water systems in the home and document anything that may need attention.",
    checklistCategories: [
      {
        name: "Kitchen",
        items: [
          "Faucets",
          "Shutoffs and supply lines",
          "Drain system",
          "Dishwasher connections",
          "Garbage disposal",
          "Instant hot-water equipment where applicable",
          "Icemaker supply",
          "Filters",
        ],
      },
      {
        name: "Laundry",
        items: [
          "Shutoffs",
          "Hoses",
          "Drainage",
          "Sink faucet and drain where applicable",
          "Washing-machine connections",
          "Dryer vent where applicable",
        ],
      },
      {
        name: "Main Water System",
        items: ["Main water shutoff", "Freeze protection", "Pressure-reducing valve where applicable", "Household water pressure"],
      },
      {
        name: "Bathrooms",
        items: [
          "Sink faucets",
          "Sink drains",
          "Shutoffs and supply lines",
          "Toilet fill and flush components",
          "Tub and shower caulking",
          "Drain connections",
          "Showerheads and related fittings",
          "Tub spouts",
          "Hand showers where applicable",
        ],
      },
      {
        name: "Water Heater",
        items: [
          "Water connections",
          "Shutoff valve",
          "Gas shutoff where applicable",
          "Flue / venting",
          "Temperature and pressure relief valve",
          "Stand and pad",
          "Electrical wiring where applicable",
          "Flue condition",
          "Temperature",
          "Required labeling where applicable",
        ],
      },
      {
        name: "Drain System",
        items: ["Accessible cleanouts", "Proper slope", "Pipe support"],
      },
      {
        name: "Exterior Plumbing",
        items: ["Outdoor hose connections / hydrants", "Vacuum breakers"],
      },
    ],
    checklistOutro:
      "Other plumbing items observed during the assessment may also be documented — not every home will have every item listed above. Once we're finished, we'll go over what we found with you and answer any questions you have about your water, plumbing, or current equipment.",
  },
  {
    slug: "water-heater",
    headline: "Thanks — your water heater request is in.",
    nextStep: "We'll follow up to schedule a diagnosis or installation.",
    serviceId: "water-heaters",
  },
  {
    slug: "drain-cleaning",
    headline: "Thanks — your drain cleaning request is in.",
    nextStep: "We'll follow up to schedule your drain cleaning.",
    serviceId: "drain-cleaning",
  },
  {
    slug: "leak-repair",
    headline: "Thanks — your leak repair request is in.",
    nextStep: "We'll follow up to schedule your leak repair.",
    serviceId: "leak-repair",
  },
  {
    slug: "commercial",
    headline: "Thanks — your commercial service request is in.",
    nextStep: "We'll follow up to discuss your business's plumbing needs.",
    serviceId: "commercial-plumbing",
  },
  {
    slug: "plumbing-repair",
    headline: "Thanks — your plumbing service request is in.",
    nextStep: "We'll follow up to schedule your service.",
    serviceId: "plumbing-repair",
  },
  {
    slug: "new-construction",
    headline: "Thanks — your new construction request is in.",
    nextStep: "We'll follow up to discuss scope, timeline, and next steps for your project.",
    serviceId: "new-construction",
    useNewBuildsPhone: true,
  },
];

export function generateStaticParams() {
  return configs.map((c) => ({ service: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const config = configs.find((c) => c.slug === service);
  if (!config) return {};
  return pageMetadata({
    title: "Thank You",
    description: "Your request has been submitted to Halladay Plumbing.",
    path: `/thank-you/${config.slug}/`,
    noindex: true,
  });
}

export default async function ServiceThankYouPage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const config = configs.find((c) => c.slug === service);
  if (!config) notFound();

  const offer = config.serviceId ? getActiveOfferForService(config.serviceId) : undefined;

  return (
    <>
      <section className="py-20 text-center">
        <div className="container-page mx-auto max-w-lg">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
          <h1 className="mt-4 text-3xl font-extrabold text-ink">{config.headline}</h1>
          <p className="mt-3 text-ink-muted">{config.nextStep}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PhoneButton size="lg" phone={config.useNewBuildsPhone ? business.phones.newBuilds : undefined} />
            <CTAButton href="/" size="lg" variant="outline" className="!border-primary !text-primary">
              Back to Home
            </CTAButton>
          </div>

          {offer && (
            <div className="mt-10 text-left">
              <OfferCard offer={offer} variant="compact" ctaHref="/contact/" />
            </div>
          )}

          <p className="mt-8 text-xs text-ink-muted">
            Prefer email? Reach us at{" "}
            <a href={`mailto:${business.email}`} className="text-primary hover:underline">
              {business.email}
            </a>
          </p>
        </div>
      </section>

      {config.nextSteps && (
        <section className="bg-surface py-14 lg:py-20">
          <div className="container-page mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">What Happens Next</h2>
            <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {config.nextSteps.map((step, i) => (
                <li key={step.title} className="rounded-lg border border-border bg-background p-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-3 font-bold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {config.checklistCategories && (
        <section className="py-14 lg:py-20">
          <div className="container-page mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
              What We&apos;ll Look At During Your Assessment
            </h2>
            {config.checklistIntro && (
              <p className="mx-auto mt-3 max-w-2xl text-center text-ink-muted">{config.checklistIntro}</p>
            )}

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {config.checklistCategories.map((cat) => (
                <div key={cat.name} className="rounded-lg border border-border bg-surface p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">{cat.name}</p>
                  <ul className="mt-3 space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {config.checklistOutro && (
              <p className="mx-auto mt-8 max-w-2xl text-center text-ink-muted">{config.checklistOutro}</p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
