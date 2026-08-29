import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms of use for the ${business.name} website.`,
  path: "/terms/",
  noindex: true,
});

const sectionHeading = "mt-10 text-lg font-bold text-ink first:mt-0";

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms", href: "/terms/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h1 className="text-3xl font-extrabold text-ink">Terms of Use</h1>
          <p className="mt-3 text-sm text-ink-muted">Last updated August 2026</p>

          <div className="mt-8 max-w-none space-y-4 text-sm text-ink-muted">
            <p>
              These Terms of Use govern your use of this website, operated by {business.name}. By
              using this site, you agree to these terms. If you don&apos;t agree, please don&apos;t
              use the site.
            </p>

            <h2 className={sectionHeading}>Purpose of This Site</h2>
            <p>
              This website is provided by {business.name} for informational purposes and to allow
              visitors throughout {business.primaryCity} and {business.serviceRegion} to learn
              about our plumbing services and request an estimate or appointment. Service
              descriptions, service area coverage, and offer terms on this site are subject to
              change without notice.
            </p>

            <h2 className={sectionHeading}>Requests, Estimates &amp; Scheduling</h2>
            <p>
              Submitting a form or calling the numbers listed on this site does not guarantee
              availability, pricing, or a specific appointment time — {business.name} will follow
              up directly to confirm details. Any pricing, offers, or specials shown on this site
              are estimates or promotional terms only and are confirmed at the time of service.
            </p>

            <h2 className={sectionHeading}>No Professional Advice</h2>
            <p>
              Content on this site (including hard-water and plumbing information) is provided for
              general informational purposes and is not a substitute for an in-person diagnosis or
              professional recommendation specific to your home or business.
            </p>

            <h2 className={sectionHeading}>Acceptable Use</h2>
            <p>
              You agree not to misuse this site — including attempting to interfere with its
              normal operation, submitting false or fraudulent information through our forms, or
              using any content from this site for commercial purposes without our permission.
            </p>

            <h2 className={sectionHeading}>Intellectual Property</h2>
            <p>
              The text, images, logos, and other content on this site are owned by {business.name}
              {" "}or used with permission, and may not be copied or reused without our consent.
            </p>

            <h2 className={sectionHeading}>Third-Party Links &amp; Reviews</h2>
            <p>
              This site may link to or display content from third parties, such as Google Maps or
              Google reviews. We aren&apos;t responsible for the content, accuracy, or privacy
              practices of those third-party sites and services.
            </p>

            <h2 className={sectionHeading}>Limitation of Liability</h2>
            <p>
              This site and its content are provided &ldquo;as is,&rdquo; without warranties of any
              kind. To the fullest extent permitted by law, {business.name} is not liable for any
              damages arising from your use of, or inability to use, this website.
            </p>

            <h2 className={sectionHeading}>Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Utah, without regard to
              conflict-of-law principles.
            </p>

            <h2 className={sectionHeading}>Changes to These Terms</h2>
            <p>
              We may update these Terms of Use from time to time. The &ldquo;Last updated&rdquo;
              date above reflects the most recent revision. Continued use of this site after
              changes are posted means you accept the updated terms.
            </p>

            <h2 className={sectionHeading}>Contact Us</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${business.email}`} className="text-primary hover:underline">
                {business.email}
              </a>{" "}
              or by calling{" "}
              <a href={`tel:${business.phones.main.e164}`} className="text-primary hover:underline">
                {business.phones.main.display}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
