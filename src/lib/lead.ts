import { z } from 'zod';

export const LEAD_AUDIENCES = ['founder', 'expert', 'partner', 'investor'] as const;

export type LeadAudience = (typeof LEAD_AUDIENCES)[number];

export const LEAD_LIMITS = { short: 120, long: 2000, url: 500, utm: 200 } as const;

const tooLong = (max: number) => `Не более ${max} символов`;

const notText = { error: 'Заполните поле' } as const;
const shortText = z.string(notText).trim().max(LEAD_LIMITS.short, tooLong(LEAD_LIMITS.short));
const longText = z.string(notText).trim().max(LEAD_LIMITS.long, tooLong(LEAD_LIMITS.long));

export const leadSchema = z.object({
  audience: z.enum(LEAD_AUDIENCES, { error: 'Выберите категорию' }),
  name: z.string({ error: 'Укажите имя' }).trim().min(2, 'Укажите имя').max(LEAD_LIMITS.short, tooLong(LEAD_LIMITS.short)),
  company: shortText.default(''),
  stage: shortText.default(''),
  telegram: z
    .string({ error: 'Нужен контакт для связи' })
    .trim()
    .min(1, 'Нужен контакт для связи')
    .max(LEAD_LIMITS.short, tooLong(LEAD_LIMITS.short))
    .regex(/^@?[a-zA-Z0-9_+.\-/:]{3,}$/, 'Укажите ник или ссылку'),
  about: longText.default(''),
  request: z
    .string({ error: 'Расскажите, что вы ищете' })
    .trim()
    .min(1, 'Расскажите, что вы ищете')
    .max(LEAD_LIMITS.long, tooLong(LEAD_LIMITS.long)),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export type LeadFieldName = keyof Omit<LeadPayload, 'audience'>;

export type LeadErrors = Partial<Record<keyof LeadPayload, string>>;

const utmValue = z.string().trim().max(LEAD_LIMITS.utm).optional();

export const leadMetaSchema = z.object({
  referrer: z.string().trim().max(LEAD_LIMITS.url).optional(),
  utm: z
    .object({
      utm_source: utmValue,
      utm_medium: utmValue,
      utm_campaign: utmValue,
      utm_term: utmValue,
      utm_content: utmValue,
    })
    .optional(),
});

export type LeadMeta = z.infer<typeof leadMetaSchema>;

export const leadRequestSchema = leadSchema.extend({
  meta: leadMetaSchema.optional(),
  website: z.string().max(LEAD_LIMITS.short).optional(),
  startedAt: z.number().int().nonnegative().optional(),
});

export type LeadRequest = z.infer<typeof leadRequestSchema>;

export function toLeadErrors(error: z.ZodError): LeadErrors {
  const errors: LeadErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === 'string' && field in leadSchema.shape) {
      const key = field as keyof LeadPayload;
      errors[key] ??= issue.message;
    }
  }
  return errors;
}

export function validateLead(
  input: unknown,
): { ok: true; data: LeadPayload } | { ok: false; errors: LeadErrors } {
  const result = leadSchema.safeParse(input);
  return result.success ? { ok: true, data: result.data } : { ok: false, errors: toLeadErrors(result.error) };
}

export type LeadResponse =
  | { ok: true }
  | { ok: false; code: 'invalid'; errors: LeadErrors }
  | { ok: false; code: 'rate_limited'; retryAfter: number }
  | { ok: false; code: 'forbidden' | 'too_large' | 'unavailable' | 'delivery_failed' };
