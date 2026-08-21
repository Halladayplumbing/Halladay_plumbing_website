// Confirmed service areas only. Do NOT add a city here until Halladay has
// confirmed they actively serve it — this file is the gate that prevents
// thin/unconfirmed local-SEO pages from being generated. The eight cities
// below were confirmed directly by the client (Aug 2026).

export interface ServiceArea {
  city: string;
  state: string;
  slug: string; // /service-areas/{slug}/
  active: boolean;
  isPrimary?: boolean;
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
    lng: -113.2900,
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
  // Additional Southern Utah cities can be added here once Halladay
  // confirms they actively service them. Adding an entry with
  // active:true is sufficient to generate a full /service-areas/{slug}/
  // page and a pin on the service-area map — no component changes
  // required.
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
