import { MessageSquare, MapPin, ClipboardList, CalendarClock } from "lucide-react";
import { business } from "@/data/business";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const pillars = [
  {
    icon: MessageSquare,
    title: "Clear Communication",
    body: "You'll know what's wrong, what it takes to fix it, and what to expect before work begins.",
  },
  {
    icon: ClipboardList,
    title: "Straightforward Recommendations",
    body: "Recommendations are based on what your home actually needs.",
  },
  {
    icon: MapPin,
    title: "Local Accountability",
    body: "Halladay Plumbing is based in Cedar City and works throughout Southern Utah.",
  },
  {
    icon: CalendarClock,
    title: "Reliable Scheduling",
    body: "We respect your time and your property throughout the job.",
  },
];

export function LocalTrustSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-title font-extrabold text-ink">Plumbing Done Right From the Start</h2>
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

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <PlaceholderImage label="Halladay Plumbing team or founder photo" aspect="aspect-[4/3]" />
          <div>
            <h2 className="text-section-title font-extrabold text-ink">
              A Local Plumbing Company Serving Southern Utah
            </h2>
            <p className="mt-4 text-ink-muted">
              Halladay Plumbing is a local team working throughout {business.primaryCity} and the
              surrounding {business.serviceRegion} area. Being local means understanding the water
              conditions, homes, and businesses here — and being accountable to the community we
              work in.
            </p>
            <p className="mt-4 text-ink-muted">
              We&apos;d rather explain the plumbing problem in plain language and recommend the
              right fix than push something your home doesn&apos;t need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
