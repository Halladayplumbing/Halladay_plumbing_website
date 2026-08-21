import { MapPin } from "lucide-react";
import Link from "next/link";
import { getActiveServiceAreas } from "@/data/serviceAreas";
import { business } from "@/data/business";

// Live Google Maps embed (no API key required — uses Google's public
// `output=embed` iframe) centered on Halladay's Southern Utah service
// region at a zoom level that keeps every confirmed town in view. This
// is real, current Google Maps data, not a fabricated/illustrative map.
const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Halladay+Plumbing,+Cedar+City,+UT&z=9&output=embed";

export function ServiceAreaMap() {
  const areas = getActiveServiceAreas();
  if (areas.length === 0) return null;

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
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/service-areas/${area.slug}/`}
                className="flex items-center gap-2 text-sm font-medium text-ink hover:text-primary"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {area.city}, {area.state}
              </Link>
            </li>
          ))}
        </ul>

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
