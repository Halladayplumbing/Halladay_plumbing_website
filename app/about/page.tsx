import Image from "next/image";
import { CalendarClock, ShieldCheck, HeartHandshake } from "lucide-react";
import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VeteranBadge } from "@/components/VeteranBadge";
import { WhyHalladayInline } from "@/components/sections/WhyHalladayInline";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Halladay Plumbing",
  description: `About Halladay Plumbing, a local plumbing company serving ${business.primaryCity} and ${business.serviceRegion}.`,
  path: "/about/",
});

// Founding story, sourced from Halladay's own About page
// (halladayplumbing.com/about, verified Aug 2026): Erik Halladay,
// Utah National Guard service starting 1992, company founded 1994.
// Ties directly into the confirmed veteranOwned credential in
// data/business.ts, which isn't rendered anywhere else on the site yet.
const storyCards = [
  {
    icon: CalendarClock,
    title: "Three Decades in Southern Utah",
    body: `Halladay Plumbing has served ${business.primaryCity} and the surrounding ${business.serviceRegion} community since ${business.foundedYear}. What began as one plumber's commitment to doing the job right has grown into an experienced team that residential and commercial customers throughout the region rely on today.`,
  },
  {
    icon: ShieldCheck,
    title: "Meet the Founder",
    body: "Owner Erik Halladay got his start in plumbing in 1992 while serving in the Utah National Guard. In 1994, he put that training to work and founded Halladay Plumbing — building the company on the same standards he learned in the service: show up, do the job right, and stand behind it.",
  },
  {
    icon: HeartHandshake,
    title: "Our Commitment to You",
    body: "That standard still guides every job we take on, from a simple repair to a full water treatment install. We recommend only what your home or business actually needs, treat your property with respect, and aren't finished until you're satisfied with the result.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about/" }]} />

      <section className="py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h1 className="text-section-title font-extrabold text-ink">
              A Local Plumbing Company Serving Southern Utah
            </h1>
            <p className="mt-4 text-ink-muted">
              Halladay Plumbing is a local plumbing team working throughout {business.primaryCity}{" "}
              and the surrounding {business.serviceRegion} area, handling residential and
              commercial plumbing — from everyday repairs to water softener installation and
              new construction.
            </p>
            <p className="mt-4 text-ink-muted">
              We&apos;re an independently owned local team, not a franchise — so the people who
              show up at your door are the same people accountable for the results.
            </p>
          </div>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src="/photos/halladay-plumbing-truck-excavator-cedar-city.jpg"
              alt="Halladay Plumbing truck and excavator staged at a new construction job site in Cedar City, UT"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-page">
          <h2 className="text-section-title font-extrabold text-ink">Our Story</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {storyCards.map((card) => (
              <div key={card.title} className="rounded-lg border border-border bg-background p-6">
                <card.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <p className="mt-3 text-base font-bold text-ink">{card.title}</p>
                <p className="mt-2 text-sm text-ink-muted">{card.body}</p>
              </div>
            ))}
          </div>
          {business.credentials.veteranOwned.confirmed ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <VeteranBadge />
              <p className="text-sm text-ink-muted">
                Built on the standards Erik carried from his service in the Utah National Guard.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <WhyHalladayInline />
      <FinalCTA />
    </>
  );
}
