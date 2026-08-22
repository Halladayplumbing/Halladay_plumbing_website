"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { DiagnosticQuiz, type DiagnosticAnswers } from "@/components/conversion/DiagnosticQuiz";
import { Button } from "@/components/ui/Button";
import { PhoneButton } from "@/components/PhoneButton";
import { offerEligibilityQuestions, evaluateOfferEligibility, type EligibilityResult } from "@/data/offerEligibility";
import { trackEvent } from "@/lib/analytics";

interface OfferEligibilityProps {
  /** Called only when the visitor is qualified and continues — hand off into contact capture. */
  onQualified: () => void;
}

// Offer Eligibility gate for the Halladay Home Water Protection Package.
// Determines fit (homeowner + service area, mainly) before a visitor is
// asked for contact info. A "not a fit right now" result stays neutral
// and still offers a way to reach Halladay directly — never a dead end,
// never dismissive.
export function OfferEligibility({ onQualified }: OfferEligibilityProps) {
  const [result, setResult] = useState<EligibilityResult | null>(null);

  function handleComplete(answers: DiagnosticAnswers) {
    const r = evaluateOfferEligibility(answers);
    trackEvent("offer_eligibility_completed", { qualified: r.qualified });
    if (!r.qualified) trackEvent("offer_not_qualified");
    setResult(r);
  }

  if (result) {
    if (result.qualified) {
      return (
        <div className="rounded-lg border border-border bg-background p-6 text-center shadow-md sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Good News</p>
          <h3 className="mt-1 text-xl font-bold text-ink sm:text-2xl">Your home looks like a good fit</h3>
          <p className="mx-auto mt-3 max-w-md text-ink-muted">
            Based on your answers, Halladay can move forward with a Home Water Assessment for your home.
          </p>
          <Button variant="accent" size="lg" className="mt-6" onClick={onQualified}>
            Request My Hard Water Assessment
          </Button>
        </div>
      );
    }

    return (
      <div className="rounded-lg border border-border bg-background p-6 text-center shadow-md sm:p-8">
        <Info className="mx-auto h-8 w-8 text-ink-muted" aria-hidden="true" />
        <h3 className="mt-3 text-xl font-bold text-ink">Let&apos;s Connect Directly</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-muted">{result.reason}</p>
        <div className="mt-6 flex justify-center">
          <PhoneButton size="lg" variant="primary" />
        </div>
      </div>
    );
  }

  return (
    <DiagnosticQuiz
      questions={offerEligibilityQuestions}
      onComplete={handleComplete}
      startEvent="offer_eligibility_started"
      ctaText="Check My Eligibility"
    />
  );
}
