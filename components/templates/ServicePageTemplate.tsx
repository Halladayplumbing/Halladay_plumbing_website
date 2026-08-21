import { CheckCircle2 } from "lucide-react";
import type { Service } from "@/data/services";
import type { ServicePageContent } from "@/data/servicePageContent";
import { getActiveOfferForService } from "@/data/offers";
import { getFormForService } from "@/data/forms";
import { getFaqsFor } from "@/data/faqs";
import { getPrimaryServiceArea } from "@/data/serviceAreas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { OfferCard } from "@/components/OfferCard";
import { QualificationForm } from "@/components/forms/QualificationForm";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { ReviewsGrid } from "@/components/ReviewsGrid";
import { RelatedServices } from "@/components/RelatedServices";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StructuredData } from "@/components/StructuredData";
import { serviceSchema } from "@/lib/schema";

export function ServicePageTemplate({ service, content }: { service: Service; content: ServicePageContent }) {
  const offer = getActiveOfferForService(service.id);
  const primaryArea = getPrimaryServiceArea();
  const form = getFormForService(service);
  const thankYouPath = service.thankYouSlug ? `/thank-you/${service.thankYouSlug}/` : "/thank-you/";

  return (
    <>
      <StructuredData
        data={serviceSchema({
          name: service.name,
          description: content.metaDescription,
          url: `/${service.slug}/`,
        })}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: service.navLabel ?? service.name, href: `/${service.slug}/` }]} />

      <PageHero
        eyebrow={content.heroEyebrow}
        headline={content.heroHeadline}
        subheadline={content.heroSubheadline}
        imageLabel={content.heroImageLabel}
        primaryCta={
          form ? (
            <CTAButton href="#qualify" size="lg" trackAs="schedule_service_click">
              {content.primaryCtaLabel}
            </CTAButton>
          ) : (
            <CTAButton href={`/contact/?service=${service.id}`} size="lg">
              {content.primaryCtaLabel}
            </CTAButton>
          )
        }
        secondaryCta={<PhoneButton size="lg" variant="outline" className="!border-primary !text-primary" />}
      />

      <section className="py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">{content.problemHeadline}</h2>
            <p className="mt-4 text-ink-muted">{content.problemBody}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Common Signs</p>
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

      {offer && (
        <section className="py-14 lg:py-20">
          <div className="container-page mx-auto max-w-2xl">
            <OfferCard offer={offer} variant="featured" ctaHref={`/contact/?service=${service.id}&offer=${offer.id}`} />
          </div>
        </section>
      )}

      {form ? (
        <section id="qualify" className="scroll-mt-24 bg-surface py-14 lg:py-20">
          <div className="container-page mx-auto max-w-xl">
            <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">{content.primaryCtaLabel}</h2>
            <p className="mt-2 text-center text-ink-muted">
              Answer a few quick questions and we&apos;ll follow up with an estimate.
            </p>
            <div className="mt-8">
              <QualificationForm config={form} offerId={offer?.id} funnelId="organic" thankYouPath={thankYouPath} />
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-primary-dark py-12 text-center text-white">
          <div className="container-page mx-auto max-w-xl">
            <h2 className="text-xl font-bold sm:text-2xl">Ready to Get Started?</h2>
            <p className="mt-2 text-white/85">
              Answer a few quick questions and we&apos;ll follow up with an estimate.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href={`/contact/?service=${service.id}`} size="lg" variant="accent">
                {content.primaryCtaLabel}
              </CTAButton>
              <PhoneButton size="lg" variant="outline" />
            </div>
          </div>
        </section>
      )}

      <WhyHalladayInline />
      <ReviewsGrid tag={service.id} />
      <RelatedServices serviceIds={service.relatedServices.filter((id) => id !== "service-areas-cedar-city")} />

      <section className="border-t border-border py-10">
        <div className="container-page text-sm text-ink-muted">
          Proudly serving{" "}
          <a href={`/service-areas/${primaryArea.slug}/`} className="font-semibold text-primary hover:underline">
            {primaryArea.city}, {primaryArea.state}
          </a>{" "}
          and the surrounding Southern Utah area.
        </div>
      </section>

      <FAQAccordion faqs={getFaqsFor(content.faqKey)} />
      <FinalCTA />
    </>
  );
}
