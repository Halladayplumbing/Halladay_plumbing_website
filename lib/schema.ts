import { business } from "@/data/business";
import { absoluteUrl } from "./utils";

// Structured data builders. Only include fields that are actually
// confirmed — no invented aggregateRating, address, geo coordinates,
// hours, or price range.

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/logo.png"),
    email: business.email,
    telephone: business.phones.main.e164,
    sameAs: [business.socials.facebook, business.socials.instagram].filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: absoluteUrl("/"),
  };
}

export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: business.name,
    url: absoluteUrl("/"),
    image: absoluteUrl("/brand/logo.png"),
    telephone: business.phones.main.e164,
    email: business.email,
    areaServed: {
      "@type": "City",
      name: `${business.primaryCity}, ${business.state}`,
    },
    sameAs: [business.socials.facebook, business.socials.instagram].filter(Boolean),
  };

  if (business.address.confirmed) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    };
  }

  if (business.reviews.googleRating && business.reviews.googleReviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: business.reviews.googleRating,
      reviewCount: business.reviews.googleReviewCount,
    };
  }

  return schema;
}

export function serviceSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: absoluteUrl(url),
    provider: {
      "@type": "Plumber",
      name: business.name,
      telephone: business.phones.main.e164,
    },
    areaServed: {
      "@type": "City",
      name: `${business.primaryCity}, ${business.state}`,
    },
  };
}

// Helper for use with dangerouslySetInnerHTML on a <script type="application/ld+json"> tag.
export function jsonLdProps(data: object) {
  return { __html: JSON.stringify(data) };
}
