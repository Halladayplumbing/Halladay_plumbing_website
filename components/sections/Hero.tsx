"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { business } from "@/data/business";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { VeteranBadge } from "@/components/VeteranBadge";

const trustPoints = ["Residential & Commercial", "New Construction Available"];

// Mobile gets this photo as its only hero asset — never the video. It also
// backs the video element as a same-frame poster/fallback layer on
// desktop, so there's nothing to flash to before the video's own poster
// (the video's real first frame, see public/videos/) takes over.
const MOBILE_HERO_PHOTO = "/photos/halladay-plumbing-hero-mobile.webp";
const HERO_VIDEO_POSTER = "/videos/halladay-plumbing-hero-poster.webp";
const HERO_VIDEO_SRC = "/videos/halladay-plumbing-hero.mp4";

export function Hero() {
  // Starts false so server and first client render match (no hydration
  // mismatch) and so the <video> tag never even enters the DOM — and
  // therefore never gets requested — on mobile or for anyone with
  // prefers-reduced-motion set. It only flips true once we've confirmed
  // a tablet/desktop viewport client-side.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setShowVideo(desktopQuery.matches && !motionQuery.matches);
    update();

    desktopQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      desktopQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <>
      {/* --- Mobile/tablet-under-768 hero: image, then copy, then proof, ---
          stacked in that order instead of layered as text-over-photo. The
          desktop hero below is untouched; this block and that one are
          mutually exclusive via `md:hidden` / `hidden md:block`. */}
      <section className="md:hidden">
        <div className="relative h-[35vh] w-full overflow-hidden">
          <Image
            src={MOBILE_HERO_PHOTO}
            alt="Halladay Plumbing technician reviewing an inspection with a homeowner in her kitchen"
            fill
            sizes="100vw"
            className="object-cover object-[50%_30%]"
            priority
          />
          {/* Scaled down (an extra ~5% past the previous pass) so it reads
              as a small trust signal sitting on the photo, not a second
              headline competing with the one below. */}
          <div className="absolute left-5 top-5 origin-top-left scale-[0.855]">
            <VeteranBadge />
          </div>
        </div>

        <div className="bg-surface px-4 py-8">
          {/* Dedicated mobile size rather than the shared `text-hero` clamp
              (desktop keeps that class untouched below) — 38px up to 389px,
              40px 390–399px, 42px from 400px up to the md breakpoint below.
              The extra step at 390px is what keeps "Experts" off a lonely
              third line down at 375px. */}
          <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink [text-wrap:balance] min-[390px]:text-[40px] min-[400px]:text-[42px]">
            {business.tagline}
          </h1>
          <p className="mt-3 text-base text-ink-muted">
            Professional plumbing for homes and businesses across Cedar City and Southern Utah.
          </p>

          {/* Phone CTA intentionally dropped here — the sticky mobile
              action bar already surfaces Call Now, so repeating the phone
              number in the hero just duplicated that action. Schedule
              Service is the only hero-level CTA on mobile now. */}
          <div className="mt-6">
            <CTAButton href="/contact/" size="lg" variant="primary" className="w-full">
              Schedule Service
            </CTAButton>
          </div>
        </div>

        <div className="border-t border-border bg-surface px-4 py-3">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Serving Southern Utah Since {business.foundedYear}
          </p>
        </div>
      </section>

      {/* --- Desktop/tablet (md+) hero: unchanged from the approved video --- */}
      <section className="relative isolate hidden overflow-hidden bg-ink md:block">
        <div className="absolute inset-0">
          <Image
            src={MOBILE_HERO_PHOTO}
            alt="Halladay Plumbing technician reviewing an inspection with a homeowner in her kitchen"
            fill
            sizes="100vw"
            className="object-cover object-[50%_28%]"
            priority
          />

          {showVideo && (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={HERO_VIDEO_POSTER}
              aria-hidden="true"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          )}

          {/* Left-to-right so the copy column is readable while the
              truck/technician footage on the right stays visible. */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
        </div>

        <div className="container-page relative flex min-h-[640px] flex-col justify-center py-14 lg:min-h-[720px] lg:py-20">
          <div className="max-w-xl">
            <VeteranBadge className="mb-4" />
            <h1 className="text-hero font-extrabold text-white">{business.tagline}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/90">
              Professional residential and commercial plumbing throughout Cedar City and Southern
              Utah — from everyday repairs and water heaters to drain cleaning, water softeners,
              and complete plumbing solutions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/contact/" size="lg" variant="primary">
                Schedule Service
              </CTAButton>
              {/* PhoneButton's size="lg" doesn't merge in the variant's own
                  border/text classes (a pre-existing quirk of that shared
                  component, visible on other pages too) — spelling the
                  white outline treatment out here instead of touching the
                  shared component, since that's used elsewhere in contexts
                  this change isn't meant to touch. */}
              <PhoneButton
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              />
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-surface">
          <ul className="container-page flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
            <li className="flex items-center gap-2 text-sm font-medium text-ink">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Serving Southern Utah Since {business.foundedYear}
            </li>
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-ink">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
