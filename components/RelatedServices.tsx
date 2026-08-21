import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceById } from "@/data/services";

export function RelatedServices({ serviceIds }: { serviceIds: string[] }) {
  const related = serviceIds.map(getServiceById).filter((s): s is NonNullable<typeof s> => Boolean(s));
  if (related.length === 0) return null;

  return (
    <section className="py-14 lg:py-20">
      <div className="container-page">
        <h2 className="text-xl font-bold text-ink">Related Services</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {related.map((s) => (
            <Link
              key={s.id}
              href={`/${s.slug}/`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
            >
              {s.name}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
