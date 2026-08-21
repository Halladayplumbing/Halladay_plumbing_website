import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("water-treatment")!;
const content = getServicePageContent("water-treatment")!;

export const metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/water-treatment/",
});

export default function WaterTreatmentPage() {
  return <ServicePageTemplate service={service} content={content} />;
}
