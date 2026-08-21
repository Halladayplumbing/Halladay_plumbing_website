// Customer reviews.
//
// The entries below are real reviews copied verbatim from Halladay
// Plumbing's live Google Business Profile (captured Aug 2026 —
// https://share.google/mPPnRa5FMAp4Zg4Yz). Nothing here is fabricated.
// The profile shows 22 total reviews, all 5-star; only the reviews whose
// full text could be captured are included below. Add the remaining
// ones here as they're gathered (same shape) — components render
// whatever this array contains and hide themselves entirely when empty.
//
// True automatic/live syncing from Google would require a Google Places
// API key on a billing-enabled Google Cloud project, called from a
// server route (Google's terms don't allow client-side scraping of
// review content). This file is a manually-refreshed snapshot until
// that's set up.

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
    id: "google-valynda-mooney",
    author: "VaLynda M.",
    rating: 5,
    text: "Kyler answered my call quickly, got the needed parts and traveled to my small town and had the leak fixed in no time! He even went the extra mile installing 2 new toilets for me! Fast, friendly, quality service!",
    tags: ["leak-repair", "plumbing-repair"],
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
];

export function getReviewsByTag(tag?: string): Review[] {
  if (!tag) return reviews;
  return reviews.filter((r) => r.tags.includes(tag));
}
