# Halladay Plumbing — Website & Lead-Generation Platform

Next.js 16 / TypeScript / Tailwind CSS site for Halladay Plumbing (Cedar City, UT). Built as a
configurable customer-acquisition platform, not a static brochure site — see **Architecture**
below for how to run campaigns without touching component code.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in analytics/webhook values when ready
npm run dev                  # http://localhost:3000
```

```bash
npm run typecheck   # tsc --noEmit
npm run lint         # eslint (flat config)
npm run build         # production build
```

## Architecture

All editable business content lives in `/data`, not in components or page JSX:

| File | Controls |
|---|---|
| `data/business.ts` | Name, phones (main + emergency), email, hours, socials, review rating — all placeholders flagged until confirmed |
| `data/services.ts` | Service catalog, nav categories, related-service links |
| `data/serviceAreas.ts` | Confirmed cities only — gates which `/service-areas/*` pages exist |
| `data/offers.ts` | The offer engine — see below |
| `data/funnels.ts` | Paid landing page (`/lp/*`) configuration |
| `data/forms.ts` | Qualification form questions per service |
| `data/faqs.ts` | FAQ content per page/topic |
| `data/reviews.ts` | Reviews — intentionally empty until real Google reviews are supplied |
| `data/navigation.ts` | Header/footer nav links |
| `data/servicePageContent.ts` | Long-form copy for each organic service page |

**To launch a new paid campaign:** add an entry to `data/offers.ts` and `data/funnels.ts`
(optionally a new entry in `data/forms.ts` if the qualification questions differ). No new
page/component code is required — `/lp/[slug]/page.tsx` renders any funnel from its config.

**To change or retire a promotion:** edit/flip `active` on the relevant offer in
`data/offers.ts`. Every page that shows that offer (homepage, service page, funnel, `/specials/`)
updates automatically.

**To enable the emergency number:** fill in `business.phones.emergency.display` / `.e164` and set
`enabled: true` in `data/business.ts`. Every emergency CTA site-wide (sticky mobile bar, emergency
page, emergency funnel, footer) switches over automatically; until then they fall back to the main
line.

## Lead pipeline

Every form (`QualificationForm`, `ContactForm`) builds a normalized `Lead` object
(`lib/leads.ts`) and POSTs it to `app/api/lead/route.ts` — the single integration point. Set
`LEAD_WEBHOOK_URL` (and optionally `LEAD_WEBHOOK_SECRET`) in the environment to forward leads to
Jobber, ServiceTitan, Housecall Pro, GoHighLevel, HubSpot, or a Zapier/Make catch hook. Without it,
leads are validated, rate-limited, and logged server-side only (safe local/dev default).

## Analytics

`lib/analytics.ts` fires a typed set of events (`phone_click`, `form_start`,
`water_softener_lead`, `offer_claim`, etc. — full list in that file) to `window.dataLayer`,
`gtag`, and `fbq` when present. Nothing loads until you set the relevant env var — see
`.env.example` for `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
`NEXT_PUBLIC_GOOGLE_ADS_ID`.

## No fabricated content

Per the project brief, nothing here invents Halladay facts. Ratings, review counts, hours,
licensing, service areas beyond Cedar City, and active offers all render conditionally and are
hidden until real data is supplied in `/data`. See the delivery report for the full list of
what's still needed from Halladay.
