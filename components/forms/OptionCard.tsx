import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function OptionCard({
  label,
  selected,
  onClick,
  multi = false,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "flex min-h-[52px] w-full items-center justify-between gap-3 rounded-md border-2 px-4 py-3 text-left text-sm font-medium transition-colors duration-150",
        selected
          ? "border-primary bg-primary-light text-primary"
          : "border-border bg-background text-ink hover:border-primary/50",
      )}
    >
      {label}
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center border-2",
          multi ? "rounded" : "rounded-full",
          selected ? "border-primary bg-primary" : "border-border bg-background",
        )}
      >
        {selected && <Check className="h-3.5 w-3.5 text-white" aria-hidden="true" />}
      </span>
    </button>
  );
}
