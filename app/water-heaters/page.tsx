import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("water-heaters")!;
const content = getServicePageContent("water-heaters")!;

export const metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/water-heaters/",
});

export default function WaterHeatersPage() {
  return <ServicePageTemplate service={service} content={content} />;
}
