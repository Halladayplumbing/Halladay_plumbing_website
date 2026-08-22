import { HardHat } from "lucide-react";
import { business } from "@/data/business";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";

// Deliberately styled differently from other residential CTAs
// section (dark neutral instead of red/blue) to read as a distinct line
// of business — new construction / builder projects — rather than
// another residential service tile.
export function NewConstructionCTA() {
  return (
    <section className="bg-ink py-16 text-white lg:py-20">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-white/70">
            <HardHat className="h-6 w-6 shrink-0" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide">Builders &amp; New Construction</span>
          </div>
          <h2 className="mt-3 text-section-title font-extrabold">Building New? Let&apos;s Talk Plumbing.</h2>
          <p className="mt-4 max-w-xl text-white/80">
            Halladay Plumbing partners with builders, general contractors, and homeowners on new
            construction plumbing throughout Southern Utah — rough-in through finish. New builds
            get their own dedicated line, separate from residential service calls.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PhoneButton
              phone={business.phones.newBuilds}
              size="lg"
              variant="accent"
              label={`Call New Builds: ${business.phones.newBuilds.display}`}
            />
            <CTAButton
              href="/new-construction-plumbing/"
              size="lg"
              variant="outline"
              className="!border-white !text-white hover:!bg-white/10"
            >
              Learn More
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
