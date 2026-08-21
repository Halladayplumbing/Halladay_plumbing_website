import { ShieldCheck } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

// Plan inclusions/pricing are NOT confirmed. This section renders the
// general concept and links to Contact rather than inventing coverage
// details, pricing, or benefit lists. Replace `planConfirmed` and the
// `inclusions` array once Halladay supplies real service plan details.
const planConfirmed = false;
const inclusions: string[] = [
  // e.g. "Annual plumbing maintenance visit"
  // e.g. "Water heater flushing"
  // e.g. "Water softener maintenance"
  // e.g. "Priority scheduling"
];

export function ServicePlanSection() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="mb-3 flex items-center gap-2 text-primary">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide">Service Plan</span>
          </div>
          <h2 className="text-section-title font-extrabold text-ink">Stay Ahead of Plumbing Problems</h2>
          <p className="mt-4 text-ink-muted">
            Halladay Plumbing offers a maintenance plan option for homeowners who want to catch
            plumbing issues early. Contact us for current plan details and pricing.
          </p>

          {planConfirmed && inclusions.length > 0 && (
            <ul className="mt-6 space-y-2 text-sm text-ink">
              {inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <CTAButton href="/contact/?interest=service-plan" size="lg">
              View Service Plan
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
