import type { MetadataRoute } from "next";
import { services } from "@/data/services";
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
    "emergency-plumber-cedar-city-ut",
    "commercial-plumbing",
    "plumbing-maintenance",
    "plumbing-repair",
    "water-treatment",
    "specials",
    "reviews",
    "about",
    "contact",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}/${path ? `${path}/` : ""}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "water-softeners" ? 0.9 : 0.7,
  }));

  for (const area of getActiveServiceAreas()) {
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
