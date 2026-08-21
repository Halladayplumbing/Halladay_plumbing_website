import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { servicePlan } from "@/data/servicePlan";
import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${servicePlan.name} — Plumbing Membership Plan`,
  description: servicePlan.description,
  path: "/diamond-club/",
});

export default function DiamondClubPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: servicePlan.name, href: "/diamond-club/" }]} />

      <section className="border-b border-border bg-surface">
        <div className="container-page grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[55%_45%] lg:gap-12 lg:py-16">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
              <Icons.Gem className="h-5 w-5" aria-hidden="true" />
              Membership Plan
            </p>
            <h1 className="text-hero font-extrabold text-ink">
              {servicePlan.name}
              {servicePlan.trademark && <sup className="ml-1 text-2xl">&trade;</sup>}
            </h1>
            <p className="mt-4 text-xl font-semibold text-ink">{servicePlan.tagline}</p>
            <p className="mt-4 max-w-xl text-lg text-ink-muted">{servicePlan.description}</p>

            <div className="mt-8 flex flex-wrap items-end gap-6">
              <div>
                <span className="text-4xl font-extrabold text-ink">{servicePlan.price.amount}</span>
                <span className="text-ink-muted">{servicePlan.price.cadence}</span>
              </div>
              <div className="text-sm text-ink-muted">
                Member service fee: <span className="font-bold text-ink">{servicePlan.memberServiceFee.amount}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/contact/?interest=diamond-club" size="lg">
                Join the Diamond Club
              </CTAButton>
              <PhoneButton size="lg" variant="outline" className="!border-primary !text-primary" />
            </div>
          </div>

          <div className="rounded-lg border-2 border-primary bg-background p-8 text-center shadow-md">
            <Icons.ShieldCheck className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <p className="mt-4 text-lg font-bold text-ink">Plumbing security for your home.</p>
            <p className="mt-2 text-sm text-ink-muted">
              A private membership-service club, exclusive to Halladay Plumbing clients.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-page">
          <h2 className="text-section-title text-center font-extrabold text-ink">Member Benefits</h2>

          <div className="mt-12 overflow-hidden rounded-lg border border-border">
            {servicePlan.benefits.map((benefit, i) => {
              const Icon = (Icons[benefit.icon as keyof typeof Icons] as LucideIcon) ?? Icons.ShieldCheck;
              return (
                <div
                  key={benefit.title}
                  className={`grid grid-cols-1 items-center gap-4 p-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8 ${
                    i % 2 === 0 ? "bg-background" : "bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-4 sm:block">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className="text-lg font-bold text-ink sm:hidden">{benefit.title}</p>
                  </div>
                  <div>
                    <p className="hidden text-lg font-bold text-ink sm:block">{benefit.title}</p>
                    <p className="mt-1 text-sm text-ink-muted">{benefit.description}</p>
                  </div>
                  <p className="text-xl font-extrabold text-primary sm:text-right">{benefit.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary-light py-16 lg:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-section-title font-extrabold text-ink">Add-Ons</h2>
            <p className="mt-4 text-lg text-ink-muted">
              Members can layer on these recurring services alongside their Diamond Club plan.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
            {servicePlan.addOns.map((addOn) => {
              const Icon = (Icons[addOn.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Droplets;
              return (
                <div key={addOn.name} className="rounded-lg border-2 border-accent bg-background p-6 text-center shadow-sm">
                  <Icon className="mx-auto h-8 w-8 text-accent-dark" aria-hidden="true" />
                  <p className="mt-3 font-bold text-ink">{addOn.name}</p>
                  <p className="mt-2">
                    <span className="text-2xl font-extrabold text-ink">{addOn.price}</span>
                    <span className="text-ink-muted">{addOn.cadence}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-12 text-center text-white">
        <div className="container-page mx-auto max-w-xl">
          <h2 className="text-xl font-bold sm:text-2xl">Ready to Join {servicePlan.name}?</h2>
          <p className="mt-2 text-white/85">
            {servicePlan.price.amount}
            {servicePlan.price.cadence} — front-of-the-line service, an annual inspection, 10% off
            repairs, and more.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton href="/contact/?interest=diamond-club" size="lg" variant="accent">
              Join the Diamond Club
            </CTAButton>
            <PhoneButton size="lg" variant="outline" />
          </div>
        </div>
      </section>

      <WhyHalladayInline />
      <TestimonialCarousel />
      <FinalCTA
        headline="Questions About the Diamond Club?"
        body={`Call ${business.phones.main.display} or reach out and we'll walk you through it.`}
      />
    </>
  );
}
