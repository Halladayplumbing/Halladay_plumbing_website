import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for the ${business.name} website.`,
  path: "/privacy-policy/",
  noindex: true,
});

const sectionHeading = "mt-10 text-lg font-bold text-ink first:mt-0";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy", href: "/privacy-policy/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h1 className="text-3xl font-extrabold text-ink">Privacy Policy</h1>
          <p className="mt-3 text-sm text-ink-muted">Last updated August 2026</p>

          <div className="mt-8 max-w-none space-y-4 text-sm text-ink-muted">
            <p>
              This Privacy Policy explains how {business.name} (&ldquo;{business.name}
              ,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses, and protects
              information when you visit this website or submit a request through it.
            </p>

            <h2 className={sectionHeading}>Information We Collect</h2>
            <p>
              When you submit a contact or qualification form on this site, we collect the
              information you provide — typically your name, phone number, email address, city or
              service address, and details about the plumbing service you&apos;re requesting. If
              you call the phone numbers listed on this site, standard call information (such as
              the number and time of the call) may be recorded by our phone system for
              scheduling and quality purposes.
            </p>
            <p>
              We also automatically collect limited technical information when you browse this
              site, such as pages visited, general location (city/region level), device and
              browser type, and how you arrived at the site (e.g., a search engine or ad
              campaign).
            </p>

            <h2 className={sectionHeading}>How We Use Your Information</h2>
            <p>We use the information collected through this site to:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Respond to your request and follow up about scheduling an estimate or service</li>
              <li>Provide the plumbing service you contacted us about</li>
              <li>Send appointment confirmations, reminders, or service-related updates by phone, text, or email</li>
              <li>Understand how visitors use this site and improve it over time</li>
              <li>Measure the performance of our advertising so we can serve Southern Utah homeowners more effectively</li>
            </ul>

            <h2 className={sectionHeading}>Phone &amp; Text Communications</h2>
            <p>
              By submitting a form with your phone number, you agree that {business.name} may
              contact you by phone or text message about your request, including to confirm
              details or schedule service. Message and data rates may apply. You can ask to stop
              text communications at any time by replying &ldquo;STOP&rdquo; or by contacting us
              using the information below.
            </p>

            <h2 className={sectionHeading}>Cookies &amp; Analytics</h2>
            <p>
              This site uses Google Analytics to understand how visitors use the site, and may use
              Google Ads and Meta (Facebook/Instagram) advertising tools to measure and improve
              the performance of our marketing campaigns. These services use cookies or similar
              technologies to collect anonymous, aggregated usage data — they do not receive the
              contact details you submit through our forms. You can control cookies through your
              browser settings, and can opt out of personalized Google advertising at{" "}
              <a
                href="https://adssettings.google.com/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                adssettings.google.com
              </a>
              .
            </p>

            <h2 className={sectionHeading}>How We Share Information</h2>
            <p>
              We do not sell your personal information. Information submitted through this site
              may be shared with {business.name}&apos;s scheduling, customer management, and
              call-tracking tools solely to respond to and fulfill your request, and with service
              providers who help us operate this website (such as our hosting and analytics
              providers), each bound to keep it confidential.
            </p>

            <h2 className={sectionHeading}>Data Retention</h2>
            <p>
              We retain the information you submit for as long as reasonably necessary to respond
              to your request, provide service, and maintain business records such as invoices or
              service history.
            </p>

            <h2 className={sectionHeading}>Your Choices</h2>
            <p>
              To ask about the information we have on file, request a copy, or request it be
              corrected or removed, contact us at{" "}
              <a href={`mailto:${business.email}`} className="text-primary hover:underline">
                {business.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${business.phones.main.e164}`} className="text-primary hover:underline">
                {business.phones.main.display}
              </a>
              . We&apos;ll do our best to respond promptly.
            </p>

            <h2 className={sectionHeading}>Children&apos;s Privacy</h2>
            <p>
              This website is intended for adults seeking plumbing services and is not directed
              to children. We do not knowingly collect information from anyone under 13.
            </p>

            <h2 className={sectionHeading}>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices. The &ldquo;Last updated&rdquo; date above reflects the most recent
              revision.
            </p>

            <h2 className={sectionHeading}>Contact Us</h2>
            <p>
              Questions about this Privacy Policy can be sent to{" "}
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
