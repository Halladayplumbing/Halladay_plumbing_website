import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";

interface FinalCTAProps {
  headline?: string;
  body?: string;
}

export function FinalCTA({
  headline = "Need a Plumber in Cedar City?",
  body = "Whether you're dealing with a leak, water heater, clogged drain, hard water, or another plumbing problem, Halladay Plumbing can help.",
}: FinalCTAProps) {
  return (
    <section className="bg-primary-dark py-16 text-center text-white lg:py-20">
      <div className="container-page mx-auto max-w-2xl">
        <h2 className="text-section-title font-extrabold">{headline}</h2>
        <p className="mt-4 text-white/90">{body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CTAButton href="/contact/" size="lg" variant="accent">
            Schedule Service
          </CTAButton>
          <PhoneButton size="lg" variant="outline" />
        </div>
      </div>
    </section>
  );
}
