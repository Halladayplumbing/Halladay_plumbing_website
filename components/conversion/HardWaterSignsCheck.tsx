"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { DiagnosticQuiz, type DiagnosticAnswers } from "@/components/conversion/DiagnosticQuiz";
import { Button } from "@/components/ui/Button";
import { hardWaterCheckQuestions, scoreHardWaterCheck, type HardWaterResult } from "@/data/hardWaterCheck";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

const RESULT_ICON = {
  low: CheckCircle2,
  medium: AlertCircle,
  high: AlertTriangle,
} as const;

const RESULT_EVENT: Record<HardWaterResult["tier"], AnalyticsEvent> = {
  low: "hard_water_result_low",
  medium: "hard_water_result_medium",
  high: "hard_water_result_high",
};

interface HardWaterSignsCheckProps {
  /** Called when the visitor continues past the result — hand off into Offer Eligibility / contact capture. */
  onContinue: (result: HardWaterResult) => void;
}

// "60-Second Hard Water Signs Check" — an interactive lead magnet, not a
// "free water test." No name/phone/email collected here; the result is
// shown instantly, client-side. Continuing past the result is the only
// place this hands off toward contact capture (via onContinue).
export function HardWaterSignsCheck({ onContinue }: HardWaterSignsCheckProps) {
  const [result, setResult] = useState<HardWaterResult | null>(null);

  function handleComplete(answers: DiagnosticAnswers) {
    const r = scoreHardWaterCheck(answers);
    trackEvent(RESULT_EVENT[r.tier]);
    setResult(r);
  }

  if (result) {
    const Icon = RESULT_ICON[result.tier];
    return (
      <div className="rounded-lg border border-border bg-background p-6 text-center shadow-md sm:p-8">
        <Icon className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary">Your Result</p>
        <h3 className="mt-1 text-xl font-bold text-ink sm:text-2xl">{result.label}</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-muted">{result.description}</p>
        <Button variant="accent" size="lg" className="mt-6" onClick={() => onContinue(result)}>
          See If Your Home Qualifies
        </Button>
      </div>
    );
  }

  return (
    <DiagnosticQuiz
      questions={hardWaterCheckQuestions}
      onComplete={handleComplete}
      startEvent="hard_water_check_started"
      stepEvent="hard_water_check_step_completed"
      completeEvent="hard_water_check_completed"
      ctaText="See My Result"
    />
  );
}
