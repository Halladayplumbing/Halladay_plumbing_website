import { MapPin } from "lucide-react";
import Link from "next/link";
import { getActiveServiceAreas, getServiceAreaHref } from "@/data/serviceAreas";
import { business } from "@/data/business";

// Compact sidebar next to the map — with ~50 confirmed communities, a
// flat list of all of them here would be unreadable. Show the primary
// city plus the towns with the most established presence (dedicated
// page or a footer-highlight hub town), then point to the full
// region-by-region breakdown on /service-areas/.
const MAX_LISTED = 10;

// Live Google Maps embed (no API key required — uses Google's public
// `output=embed` iframe) centered on Halladay's Southern Utah service
// region at a zoom level that keeps every confirmed town in view. This
// is real, current Google Maps data, not a fabricated/illustrative map.
const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Halladay+Plumbing,+Cedar+City,+UT&z=9&output=embed";

export function ServiceAreaMap() {
  const areas = getActiveServiceAreas();
  if (areas.length === 0) return null;

  const highlighted = areas.filter((a) => a.isPrimary || a.hasDedicatedPage || a.footerHighlight);
  const listed = highlighted.length > 0 ? highlighted.slice(0, MAX_LISTED) : areas.slice(0, MAX_LISTED);
  const remaining = areas.length - listed.length;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="overflow-hidden rounded-lg border border-border shadow-sm">
        <div className="aspect-[4/3] w-full sm:aspect-[16/10]">
          <iframe
            src={MAP_EMBED_SRC}
            title={`Halladay Plumbing service area map — ${areas.map((a) => a.city).join(", ")}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Towns We Serve
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-2">
          {listed.map((area) => (
            <li key={area.slug}>
              <Link
                href={getServiceAreaHref(area)}
                className="flex items-center gap-2 text-sm font-medium text-ink hover:text-primary"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {area.city}, {area.state}
              </Link>
            </li>
          ))}
        </ul>

        {remaining > 0 && (
          <Link href="/service-areas/" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            + {remaining} more Southern Utah communities we serve →
          </Link>
        )}

        {business.reviews.googlePlaceUrl && (
          <a
            href={business.reviews.googlePlaceUrl}
            className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Open in Google Maps
          </a>
        )}

        <p className="mt-4 text-xs text-ink-muted">
          Don&apos;t see your town? Call {business.phones.main.display} — we may still be able to
          help.
        </p>
      </div>
    </div>
  );
}
