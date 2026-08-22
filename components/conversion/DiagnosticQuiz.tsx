"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProgressIndicator } from "@/components/forms/ProgressIndicator";
import { OptionCard } from "@/components/forms/OptionCard";
import { Button } from "@/components/ui/Button";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export interface DiagnosticOption {
  value: string;
  label: string;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  helpText?: string;
  type: "single" | "multi";
  options: DiagnosticOption[];
}

export type DiagnosticAnswers = Record<string, string | string[]>;

interface DiagnosticQuizProps {
  questions: DiagnosticQuestion[];
  onComplete: (answers: DiagnosticAnswers) => void;
  /** Fired once, on the first interaction. */
  startEvent?: AnalyticsEvent;
  /** Fired after each question is answered, with { step, step_index }. */
  stepEvent?: AnalyticsEvent;
  /** Fired when the quiz completes, before onComplete's own effects. */
  completeEvent?: AnalyticsEvent;
  ctaText?: string;
}

// Generic, config-driven multi-step question engine — no name/phone/email
// collected, no submission of its own. Reused for both the Hard Water
// Signs Check and Offer Eligibility (and, per the reusable-architecture
// goal, any future service's diagnostic lead magnet). The parent
// component owns what "the result" means and renders it after
// onComplete fires; this component only handles asking the questions.
export function DiagnosticQuiz({ questions, onComplete, startEvent, stepEvent, completeEvent, ctaText }: DiagnosticQuizProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [started, setStarted] = useState(false);

  const step = questions[stepIndex];
  const total = questions.length;
  const isLastStep = stepIndex === total - 1;

  function markStarted() {
    if (started) return;
    setStarted(true);
    if (startEvent) trackEvent(startEvent);
  }

  function finish(finalAnswers: DiagnosticAnswers) {
    if (completeEvent) trackEvent(completeEvent);
    onComplete(finalAnswers);
  }

  function advance(finalAnswers: DiagnosticAnswers) {
    if (stepEvent) trackEvent(stepEvent, { step: step.id, step_index: stepIndex + 1 });
    setDirection(1);
    if (isLastStep) {
      finish(finalAnswers);
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function selectSingle(value: string) {
    markStarted();
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    window.setTimeout(() => advance(next), 320);
  }

  function toggleMulti(value: string) {
    markStarted();
    setAnswers((prev) => {
      const current = Array.isArray(prev[step.id]) ? (prev[step.id] as string[]) : [];
      const nextValues = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [step.id]: nextValues };
    });
  }

  function canAdvance(): boolean {
    const value = answers[step.id];
    if (step.type === "multi") return Array.isArray(value) && value.length > 0;
    return typeof value === "string" && value.length > 0;
  }

  function goBack() {
    if (stepIndex === 0) return;
    setDirection(-1);
    setStepIndex((i) => i - 1);
  }

  return (
    <div className="rounded-lg border border-border bg-background p-6 shadow-md sm:p-8">
      <ProgressIndicator step={stepIndex + 1} total={total} />

      <div className="overflow-hidden">
        <div key={stepIndex} className={cn(direction === 1 ? "animate-step-forward" : "animate-step-back")}>
          <h3 className="text-xl font-bold text-ink sm:text-2xl">{step.question}</h3>
          {step.helpText && <p className="mt-1 text-sm text-ink-muted">{step.helpText}</p>}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {step.type === "single"
              ? step.options.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    selected={answers[step.id] === opt.value}
                    onClick={() => selectSingle(opt.value)}
                  />
                ))
              : step.options.map((opt) => {
                  const selectedValues = Array.isArray(answers[step.id]) ? (answers[step.id] as string[]) : [];
                  return (
                    <OptionCard
                      key={opt.value}
                      multi
                      label={opt.label}
                      selected={selectedValues.includes(opt.value)}
                      onClick={() => toggleMulti(opt.value)}
                    />
                  );
                })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        {stepIndex > 0 ? (
          <Button variant="ghost" size="md" onClick={goBack} icon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step.type === "multi" && (
          <Button
            variant="accent"
            size="lg"
            onClick={() => advance(answers)}
            disabled={!canAdvance()}
            icon={isLastStep ? undefined : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          >
            {isLastStep ? (ctaText ?? "See My Result") : "Continue"}
          </Button>
        )}
      </div>
    </div>
  );
}
