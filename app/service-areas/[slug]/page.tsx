import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getActiveServiceAreas, getServiceAreaBySlug } from "@/data/serviceAreas";
import { getFeaturedServices } from "@/data/services";
import { getFaqsFor } from "@/data/faqs";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { PhoneButton } from "@/components/PhoneButton";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceAreaGrid } from "@/components/ServiceAreaGrid";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StructuredData } from "@/components/StructuredData";
import { localBusinessSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getActiveServiceAreas().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) return {};
  return pageMetadata({
    title: `Plumber in ${area.city}, ${area.state}`,
    description: `Residential and commercial plumbing services in ${area.city}, ${area.state} from Halladay Plumbing — water softeners, water heaters, drain cleaning, and emergency plumbing.`,
    path: `/service-areas/${area.slug}/`,
  });
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) notFound();

  const featured = getFeaturedServices();

  return (
    <>
      <StructuredData data={localBusinessSchema()} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas/cedar-city-ut/" },
          { label: `${area.city}, ${area.state}`, href: `/service-areas/${area.slug}/` },
        ]}
      />

      <PageHero
        eyebrow="Service Area"
        headline={`Plumber in ${area.city}, ${area.state}`}
        subheadline={`Halladay Plumbing provides residential and commercial plumbing throughout ${area.city} — plumbing repair, water heaters, drain cleaning, water softeners, and emergency plumbing.`}
        imageLabel={`Halladay Plumbing service work in ${area.city}, ${area.state}`}
        primaryCta={
          <CTAButton href="/contact/" size="lg">
            Schedule Service
          </CTAButton>
        }
        secondaryCta={<PhoneButton size="lg" variant="outline" className="!border-primary !text-primary" />}
      />

      {area.localNotes && (
        <section className="py-14 lg:py-20">
          <div className="container-page mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Local Water Conditions in {area.city}
            </h2>
            <p className="mt-4 text-ink-muted">{area.localNotes}</p>
            <CTAButton href="/water-softeners/" size="md" variant="outline" className="mt-6 !border-primary !text-primary">
              Learn About Water Softeners
            </CTAButton>
          </div>
        </section>
      )}

      <section className="bg-surface py-14 lg:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Plumbing Services in {area.city}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      <WhyHalladayInline />
      <TestimonialCarousel />
      <ServiceAreaGrid />
      <FAQAccordion faqs={getFaqsFor("homepage")} title={`${area.city} Plumbing FAQs`} />
      <FinalCTA headline={`Need a Plumber in ${area.city}?`} />
    </>
  );
}
