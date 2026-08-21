import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Halladay Plumbing",
  description: `About Halladay Plumbing, a local plumbing company serving ${business.primaryCity} and ${business.serviceRegion}.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h1 className="text-section-title font-extrabold text-ink">
              A Local Plumbing Company Serving Southern Utah
            </h1>
            <p className="mt-4 text-ink-muted">
              Halladay Plumbing is a local plumbing team working throughout {business.primaryCity}{" "}
              and the surrounding {business.serviceRegion} area, handling residential and
              commercial plumbing — from everyday repairs to water softener installation and
              emergency plumbing.
            </p>
            <p className="mt-4 text-ink-muted">
              Being a local company means understanding the water conditions, homes, and
              businesses here, and being accountable to the community we work in. We aim to
              communicate clearly, recommend only what your home or business actually needs, and
              treat your property with respect while we work.
            </p>
          </div>
          <PlaceholderImage label="Halladay Plumbing team, founder, or truck photo" aspect="aspect-[4/3]" />
        </div>
      </section>

      <WhyHalladayInline />
      <FinalCTA />
    </>
  );
}
