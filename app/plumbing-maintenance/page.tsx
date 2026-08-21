import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("plumbing-maintenance")!;
const content = getServicePageContent("plumbing-maintenance")!;

export const metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/plumbing-maintenance/",
});

export default function PlumbingMaintenancePage() {
  return <ServicePageTemplate service={service} content={content} />;
}
