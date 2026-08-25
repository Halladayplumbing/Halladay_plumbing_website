import Link from "next/link";
import { MapPin } from "lucide-react";
import { getActiveServiceAreas, getServiceAreaHref } from "@/data/serviceAreas";

// Highlighted hub towns only — with ~50 confirmed communities, a flat
// grid of all of them is unreadable here; the full region-by-region
// breakdown lives on /service-areas/.
const MAX_LISTED = 9;

export function ServiceAreaGrid() {
  const areas = getActiveServiceAreas();
  if (areas.length === 0) return null;

  const highlighted = areas.filter((a) => a.isPrimary || a.hasDedicatedPage || a.footerHighlight);
  const listed = highlighted.length > 0 ? highlighted.slice(0, MAX_LISTED) : areas.slice(0, MAX_LISTED);
  const remaining = areas.length - listed.length;

  return (
    <section className="py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-title font-extrabold text-ink">Where We Work</h2>
          <p className="mt-4 text-lg text-ink-muted">
            Halladay Plumbing is based in Cedar City and serves the surrounding Southern Utah
            area.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listed.map((area) => (
            <Link
              key={area.slug}
              href={getServiceAreaHref(area)}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="font-semibold text-ink">
                {area.city}, {area.state}
              </span>
            </Link>
          ))}
        </div>

        {remaining > 0 && (
          <p className="mt-6 text-center">
            <Link href="/service-areas/" className="text-sm font-semibold text-primary hover:underline">
              + {remaining} more Southern Utah communities we serve →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
