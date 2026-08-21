import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("tankless-water-heaters")!;
const content = getServicePageContent("tankless-water-heaters")!;

export const metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/tankless-water-heaters/",
});

export default function TanklessWaterHeatersPage() {
  return <ServicePageTemplate service={service} content={content} />;
}
