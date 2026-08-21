// Service catalog. Drives navigation, homepage service grid, service pages,
// and internal linking. Add a new service here — nav/menus/related-links
// pick it up automatically.

export interface ServiceLink {
  slug: string;
  name: string;
}

export interface Service {
  id: string;
  slug: string; // used as /{slug}/
  name: string;
  navLabel?: string;
  category: "plumbing" | "drain-sewer" | "water-systems" | "commercial" | "emergency" | "new-construction";
  shortDescription: string; // used in cards
  outcomeStatement: string; // 1-liner, outcome-driven
  icon: string; // lucide-react icon name
  featured?: boolean; // show prominently on homepage grid
  priority?: number; // homepage grid ordering, lower = earlier
  offerId?: string; // data/offers.ts id
  funnelSlug?: string; // data/funnels.ts slug (paid landing page)
  // data/forms.ts id override — only needed when this service should
  // reuse a closely related qualification form instead of one matching
  // its own id (e.g. tankless water heaters reusing "water-heater").
  formId?: string;
  // app/thank-you/[service]/ slug to redirect to after this service's
  // form is submitted. Falls back to the generic /thank-you/ if unset.
  thankYouSlug?: string;
  relatedServices: string[]; // service ids
  heroImageAlt: string;
}

export const services: Service[] = [
  {
    id: "water-softeners",
    slug: "water-softeners",
    name: "Water Softener Installation",
    navLabel: "Water Softeners",
    category: "water-systems",
    shortDescription:
      "Protect your home's plumbing, fixtures, and appliances from Southern Utah's hard water.",
    outcomeStatement: "Protect your home's plumbing and appliances from hard-water buildup.",
    icon: "Droplets",
    featured: true,
    priority: 1,
    offerId: "water-softener-estimate",
    funnelSlug: "water-softener-installation",
    thankYouSlug: "water-softener",
    relatedServices: ["water-heaters", "service-areas-cedar-city"],
    heroImageAlt: "Whole-house water softener system installed in a Cedar City home",
  },
  {
    id: "water-heaters",
    slug: "water-heaters",
    name: "Water Heater Repair & Installation",
    navLabel: "Water Heaters",
    category: "water-systems",
    shortDescription: "Restore reliable hot water with repair, replacement, or new installation.",
    outcomeStatement: "Restore reliable hot water.",
    icon: "Flame",
    featured: true,
    priority: 2,
    offerId: "water-heater-diagnostic",
    funnelSlug: "water-heater-service",
    thankYouSlug: "water-heater",
    relatedServices: ["tankless-water-heaters", "plumbing-maintenance"],
    heroImageAlt: "Water heater installation in a residential mechanical room",
  },
  {
    id: "tankless-water-heaters",
    slug: "tankless-water-heaters",
    name: "Tankless Water Heaters",
    navLabel: "Tankless Water Heaters",
    category: "water-systems",
    shortDescription: "Get continuous hot water and reclaim the space a tank tank takes up.",
    outcomeStatement: "Upgrade to on-demand hot water.",
    icon: "Zap",
    priority: 6,
    offerId: "water-heater-diagnostic",
    funnelSlug: "tankless-water-heater",
    formId: "water-heater",
    thankYouSlug: "water-heater",
    relatedServices: ["water-heaters", "water-softeners"],
    heroImageAlt: "Tankless water heater mounted on an interior wall",
  },
  {
    id: "drain-cleaning",
    slug: "drain-cleaning",
    name: "Drain Cleaning",
    navLabel: "Drain Cleaning",
    category: "drain-sewer",
    shortDescription: "Clear stubborn clogs and get your plumbing flowing properly again.",
    outcomeStatement: "Clear the clog and get your drains moving again.",
    icon: "Wrench",
    featured: true,
    priority: 3,
    offerId: "drain-cleaning-special",
    funnelSlug: "drain-cleaning",
    thankYouSlug: "drain-cleaning",
    relatedServices: ["emergency-plumbing", "leak-repair"],
    heroImageAlt: "Plumber running a drain cleaning line into a residential drain",
  },
  {
    id: "plumbing-repair",
    slug: "plumbing-repair",
    name: "Plumbing Repair",
    navLabel: "Plumbing Repair",
    category: "plumbing",
    shortDescription: "General plumbing repairs for fixtures, pipes, and everyday problems.",
    outcomeStatement: "Get the problem diagnosed and fixed right.",
    icon: "Hammer",
    featured: true,
    priority: 4,
    funnelSlug: "plumbing-repair",
    thankYouSlug: "plumbing-repair",
    relatedServices: ["leak-repair", "plumbing-maintenance"],
    heroImageAlt: "Plumber repairing a fixture under a bathroom sink",
  },
  {
    id: "leak-repair",
    slug: "leak-repair",
    name: "Leak Repair",
    navLabel: "Leak Repair",
    category: "plumbing",
    shortDescription: "Get an active leak found and fixed before it causes more damage.",
    outcomeStatement: "Get the leak fixed before it causes more damage.",
    icon: "Droplet",
    featured: true,
    priority: 5,
    funnelSlug: "leak-repair",
    thankYouSlug: "leak-repair",
    relatedServices: ["emergency-plumbing", "plumbing-repair"],
    heroImageAlt: "Plumber inspecting a pipe leak under a kitchen sink",
  },
  {
    id: "emergency-plumbing",
    slug: "emergency-plumber-cedar-city-ut",
    name: "Emergency Plumbing",
    navLabel: "Emergency Plumbing",
    category: "emergency",
    shortDescription: "Urgent help for burst pipes, active leaks, and sewer backups.",
    outcomeStatement: "Get urgent help before a small problem becomes a big one.",
    icon: "AlertTriangle",
    featured: true,
    priority: 7,
    funnelSlug: "emergency-plumber",
    thankYouSlug: "emergency",
    relatedServices: ["drain-cleaning", "leak-repair"],
    heroImageAlt: "Plumber responding to an urgent residential plumbing call",
  },
  {
    id: "commercial-plumbing",
    slug: "commercial-plumbing",
    name: "Commercial Plumbing",
    navLabel: "Commercial Plumbing",
    category: "commercial",
    shortDescription: "Repairs, maintenance, and installations for Southern Utah businesses.",
    outcomeStatement: "Keep your business running with plumbing that works.",
    icon: "Building2",
    featured: true,
    priority: 8,
    funnelSlug: "commercial-plumbing",
    thankYouSlug: "commercial",
    relatedServices: ["plumbing-maintenance", "drain-cleaning"],
    heroImageAlt: "Commercial plumbing work in a Southern Utah business",
  },
  {
    id: "plumbing-maintenance",
    slug: "plumbing-maintenance",
    name: "Plumbing Maintenance",
    navLabel: "Plumbing Maintenance",
    category: "plumbing",
    shortDescription: "Stay ahead of plumbing problems with routine maintenance.",
    outcomeStatement: "Catch small problems before they become expensive ones.",
    icon: "ShieldCheck",
    formId: "plumbing-repair",
    thankYouSlug: "plumbing-repair",
    relatedServices: ["water-heaters", "water-softeners"],
    heroImageAlt: "Plumber performing routine maintenance on home plumbing",
  },
  {
    id: "water-treatment",
    slug: "water-treatment",
    name: "Water Treatment",
    navLabel: "Water Treatment",
    category: "water-systems",
    shortDescription: "Improve water quality throughout your home.",
    outcomeStatement: "Improve the water quality throughout your home.",
    icon: "Filter",
    formId: "water-softener",
    thankYouSlug: "water-softener",
    relatedServices: ["water-softeners"],
    heroImageAlt: "Water treatment system installed in a home mechanical room",
  },
  {
    id: "new-construction",
    slug: "new-construction-plumbing",
    name: "New Construction Plumbing",
    navLabel: "New Construction",
    category: "new-construction",
    shortDescription:
      "Rough-in and finish plumbing for new homes and buildings, working directly with builders and homeowners.",
    outcomeStatement: "Get plumbing done right from the ground up.",
    icon: "HardHat",
    funnelSlug: "new-construction",
    thankYouSlug: "new-construction",
    relatedServices: ["commercial-plumbing", "water-softeners"],
    heroImageAlt: "Plumbing rough-in work at a new construction site",
  },
];

export const serviceCategories: {
  id: Service["category"];
  label: string;
  services: string[]; // service ids, in menu order
}[] = [
  {
    id: "plumbing",
    label: "Plumbing",
    services: ["plumbing-repair", "leak-repair", "plumbing-maintenance", "emergency-plumbing"],
  },
  {
    id: "drain-sewer",
    label: "Drain & Sewer",
    services: ["drain-cleaning"],
  },
  {
    id: "water-systems",
    label: "Water Systems",
    services: ["water-heaters", "tankless-water-heaters", "water-softeners", "water-treatment"],
  },
  {
    id: "commercial",
    label: "Commercial",
    services: ["commercial-plumbing"],
  },
  {
    id: "new-construction",
    label: "New Construction",
    services: ["new-construction"],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services
    .filter((s) => s.featured)
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
}
