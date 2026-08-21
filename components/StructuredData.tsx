import { jsonLdProps } from "@/lib/schema";

export function StructuredData({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(data)} />
  );
}
