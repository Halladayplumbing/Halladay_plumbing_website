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

      <section className="bg-surface py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">{content.explanationHeadline}</h2>
            {content.explanationBody.map((p) => (
              <p key={p} className="mt-4 text-ink-muted">
                {p}
              </p>
            ))}
          </div>
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
            <ol className="mt-8 space-y-3">
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
