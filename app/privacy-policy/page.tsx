import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for the ${business.name} website.`,
  path: "/privacy-policy/",
  noindex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy", href: "/privacy-policy/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h1 className="text-3xl font-extrabold text-ink">Privacy Policy</h1>

          <div className="mt-6 rounded-md border border-warning bg-warning/10 p-4 text-sm text-warning">
            <strong>Draft placeholder — not legal advice.</strong> This page has not been reviewed
            by an attorney. Replace this content with a complete, legally reviewed privacy policy
            before launch.
          </div>

          <div className="prose mt-8 max-w-none space-y-4 text-sm text-ink-muted">
            <p>
              This website collects information you voluntarily submit through contact and
              qualification forms, including your name, phone number, email address, city, and
              details about the plumbing service you&apos;re requesting. This information is used
              to respond to your request and provide the service you asked about.
            </p>
            <p>
              We may also collect anonymous, non-personal analytics data (such as pages visited
              and marketing campaign attribution) to understand how visitors use this site and to
              measure the performance of our advertising.
            </p>
            <p>
              We do not sell your personal information. Information submitted through forms on
              this site may be shared with {business.name}&apos;s scheduling and customer
              management tools solely to respond to and fulfill your request.
            </p>
            <p>
              To ask about the information we have on file, or to request it be removed, contact{" "}
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
