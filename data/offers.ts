// Interchangeable offer engine.
//
// Offers are never hardcoded into page JSX. A page/section requests an
// offer by id (or by service, via getActiveOfferForService) and renders
// whatever is returned. Marketing can add, retire, or swap the active
// offer for a service by editing this file only.
//
// IMPORTANT: No offer below represents a real, currently-running Halladay
// promotion. `active: false` on every seed offer until Lusso Media /
// Halladay supplies real, approved offer copy and terms. This file exists
// so the engine and UI are fully wired and ready to flip on.

export interface OfferScarcity {
  type: "quantity" | "date" | "none";
  amount?: number;
  label: string;
}

export interface Offer {
  id: string;
  name: string; // internal name
  services: string[]; // service ids this offer applies to
  campaigns?: string[]; // funnel slugs this offer applies to

  eyebrow?: string;
  headline: string;
  perceivedValue?: string;
  offerValue?: string;

  description?: string;
  benefits?: string[];

  ctaText: string;
  ctaUrl?: string;

  terms?: string;
  expirationDate?: string; // ISO date; offer auto-hides after this date

  scarcity?: OfferScarcity;

  active: boolean;
  featured?: boolean;

  trackingId?: string;
}

export const offers: Offer[] = [
  {
    id: "water-softener-estimate",
    name: "Water Softener Assessment",
    services: ["water-softeners"],
    campaigns: ["water-softener-installation"],
    eyebrow: "Water Softeners",
    headline: "Request a Water Softener Assessment",
    description:
      "Placeholder offer — replace with an approved promotion (installation credit, dollar amount off, bundled service, etc.) before launch.",
    ctaText: "Request My Hard Water Assessment",
    terms: "PLACEHOLDER — replace with approved terms before activating.",
    active: false,
    trackingId: "offer_water_softener_estimate",
  },
  {
    id: "water-heater-diagnostic",
    name: "Water Heater Diagnostic",
    services: ["water-heaters", "tankless-water-heaters"],
    campaigns: ["water-heater-service", "tankless-water-heater"],
    eyebrow: "Water Heaters",
    headline: "Schedule a Water Heater Diagnostic",
    description: "Placeholder offer — replace with an approved promotion before launch.",
    ctaText: "Get My Water Heater Fixed",
    terms: "PLACEHOLDER — replace with approved terms before activating.",
    active: false,
    trackingId: "offer_water_heater_diagnostic",
  },
  {
    id: "drain-cleaning-special",
    name: "Drain Cleaning Special",
    services: ["drain-cleaning"],
    campaigns: ["drain-cleaning"],
    eyebrow: "Drain Cleaning",
    headline: "Ask About Our Current Drain Cleaning Special",
    description: "Placeholder offer — replace with an approved promotion before launch.",
    ctaText: "Clear My Drain",
    terms: "PLACEHOLDER — replace with approved terms before activating.",
    active: false,
    trackingId: "offer_drain_cleaning_special",
  },
];

export function getOfferById(id?: string): Offer | undefined {
  if (!id) return undefined;
  const offer = offers.find((o) => o.id === id);
  if (!offer || !offer.active) return undefined;
  if (offer.expirationDate && new Date(offer.expirationDate) < new Date()) return undefined;
  return offer;
}

export function getActiveOfferForService(serviceId: string): Offer | undefined {
  const offer = offers.find((o) => o.services.includes(serviceId) && o.active);
  if (!offer) return undefined;
  if (offer.expirationDate && new Date(offer.expirationDate) < new Date()) return undefined;
  return offer;
}

export function getActiveOffers(): Offer[] {
  return offers.filter((o) => {
    if (!o.active) return false;
    if (o.expirationDate && new Date(o.expirationDate) < new Date()) return false;
    return true;
  });
}

// Allow-list used by the /specials page and any ?offer= query param.
// Never render arbitrary query-string text directly — always resolve
// through this function.
export function resolveOfferFromQueryParam(value: string | null | undefined): Offer | undefined {
  if (!value) return undefined;
  const allowed = offers.map((o) => o.id);
  if (!allowed.includes(value)) return undefined;
  return getOfferById(value);
}
