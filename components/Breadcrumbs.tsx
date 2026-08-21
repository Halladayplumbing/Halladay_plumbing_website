import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-surface">
      <ol className="container-page flex flex-wrap items-center gap-1 py-3 text-xs text-ink-muted">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-ink">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-primary hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
