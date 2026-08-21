import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("leak-repair")!;
const content = getServicePageContent("leak-repair")!;

export const metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/leak-repair/",
});

export default function LeakRepairPage() {
  return <ServicePageTemplate service={service} content={content} />;
}
