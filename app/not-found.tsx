import Link from "next/link";
import { business } from "@/data/business";
import { PhoneButton } from "@/components/PhoneButton";

const links = [
  { label: "Home", href: "/" },
  { label: "Plumbing Services", href: "/plumbing-services/" },
  { label: "Water Softeners", href: "/water-softeners/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "Contact", href: "/contact/" },
];

export default function NotFound() {
  return (
    <section className="py-20 text-center">
      <div className="container-page mx-auto max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
        <h1 className="mt-2 text-3xl font-extrabold text-ink">We couldn&apos;t find that page.</h1>
        <p className="mt-3 text-ink-muted">
          The page you&apos;re looking for may have moved. Try one of these instead, or call{" "}
          {business.name} directly.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-block rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <PhoneButton size="lg" />
        </div>
      </div>
    </section>
  );
}
