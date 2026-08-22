"use client";

import { useState } from "react";
import { HardWaterSignsCheck } from "@/components/conversion/HardWaterSignsCheck";
import { OfferEligibility } from "@/components/conversion/OfferEligibility";
import { OfferStack } from "@/components/conversion/OfferStack";
import { QualificationForm } from "@/components/forms/QualificationForm";
import { forms } from "@/data/forms";
import type { HardWaterResult } from "@/data/hardWaterCheck";

const waterSoftenerForm = forms.find((f) => f.id === "water-softener")!;

type Stage = "check" | "eligibility" | "qualified";

// Orchestrates the full water softener conversion path per the campaign
// spec: Hard Water Signs Check -> Offer Eligibility -> (if qualified)
// the Water Protection Package + the existing water-softener
// QualificationForm for contact capture. Deliberately reuses the
// existing QualificationForm/lead pipeline for the final step instead of
// building a second, parallel form — there is exactly one lead-capture
// path on this site.
export function WaterSoftenerConversionFlow() {
  const [stage, setStage] = useState<Stage>("check");
  const [, setResult] = useState<HardWaterResult | null>(null);

  if (stage === "check") {
    return (
      <HardWaterSignsCheck
        onContinue={(r) => {
          setResult(r);
          setStage("eligibility");
        }}
      />
    );
  }

  if (stage === "eligibility") {
    return <OfferEligibility onQualified={() => setStage("qualified")} />;
  }

  return (
    <div className="space-y-6">
      <OfferStack />
      <QualificationForm config={waterSoftenerForm} funnelId="water-softener-installation" thankYouPath="/thank-you/water-softener/" />
    </div>
  );
}
