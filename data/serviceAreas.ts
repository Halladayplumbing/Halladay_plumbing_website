// Confirmed service areas only. Do NOT add a city here until Halladay has
// confirmed they actively serve it — this file is the gate that prevents
// thin/unconfirmed local-SEO pages from being generated. The original nine
// cities were confirmed directly by the client (Aug 2026); the full
// regional list below (~50 communities across Iron, Beaver, Washington,
// and Garfield counties) was supplied directly by the client as their
// real service radius (Aug 2026).
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
  // Groups this area for display on the service-areas hub page and the
  // map widget — matches the regional breakdown Halladay uses internally
  // (county-based, roughly ordered by distance from Cedar City). See
  // REGION_ORDER below for display order.
  region: string;
  // Alternate names/spellings a visitor might search for (e.g. "Duck
  // Creek" for "Duck Creek Village") — used by the service-area checker.
  aliases?: string[];
  // Set true only when this area has enough unique local content to
  // justify a full standalone page. Gates generateStaticParams on
  // /service-areas/[slug]/ — see that file's `dynamicParams = false`.
  hasDedicatedPage?: boolean;
  // Shown in the footer's curated shortlist (the original nine confirmed
  // hub towns) instead of every one of the ~50 communities below — the
  // full list lives on /service-areas/, grouped by region.
  footerHighlight?: boolean;
  // Approximate town coordinates (public geographic data, not business
  // data) — used only to plot pins on the service-area map widget.
  lat: number;
  lng: number;
  // Only render localized content (hard-water notes, neighborhoods, etc.)
  // that has actually been confirmed for this city.
  localNotes?: string;
}

// Display order for the grouped service-areas hub page and map widget —
// roughly nearest-to-farthest from Cedar City, matching how Halladay
// described their own coverage.
export const REGION_ORDER = [
  "Cedar City / Central Iron County",
  "North Iron County",
  "West Iron County",
  "South Iron County",
  "Beaver County",
  "Northern Washington County / I-15",
  "Hurricane Valley",
  "St. George Metro",
  "Northwestern Washington County",
  "Zion Corridor",
  "Eastern Washington County",
  "SR-14 / US-89 Corridor",
  "Garfield County",
  "Outer Garfield County",
] as const;

// Optional caveat shown under a region's heading — used only for the
// outer edge of the service radius, per the client's own note that
// Tropic/Bryce Canyon City sit at roughly the 90-minute boundary.
export const REGION_NOTES: Record<string, string> = {
  "Outer Garfield County": "Near the edge of our service radius (about 90 minutes from Cedar City) — call to confirm.",
};

export const serviceAreas: ServiceArea[] = [
  // --- Cedar City / Central Iron County ---
  {
    city: "Cedar City",
    state: "UT",
    slug: "cedar-city-ut",
    active: true,
    isPrimary: true,
    hasDedicatedPage: true,
    footerHighlight: true,
    region: "Cedar City / Central Iron County",
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
    footerHighlight: true,
    region: "Cedar City / Central Iron County",
    lat: 37.7728,
    lng: -113.0322,
    localNotes:
      "Enoch shares the same hard-water conditions as neighboring Cedar City, making water softener installation a common request for local homeowners.",
  },
  {
    city: "Hamilton Fort",
    state: "UT",
    slug: "hamilton-fort-ut",
    active: true,
    region: "Cedar City / Central Iron County",
    lat: 37.6499,
    lng: -113.1258,
  },
  {
    city: "Iron Springs",
    state: "UT",
    slug: "iron-springs-ut",
    active: true,
    region: "Cedar City / Central Iron County",
    lat: 37.7726,
    lng: -113.3312,
  },
  {
    city: "Summit",
    state: "UT",
    slug: "summit-ut",
    active: true,
    region: "Cedar City / Central Iron County",
    lat: 37.5975,
    lng: -113.0032,
  },

  // --- North Iron County ---
  {
    city: "Parowan",
    state: "UT",
    slug: "parowan-ut",
    active: true,
    footerHighlight: true,
    region: "North Iron County",
    lat: 37.8436,
    lng: -112.8258,
    localNotes:
      "Like the rest of Iron County, Parowan homes commonly deal with hard water and can benefit from water treatment and softener installation.",
  },
  {
    city: "Paragonah",
    state: "UT",
    slug: "paragonah-ut",
    active: true,
    region: "North Iron County",
    lat: 37.8848,
    lng: -112.7869,
  },
  {
    city: "Brian Head",
    state: "UT",
    slug: "brian-head-ut",
    active: true,
    region: "North Iron County",
    lat: 37.6975,
    lng: -112.8455,
  },

  // --- West Iron County ---
  {
    city: "Newcastle",
    state: "UT",
    slug: "newcastle-ut",
    active: true,
    region: "West Iron County",
    lat: 37.6763,
    lng: -113.5866,
  },
  {
    city: "Enterprise",
    state: "UT",
    slug: "enterprise-ut",
    active: true,
    region: "West Iron County",
    lat: 37.573,
    lng: -113.7191,
  },
  {
    city: "Beryl Junction",
    state: "UT",
    slug: "beryl-junction-ut",
    active: true,
    region: "West Iron County",
    lat: 37.7595,
    lng: -113.6866,
  },
  {
    city: "Beryl",
    state: "UT",
    slug: "beryl-ut",
    active: true,
    region: "West Iron County",
    lat: 37.9502,
    lng: -113.6866,
  },
  {
    city: "Modena",
    state: "UT",
    slug: "modena-ut",
    active: true,
    region: "West Iron County",
    lat: 37.8138,
    lng: -113.9166,
  },
  {
    city: "Lund",
    state: "UT",
    slug: "lund-ut",
    active: true,
    region: "West Iron County",
    lat: 38.0983,
    lng: -113.1633,
  },

  // --- South Iron County ---
  {
    city: "Kanarraville",
    state: "UT",
    slug: "kanarraville-ut",
    active: true,
    footerHighlight: true,
    region: "South Iron County",
    lat: 37.5372,
    lng: -113.1808,
  },
  {
    city: "New Harmony",
    state: "UT",
    slug: "new-harmony-ut",
    active: true,
    footerHighlight: true,
    region: "South Iron County",
    lat: 37.4783,
    lng: -113.3058,
  },

  // --- Beaver County ---
  {
    city: "Beaver",
    state: "UT",
    slug: "beaver-ut",
    active: true,
    region: "Beaver County",
    lat: 38.2775,
    lng: -112.6412,
  },
  {
    city: "Minersville",
    state: "UT",
    slug: "minersville-ut",
    active: true,
    region: "Beaver County",
    lat: 38.2097,
    lng: -112.9327,
  },
  {
    city: "Milford",
    state: "UT",
    slug: "milford-ut",
    active: true,
    region: "Beaver County",
    lat: 38.3927,
    lng: -113.0107,
  },
  {
    city: "Greenville",
    state: "UT",
    slug: "greenville-ut",
    active: true,
    region: "Beaver County",
    lat: 38.2661,
    lng: -112.6924,
  },
  {
    city: "Adamsville",
    state: "UT",
    slug: "adamsville-ut",
    active: true,
    region: "Beaver County",
    lat: 38.3616,
    lng: -112.8535,
  },

  // --- Northern Washington County / I-15 ---
  {
    city: "Pintura",
    state: "UT",
    slug: "pintura-ut",
    active: true,
    region: "Northern Washington County / I-15",
    lat: 37.312,
    lng: -113.5023,
  },
  {
    city: "Toquerville",
    state: "UT",
    slug: "toquerville-ut",
    active: true,
    region: "Northern Washington County / I-15",
    lat: 37.253,
    lng: -113.2874,
  },
  {
    city: "Leeds",
    state: "UT",
    slug: "leeds-ut",
    active: true,
    region: "Northern Washington County / I-15",
    lat: 37.2394,
    lng: -113.3629,
  },
  {
    city: "Harrisburg",
    state: "UT",
    slug: "harrisburg-ut",
    active: true,
    region: "Northern Washington County / I-15",
    lat: 37.1892,
    lng: -113.3305,
  },

  // --- Hurricane Valley ---
  {
    city: "Hurricane",
    state: "UT",
    slug: "hurricane-ut",
    active: true,
    footerHighlight: true,
    region: "Hurricane Valley",
    lat: 37.1753,
    lng: -113.29,
  },
  {
    city: "La Verkin",
    state: "UT",
    slug: "la-verkin-ut",
    active: true,
    region: "Hurricane Valley",
    lat: 37.2058,
    lng: -113.2696,
  },
  {
    city: "Virgin",
    state: "UT",
    slug: "virgin-ut",
    active: true,
    region: "Hurricane Valley",
    lat: 37.1975,
    lng: -113.1927,
  },

  // --- St. George Metro ---
  {
    city: "St. George",
    state: "UT",
    slug: "st-george-ut",
    active: true,
    footerHighlight: true,
    region: "St. George Metro",
    lat: 37.0965,
    lng: -113.5684,
  },
  {
    city: "Washington",
    state: "UT",
    slug: "washington-ut",
    active: true,
    region: "St. George Metro",
    lat: 37.13,
    lng: -113.5108,
  },
  {
    city: "Santa Clara",
    state: "UT",
    slug: "santa-clara-ut",
    active: true,
    region: "St. George Metro",
    lat: 37.1339,
    lng: -113.6494,
  },
  {
    city: "Ivins",
    state: "UT",
    slug: "ivins-ut",
    active: true,
    region: "St. George Metro",
    lat: 37.1661,
    lng: -113.6811,
  },

  // --- Northwestern Washington County ---
  {
    city: "Diamond Valley",
    state: "UT",
    slug: "diamond-valley-ut",
    active: true,
    region: "Northwestern Washington County",
    lat: 37.2469,
    lng: -113.6997,
  },
  {
    city: "Dammeron Valley",
    state: "UT",
    slug: "dammeron-valley-ut",
    active: true,
    region: "Northwestern Washington County",
    lat: 37.3186,
    lng: -113.6841,
  },
  {
    city: "Veyo",
    state: "UT",
    slug: "veyo-ut",
    active: true,
    region: "Northwestern Washington County",
    lat: 37.3452,
    lng: -113.6394,
  },
  {
    city: "Central",
    state: "UT",
    slug: "central-ut",
    active: true,
    region: "Northwestern Washington County",
    lat: 37.4436,
    lng: -113.6435,
  },
  {
    city: "Pine Valley",
    state: "UT",
    slug: "pine-valley-ut",
    active: true,
    region: "Northwestern Washington County",
    lat: 37.3866,
    lng: -113.5119,
  },

  // --- Zion Corridor ---
  {
    city: "Rockville",
    state: "UT",
    slug: "rockville-ut",
    active: true,
    region: "Zion Corridor",
    lat: 37.1642,
    lng: -113.0446,
  },
  {
    city: "Springdale",
    state: "UT",
    slug: "springdale-ut",
    active: true,
    region: "Zion Corridor",
    lat: 37.1889,
    lng: -112.9986,
  },

  // --- Eastern Washington County ---
  {
    city: "Apple Valley",
    state: "UT",
    slug: "apple-valley-ut",
    active: true,
    region: "Eastern Washington County",
    lat: 37.1041,
    lng: -112.9457,
  },
  {
    city: "Hildale",
    state: "UT",
    slug: "hildale-ut",
    active: true,
    region: "Eastern Washington County",
    lat: 37.0068,
    lng: -112.9613,
  },

  // --- SR-14 / US-89 Corridor ---
  {
    city: "Duck Creek Village",
    state: "UT",
    slug: "duck-creek-ut",
    active: true,
    footerHighlight: true,
    region: "SR-14 / US-89 Corridor",
    aliases: ["Duck Creek"],
    lat: 37.5372,
    lng: -112.6866,
  },
  {
    city: "Long Valley Junction",
    state: "UT",
    slug: "long-valley-junction-ut",
    active: true,
    region: "SR-14 / US-89 Corridor",
    lat: 37.4988,
    lng: -112.7994,
  },
  {
    city: "Alton",
    state: "UT",
    slug: "alton-ut",
    active: true,
    region: "SR-14 / US-89 Corridor",
    lat: 37.4297,
    lng: -112.4699,
  },
  {
    city: "Glendale",
    state: "UT",
    slug: "glendale-ut",
    active: true,
    region: "SR-14 / US-89 Corridor",
    lat: 37.3266,
    lng: -112.6021,
  },
  {
    city: "Orderville",
    state: "UT",
    slug: "orderville-ut",
    active: true,
    region: "SR-14 / US-89 Corridor",
    lat: 37.2775,
    lng: -112.6321,
  },
  {
    city: "Mount Carmel Junction",
    state: "UT",
    slug: "mount-carmel-junction-ut",
    active: true,
    region: "SR-14 / US-89 Corridor",
    aliases: ["Mt. Carmel", "Mt. Carmel Junction", "Mount Carmel"],
    lat: 37.2216,
    lng: -112.6866,
  },

  // --- Garfield County ---
  {
    city: "Hatch",
    state: "UT",
    slug: "hatch-ut",
    active: true,
    region: "Garfield County",
    lat: 37.6558,
    lng: -112.4327,
  },
  {
    city: "Panguitch",
    state: "UT",
    slug: "panguitch-ut",
    active: true,
    footerHighlight: true,
    region: "Garfield County",
    lat: 37.8225,
    lng: -112.4355,
  },

  // --- Outer Garfield County (~90-minute boundary — call to confirm) ---
  {
    city: "Tropic",
    state: "UT",
    slug: "tropic-ut",
    active: true,
    region: "Outer Garfield County",
    lat: 37.628,
    lng: -112.0827,
  },
  {
    city: "Bryce Canyon City",
    state: "UT",
    slug: "bryce-canyon-city-ut",
    active: true,
    region: "Outer Garfield County",
    lat: 37.6486,
    lng: -112.1666,
  },
];

export function getActiveServiceAreas(): ServiceArea[] {
  return serviceAreas.filter((a) => a.active);
}

export interface ServiceAreaRegion {
  name: string;
  note?: string;
  areas: ServiceArea[];
}

// Groups active areas for the service-areas hub page and the map
// widget, in REGION_ORDER — a flat ~50-item list isn't scannable, but a
// county-by-county breakdown (matching how Halladay described their own
// coverage) is.
export function getActiveServiceAreasByRegion(): ServiceAreaRegion[] {
  const active = getActiveServiceAreas();
  return REGION_ORDER.map((name) => ({
    name,
    note: REGION_NOTES[name],
    areas: active.filter((a) => a.region === name),
  })).filter((r) => r.areas.length > 0);
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
