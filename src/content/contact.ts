import type { LeadAudience, LeadFieldName } from '@/lib/lead';

export type FieldConfig = {
  readonly name: LeadFieldName;
  readonly label: string;
  readonly placeholder: string;
  readonly multiline?: boolean;
  readonly required?: boolean;
  readonly autoComplete?: string;
};

export const contactSection = {
  eyebrow: 'контакты',
  title: 'Станьте партнером',
  submit: 'Стать партнёром',
  success: 'Заявка отправлена. Мы свяжемся с вами в Telegram в течение двух рабочих дней.',
  failure: 'Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.',
  invalid: 'Проверьте поля, отмеченные выше.',
  rateLimited: 'Слишком много заявок подряд. Попробуйте снова через {minutes} мин.',
  offline: 'Нет соединения с сервером. Проверьте интернет и попробуйте ещё раз.',
} as const;

export const audienceTabs: readonly { readonly id: LeadAudience; readonly label: string }[] = [
  { id: 'founder', label: 'Фаундерам' },
  { id: 'expert', label: 'Экспертам' },
  { id: 'partner', label: 'Партнёрам' },
  { id: 'investor', label: 'Инвесторам' },
];

const nameField: FieldConfig = {
  name: 'name',
  label: 'Имя',
  placeholder: 'Ваше имя',
  required: true,
  autoComplete: 'name',
};

const telegramField: FieldConfig = {
  name: 'telegram',
  label: 'Telegram',
  placeholder: 'Для связи с вами',
  required: true,
  autoComplete: 'username',
};

export const fieldsByAudience: Record<LeadAudience, readonly FieldConfig[]> = {
  founder: [
    nameField,
    { name: 'company', label: 'Название стартапа', placeholder: 'Название вашего стартапа', autoComplete: 'organization' },
    { name: 'stage', label: 'Стадия стартапа', placeholder: 'Какая сейчас стадия' },
    telegramField,
    { name: 'about', label: 'Описание стартапа', placeholder: 'Расскажите подробнее о своем проекте', multiline: true },
    { name: 'request', label: 'Что вы ищете сейчас', placeholder: 'Так мы лучше поймем, чем можем быть полезны', multiline: true, required: true },
  ],
  expert: [
    nameField,
    { name: 'company', label: 'Компания', placeholder: 'Где вы работаете', autoComplete: 'organization' },
    { name: 'stage', label: 'Экспертиза', placeholder: 'В каких отраслях вы сильны' },
    telegramField,
    { name: 'about', label: 'О вас', placeholder: 'Коротко о вашем опыте и роли', multiline: true },
    { name: 'request', label: 'Что вам интересно', placeholder: 'Так мы лучше поймем, чем можем быть полезны', multiline: true, required: true },
  ],
  partner: [
    nameField,
    { name: 'company', label: 'Компания', placeholder: 'Название компании', autoComplete: 'organization' },
    { name: 'stage', label: 'Формат партнёрства', placeholder: 'Площадка, медиа, акселератор' },
    telegramField,
    { name: 'about', label: 'О компании', placeholder: 'Расскажите подробнее о вашей компании', multiline: true },
    { name: 'request', label: 'Что вы ищете сейчас', placeholder: 'Так мы лучше поймем, чем можем быть полезны', multiline: true, required: true },
  ],
  investor: [
    nameField,
    { name: 'company', label: 'Фонд', placeholder: 'Название фонда или синдиката', autoComplete: 'organization' },
    { name: 'stage', label: 'Стадии и чек', placeholder: 'Pre-seed, seed, round A' },
    telegramField,
    { name: 'about', label: 'Фокус портфеля', placeholder: 'Отрасли и география интереса', multiline: true },
    { name: 'request', label: 'Что вы ищете сейчас', placeholder: 'Так мы лучше поймем, чем можем быть полезны', multiline: true, required: true },
  ],
};
