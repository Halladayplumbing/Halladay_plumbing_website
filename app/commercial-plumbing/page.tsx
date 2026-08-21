import { getServiceById } from "@/data/services";
import { getServicePageContent } from "@/data/servicePageContent";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { pageMetadata } from "@/lib/seo";

const service = getServiceById("commercial-plumbing")!;
const content = getServicePageContent("commercial-plumbing")!;

export const metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/commercial-plumbing/",
});

export default function CommercialPlumbingPage() {
  return <ServicePageTemplate service={service} content={content} />;
}
