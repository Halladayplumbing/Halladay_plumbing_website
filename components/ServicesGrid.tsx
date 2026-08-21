import { getFeaturedServices } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid() {
  const featured = getFeaturedServices();

  return (
    <section className="py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-title font-extrabold text-ink">
            Plumbing Services for Your Entire Home
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            From everyday repairs to whole-home water treatment, Halladay Plumbing covers it.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
