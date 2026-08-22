// The "Halladay Home Water Protection Package" — a named, structured
// value stack for the water softener campaign (not a single "offer"
// object like data/offers.ts; this is a list of what's included).
//
// PRICING GATE: per the client's explicit instruction, no dollar figure —
// the $129 assessment fee, any "$500 value" framing, or the "$250
// installation credit" — may be published until Halladay approves it in
// writing. Every line item below carries `priceApproved: false` and a
// `price` left undefined; components must never render a price unless
// `priceApproved` is true. Flip each flag individually once approved —
// nothing else in the codebase needs to change.

export interface PackageLineItem {
  id: string;
  title: string;
  description: string;
  /** Only render a dollar figure when this is true AND `price` is set. */
  priceApproved: boolean;
  price?: string;
}

export const waterProtectionPackage = {
  name: "Halladay Home Water Protection Package",
  tagline: "A structured, professional evaluation of your home's water — not a sales visit.",
  active: true,

  lineItems: [
    {
      id: "assessment",
      title: "In-Home Water Assessment",
      description:
        "A Halladay technician evaluates your plumbing system, existing equipment (if any), and water conditions on-site.",
      priceApproved: false,
    },
    {
      id: "installation-credit",
      title: "Installation Credit",
      description:
        "A potential credit toward a new water softener installation, applied if you move forward after your assessment.",
      priceApproved: false,
    },
    {
      id: "diamond-club",
      title: "Diamond Club Membership",
      description:
        "Ongoing plumbing membership benefits — see the full Diamond Club plan for what's included.",
      priceApproved: false,
    },
  ] as PackageLineItem[],

  // Shown only once Halladay approves final terms; until then, components
  // must render the line items above without any price/value language.
  disclosureApproved: false,
} as const;

export type WaterProtectionPackage = typeof waterProtectionPackage;
