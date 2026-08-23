// Customer reviews.
//
// The entries below are real reviews copied verbatim from Halladay
// Plumbing's live Google Business Profile — the first three captured
// from the public listing (Aug 2026 —
// https://share.google/mPPnRa5FMAp4Zg4Yz), the rest supplied directly by
// the client from their Google Business review-management dashboard.
// Nothing here is fabricated. The profile shows 22 total reviews, all
// 5-star; only the reviews whose full text has been captured are
// included below. Add the remaining ones here as they're gathered (same
// shape) — components render whatever this array contains and hide
// themselves entirely when empty.
//
// True automatic/live syncing from Google would require a Google Places
// API key on a billing-enabled Google Cloud project, called from a
// server route (Google's terms don't allow client-side scraping of
// review content). This file is a manually-refreshed snapshot until
// that's set up — see scripts/sync-google-reviews.mjs.

export interface Review {
  id: string;
  author: string; // first name + last initial, as shown on Google
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  tags: string[]; // service ids this review relates to
  source: "google";
  date?: string; // ISO date, optional
}

export const reviews: Review[] = [
  {
    id: "google-leonard-correa",
    author: "Leonard C.",
    rating: 5,
    text: "We heard water running inside a wall, shut off the water and contacted Halladay Plumbing right away. Kyler was at our home within the hour and located and replaced a defective T connector. The guys at Halladay are always professional, helpful and efficient. Their payment system is easy to use and secure. We greatly recommend Halladay Plumbing.",
    tags: ["leak-repair"],
    source: "google",
  },
  {
    id: "google-kaden-hannah-murdock",
    author: "Kaden & Hannah M.",
    rating: 5,
    text: "They were super quick and thorough with my leaky sink. Ended up finding an issue that was there since the house was built! Quick fix and we're all around great guys.",
    tags: ["leak-repair", "plumbing-repair"],
    source: "google",
  },
  {
    id: "google-brady-tolbert",
    author: "Brady T.",
    rating: 5,
    text: "The team at Halladay Plumbing was awesome! Great guys and they were very knowledgeable and professional! I would definitely recommend trusting them with your plumbing!",
    tags: ["plumbing-repair"],
    source: "google",
  },
  {
    id: "google-annie-rohrer",
    author: "Annie R.",
    rating: 5,
    text: "Quick to respond, went the extra mile to replace my water heater at the end of the day, so I wouldn't be without water over the weekend. Efficient and considerate.",
    tags: ["water-heaters"],
    source: "google",
  },
  {
    id: "google-shane-hopkins",
    author: "Shane H.",
    rating: 5,
    text: "Halladay Plumbing is fantastic! They delivered and installed a new water softener for me. So professional and easy to work with! Knowledgeable and professional, great service. Thanks guys!",
    tags: ["water-softeners"],
    source: "google",
  },
  {
    id: "google-valynda-mooney",
    author: "VaLynda M.",
    rating: 5,
    text: "Kyler answered my call quickly, got the needed parts and traveled to my small town and had the leak fixed in no time! He even went the extra mile installing 2 new toilets for me! Fast, friendly, quality service!",
    tags: ["leak-repair", "plumbing-repair"],
    source: "google",
  },
  {
    id: "google-jentri-roden",
    author: "Jentri R.",
    rating: 5,
    text: "Great service! They were prompt, professional, and fixed the issue with our outdoor hose bib quickly. Communication was excellent, and the repair was done right the first time. I would definitely recommend them to anyone needing plumbing work!",
    tags: ["plumbing-repair", "leak-repair"],
    source: "google",
  },
  {
    id: "google-kim-fullmer",
    author: "Kim F.",
    rating: 5,
    text: "Great service! Kyler was very professional and fixed the issue quickly. The work was done well, and everything was left clean afterward. I would definitely recommend him to anyone needing reliable plumbing services!!",
    tags: ["plumbing-repair", "plumbing-maintenance"],
    source: "google",
  },
  {
    id: "google-tori-bulloch",
    author: "Tori B.",
    rating: 5,
    text: "Kyler and Brennan were amazing! They came out to check my hot water heater and were able to replace it the very same day. They were professional, friendly, and took the time to explain everything throughout the process.",
    tags: ["water-heaters"],
    source: "google",
  },
  {
    id: "google-peter-h",
    author: "Peter H.",
    rating: 5,
    text: "I had Halladay Plumbing install a water softener system in my home in Southern Utah, and the entire experience was seamless from start to finish. Kyler took the time to walk me through the estimate and, more importantly, explain why a water softener makes such a difference with the hard water we have in Southern Utah. I was already seeing the effects of hard water throughout my home — buildup and mineral deposits affecting my washing machine, kitchen sink, showers, bathroom sinks, and other fixtures and appliances. Instead of just trying to sell me a system, Kyler explained how the water softener works, the benefits of reducing hard-water mineral buildup, and what I could expect after installation. Once everything was installed, he walked me through the entire setup and showed me how little maintenance the system requires. I also signed up for Halladay Plumbing's service plan, which includes yearly water heater flushes and regular water softener salt/pellet delivery. Having them handle the ongoing maintenance makes the system even more convenient. If you're dealing with hard water in Cedar City or anywhere in Southern Utah and are considering a whole-home water softener installation, I would definitely recommend Halladay Plumbing. Professional, knowledgeable, easy to work with, and a smooth experience from the initial estimate through installation. I'll definitely be using Halladay Plumbing for my future plumbing needs in Southern Utah.",
    tags: ["water-softeners"],
    source: "google",
  },
];

export function getReviewsByTag(tag?: string): Review[] {
  if (!tag) return reviews;
  return reviews.filter((r) => r.tags.includes(tag));
}
