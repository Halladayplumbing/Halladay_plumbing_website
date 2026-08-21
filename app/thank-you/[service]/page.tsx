import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { business } from "@/data/business";
import { getActiveOfferForService } from "@/data/offers";
import { PhoneButton } from "@/components/PhoneButton";
import { CTAButton } from "@/components/CTAButton";
import { OfferCard } from "@/components/OfferCard";
import { pageMetadata } from "@/lib/seo";

interface ThankYouConfig {
  slug: string;
  headline: string;
  nextStep: string;
  serviceId?: string;
  emergency?: boolean;
}

const configs: ThankYouConfig[] = [
  {
    slug: "water-softener",
    headline: "Thanks — your water softener request is in.",
    nextStep: "We'll follow up to schedule your in-home water evaluation and estimate.",
    serviceId: "water-softeners",
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
    slug: "emergency",
    headline: "Thanks — your emergency request is in.",
    nextStep: "For the fastest response, please call us now — we're reviewing your request.",
    serviceId: "emergency-plumbing",
    emergency: true,
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
    <section className="py-20 text-center">
      <div className="container-page mx-auto max-w-lg">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-extrabold text-ink">{config.headline}</h1>
        <p className="mt-3 text-ink-muted">{config.nextStep}</p>

        {config.emergency && (
          <p className="mt-2 font-semibold text-danger">
            If this is an active emergency, please call now instead of waiting for a callback.
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <PhoneButton size="lg" emergency={config.emergency} />
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
  );
}
