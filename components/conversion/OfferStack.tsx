import { CheckCircle2 } from "lucide-react";
import { waterProtectionPackage } from "@/data/waterProtectionPackage";

// Renders the Halladay Home Water Protection Package as a value stack.
// PRICING GATE: no dollar figure is ever rendered unless a line item's
// `priceApproved` is true (see data/waterProtectionPackage.ts) — this
// component enforces that itself so no future edit can leak an
// unapproved price by accident.
export function OfferStack() {
  const pkg = waterProtectionPackage;
  if (!pkg.active) return null;

  return (
    <div className="rounded-lg border border-border bg-background p-6 shadow-md sm:p-8">
      <h3 className="text-xl font-bold text-ink sm:text-2xl">{pkg.name}</h3>
      <p className="mt-2 text-ink-muted">{pkg.tagline}</p>

      <ul className="mt-6 space-y-4">
        {pkg.lineItems.map((item) => (
          <li key={item.id} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink">
                {item.title}
                {item.priceApproved && item.price && (
                  <span className="ml-2 font-normal text-ink-muted">{item.price}</span>
                )}
              </p>
              <p className="text-sm text-ink-muted">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
