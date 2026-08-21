import { CheckCircle2 } from "lucide-react";
import { business } from "@/data/business";
import { PhoneButton } from "@/components/PhoneButton";
import { CTAButton } from "@/components/CTAButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thank You",
  description: "Your request has been submitted to Halladay Plumbing.",
  path: "/thank-you/",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="py-20 text-center">
      <div className="container-page mx-auto max-w-lg">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-extrabold text-ink">Thanks — we&apos;ve got your request.</h1>
        <p className="mt-3 text-ink-muted">
          A member of the {business.name} team will follow up shortly to confirm details.
        </p>
        <p className="mt-2 text-ink-muted">
          Need to reach us sooner? Call {business.phones.main.display}.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <PhoneButton size="lg" />
          <CTAButton href="/" size="lg" variant="outline" className="!border-primary !text-primary">
            Back to Home
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
