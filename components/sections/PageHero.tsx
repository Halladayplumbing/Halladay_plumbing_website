import type { ReactNode } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  imageLabel: string;
  primaryCta: ReactNode;
  secondaryCta?: ReactNode;
  tone?: "default" | "emergency";
}

export function PageHero({
  eyebrow,
  headline,
  subheadline,
  imageLabel,
  primaryCta,
  secondaryCta,
  tone = "default",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-border",
        tone === "emergency" ? "bg-danger text-white" : "bg-surface",
      )}
    >
      <div className="container-page grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[55%_45%] lg:gap-12 lg:py-16">
        <div>
          {eyebrow && (
            <p
              className={cn(
                "mb-3 text-sm font-semibold uppercase tracking-wide",
                tone === "emergency" ? "text-white/80" : "text-primary",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "text-section-title font-extrabold",
              tone === "emergency" ? "text-white" : "text-ink",
            )}
          >
            {headline}
          </h1>
          <p
            className={cn(
              "mt-5 max-w-xl text-lg",
              tone === "emergency" ? "text-white/90" : "text-ink-muted",
            )}
          >
            {subheadline}
          </p>

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
