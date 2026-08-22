// Paid landing page ("funnel") engine configuration.
//
// The single route app/lp/[slug]/page.tsx renders any funnel purely from
// an entry in this array. Launching a new campaign landing page means
// adding a config object here — not building a new page.

export interface ServiceFunnel {
  slug: string; // /lp/{slug}/
  serviceId: string;

  hero: {
    eyebrow?: string;
    headline: string;
    subheadline: string;
    imageAlt: string;
  };

  offerId?: string;

  formId: string;

  primaryCTA: {
    label: string;
    type: "form" | "phone" | "booking";
  };

  reviewFilter?: string; // filters data/reviews.ts by service tag

  thankYouPath: string;

  tracking: {
    funnelName: string;
    leadType: string;
    serviceCategory: string;
  };

  // Paid landing pages are generally noindex to avoid competing with the
  // matching organic service page.
  noindex: boolean;
}

export const funnels: ServiceFunnel[] = [
  {
    slug: "water-softener-installation",
    serviceId: "water-softeners",
    hero: {
      eyebrow: "Cedar City Water Softener Installation",
      headline: "Protect Your Home From Southern Utah's Hard Water",
      subheadline:
        "Halladay Plumbing installs whole-house water softener systems for homeowners throughout Cedar City and Southern Utah. Tell us about your home and get a personalized estimate.",
      imageAlt: "Water softener system installed in a Cedar City home mechanical room",
    },
    offerId: "water-softener-estimate",
    formId: "water-softener",
    primaryCTA: { label: "Get My Water Softener Estimate", type: "form" },
    reviewFilter: "water-softeners",
    thankYouPath: "/thank-you/water-softener/",
    tracking: {
      funnelName: "water_softener_installation",
      leadType: "water_softener_lead",
      serviceCategory: "water-systems",
    },
    noindex: true,
  },
  {
    slug: "water-heater-service",
    serviceId: "water-heaters",
    hero: {
      eyebrow: "Cedar City Water Heater Service",
      headline: "Restore Reliable Hot Water",
      subheadline:
        "Repair, replacement, or new installation — Halladay Plumbing diagnoses the problem and gets your hot water back.",
      imageAlt: "Water heater installation in a Cedar City home",
    },
    offerId: "water-heater-diagnostic",
    formId: "water-heater",
    primaryCTA: { label: "Get My Water Heater Fixed", type: "form" },
    reviewFilter: "water-heaters",
    thankYouPath: "/thank-you/water-heater/",
    tracking: {
      funnelName: "water_heater_service",
      leadType: "water_heater_lead",
      serviceCategory: "water-systems",
    },
    noindex: true,
  },
  {
    slug: "tankless-water-heater",
    serviceId: "tankless-water-heaters",
    hero: {
      eyebrow: "Cedar City Tankless Water Heaters",
      headline: "Upgrade to On-Demand Hot Water",
      subheadline:
        "Halladay Plumbing installs tankless water heaters for Cedar City homes looking for continuous hot water and more space.",
      imageAlt: "Tankless water heater installed on an interior wall",
    },
    offerId: "water-heater-diagnostic",
    formId: "water-heater",
    primaryCTA: { label: "Get My Water Heater Fixed", type: "form" },
    reviewFilter: "water-heaters",
    thankYouPath: "/thank-you/water-heater/",
    tracking: {
      funnelName: "tankless_water_heater",
      leadType: "water_heater_lead",
      serviceCategory: "water-systems",
    },
    noindex: true,
  },
  {
    slug: "drain-cleaning",
    serviceId: "drain-cleaning",
    hero: {
      eyebrow: "Cedar City Drain Cleaning",
      headline: "Clear the Clog and Get Your Drains Moving Again",
      subheadline:
        "From a single slow drain to a backed-up main line, Halladay Plumbing clears it and gets your plumbing flowing.",
      imageAlt: "Plumber clearing a residential drain line",
    },
    offerId: "drain-cleaning-special",
    formId: "drain-cleaning",
    primaryCTA: { label: "Clear My Drain", type: "form" },
    reviewFilter: "drain-cleaning",
    thankYouPath: "/thank-you/drain-cleaning/",
    tracking: {
      funnelName: "drain_cleaning",
      leadType: "drain_cleaning_lead",
      serviceCategory: "drain-sewer",
    },
    noindex: true,
  },
  {
    slug: "leak-repair",
    serviceId: "leak-repair",
    hero: {
      eyebrow: "Cedar City Leak Repair",
      headline: "Get the Leak Fixed Before It Causes More Damage",
      subheadline:
        "Halladay Plumbing finds and repairs active leaks throughout Cedar City and Southern Utah homes.",
      imageAlt: "Plumber repairing a leaking pipe",
    },
    formId: "leak-repair",
    primaryCTA: { label: "Get My Leak Fixed", type: "form" },
    reviewFilter: "leak-repair",
    thankYouPath: "/thank-you/leak-repair/",
    tracking: {
      funnelName: "leak_repair",
      leadType: "leak_repair_lead",
      serviceCategory: "plumbing",
    },
    noindex: true,
  },
  {
    slug: "emergency-plumber",
    serviceId: "emergency-plumbing",
    hero: {
      eyebrow: "Cedar City Emergency Plumbing",
      headline: "Urgent Plumbing Help for Cedar City",
      subheadline:
        "Burst pipe, active leak, or sewer backup — call Halladay Plumbing now or request emergency service below.",
      imageAlt: "Plumber responding to an urgent residential plumbing call",
    },
    formId: "emergency",
    primaryCTA: { label: "Call Halladay Plumbing", type: "phone" },
    reviewFilter: "emergency-plumbing",
    thankYouPath: "/thank-you/emergency/",
    tracking: {
      funnelName: "emergency_plumber",
      leadType: "emergency_plumbing_lead",
      serviceCategory: "emergency",
    },
    noindex: true,
  },
  {
    slug: "commercial-plumbing",
    serviceId: "commercial-plumbing",
    hero: {
      eyebrow: "Southern Utah Commercial Plumbing",
      headline: "Keep Your Business Running With Plumbing That Works",
      subheadline:
        "Halladay Plumbing provides repairs, maintenance, and installations for Southern Utah businesses.",
      imageAlt: "Commercial plumbing work at a Southern Utah business",
    },
    formId: "commercial",
    primaryCTA: { label: "Request Commercial Service", type: "form" },
    reviewFilter: "commercial-plumbing",
    thankYouPath: "/thank-you/commercial/",
    tracking: {
      funnelName: "commercial_plumbing",
      leadType: "commercial_plumbing_lead",
      serviceCategory: "commercial",
    },
    noindex: true,
  },
  {
    slug: "plumbing-repair",
    serviceId: "plumbing-repair",
    hero: {
      eyebrow: "Cedar City Plumbing Repair",
      headline: "Get Your Plumbing Problem Diagnosed and Fixed",
      subheadline:
        "From dripping fixtures to bigger repairs, Halladay Plumbing gets it done right the first time.",
      imageAlt: "Plumber repairing a fixture in a Cedar City home",
    },
    formId: "plumbing-repair",
    primaryCTA: { label: "Schedule Plumbing Service", type: "form" },
    reviewFilter: "plumbing-repair",
    thankYouPath: "/thank-you/plumbing-repair/",
    tracking: {
      funnelName: "plumbing_repair",
      leadType: "plumbing_repair_lead",
      serviceCategory: "plumbing",
    },
    noindex: true,
  },
  {
    slug: "new-construction",
    serviceId: "new-construction",
    hero: {
      eyebrow: "Southern Utah New Construction",
      headline: "Plumbing Done Right From the Ground Up",
      subheadline:
        "Halladay Plumbing partners with builders, GCs, and homeowners on new construction plumbing throughout Southern Utah.",
      imageAlt: "Plumbing rough-in work at a new construction site",
    },
    formId: "new-construction",
    primaryCTA: { label: "Request a New Construction Quote", type: "form" },
    reviewFilter: "new-construction",
    thankYouPath: "/thank-you/new-construction/",
    tracking: {
      funnelName: "new_construction",
      leadType: "new_construction_lead",
      serviceCategory: "new-construction",
    },
    noindex: true,
  },
];

export function getFunnelBySlug(slug: string): ServiceFunnel | undefined {
  return funnels.find((f) => f.slug === slug);
}

export function getAllFunnelSlugs(): string[] {
  return funnels.map((f) => f.slug);
}
