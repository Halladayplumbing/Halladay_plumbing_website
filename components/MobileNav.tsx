"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { business } from "@/data/business";
import { mobileNav } from "@/data/navigation";
import { PhoneButton } from "./PhoneButton";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    // Rendered unconditionally (visibility toggled via `hidden`, not
    // conditional mounting) so every link in this drawer — the site's
    // full mobile nav — is present in the initial DOM for crawlers.
    // Googlebot renders pages mobile-first and doesn't click the hamburger
    // button first, so a `return null` here would mean it never sees any
    // of these links. `hidden` also keeps the drawer out of the tab order
    // and accessibility tree while closed, same as the old unmounted state.
    <div className={cn("fixed inset-0 z-50 xl:hidden", !open && "hidden")}>
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-ink/50"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal={open}
        aria-label="Site menu"
        className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-background shadow-lg animate-fade-in"
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <span className="flex items-center gap-2">
            <Image src="/brand/logo.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
            <span className="text-base font-bold uppercase text-ink">{business.name}</span>
          </span>
          <button
            type="button"
            className="rounded-md p-2 hover:bg-surface"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {mobileNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-surface"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-border p-4">
          <PhoneButton variant="outline" className="!text-primary !border-primary" size="lg" />
          <CTAButton href="/contact/" variant="accent" size="lg" className="w-full">
            Schedule Service
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
