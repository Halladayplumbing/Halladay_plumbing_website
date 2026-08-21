import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms of use for the ${business.name} website.`,
  path: "/terms/",
  noindex: true,
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms", href: "/terms/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h1 className="text-3xl font-extrabold text-ink">Terms of Use</h1>

          <div className="mt-6 rounded-md border border-warning bg-warning/10 p-4 text-sm text-warning">
            <strong>Draft placeholder — not legal advice.</strong> This page has not been reviewed
            by an attorney. Replace this content with complete, legally reviewed terms before
            launch.
          </div>

          <div className="prose mt-8 max-w-none space-y-4 text-sm text-ink-muted">
            <p>
              This website is provided by {business.name} for informational purposes and to allow
              visitors to request plumbing services. Content on this site, including service
              descriptions and offer terms, is subject to change without notice.
            </p>
            <p>
              Submitting a form on this site does not guarantee availability, pricing, or
              scheduling — {business.name} will follow up to confirm details.
            </p>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${business.email}`} className="text-primary hover:underline">
                {business.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
