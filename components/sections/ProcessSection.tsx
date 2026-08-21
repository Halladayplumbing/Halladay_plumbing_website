import { PhoneCall, ClipboardCheck, Wrench } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

const steps = [
  {
    icon: PhoneCall,
    title: "Tell Us What You Need",
    body: "Call or request service online.",
  },
  {
    icon: ClipboardCheck,
    title: "Get a Professional Diagnosis",
    body: "Halladay evaluates the plumbing problem and explains the recommended solution.",
  },
  {
    icon: Wrench,
    title: "Get the Problem Fixed",
    body: "The work is completed and the homeowner understands what was done.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-title font-extrabold text-ink">How It Works</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative rounded-lg border border-border bg-background p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold">
                {i + 1}
              </div>
              <step.icon className="mx-auto mt-4 h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CTAButton href="/contact/" size="lg">
            Schedule Service
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
