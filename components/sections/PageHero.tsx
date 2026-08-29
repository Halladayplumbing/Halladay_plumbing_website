import type { ReactNode } from "react";
import Image from "next/image";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  imageLabel: string;
  image?: { src: string; alt: string };
  imageAspect?: string;
  primaryCta: ReactNode;
  secondaryCta?: ReactNode;
}

export function PageHero({
  eyebrow,
  headline,
  subheadline,
  imageLabel,
  image,
  imageAspect = "aspect-[4/3] lg:aspect-square",
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div
        className={`container-page grid grid-cols-1 items-center gap-10 py-10 lg:gap-12 lg:py-16 ${
          image ? "lg:grid-cols-[55%_45%]" : ""
        }`}
      >
        <div className={image ? "" : "mx-auto max-w-2xl text-center lg:text-left"}>
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>}
          <h1 className="text-section-title font-extrabold text-ink">{headline}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink-muted lg:mx-0 mx-auto">{subheadline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            {primaryCta}
            {secondaryCta}
          </div>
        </div>

        {image ? (
          <div className={`relative w-full overflow-hidden rounded-lg ${imageAspect}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          // No real photo supplied yet for this page. Kept in the DOM
          // (hidden) rather than removed so the exact shot still needed is
          // documented right here — pass an `image` prop above to swap it
          // in once photography is available, no layout changes required.
          <div className="hidden" aria-hidden="true">
            <PlaceholderImage label={imageLabel} aspect={imageAspect} />
          </div>
        )}
      </div>
    </section>
  );
}
