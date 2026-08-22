import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { getAllFunnelSlugs, getFunnelBySlug } from "@/data/funnels";
import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { getOfferById } from "@/data/offers";
import { getFormById } from "@/data/forms";
import { getFaqsFor } from "@/data/faqs";
import { PageHero } from "@/components/sections/PageHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { OfferCard } from "@/components/OfferCard";
import { QualificationForm } from "@/components/forms/QualificationForm";
import { TrackPageView } from "@/components/TrackPageView";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { ReviewsGrid } from "@/components/ReviewsGrid";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StructuredData } from "@/components/StructuredData";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllFunnelSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const funnel = getFunnelBySlug(slug);
  if (!funnel) return {};
  return pageMetadata({
    title: funnel.hero.headline,
    description: funnel.hero.subheadline,
    path: `/lp/${funnel.slug}/`,
    noindex: funnel.noindex,
  });
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const funnel = getFunnelBySlug(slug);
  if (!funnel) notFound();

  const service = getServiceById(funnel.serviceId);
  const content = getServicePageContent(funnel.serviceId);
  const offer = getOfferById(funnel.offerId);
  const form = getFormById(funnel.formId);

  if (!service || !form) notFound();

  const isPhonePrimary = funnel.primaryCTA.type === "phone";

  return (
    <>
      <TrackPageView event="landing_page_view" params={{ funnel: funnel.slug, service: funnel.serviceId }} />
      {funnel.serviceId === "water-softeners" && <TrackPageView event="water_softener_page_view" params={{ funnel: funnel.slug }} />}

      <StructuredData
        data={serviceSchema({
          name: service.name,
          description: funnel.hero.subheadline,
          url: `/lp/${funnel.slug}/`,
        })}
      />

      <PageHero
        tone={funnel.serviceId === "emergency-plumbing" ? "emergency" : "default"}
        eyebrow={funnel.hero.eyebrow}
        headline={funnel.hero.headline}
        subheadline={funnel.hero.subheadline}
        imageLabel={funnel.hero.imageAlt}
        primaryCta={
          isPhonePrimary ? (
            <PhoneButton
              emergency={funnel.serviceId === "emergency-plumbing"}
              size="lg"
              variant="accent"
              className={funnel.serviceId === "emergency-plumbing" ? "!bg-white !text-danger hover:!bg-white/90" : undefined}
            />
          ) : (
            <CTAButton href="#qualify" size="lg" variant="accent" trackAs="schedule_service_click">
              {funnel.primaryCTA.label}
            </CTAButton>
          )
        }
        secondaryCta={
          !isPhonePrimary ? (
            <PhoneButton
              size="lg"
              variant="outline"
              className={funnel.serviceId === "emergency-plumbing" ? "!border-white !text-white hover:!bg-white/10" : "!border-primary !text-primary"}
            />
          ) : undefined
        }
      />

      <TrustBar />

      {content && (
        <section className="py-14 lg:py-20">
          <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{content.problemHeadline}</h2>
              <p className="mt-4 text-ink-muted">{content.problemBody}</p>
              <ul className="mt-6 space-y-2">
                {content.symptoms.slice(0, 5).map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{content.explanationHeadline}</p>
              <div className="mt-3 space-y-3 text-sm text-ink-muted">
                {content.explanationBody.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {content.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {offer && (
        <section className="bg-primary-light py-10">
          <div className="container-page mx-auto max-w-2xl">
            <OfferCard offer={offer} variant="funnel" ctaHref="#qualify" />
          </div>
        </section>
      )}

      <section id="qualify" className="scroll-mt-24 bg-surface py-14 lg:py-20">
        <div className="container-page mx-auto max-w-xl">
          <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">{funnel.primaryCTA.label}</h2>
          <p className="mt-2 text-center text-ink-muted">A few quick questions, then we&apos;ll follow up.</p>
          <div className="mt-8">
            <QualificationForm config={form} offerId={funnel.offerId} funnelId={funnel.slug} thankYouPath={funnel.thankYouPath} />
          </div>
        </div>
      </section>

      <WhyHalladayInline />
      <ReviewsGrid tag={funnel.reviewFilter} />

      {content && content.processSteps.length > 0 && (
        <section className="py-14 lg:py-20">
          <div className="container-page mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">How It Works</h2>
            <ol className="mx-auto mt-8 max-w-md space-y-4 text-left">
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
        </section>
      )}

      <FAQAccordion faqs={getFaqsFor(content?.faqKey ?? "homepage")} />

      <section className="bg-primary-dark py-12 text-center text-white">
        <div className="container-page mx-auto max-w-xl">
          <h2 className="text-xl font-bold sm:text-2xl">{funnel.hero.headline}</h2>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton href="#qualify" size="lg" variant="accent">
              {funnel.primaryCTA.label}
            </CTAButton>
            <PhoneButton size="lg" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
