import { AlertTriangle } from "lucide-react";
import { PhoneButton } from "@/components/PhoneButton";
import { CTAButton } from "@/components/CTAButton";

const situations = [
  "Burst pipes",
  "Active leaks",
  "Sewer backups",
  "Overflowing fixtures",
  "Major drain backups",
  "Water heater leaks",
];

export function EmergencyCTA() {
  return (
    <section className="bg-danger py-16 text-white lg:py-20">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-7 w-7 shrink-0" aria-hidden="true" />
            <h2 className="text-section-title font-extrabold">Plumbing Emergency?</h2>
          </div>
          <p className="mt-4 max-w-xl text-white/90">
            If you&apos;re dealing with an active plumbing leak, major backup, burst pipe, water
            heater leak, or another urgent plumbing issue, contact Halladay&apos;s emergency
            plumbing line.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/90">
            {situations.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PhoneButton
              emergency
              size="lg"
              variant="accent"
              label="Call Emergency Plumbing"
              className="!bg-white !text-danger hover:!bg-white/90"
            />
            <CTAButton
              href="/emergency-plumber-cedar-city-ut/"
              size="lg"
              variant="outline"
              trackAs="schedule_service_click"
              className="!border-white !text-white hover:!bg-white/10"
            >
              View Emergency Services
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
