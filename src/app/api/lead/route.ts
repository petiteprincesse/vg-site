import { NextResponse } from 'next/server';
import { site } from '@/content/site';
import { leadRequestSchema, toLeadErrors, type LeadResponse } from '@/lib/lead';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { formatLeadMessage, getTelegramConfig, sendTelegramMessage } from '@/lib/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 2000;
const LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

function reply(body: LeadResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

function isForeignOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  const allowed = new Set([new URL(site.url).host, request.headers.get('x-forwarded-host'), request.headers.get('host')]);
  try {
    return !allowed.has(new URL(origin).host);
  } catch {
    return true;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  if (isForeignOrigin(request)) return reply({ ok: false, code: 'forbidden' }, 403);

  const limited = rateLimit(`lead:${clientIp(request.headers)}`, LIMIT);
  if (!limited.ok) {
    return reply({ ok: false, code: 'rate_limited', retryAfter: limited.retryAfter }, 429, {
      'retry-after': String(limited.retryAfter),
    });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return reply({ ok: false, code: 'too_large' }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply({ ok: false, code: 'invalid', errors: {} }, 400);
  }

  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) return reply({ ok: false, code: 'invalid', errors: toLeadErrors(parsed.error) }, 422);

  const { meta, website, startedAt, ...lead } = parsed.data;

  const tooFast = startedAt !== undefined && Date.now() - startedAt < MIN_FILL_MS;
  if (website || tooFast) {
    console.warn(`[lead] dropped as spam (${website ? 'honeypot' : 'too fast'})`);
    return reply({ ok: true }, 201);
  }

  const config = getTelegramConfig();
  if (!config) {
    console.error('[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set');
    return reply({ ok: false, code: 'unavailable' }, 503);
  }

  const result = await sendTelegramMessage(config, formatLeadMessage(lead, meta));
  if (!result.ok) {
    console.error(`[lead] Telegram delivery failed: ${result.reason}`);
    return reply({ ok: false, code: 'delivery_failed' }, 502);
  }

  return reply({ ok: true }, 201);
}
