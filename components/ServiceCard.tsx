import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = (Icons[service.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Wrench;

  return (
    <Link
      href={`/${service.slug}/`}
      className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary-light text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-muted">{service.outcomeStatement}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
