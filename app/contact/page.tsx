import { CheckCircle2 } from "lucide-react";
import { business } from "@/data/business";
import { resolveOfferFromQueryParam } from "@/data/offers";
import { getServiceById } from "@/data/services";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneButton } from "@/components/PhoneButton";
import { ContactForm } from "@/components/forms/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Halladay Plumbing",
  description: "Contact Halladay Plumbing to schedule service in Cedar City and Southern Utah.",
  path: "/contact/",
});

const points = [
  "Residential & commercial plumbing",
  "Serving Cedar City & Southern Utah",
  "We'll follow up to confirm details",
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; offer?: string }>;
}) {
  const params = await searchParams;
  const service = params.service ? getServiceById(params.service) : undefined;
  const offer = resolveOfferFromQueryParam(params.offer);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <h1 className="text-section-title font-extrabold text-ink">
              {service ? `Schedule ${service.name}` : "Schedule Service"}
            </h1>
            <p className="mt-4 text-lg text-ink-muted">
              Tell us a bit about what you need and we&apos;ll follow up to confirm details and
              schedule your service.
            </p>

            {offer && (
              <div className="mt-6 rounded-lg border border-accent bg-accent/5 p-4">
                <p className="text-sm font-semibold text-accent-dark">{offer.headline}</p>
              </div>
            )}

            <ul className="mt-6 space-y-2">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg border border-border bg-surface p-5">
              <p className="text-sm font-semibold text-ink">Prefer to talk now?</p>
              <div className="mt-3">
                <PhoneButton size="lg" />
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                Or email{" "}
                <a href={`mailto:${business.email}`} className="font-semibold text-primary hover:underline">
                  {business.email}
                </a>
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-6 shadow-md sm:p-8">
            <ContactForm initialServiceId={service?.id} initialOfferId={offer?.id} />
          </div>
        </div>
      </section>
    </>
  );
}
