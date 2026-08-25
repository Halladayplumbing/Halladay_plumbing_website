import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/data/business";
import { getActiveServiceAreas, getServiceAreaHref } from "@/data/serviceAreas";
import { VeteranBadge } from "@/components/VeteranBadge";
import {
  footerCompanyLinks,
  footerLegalLinks,
  footerServiceLinks,
} from "@/data/navigation";

export function Footer() {
  const areas = getActiveServiceAreas();
  // Curated hub towns only — the footer isn't the place for a ~50-item
  // list; the full region-by-region breakdown lives on /service-areas/.
  const highlighted = areas.filter((a) => a.footerHighlight);
  const remaining = areas.length - highlighted.length;

  return (
    <footer className="bg-primary-dark pb-28 pt-14 text-white/90 lg:pb-14">
      <div className="container-page grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="text-lg font-extrabold text-white">{business.name}</p>
          <p className="mt-2 max-w-sm text-sm text-white/70">
            Residential and commercial plumbing for Cedar City and Southern Utah.
          </p>

          <VeteranBadge variant="dark" className="mt-4" />

          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`tel:${business.phones.main.e164}`} className="hover:underline">
                {business.phones.main.display}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${business.email}`} className="hover:underline">
                {business.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {business.primaryCity}, {business.state} &amp; {business.serviceRegion}
              </span>
            </li>
          </ul>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={business.socials.facebook}
              aria-label="Halladay Plumbing on Facebook"
              className="rounded-md border border-white/20 p-2 hover:bg-white/10"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={business.socials.instagram}
              aria-label="Halladay Plumbing on Instagram"
              className="rounded-md border border-white/20 p-2 hover:bg-white/10"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Services</p>
          <ul className="mt-3 space-y-2 text-sm">
            {footerServiceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            {footerCompanyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Service Areas</p>
          <ul className="mt-3 space-y-2 text-sm">
            {highlighted.map((a) => (
              <li key={a.slug}>
                <Link href={getServiceAreaHref(a)} className="hover:underline">
                  {a.city}, {a.state}
                </Link>
              </li>
            ))}
            {remaining > 0 && (
              <li>
                <Link href="/service-areas/" className="font-semibold hover:underline">
                  + {remaining} more areas →
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container-page mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-4">
          {footerLegalLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
