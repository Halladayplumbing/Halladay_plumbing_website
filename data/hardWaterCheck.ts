import type { DiagnosticQuestion } from "@/components/conversion/DiagnosticQuiz";

// "60-Second Hard Water Signs Check" — an interactive diagnostic, not a
// "free water test/inspection" (no equipment involved, no name/phone/email
// required to see a result). Five single-select questions; each option
// carries a `points` weight used by scoreHardWaterCheck() below.

export const hardWaterCheckQuestions: DiagnosticQuestion[] = [
  {
    id: "buildup",
    question: "Do you notice white or chalky buildup around faucets or showerheads?",
    type: "single",
    options: [
      { value: "yes", label: "Yes, regularly" },
      { value: "sometimes", label: "Occasionally" },
      { value: "no", label: "Not that I've noticed" },
    ],
  },
  {
    id: "spots",
    question: "Do spots or streaks return quickly on dishes or glassware after washing?",
    type: "single",
    options: [
      { value: "yes", label: "Yes, often" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "Rarely or never" },
    ],
  },
  {
    id: "scale",
    question: "Have you noticed scale buildup on fixtures, faucets, or in appliances?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "A little" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "softener",
    question: "What's your current water softener situation?",
    type: "single",
    options: [
      { value: "none", label: "No softener installed" },
      { value: "not-working", label: "Have one, but not sure it's working well" },
      { value: "working", label: "Have one, and it seems to work fine" },
    ],
  },
  {
    id: "concern",
    question: "What concerns you most about your home's water?",
    type: "single",
    options: [
      { value: "fixtures", label: "Buildup on fixtures and appliances" },
      { value: "skin-hair", label: "How it feels on skin and hair" },
      { value: "appliance-life", label: "Wear on water-using appliances" },
      { value: "not-sure", label: "Not sure — just checking" },
    ],
  },
];

const POINTS: Record<string, Record<string, number>> = {
  buildup: { yes: 2, sometimes: 1, no: 0 },
  spots: { yes: 2, sometimes: 1, no: 0 },
  scale: { yes: 2, sometimes: 1, no: 0 },
  softener: { none: 1, "not-working": 2, working: 0 },
  concern: { fixtures: 1, "skin-hair": 1, "appliance-life": 1, "not-sure": 0 },
};

export type HardWaterResultTier = "low" | "medium" | "high";

export interface HardWaterResult {
  tier: HardWaterResultTier;
  label: string;
  description: string;
}

export function scoreHardWaterCheck(answers: Record<string, string | string[]>): HardWaterResult {
  let score = 0;
  for (const [questionId, weights] of Object.entries(POINTS)) {
    const answer = answers[questionId];
    if (typeof answer === "string" && answer in weights) {
      score += weights[answer];
    }
  }

  if (score <= 2) {
    return {
      tier: "low",
      label: "Few Common Signs",
      description:
        "Based on your answers, your home shows few of the common signs of hard water. If anything changes, Halladay is available to take a closer look.",
    };
  }
  if (score <= 5) {
    return {
      tier: "medium",
      label: "Multiple Common Signs",
      description:
        "Based on your answers, your home shows multiple common signs associated with hard water. A quick evaluation from Halladay can confirm what's going on and what, if anything, makes sense to do about it.",
    };
  }
  return {
    tier: "high",
    label: "Strong Indications Worth Evaluating",
    description:
      "Based on your answers, your home shows several strong indications worth having a Halladay technician evaluate in person.",
  };
}
