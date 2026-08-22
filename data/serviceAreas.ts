// Confirmed service areas only. Do NOT add a city here until Halladay has
// confirmed they actively serve it — this file is the gate that prevents
// thin/unconfirmed local-SEO pages from being generated. The nine cities
// below were confirmed directly by the client (Aug 2026).
//
// Only Cedar City currently has enough genuinely unique local content
// (`localNotes`, a dedicated page) to justify its own full page — see
// `hasDedicatedPage`. Every other confirmed area is real and served, but
// intentionally does NOT get an auto-generated "doorway" page that would
// just swap the city name into otherwise-identical copy. Give an area
// `hasDedicatedPage: true` only once it has real localized content to
// put on that page.

export interface ServiceArea {
  city: string;
  state: string;
  slug: string; // /service-areas/{slug}/
  active: boolean;
  isPrimary?: boolean;
  // Alternate names/spellings a visitor might search for (e.g. "Duck
  // Creek" for "Duck Creek Village") — used by the service-area checker.
  aliases?: string[];
  // Set true only when this area has enough unique local content to
  // justify a full standalone page. Gates generateStaticParams on
  // /service-areas/[slug]/ — see that file's `dynamicParams = false`.
  hasDedicatedPage?: boolean;
  // Approximate town coordinates (public geographic data, not business
  // data) — used only to plot pins on the service-area map widget.
  lat: number;
  lng: number;
  // Only render localized content (hard-water notes, neighborhoods, etc.)
  // that has actually been confirmed for this city.
  localNotes?: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    city: "Cedar City",
    state: "UT",
    slug: "cedar-city-ut",
    active: true,
    isPrimary: true,
    hasDedicatedPage: true,
    lat: 37.6775,
    lng: -113.0619,
    localNotes:
      "Cedar City and the surrounding Southern Utah region are known for hard water, which makes water treatment and softener installation a common request from local homeowners.",
  },
  {
    city: "Enoch",
    state: "UT",
    slug: "enoch-ut",
    active: true,
    lat: 37.7728,
    lng: -113.0322,
    localNotes:
      "Enoch shares the same hard-water conditions as neighboring Cedar City, making water softener installation a common request for local homeowners.",
  },
  {
    city: "Parowan",
    state: "UT",
    slug: "parowan-ut",
    active: true,
    lat: 37.8436,
    lng: -112.8258,
    localNotes:
      "Like the rest of Iron County, Parowan homes commonly deal with hard water and can benefit from water treatment and softener installation.",
  },
  {
    city: "Kanarraville",
    state: "UT",
    slug: "kanarraville-ut",
    active: true,
    lat: 37.5372,
    lng: -113.1808,
  },
  {
    city: "New Harmony",
    state: "UT",
    slug: "new-harmony-ut",
    active: true,
    lat: 37.4783,
    lng: -113.3058,
  },
  {
    city: "Hurricane",
    state: "UT",
    slug: "hurricane-ut",
    active: true,
    lat: 37.1753,
    lng: -113.29,
  },
  {
    city: "St. George",
    state: "UT",
    slug: "st-george-ut",
    active: true,
    lat: 37.0965,
    lng: -113.5684,
  },
  {
    city: "Panguitch",
    state: "UT",
    slug: "panguitch-ut",
    active: true,
    lat: 37.8225,
    lng: -112.4355,
  },
  {
    city: "Duck Creek Village",
    state: "UT",
    slug: "duck-creek-ut",
    active: true,
    aliases: ["Duck Creek"],
    lat: 37.5372,
    lng: -112.6866,
  },
  // Additional Southern Utah cities can be added here once Halladay
  // confirms they actively service them. Adding an entry with
  // active:true is sufficient to make it appear on the service-area
  // checker, the hub page, and the map — no component changes required.
  // Only add hasDedicatedPage once real local content exists for it.
];

export function getActiveServiceAreas(): ServiceArea[] {
  return serviceAreas.filter((a) => a.active);
}

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug && a.active);
}

export function getPrimaryServiceArea(): ServiceArea {
  return serviceAreas.find((a) => a.isPrimary && a.active) ?? serviceAreas[0];
}

// Never a dead end: areas with a real dedicated page link there; every
// other confirmed area routes straight into the request-service flow
// with its city pre-filled, rather than 404ing or linking to a thin
// auto-generated page.
export function getServiceAreaHref(area: ServiceArea): string {
  if (area.hasDedicatedPage) return `/service-areas/${area.slug}/`;
  return `/contact/?city=${encodeURIComponent(area.city)}`;
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

// Used by the Service Area Checker. Matches on city name or any alias,
// normalizing case/punctuation/whitespace (e.g. "duck creek", "Duck
// Creek Village", "ST GEORGE" all resolve correctly). Does not match on
// ZIP code — no ZIP-to-city mapping has been verified with Halladay yet,
// so the checker only supports city-name lookup until one is supplied.
export function findServiceAreaByQuery(query: string): ServiceArea | undefined {
  const q = normalize(query);
  if (!q) return undefined;
  return serviceAreas.find((a) => {
    if (!a.active) return false;
    const names = [a.city, `${a.city} ${a.state}`, ...(a.aliases ?? [])];
    return names.some((n) => normalize(n) === q);
  });
}
