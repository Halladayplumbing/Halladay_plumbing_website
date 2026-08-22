import { Droplets, CheckCircle2 } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { OfferCard } from "@/components/OfferCard";
import { getActiveOfferForService } from "@/data/offers";

const consequences = [
  "Mineral buildup on fixtures and faucets",
  "Scale inside pipes and water heaters",
  "Spots on dishes and glassware",
  "Buildup inside water-using appliances",
  "Reduced soap and detergent effectiveness",
  "Dry-feeling skin and hair after showers",
];

// This is one of the most prominent sections on the homepage, per the
// business priority on growing water softener installs.
export function WaterSoftenerFeature() {
  const offer = getActiveOfferForService("water-softeners");

  return (
    <section className="border-y border-border bg-primary-light py-16 lg:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Droplets className="h-6 w-6" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide">Water Softeners</span>
          </div>
          <h2 className="text-section-title font-extrabold text-ink">
            Protect Your Home From Southern Utah&apos;s Hard Water
          </h2>
          <p className="mt-4 text-ink-muted">
            Hard water is common throughout Southern Utah. Over time, the minerals it carries can
            build up in your home&apos;s plumbing, fixtures, and appliances. A properly sized
            water softener treats water as it enters your home, reducing that buildup at the
            source.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {consequences.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-ink">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/contact/?service=water-softeners" size="lg" variant="primary">
              Get a Water Softener Estimate
            </CTAButton>
            <CTAButton href="/water-softeners/" size="lg" variant="outline" className="!border-primary !text-primary">
              Learn About Water Softeners
            </CTAButton>
          </div>
        </div>

        <div className="space-y-6">
          <PlaceholderImage label="Water softener installation photo" aspect="aspect-[4/3]" />
          {offer && <OfferCard offer={offer} variant="featured" ctaHref="/water-softeners/" />}
        </div>
      </div>
    </section>
  );
}
