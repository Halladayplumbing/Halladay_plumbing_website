export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function telHref(e164: string): string {
  return `tel:${e164}`;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
