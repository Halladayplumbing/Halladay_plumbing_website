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

  // Hours have not been confirmed. Do not display specific hours until
  // Halladay supplies them — components should check `confirmed`.
  hours: {
    confirmed: false,
    display: "",
  },

  emergencyAvailability: {
    // "24/7" and similar claims must not be used until verified.
    confirmed: false,
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
  },

  reviews: {
    // Populate once Google review data is confirmed. Do not fabricate
    // rating/count in the meantime — UI hides these fields when null.
    googleRating: null as number | null,
    googleReviewCount: null as number | null,
    googlePlaceUrl: "",
  },
} as const;

export type Business = typeof business;
