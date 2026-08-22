import type { DiagnosticQuestion } from "@/components/conversion/DiagnosticQuiz";
import { findServiceAreaByQuery } from "@/data/serviceAreas";

// "Offer Eligibility" — a short gate (not a scored quiz) that determines
// whether a visitor is a plausible fit for the water softener campaign
// before they're asked to hand over contact info. Tone stays neutral and
// helpful even on a "not a fit right now" result — never hostile or
// dismissive (per the client's explicit instruction).

export const offerEligibilityQuestions: DiagnosticQuestion[] = [
  {
    id: "homeowner",
    question: "Do you own the home?",
    type: "single",
    options: [
      { value: "yes", label: "Yes, I own it" },
      { value: "no", label: "No, I rent" },
    ],
  },
  {
    id: "city",
    question: "What city is the home in?",
    helpText: "Type the closest match to your city.",
    type: "single",
    options: [
      { value: "cedar-city", label: "Cedar City" },
      { value: "enoch", label: "Enoch" },
      { value: "parowan", label: "Parowan" },
      { value: "kanarraville", label: "Kanarraville" },
      { value: "new-harmony", label: "New Harmony" },
      { value: "hurricane", label: "Hurricane" },
      { value: "st-george", label: "St. George" },
      { value: "panguitch", label: "Panguitch" },
      { value: "duck-creek-village", label: "Duck Creek Village" },
      { value: "other", label: "Somewhere else in Southern Utah" },
    ],
  },
  {
    id: "existing-softener",
    question: "Do you currently have a water softener installed?",
    type: "single",
    options: [
      { value: "none", label: "No" },
      { value: "have-one", label: "Yes" },
    ],
  },
  {
    id: "working",
    question: "Is your current system working the way you'd like?",
    type: "single",
    options: [
      { value: "n-a", label: "N/A — I don't have one" },
      { value: "working", label: "Yes, it's working fine" },
      { value: "not-working", label: "No, it's having problems" },
    ],
  },
  {
    id: "timeline",
    question: "What's your timeline?",
    type: "single",
    options: [
      { value: "asap", label: "As soon as possible" },
      { value: "few-weeks", label: "In the next few weeks" },
      { value: "researching", label: "Just researching for now" },
    ],
  },
];

export interface EligibilityResult {
  qualified: boolean;
  reason?: string;
}

export function evaluateOfferEligibility(answers: Record<string, string | string[]>): EligibilityResult {
  const homeowner = answers.homeowner;
  const cityValue = answers.city;

  if (homeowner === "no") {
    return {
      qualified: false,
      reason:
        "This offer is currently set up for homeowners. If that changes, or if you'd still like to talk with Halladay, you're welcome to reach out directly.",
    };
  }

  if (typeof cityValue === "string" && cityValue !== "other") {
    const match = findServiceAreaByQuery(cityValue.replace(/-/g, " "));
    if (!match || !match.active) {
      return {
        qualified: false,
        reason:
          "It looks like your area may be outside Halladay's current service area. You're welcome to reach out directly and Halladay can confirm.",
      };
    }
  }

  return { qualified: true };
}
