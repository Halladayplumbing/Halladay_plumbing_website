import type { ReactNode } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  imageLabel: string;
  primaryCta: ReactNode;
  secondaryCta?: ReactNode;
}

export function PageHero({ eyebrow, headline, subheadline, imageLabel, primaryCta, secondaryCta }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[55%_45%] lg:gap-12 lg:py-16">
        <div>
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>}
          <h1 className="text-section-title font-extrabold text-ink">{headline}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink-muted">{subheadline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryCta}
            {secondaryCta}
          </div>
        </div>

        <PlaceholderImage label={imageLabel} aspect="aspect-[4/3] lg:aspect-square" />
      </div>
    </section>
  );
}
