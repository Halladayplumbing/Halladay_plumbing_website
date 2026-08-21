import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("drain-cleaning")!;
const content = getServicePageContent("drain-cleaning")!;

export const metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/drain-cleaning/",
});

export default function DrainCleaningPage() {
  return <ServicePageTemplate service={service} content={content} />;
}
