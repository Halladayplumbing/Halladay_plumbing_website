export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function telHref(e164: string): string {
  return `tel:${e164}`;
}

// `||` (not `??`) deliberately — an env var set to an empty string (e.g.
// left blank in a hosting dashboard's UI, rather than actually unset)
// must fall back too, or `new URL(SITE_URL)` below throws at build time.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
