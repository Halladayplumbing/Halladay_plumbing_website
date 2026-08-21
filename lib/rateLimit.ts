// Minimal in-memory rate limiter for the lead API route.
//
// NOTE: this is process-local, so it resets on redeploy and does not
// coordinate across multiple serverless instances. It's sufficient as a
// first line of defense against basic abuse/spam bots in a single-instance
// or long-running Node deployment. For production-grade protection at
// scale, front this route with an edge-level rate limiter (e.g. Vercel
// Firewall, Cloudflare, or a Redis-backed limiter).

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);

  // Periodically prevent unbounded map growth.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
    }
  }

  return timestamps.length > MAX_REQUESTS;
}
