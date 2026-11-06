export type UpcomingGame = {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly formLabel: string;
  readonly tag: string;
  readonly startDate: string;
  readonly endsAt: string;
  readonly when: string;
  readonly where: string;
  readonly address: string;
  readonly paragraphs: readonly string[];
  readonly cta: { readonly label: string; readonly href: string };
  readonly poster: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
};

export const APPLY_ANCHOR = 'apply-game';

export const upcomingGame: UpcomingGame = {
  id: 'upcoming',
  eyebrow: 'ближайшая игра',
  title: 'Investment Leaders Forum',
  formLabel: 'Investment Leaders Forum, 14 ноября',
  tag: '#ilf2026',
  startDate: '2026-11-14',
  endsAt: '2026-11-14T23:59:59+03:00',
  when: '14 ноября 2026',
  where: 'Москва, Центр международной торговли',
  address: 'Краснопресненская набережная, 12, Москва',
  paragraphs: [
    'Приглашаем стартапы принять участие в Венчурных играх на форуме Investment Leaders!',
    'Investment Leaders Forum — масштабная площадка для обсуждения инвестиций, финансовых рынков и новых возможностей для развития бизнеса. В рамках форума состоится трек «Новый русский венчур», где Венчурные игры будут одним из ключевых форматов программы.',
    'Приглашаем к участию стартапы с первой выручкой и старше — подать заявку можно через форму на сайте.',
  ],
  cta: { label: 'Подать заявку', href: `#${APPLY_ANCHOR}` },
  poster: {
    src: '/img/upcoming/investment-leaders-forum-2026.jpg',
    width: 1080,
    height: 1080,
    alt: 'Investment Leaders Forum 2026, 14 ноября, Москва — конференция «Новый русский венчур» с Daily Challenge',
  },
};

export function isUpcoming(game: UpcomingGame, now = Date.now()): boolean {
  return now <= new Date(game.endsAt).getTime();
}
