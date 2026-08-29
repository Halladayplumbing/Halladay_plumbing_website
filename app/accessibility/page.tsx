import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accessibility",
  description: `Accessibility statement for the ${business.name} website.`,
  path: "/accessibility/",
  noindex: true,
});

export default function AccessibilityPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Accessibility", href: "/accessibility/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h1 className="text-3xl font-extrabold text-ink">Accessibility Statement</h1>
          <p className="mt-3 text-sm text-ink-muted">Last updated August 2026</p>

          <div className="mt-8 max-w-none space-y-4 text-sm text-ink-muted">
            <p>
              {business.name} is committed to making this website usable for as many visitors as
              possible, including people using assistive technology. We want every homeowner and
              business in {business.primaryCity} and {business.serviceRegion} to be able to learn
              about our services and request help without barriers.
            </p>
            <p>
              This site is built with semantic HTML, keyboard-navigable menus and forms, visible
              focus states, labeled form fields, sufficient color contrast, and support for
              reduced-motion preferences, targeting WCAG 2.1 Level AA guidelines.
            </p>
            <p>
              Accessibility is an ongoing effort. If you encounter a barrier using this site —
              whether with a screen reader, keyboard navigation, or otherwise — please let us know
              and we&apos;ll work to address it.
            </p>
            <p>
              You can also reach us directly by phone if it&apos;s easier than using the site:{" "}
              <a href={`tel:${business.phones.main.e164}`} className="text-primary hover:underline">
                {business.phones.main.display}
              </a>
              .
            </p>
            <p>
              Contact us at{" "}
              <a href={`mailto:${business.email}`} className="text-primary hover:underline">
                {business.email}
              </a>{" "}
              to report an accessibility issue or request assistance in an alternative format.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
