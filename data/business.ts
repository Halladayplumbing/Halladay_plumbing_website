// Centralized business configuration.
// Every component that needs contact info, hours, or phone numbers should
// import from here instead of hardcoding values. This is the single source
// of truth for verified Halladay Plumbing facts.
//
// Anything not yet confirmed by Halladay is left as an empty/placeholder
// value with `enabled: false` or a `CONFIRM_` flag rather than invented.

export interface PhoneNumber {
  display: string;
  e164: string;
  enabled: boolean;
}

export const business = {
  name: "Halladay Plumbing",
  legalName: "Halladay Plumbing",
  tagline: "Cedar City's Local Plumbing Experts",

  phones: {
    // Primary business line — used for all standard CTAs.
    main: {
      display: "435-357-1340",
      e164: "+14353571340",
      enabled: true,
    } as PhoneNumber,

    // Dedicated emergency line. Not yet supplied by Halladay.
    // Once Halladay provides a number, set display/e164 and flip enabled
    // to true — every emergency CTA in the site reads from this object
    // and will switch over automatically, falling back to `main` while
    // disabled.
    emergency: {
      display: "",
      e164: "",
      enabled: false,
    } as PhoneNumber,

    // Reserved for call-tracking / dynamic number insertion (CallRail,
    // Google forwarding numbers, etc.) tied to a specific paid campaign.
    // Populate per-campaign once call tracking is configured.
    campaign: {
      display: "",
      e164: "",
      enabled: false,
    } as PhoneNumber,

    // Separate line for new-construction / new-build projects (builders,
    // GCs, new home plumbing systems) — a distinct revenue line from
    // residential repair/service/emergency, which stays on `main`.
    // Confirmed by the client (Aug 2026).
    newBuilds: {
      display: "435-704-4896",
      e164: "+14357044896",
      enabled: true,
    } as PhoneNumber,
  },

  email: "Halladayplumbing@gmail.com",

  address: {
    // Street address not yet confirmed — do not publish/print until
    // supplied. Used only if `confirmed` is true.
    street: "",
    city: "Cedar City",
    state: "UT",
    zip: "",
    confirmed: false,
  },

  primaryCity: "Cedar City",
  state: "UT",
  serviceRegion: "Southern Utah",

  // "Committed to Quality Since 1994" — printed on Halladay's own Diamond
  // Club membership materials, confirmed by the client (Aug 2026).
  foundedYear: 1994,

  // Sourced directly from Halladay's live Google Business Profile
  // (confirmed Aug 2026). Re-verify periodically — Google listings can
  // change without the site being updated.
  hours: {
    confirmed: true,
    display: "Open 24 hours Mon–Sat, Closed Sunday",
    schedule: {
      monday: "Open 24 hours",
      tuesday: "Open 24 hours",
      wednesday: "Open 24 hours",
      thursday: "Open 24 hours",
      friday: "Open 24 hours",
      saturday: "Open 24 hours",
      sunday: "Closed",
    },
  },

  emergencyAvailability: {
    // Supported by the "Open 24 hours" listing on Halladay's Google
    // Business Profile (Mon–Sat) — see hours above.
    confirmed: true,
    label: "Emergency service available",
  },

  socials: {
    facebook: "https://www.facebook.com/halladayplumbing",
    instagram: "https://www.instagram.com/halladayplumbing",
  },

  // Verified credentials/claims. Leave blank until Halladay confirms —
  // components must not render a badge/claim unless `confirmed: true`.
  credentials: {
    licensed: { confirmed: false, label: "Licensed" },
    insured: { confirmed: false, label: "Insured" },
    // "Identifies as veteran-owned" badge shown on Halladay's Google
    // Business Profile.
    veteranOwned: { confirmed: true, label: "Veteran-Owned" },
  },

  reviews: {
    // Sourced directly from Halladay's live Google Business Profile
    // (confirmed Aug 2026): 22 reviews, all 5-star. Re-check periodically
    // — this is a snapshot, not a live-updating value. True real-time
    // sync would require a Google Places API key (billing-enabled Google
    // Cloud project) wired into a small server route; ask if you want
    // that set up.
    googleRating: 5.0 as number | null,
    googleReviewCount: 22 as number | null,
    googlePlaceUrl: "https://share.google/mPPnRa5FMAp4Zg4Yz",
  },
} as const;

export type Business = typeof business;
