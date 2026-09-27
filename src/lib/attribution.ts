import type { LeadMeta } from '@/lib/lead';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

const STORAGE_KEY = 'vg:attribution';

type Attribution = { utm: NonNullable<LeadMeta['utm']>; referrer?: string };

export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const utm: Attribution['utm'] = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 200);
    }

    const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : undefined;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ utm, referrer } satisfies Attribution));
  } catch {
  }
}

export function readAttribution(): LeadMeta {
  let stored: Partial<Attribution> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<Attribution>;
  } catch {
    stored = {};
  }

  const utm = stored.utm && Object.keys(stored.utm).length > 0 ? stored.utm : undefined;
  return { referrer: stored.referrer?.slice(0, 500), utm };
}
