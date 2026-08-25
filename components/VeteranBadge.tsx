import { Medal } from "lucide-react";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

// Renders nothing until Halladay confirms this credential — see
// data/business.ts credentials.veteranOwned. Kept as one shared
// component so the badge looks identical everywhere it appears
// (homepage hero, footer, about page) instead of drifting. `variant`
// swaps the palette for placement on the dark-red footer vs. light
// surfaces elsewhere.
export function VeteranBadge({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  if (!business.credentials.veteranOwned.confirmed) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        variant === "light"
          ? "border-primary/25 bg-primary-light text-primary-dark"
          : "border-white/30 bg-white/10 text-white",
        className,
      )}
    >
      <Medal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {business.credentials.veteranOwned.label}
    </span>
  );
}
