import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { WaterSoftenerFeature } from "@/components/sections/WaterSoftenerFeature";
import { LocalTrustSection } from "@/components/sections/LocalTrustSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReviewsGrid } from "@/components/ReviewsGrid";
import { ServicePlanSection } from "@/components/sections/ServicePlanSection";
import { EmergencyCTA } from "@/components/sections/EmergencyCTA";
import { ServiceAreaGrid } from "@/components/ServiceAreaGrid";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StructuredData } from "@/components/StructuredData";
import { localBusinessSchema } from "@/lib/schema";
import { getFaqsFor } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Cedar City Plumber | Residential & Commercial Plumbing",
  description:
    "Halladay Plumbing provides residential and commercial plumbing in Cedar City and Southern Utah — water softeners, water heaters, drain cleaning, leak repair, and emergency plumbing.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Halladay Plumbing | Cedar City's Local Plumbing Experts",
    description:
      "Residential and commercial plumbing throughout Cedar City and Southern Utah — water softeners, water heaters, drain cleaning, and more.",
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
      <ReviewsGrid />
      <ServicePlanSection />
      <EmergencyCTA />
      <ServiceAreaGrid />
      <FAQAccordion faqs={getFaqsFor("homepage")} />
      <FinalCTA />
    </>
  );
}
