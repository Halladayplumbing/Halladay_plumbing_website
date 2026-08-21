import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark",
  accent: "bg-accent text-white hover:bg-accent-dark active:bg-accent-dark",
  outline: "border-2 border-white text-white hover:bg-white/10",
  ghost: "text-primary hover:bg-primary-light",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-base min-h-[44px]",
  lg: "px-7 py-4 text-lg min-h-[52px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternalOrSpecial = /^(tel:|mailto:|https?:\/\/)/.test(href);
  const classes = cn(base, variants[variant], sizes[size], "w-full sm:w-auto", className);

  if (isExternalOrSpecial) {
    return (
      <a href={href} className={classes} {...rest}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {icon}
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}
