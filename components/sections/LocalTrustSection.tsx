import { History, ClipboardList, Wrench, LifeBuoy } from "lucide-react";
import { business } from "@/data/business";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const pillars = [
  {
    icon: History,
    title: `Local Experience Since ${business.foundedYear}`,
    body: "Decades of plumbing experience serving Southern Utah homes.",
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

export function LocalTrustSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-title font-extrabold text-ink">Why Southern Utah Homeowners Choose Halladay</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <p.icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-base font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:gap-14">
          {/* No real team/founder photo supplied yet. Hidden rather than
              removed — restore the lg:grid-cols-2 layout above and this
              placeholder once photography is available. */}
          <div className="hidden" aria-hidden="true">
            <PlaceholderImage label="Halladay Plumbing team or founder photo" aspect="aspect-[4/3]" />
          </div>
          <div className="mx-auto max-w-2xl text-center lg:text-left">
            <h2 className="text-section-title font-extrabold text-ink">
              A Local Plumbing Company Serving Southern Utah
            </h2>
            <p className="mt-4 text-ink-muted">
              Halladay Plumbing has served {business.primaryCity} and the surrounding{" "}
              {business.serviceRegion} area since {business.foundedYear}. Being local means
              understanding the water conditions, homes, and businesses here — and being
              accountable to the community we work in.
            </p>
            <p className="mt-4 text-ink-muted">
              Halladay diagnoses first, recommends the appropriate solution for the individual
              home, and stays available after the work is done — rather than pushing something
              your home doesn&apos;t need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
