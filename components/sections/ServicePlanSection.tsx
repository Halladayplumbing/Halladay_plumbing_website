import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { servicePlan } from "@/data/servicePlan";
import { CTAButton } from "@/components/CTAButton";

// Homepage teaser for the Diamond Club membership plan. Pulls straight
// from data/servicePlan.ts (real client-supplied plan sheet) — edit that
// file to change pricing/benefits. Full detail lives on /diamond-club/.
export function ServicePlanSection() {
  const featured = servicePlan.benefits.slice(0, 4);

  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Icons.Gem className="h-6 w-6" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide">Membership Plan</span>
          </div>
          <h2 className="text-section-title font-extrabold text-ink">
            {servicePlan.name}
            {servicePlan.trademark && <sup className="ml-0.5 text-lg">&trade;</sup>}
          </h2>
          <p className="mt-4 text-ink-muted">{servicePlan.description}</p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-ink">{servicePlan.price.amount}</span>
            <span className="text-ink-muted">{servicePlan.price.cadence}</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/diamond-club/" size="lg">
              View Diamond Club Benefits
            </CTAButton>
            <CTAButton
              href="/contact/?interest=diamond-club"
              size="lg"
              variant="outline"
              className="!border-primary !text-primary"
            >
              Join the Diamond Club
            </CTAButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((benefit) => {
            const Icon = (Icons[benefit.icon as keyof typeof Icons] as LucideIcon) ?? Icons.ShieldCheck;
            return (
              <div key={benefit.title} className="rounded-lg border border-border bg-background p-5 shadow-sm">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold text-ink">{benefit.title}</p>
                <p className="mt-1 text-lg font-extrabold text-primary">{benefit.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
