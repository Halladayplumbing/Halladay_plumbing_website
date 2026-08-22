import { CheckCircle2 } from "lucide-react";
import { business } from "@/data/business";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const trustPoints = ["Residential & Commercial", "New Construction Available"];

export function Hero() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[55%_45%] lg:gap-12 lg:py-16">
        <div>
          <h1 className="text-hero font-extrabold text-ink">{business.tagline}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink-muted">
            Professional residential and commercial plumbing throughout Cedar City and Southern
            Utah — from everyday repairs and water heaters to drain cleaning, water softeners, and
            complete plumbing solutions.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/contact/" size="lg" variant="primary">
              Schedule Service
            </CTAButton>
            <PhoneButton size="lg" variant="outline" className="!border-primary !text-primary" />
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
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

        <PlaceholderImage
          label="Halladay technician, truck, or jobsite photo"
          aspect="aspect-[4/3] lg:aspect-square"
        />
      </div>
    </section>
  );
}
