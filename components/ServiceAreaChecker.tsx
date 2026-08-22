"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, MapPin, Search, XCircle } from "lucide-react";
import { findServiceAreaByQuery, getServiceAreaHref, getPrimaryServiceArea } from "@/data/serviceAreas";
import { CTAButton } from "./CTAButton";
import { trackEvent } from "@/lib/analytics";

type Result = { checked: true; qualified: boolean; cityLabel: string; href?: string } | { checked: false };

// City-name lookup only for now — no ZIP-to-city mapping has been
// verified with Halladay, so ZIP search isn't offered until one is
// supplied (see data/serviceAreas.ts).
export function ServiceAreaChecker() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result>({ checked: false });
  const primaryArea = getPrimaryServiceArea();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const area = findServiceAreaByQuery(trimmed);
    const qualified = Boolean(area);

    trackEvent("service_area_checked", { city: area?.city ?? trimmed, qualified });
    if (qualified) trackEvent("service_area_qualified", { city: area!.city });

    setResult(
      qualified
        ? { checked: true, qualified: true, cityLabel: `${area!.city}, ${area!.state}`, href: getServiceAreaHref(area!) }
        : { checked: true, qualified: false, cityLabel: trimmed },
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background p-6 shadow-sm sm:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="service-area-query" className="sr-only">
          Enter your city
        </label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
          <input
            id="service-area-query"
            type="text"
            placeholder="Enter your city (e.g. Cedar City, St. George)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        <button
          type="submit"
          className="min-h-[48px] shrink-0 rounded-md bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Check My Area
        </button>
      </form>

      {result.checked && (
        <div
          role="status"
          className={`mt-5 flex flex-col gap-3 rounded-md border-2 p-4 sm:flex-row sm:items-center sm:justify-between ${
            result.qualified ? "border-success bg-success/5" : "border-border bg-surface"
          }`}
        >
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            {result.qualified ? (
              <>
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                Yes — Halladay Plumbing serves {result.cityLabel}.
                {result.cityLabel.startsWith(primaryArea.city) && (
                  <span className="block font-normal text-ink-muted sm:inline">
                    {" "}
                    {primaryArea.city} is one of Halladay Plumbing&apos;s primary service areas.
                  </span>
                )}
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
                We couldn&apos;t confirm {result.cityLabel} as a service area yet — call us and we&apos;ll let you know.
              </>
            )}
          </p>
          <CTAButton href={result.qualified ? result.href! : "/contact/"} size="md" variant={result.qualified ? "primary" : "outline"}>
            Request Plumbing Service
          </CTAButton>
        </div>
      )}

      <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Serving {primaryArea.city} and Southern Utah.
      </p>
    </div>
  );
}
