import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// No real Halladay photography has been supplied to this build. Per the
// project's no-fabrication rule, we do not substitute generic stock or
// AI-generated "technician" imagery pretending to be Halladay. Instead
// this component renders a clearly-labeled placeholder so every image
// slot in the site is easy for Halladay/Lusso Media to find and swap for
// real photography (see the Missing Assets list in the final report).
export function PlaceholderImage({
  label,
  className,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface p-6 text-center",
        aspect,
        className,
      )}
    >
      <ImageIcon className="h-8 w-8 text-ink-muted" strokeWidth={1.5} aria-hidden="true" />
      <p className="text-sm font-medium text-ink-muted">Photo needed</p>
      <p className="max-w-[220px] text-xs text-ink-muted">{label}</p>
    </div>
  );
}
