// Halladay's real membership plan — "The Diamond Club™". Sourced
// directly from the client-provided plan sheet (Halladay_Diamond_Club_
// Printable.pdf, supplied Aug 2026). Nothing here is invented; this file
// is the single source of truth so pricing/benefit changes only need to
// happen in one place.

export interface PlanBenefit {
  icon: string; // lucide-react icon name
  title: string;
  description: string;
  value: string; // the right-column headline value, e.g. "10%", "2 Years"
}

export interface PlanAddOn {
  icon: string;
  name: string;
  price: string;
  cadence: string;
}

export const servicePlan = {
  name: "The Diamond Club",
  trademark: true,
  tagline: "Plumbing security for your home.",
  description:
    "The Diamond Club is a private membership-service club exclusive to Halladay Plumbing clients — for homeowners who want to protect their home from unexpected plumbing breakdowns, or worse, water damage.",

  price: {
    amount: "$9.99",
    cadence: "/month",
  },

  memberServiceFee: {
    amount: "$39",
    description: "Reduced, flat service fee for members — never pay extra.",
  },

  benefits: [
    {
      icon: "Truck",
      title: "Front-of-the-Line Service",
      description:
        "Don't get stuck waiting days for a technician to arrive at your home to fix your plumbing emergency.",
      value: "Priority Service",
    },
    {
      icon: "ClipboardCheck",
      title: "Annual Inspection",
      description:
        "A complimentary inspection (no service fee) by a highly trained technician to reduce the likelihood of a plumbing emergency in your home.",
      value: "Included",
    },
    {
      icon: "Tag",
      title: "Discount on Service & Repairs",
      description: "Never pay full price again — save on all service and repairs.",
      value: "10%",
    },
    {
      icon: "ShieldCheck",
      title: "Service Guarantee",
      description:
        "If a problem should arise within the specified time period, we'll return to your home and make it right at no additional cost.",
      value: "2 Years",
    },
    {
      icon: "Wrench",
      title: "Fixture Guarantee",
      description: "Members receive warranties on all equipment installed.",
      value: "Manufacturer",
    },
    {
      icon: "DollarSign",
      title: "Service Fee",
      description: "Save with reduced service fees — as a member, you'll never pay extra.",
      value: "$39",
    },
  ] as PlanBenefit[],

  addOns: [
    {
      icon: "Flame",
      name: "Annual Water Heater Flush",
      price: "$8.99",
      cadence: "/month",
    },
    {
      icon: "Droplets",
      name: "Salt Delivery",
      price: "$21.99",
      cadence: "/month",
    },
  ] as PlanAddOn[],
};
