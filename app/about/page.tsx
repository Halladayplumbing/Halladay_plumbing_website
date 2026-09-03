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
const team = [
  {
    image: "/photos/erik-halladay-founder-owner-portrait.webp",
    alt: "Erik Halladay, founder and owner of Halladay Plumbing",
    name: "Erik Halladay",
    role: "Founder & Owner",
    bio: "Erik founded Halladay Plumbing in 1994 after beginning his plumbing career in 1992. He built the company around professional workmanship, straightforward communication, and long-term relationships with customers throughout Southern Utah.",
    veteran: true,
  },
  {
    image: "/photos/kyler-bennett-service-manager-portrait.webp",
    alt: "Kyler Bennett, service manager at Halladay Plumbing",
    name: "Kyler Bennett",
    role: "Service Manager",
    bio: "Kyler leads Halladay's service team with a focus on accurate diagnosis, clear communication, and professional care inside the customer's home. He helps make sure customers understand the recommended solution and the work being completed.",
    veteran: false,
  },
];

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
              Halladay Plumbing is built around local relationships, clear communication, and
              professional workmanship. Our team lives and works in the communities we serve, and
              we stand behind the work we do.
            </p>
          </div>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src="/photos/erik-halladay-founder-owner-with-service-truck.webp"
              alt="Erik Halladay, founder and owner of Halladay Plumbing, standing beside a Halladay service truck in Cedar City"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
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

      <section className="py-14 lg:py-20">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            The People Behind Halladay Plumbing
          </p>
          <h2 className="mt-2 text-section-title font-extrabold text-ink">Meet the Team</h2>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.name} className="overflow-hidden rounded-lg border border-border bg-background">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    sizes="(min-width: 640px) 360px, 100vw"
                    className="object-cover object-[50%_20%]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg font-bold text-ink">{member.name}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
                  {member.veteran ? <VeteranBadge className="mt-3" /> : null}
                  <p className="mt-3 text-sm text-ink-muted">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyHalladayInline />
      <FinalCTA />
    </>
  );
}
