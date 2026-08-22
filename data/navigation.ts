// Header / footer navigation structure. Edit here to change site nav
// without touching Header/Footer/MobileNav component code.

export interface NavLink {
  label: string;
  href: string;
}

// Curated top-level desktop nav. Kept short by design so it fits on one
// row without horizontal overflow at any desktop/laptop width (1024px+).
// Water Heaters, Drain Cleaning, and Commercial Plumbing are one click
// away via the "Plumbing Services" mega-menu instead of duplicated here;
// Water Softeners stays top-level given its
// business priority. The full list still appears in mobileNav and the
// footer.
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  // "Plumbing Services" renders as a mega-menu driven by data/services.ts
  { label: "Water Softeners", href: "/water-softeners/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "Contact", href: "/contact/" },
];

export const mobileNav: NavLink[] = [
  { label: "Plumbing Services", href: "/plumbing-services/" },
  { label: "Water Softeners", href: "/water-softeners/" },
  { label: "Water Heaters", href: "/water-heaters/" },
  { label: "Drain Cleaning", href: "/drain-cleaning/" },
  { label: "Leak Repair", href: "/leak-repair/" },
  { label: "Commercial Plumbing", href: "/commercial-plumbing/" },
  { label: "New Construction", href: "/new-construction-plumbing/" },
  { label: "Diamond Club", href: "/diamond-club/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Specials", href: "/specials/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Plumbing Repair", href: "/plumbing-repair/" },
  { label: "Water Softeners", href: "/water-softeners/" },
  { label: "Water Heaters", href: "/water-heaters/" },
  { label: "Drain Cleaning", href: "/drain-cleaning/" },
  { label: "Commercial Plumbing", href: "/commercial-plumbing/" },
  { label: "New Construction", href: "/new-construction-plumbing/" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About", href: "/about/" },
  { label: "Diamond Club", href: "/diamond-club/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Specials", href: "/specials/" },
  { label: "Contact", href: "/contact/" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Accessibility", href: "/accessibility/" },
];
