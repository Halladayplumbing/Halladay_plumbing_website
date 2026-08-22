import type { MetadataRoute } from "next";
import { services, getServiceBySlug } from "@/data/services";
import { getActiveServiceAreas } from "@/data/serviceAreas";
import { SITE_URL } from "@/lib/utils";

// Static organic pages plus dynamically generated service and
// service-area pages. Paid /lp/ funnels and /thank-you/ pages are
// intentionally excluded — they're noindex and shouldn't compete with
// organic pages for the same queries.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "plumbing-services",
    "water-softeners",
    "water-heaters",
    "tankless-water-heaters",
    "drain-cleaning",
    "leak-repair",
    "commercial-plumbing",
    "plumbing-maintenance",
    "plumbing-repair",
    "water-treatment",
    "diamond-club",
    "service-areas",
    "specials",
    "reviews",
    "about",
    "contact",
  ];

  // Sitemap priority for a service page tracks data/services.ts's own
  // `priority` field (lower number = higher-ranked) rather than a
  // hardcoded slug string, so it stays correct if the top-priority
  // service ever changes.
  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => {
    const service = path ? getServiceBySlug(path) : undefined;
    const priority = path === "" ? 1 : service?.priority === 1 ? 0.9 : 0.7;
    return {
      url: `${SITE_URL}/${path ? `${path}/` : ""}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority,
    };
  });

  // Only areas with a real dedicated page are indexable routes — every
  // other confirmed area is listed on the /service-areas/ hub instead
  // (see data/serviceAreas.ts and app/service-areas/[slug]/page.tsx).
  for (const area of getActiveServiceAreas().filter((a) => a.hasDedicatedPage)) {
    entries.push({
      url: `${SITE_URL}/service-areas/${area.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Guard against duplicate URLs if a service slug ever matches a static path above.
  const seen = new Set(entries.map((e) => e.url));
  for (const service of services) {
    const url = `${SITE_URL}/${service.slug}/`;
    if (!seen.has(url)) {
      entries.push({ url, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
      seen.add(url);
    }
  }

  return entries;
}
