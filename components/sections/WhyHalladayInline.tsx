import { MessageSquare, MapPin, ClipboardList, CalendarClock } from "lucide-react";

const pillars = [
  { icon: MessageSquare, title: "Clear Communication" },
  { icon: ClipboardList, title: "Straightforward Recommendations" },
  { icon: MapPin, title: "Local Accountability" },
  { icon: CalendarClock, title: "Reliable Scheduling" },
];

export function WhyHalladayInline() {
  return (
    <section className="bg-surface py-14 lg:py-20">
      <div className="container-page">
        <h2 className="text-section-title font-extrabold text-ink">Plumbing Done Right From the Start</h2>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-lg border border-border bg-background p-5">
              <p.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold text-ink">{p.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
