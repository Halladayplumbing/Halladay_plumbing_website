import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("plumbing-repair")!;
const content = getServicePageContent("plumbing-repair")!;

export const metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/plumbing-repair/",
});

export default function PlumbingRepairPage() {
  return <ServicePageTemplate service={service} content={content} />;
}
