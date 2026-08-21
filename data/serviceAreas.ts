// Confirmed service areas only. Do NOT add a city here until Halladay has
// confirmed they actively serve it — this file is the gate that prevents
// thin/unconfirmed local-SEO pages from being generated.

export interface ServiceArea {
  city: string;
  state: string;
  slug: string; // /service-areas/{slug}/
  active: boolean;
  isPrimary?: boolean;
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
    localNotes:
      "Cedar City and the surrounding Southern Utah region are known for hard water, which makes water treatment and softener installation a common request from local homeowners.",
  },
  // Additional Southern Utah cities (Enoch, Parowan, Hurricane, St. George,
  // etc.) can be added here once Halladay confirms they actively service
  // them. Adding an entry with active:true is sufficient to generate a
  // full /service-areas/{slug}/ page from the existing template — no
  // component changes required.
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
