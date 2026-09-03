"use client";

import { QualificationForm } from "@/components/forms/QualificationForm";
import { forms } from "@/data/forms";

const waterSoftenerForm = forms.find((f) => f.id === "water-softener")!;

// A single, linear qualifier -> contact-info flow, same pattern as every
// other service's QualificationForm usage on the site. Previously this
// staged a visitor through a separate Hard Water Signs Check quiz
// (components/conversion/HardWaterSignsCheck.tsx) and a separate Offer
// Eligibility quiz (components/conversion/OfferEligibility.tsx) before
// ever reaching this form — three different "Step 1 of N" progress
// counters back to back. Consolidated into the water-softener
// QualificationForm's own three qualifying questions (see its entry in
// data/forms.ts) per the funnel-simplification brief. Those two
// components are left in place, just unused, rather than deleted, in
// case they're wanted again.
export function WaterSoftenerConversionFlow() {
  return (
    <QualificationForm
      config={waterSoftenerForm}
      funnelId="water-softener-installation"
      thankYouPath="/thank-you/water-softener/"
    />
  );
}
