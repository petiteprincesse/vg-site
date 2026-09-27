import 'server-only';

type Window = { limit: number; windowMs: number };

const hits = new Map<string, number[]>();
const SWEEP_AT = 5000;

function sweep(now: number, windowMs: number) {
  for (const [key, stamps] of hits) {
    if (stamps.every((stamp) => now - stamp >= windowMs)) hits.delete(key);
  }
}

export function rateLimit(key: string, { limit, windowMs }: Window): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  if (hits.size > SWEEP_AT) sweep(now, windowMs);

  const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const oldest = recent[0] ?? now;
    return { ok: false, retryAfter: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)) };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true };
}

export function clientIp(headers: Headers): string {
  const real = headers.get('x-real-ip')?.trim();
  if (real) return real;
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || 'unknown';
}
