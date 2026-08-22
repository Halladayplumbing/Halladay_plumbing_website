import { serviceCategories, getServiceById } from "@/data/services";
import { getFaqsFor } from "@/data/faqs";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { ServiceCard } from "@/components/ServiceCard";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plumbing Services in Cedar City, UT",
  description:
    "Full-service residential and commercial plumbing in Cedar City and Southern Utah — plumbing repair, water heaters, water softeners, and drain cleaning.",
  path: "/plumbing-services/",
});

export default function PlumbingServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Plumbing Services", href: "/plumbing-services/" }]} />

      <PageHero
        eyebrow="All Services"
        headline="Plumbing Services for Cedar City & Southern Utah"
        subheadline="Halladay Plumbing handles residential and commercial plumbing — from everyday repairs to water softener installation and new construction."
        imageLabel="Halladay Plumbing technician working on residential plumbing"
        primaryCta={
          <CTAButton href="/contact/" size="lg">
            Schedule Service
          </CTAButton>
        }
        secondaryCta={<PhoneButton size="lg" variant="outline" className="!border-primary !text-primary" />}
      />

      {serviceCategories.map((cat) => (
        <section key={cat.id} className="border-b border-border py-14 lg:py-16">
          <div className="container-page">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{cat.label}</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cat.services.map((id) => {
                const svc = getServiceById(id);
                if (!svc) return null;
                return <ServiceCard key={id} service={svc} />;
              })}
            </div>
          </div>
        </section>
      ))}

      <WhyHalladayInline />
      <FAQAccordion faqs={getFaqsFor("homepage")} />
      <FinalCTA />
    </>
  );
}
