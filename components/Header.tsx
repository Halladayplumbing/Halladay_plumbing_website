"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { business } from "@/data/business";
import { primaryNav } from "@/data/navigation";
import { serviceCategories, getServiceById } from "@/data/services";
import { getFunnelBySlug } from "@/data/funnels";
import { PhoneButton } from "./PhoneButton";
import { CTAButton } from "./CTAButton";
import { MobileNav } from "./MobileNav";
import { UtilityBar } from "./UtilityBar";
import { cn } from "@/lib/utils";
import type { PhoneNumber } from "@/data/business";

// Paid landing pages (/lp/...) use a reduced header — logo and a call
// button only, no full nav/mega-menu — to reduce escape paths and keep
// visitors focused on the funnel's single conversion action.
function isReducedHeaderRoute(pathname: string | null): boolean {
  return Boolean(pathname?.startsWith("/lp/"));
}

// The reduced header's phone button should match whichever line the rest
// of that funnel is pushing (new builds vs. the main line) — resolved
// from the funnel's own serviceId rather than a second hardcoded route
// check, so it stays correct as funnels are added.
function resolveReducedHeaderPhone(pathname: string | null): PhoneNumber | undefined {
  const slug = pathname?.match(/^\/lp\/([^/]+)/)?.[1];
  const funnel = slug ? getFunnelBySlug(slug) : undefined;
  if (funnel?.serviceId === "new-construction") return business.phones.newBuilds;
  return undefined;
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduced = isReducedHeaderRoute(pathname);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  if (reduced) {
    const reducedPhone = resolveReducedHeaderPhone(pathname);
    return (
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-2 truncate">
            <Image src="/brand/logo.png" alt="" width={40} height={40} className="h-9 w-9 shrink-0 lg:h-10 lg:w-10" priority />
            <span className="truncate text-base font-extrabold uppercase tracking-tight text-ink sm:text-lg lg:text-xl">
              {business.name}
            </span>
          </Link>
          <PhoneButton
            variant="primary"
            size="md"
            className="whitespace-nowrap !px-3 sm:!px-5"
            phone={reducedPhone}
            label={(reducedPhone ?? business.phones.main).display}
          />
        </div>
      </header>
    );
  }

  return (
    <>
      <UtilityBar />
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image src="/brand/logo.png" alt="" width={44} height={44} className="h-10 w-10 shrink-0 lg:h-11 lg:w-11" priority />
            <span className="text-lg font-extrabold uppercase tracking-tight text-ink lg:text-xl">{business.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-ink hover:bg-surface"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                onClick={() => setMenuOpen((v) => !v)}
              >
                Plumbing Services
                <ChevronDown className={cn("h-4 w-4 transition-transform", menuOpen && "rotate-180")} aria-hidden="true" />
              </button>

              {/* Rendered unconditionally (visibility toggled via the `hidden`
                  class, not conditional mounting) so every link here is
                  present in the initial DOM for crawlers — Googlebot doesn't
                  click to open menus before rendering a page, so links that
                  only mount on `menuOpen` would otherwise never be
                  discovered here. `hidden` also keeps it out of the tab
                  order and accessibility tree while closed, same as before. */}
              <div
                className={cn(
                  "absolute left-1/2 top-full z-50 mt-2 w-[640px] -translate-x-1/2 rounded-lg border border-border bg-background p-6 shadow-lg animate-fade-in",
                  !menuOpen && "hidden",
                )}
              >
                <div className="grid grid-cols-2 gap-6">
                  {serviceCategories.map((cat) => (
                    <div key={cat.id}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                        {cat.label}
                      </p>
                      <ul className="space-y-1">
                        {cat.services.map((sid) => {
                          const svc = getServiceById(sid);
                          if (!svc) return null;
                          return (
                            <li key={sid}>
                              <Link
                                href={`/${svc.slug}/`}
                                className="block rounded-md px-2 py-1.5 text-sm text-ink hover:bg-surface hover:text-primary"
                                onClick={() => setMenuOpen(false)}
                              >
                                {svc.navLabel ?? svc.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <Link
                    href="/plumbing-services/"
                    className="text-sm font-semibold text-primary hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    View all plumbing services
                  </Link>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/reviews/"
                      className="text-sm font-medium text-ink-muted hover:text-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      Reviews
                    </Link>
                    <Link
                      href="/specials/"
                      className="text-sm font-medium text-ink-muted hover:text-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      Specials
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {primaryNav
              .filter((l) => l.label !== "Home")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-2.5 py-2 text-sm font-medium text-ink hover:bg-surface whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <PhoneButton variant="ghost" size="md" label={business.phones.main.display} className="!px-3" />
            <CTAButton href="/contact/" variant="primary" size="md" className="whitespace-nowrap">
              Schedule Service
            </CTAButton>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-ink hover:bg-surface xl:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
