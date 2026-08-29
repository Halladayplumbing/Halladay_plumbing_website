import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { WaterSoftenerFeature } from "@/components/sections/WaterSoftenerFeature";
import { LocalTrustSection } from "@/components/sections/LocalTrustSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { ServicePlanSection } from "@/components/sections/ServicePlanSection";
import { NewConstructionCTA } from "@/components/sections/NewConstructionCTA";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StructuredData } from "@/components/StructuredData";
import { localBusinessSchema } from "@/lib/schema";
import { getFaqsFor } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Cedar City Plumber | Halladay Plumbing",
  description:
    "Veteran-owned plumbers serving Cedar City & Southern Utah since 1994. Water heaters, softeners, drain cleaning, repairs, and new construction. Call today.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Halladay Plumbing | Cedar City's Local Plumbing Experts",
    description:
      "Veteran-owned, local plumbers serving Cedar City & Southern Utah since 1994 — water heaters, softeners, drain cleaning, repairs, and new construction.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={localBusinessSchema()} />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <WaterSoftenerFeature />
      <LocalTrustSection />
      <ProcessSection />
      <TestimonialCarousel />
      <ServicePlanSection />
      <NewConstructionCTA />

      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-section-title font-extrabold text-ink">Where We Work</h2>
            <p className="mt-4 text-lg text-ink-muted">
              Halladay Plumbing is based in Cedar City and serves the surrounding Southern Utah
              towns below.
            </p>
          </div>
          <div className="mt-10">
            <ServiceAreaMap />
          </div>
        </div>
      </section>

      <FAQAccordion faqs={getFaqsFor("homepage")} />
      <FinalCTA />
    </>
  );
}
