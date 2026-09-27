import 'server-only';
import { fieldsByAudience } from '@/content/contact';
import type { LeadAudience, LeadMeta, LeadPayload } from '@/lib/lead';

const API = 'https://api.telegram.org';
const MESSAGE_LIMIT = 4096;
const TIMEOUT_MS = 8000;
const MAX_RETRY_WAIT_S = 5;

const SOURCE_TAG = '#venture_games';
const SOURCE_LABEL = 'Сайт ВИ (vg-dc.ru)';

const AUDIENCE: Record<LeadAudience, { label: string; tag: string }> = {
  founder: { label: 'Фаундер', tag: '#founder' },
  expert: { label: 'Эксперт', tag: '#expert' },
  partner: { label: 'Партнёр', tag: '#partner' },
  investor: { label: 'Инвестор', tag: '#investor' },
};

const EMPTY = '—';

type TelegramConfig = { token: string; chatId: string };

export function getTelegramConfig(): TelegramConfig | null {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  return token && chatId ? { token, chatId } : null;
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function clip(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

const moscowTime = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Europe/Moscow',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function render(lead: LeadPayload, meta: LeadMeta | undefined, receivedAt: Date, longMax: number): string {
  const audience = AUDIENCE[lead.audience];
  const lines: string[] = [
    `${SOURCE_TAG} #lead ${audience.tag}`,
    '<b>Новая заявка</b>',
    `<b>Кто:</b> ${audience.label}`,
    '',
  ];

  for (const field of fieldsByAudience[lead.audience]) {
    const value = lead[field.name];
    const label = `<b>${escapeHtml(field.label)}:</b>`;
    if (!value) lines.push(`${label} ${EMPTY}`);
    else if (field.multiline) lines.push(`${label}\n${escapeHtml(clip(value, longMax))}`);
    else lines.push(`${label} ${escapeHtml(value)}`);
  }

  lines.push('', `<b>Источник:</b> ${escapeHtml(SOURCE_LABEL)}`);
  if (meta?.referrer) lines.push(`<b>Referrer:</b> ${escapeHtml(meta.referrer)}`);

  const utm = Object.entries(meta?.utm ?? {}).filter(([, value]) => value);
  if (utm.length > 0) {
    lines.push(`<b>UTM:</b> ${utm.map(([key, value]) => `${key}=${escapeHtml(value ?? '')}`).join(', ')}`);
  }

  lines.push(`<b>Отправлено:</b> ${moscowTime.format(receivedAt)} МСК`);
  return lines.join('\n');
}

export function formatLeadMessage(lead: LeadPayload, meta: LeadMeta | undefined, receivedAt = new Date()): string {
  for (let longMax = 1600; longMax >= 200; longMax -= 200) {
    const text = render(lead, meta, receivedAt, longMax);
    if (text.length <= MESSAGE_LIMIT) return text;
  }
  return render(lead, meta, receivedAt, 100);
}

type TelegramResult = { ok: true } | { ok: false; reason: string };

type TelegramApiResponse = {
  ok: boolean;
  error_code?: number;
  description?: string;
  parameters?: { retry_after?: number };
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendTelegramMessage(config: TelegramConfig, text: string): Promise<TelegramResult> {
  const scrub = (message: string) => message.split(config.token).join('***');

  for (let attempt = 1; attempt <= 2; attempt++) {
    let retryAfterMs = 1000;

    try {
      const response = await fetch(`${API}/bot${config.token}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          text,
          parse_mode: 'HTML',
          link_preview_options: { is_disabled: true },
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: 'no-store',
      });

      const body = (await response.json().catch(() => null)) as TelegramApiResponse | null;
      if (response.ok && body?.ok) return { ok: true };

      const reason = scrub(`Telegram ${response.status}: ${body?.description ?? 'no description'}`);
      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt === 2) return { ok: false, reason };

      const retryAfter = body?.parameters?.retry_after;
      if (retryAfter) {
        if (retryAfter > MAX_RETRY_WAIT_S) return { ok: false, reason };
        retryAfterMs = retryAfter * 1000;
      }
    } catch (error) {
      const name = error instanceof Error ? error.name : 'Error';
      const reason = scrub(
        name === 'TimeoutError' ? `Telegram timeout after ${TIMEOUT_MS}ms` : `Network error: ${error instanceof Error ? error.message : String(error)}`,
      );
      if (attempt === 2) return { ok: false, reason };
    }

    await sleep(retryAfterMs);
  }

  return { ok: false, reason: 'unreachable' };
}
