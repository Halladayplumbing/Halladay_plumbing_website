// Customer reviews.
//
// NO REVIEWS ARE FABRICATED. This array intentionally ships empty — real
// reviews must be pulled from Halladay's actual Google Business Profile
// (or supplied directly by Halladay) before publishing. Components that
// render reviews (ReviewsGrid, ReviewCard) check `reviews.length` and
// hide the section entirely when empty, rather than showing placeholder
// or lorem-ipsum testimonials.
//
// To populate: add objects matching the Review interface below. `tags`
// should reference service ids from data/services.ts so pages/funnels can
// filter to relevant reviews via reviewFilter.

export interface Review {
  id: string;
  author: string; // first name + last initial, as shown on Google
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  tags: string[]; // service ids this review relates to
  source: "google";
  date?: string; // ISO date, optional
}

export const reviews: Review[] = [];

export function getReviewsByTag(tag?: string): Review[] {
  if (!tag) return reviews;
  return reviews.filter((r) => r.tags.includes(tag));
}
