import Image from "next/image";
import { CheckCircle2, HardHat } from "lucide-react";
import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { getFormById } from "@/data/forms";
import { getFaqsFor } from "@/data/faqs";
import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { QualificationForm } from "@/components/forms/QualificationForm";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { RelatedServices } from "@/components/RelatedServices";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StructuredData } from "@/components/StructuredData";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("new-construction")!;
const content = getServicePageContent("new-construction")!;
const form = getFormById("new-construction")!;

// New-construction proof photography — see public/images/new-construction/.
// Sourced from an active Halladay rough-in job; used both as the page's
// primary above-the-fold proof (hero) and, at smaller sizes, in the
// three-part visual story below. halladay-...-project.webp exists as an
// optimized asset but is intentionally not placed on the page — its
// composition is too close to the hero shot to add anything, and the page
// already carries enough visual proof without it.
const roughInImage = {
  src: "/images/new-construction/halladay-new-construction-plumbing-rough-in.webp",
  alt: "New construction plumbing rough-in installed by Halladay Plumbing in a framed Southern Utah home",
};

const visualProof = [
  {
    image: "/images/new-construction/halladay-new-construction-plumbing-rough-in.webp",
    alt: "Wide view of new construction plumbing rough-in throughout a framed Southern Utah home",
    title: "Rough-In Planning",
    copy: "Water, drain, and fixture locations coordinated while the structure is open.",
  },
  {
    image: "/images/new-construction/halladay-new-construction-plumbing-rough-in-detail.webp",
    alt: "Detailed view of horizontal supply and drain line rough-in plumbing installation",
    title: "Clean, Organized Installation",
    copy: "Supply and drain lines installed with the framing, layout, and other trades in mind.",
  },
  {
    image: "/images/new-construction/halladay-new-construction-plumbing-system-detail.webp",
    alt: "Close-up of a new construction plumbing shutoff valve and fixture rough-in",
    title: "Ready for the Next Phase",
    copy: "Plumbing infrastructure prepared for inspection, finish work, and final fixture installation.",
  },
];

const framingImage = {
  src: "/images/new-construction/halladay-new-construction-plumbing-framing.webp",
  alt: "Plumbing lines installed within residential framing during a Halladay Plumbing new construction project",
};

export const metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/new-construction-plumbing/",
});

export default function NewConstructionPage() {
  return (
    <>
      <StructuredData
        data={serviceSchema({
          name: service.name,
          description: content.metaDescription,
          url: "/new-construction-plumbing/",
        })}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "New Construction", href: "/new-construction-plumbing/" }]} />

      <PageHero
        eyebrow={content.heroEyebrow}
        headline={content.heroHeadline}
        subheadline={content.heroSubheadline}
        imageLabel={content.heroImageLabel}
        image={roughInImage}
        imageAspect="aspect-[16/9]"
        primaryCta={
          <PhoneButton
            phone={business.phones.newBuilds}
            size="lg"
            label={`Call New Builds: ${business.phones.newBuilds.display}`}
          />
        }
        secondaryCta={
          <CTAButton href="#quote" size="lg" variant="outline" className="!border-primary !text-primary">
            Request a Quote
          </CTAButton>
        }
      />

      <section className="border-b border-border bg-primary-light py-6">
        <div className="container-page flex flex-wrap items-center justify-center gap-3 text-center">
          <HardHat className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm font-semibold text-ink">
            New construction is a dedicated line for Halladay Plumbing, separate from residential
            service calls — projects get their own scheduling and point of contact.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">{content.problemHeadline}</h2>
            <p className="mt-4 text-ink-muted">{content.problemBody}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Common Requests</p>
            <ul className="mt-4 space-y-2.5">
              {content.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            New Construction Plumbing
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
            Built Into the Project From the Start
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted">
            Plumbing decisions made during rough-in affect everything that comes after. Halladay
            coordinates water, drain, fixture, and equipment locations while the home is still
            open — helping keep the plumbing system organized and ready for the next phase of
            construction.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {visualProof.map((item) => (
              <div key={item.title}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-base font-bold text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">{content.explanationHeadline}</h2>
            {content.explanationBody.map((p) => (
              <p key={p} className="mt-4 text-ink-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg lg:mx-auto lg:max-w-none">
            <Image
              src={framingImage.src}
              alt={framingImage.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="container-page mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">What You Get</p>
            <ul className="mt-4 space-y-2.5">
              {content.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">How It Works</p>
            <ol className="mt-4 space-y-3">
              {content.processSteps.map((step, i) => (
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

      <section id="quote" className="scroll-mt-24 py-14 lg:py-20">
        <div className="container-page mx-auto max-w-xl">
          <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">{content.primaryCtaLabel}</h2>
          <p className="mt-2 text-center text-ink-muted">Tell us about the project and we&apos;ll follow up.</p>
          <div className="mt-8">
            <QualificationForm config={form} funnelId="organic" thankYouPath="/thank-you/new-construction/" />
          </div>
        </div>
      </section>

      <WhyHalladayInline />
      <RelatedServices serviceIds={service.relatedServices} />
      <FAQAccordion faqs={getFaqsFor("new-construction")} title="New Construction FAQs" />

      <section className="bg-primary-dark py-16 text-center text-white lg:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h2 className="text-section-title font-extrabold">Have a Project to Discuss?</h2>
          <p className="mt-4 text-white/90">
            Call our dedicated new construction line to talk through scope and scheduling.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PhoneButton
              phone={business.phones.newBuilds}
              size="lg"
              variant="accent"
              label={`Call ${business.phones.newBuilds.display}`}
            />
            <CTAButton href="#quote" size="lg" variant="outline" className="!border-white !text-white hover:!bg-white/10">
              Request a Quote
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
