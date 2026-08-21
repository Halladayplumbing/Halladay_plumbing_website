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

          <div className="prose mt-8 max-w-none space-y-4 text-sm text-ink-muted">
            <p>
              {business.name} is committed to making this website usable for as many visitors as
              possible. This site is built with semantic HTML, keyboard-navigable menus and
              forms, visible focus states, labeled form fields, and support for reduced-motion
              preferences, targeting WCAG 2.1 AA guidelines.
            </p>
            <p>
              If you encounter an accessibility barrier on this site, please let us know at{" "}
              <a href={`mailto:${business.email}`} className="text-primary hover:underline">
                {business.email}
              </a>{" "}
              so we can address it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
