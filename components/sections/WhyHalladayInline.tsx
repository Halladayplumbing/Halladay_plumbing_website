import { History, ClipboardList, Wrench, LifeBuoy } from "lucide-react";
import { business } from "@/data/business";

// Authority-based positioning (not a generic "why choose us" grid) —
// used across the general site and the water softener funnel alike.
// Copy sticks to verified facts only: foundedYear and the Diamond Club
// benefits are real, sourced values (see data/business.ts,
// data/servicePlan.ts); nothing here is an invented statistic,
// certification, or guarantee.
const pillars = [
  {
    icon: History,
    title: `Local Experience Since ${business.foundedYear}`,
    body: `Decades of plumbing experience serving Southern Utah homes.`,
  },
  {
    icon: ClipboardList,
    title: "Recommendations Based on Your Home",
    body: "Halladay evaluates the household and existing system before recommending equipment.",
  },
  {
    icon: Wrench,
    title: "Professionally Installed",
    body: "Sizing, supply, installation, and setup are handled professionally.",
  },
  {
    icon: LifeBuoy,
    title: "Support After Installation",
    body: "Halladay remains available for ongoing plumbing, maintenance, and water-treatment needs.",
  },
];

export function WhyHalladayInline() {
  return (
    <section className="bg-surface py-14 lg:py-20">
      <div className="container-page">
        <h2 className="text-section-title font-extrabold text-ink">Why Southern Utah Homeowners Choose Halladay</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-lg border border-border bg-background p-5">
              <p.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold text-ink">{p.title}</p>
              <p className="mt-1.5 text-sm text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
