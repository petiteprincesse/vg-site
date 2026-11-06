export type NewsItem = {
  readonly id: string;
  readonly tag: string;
  readonly title: string;
  readonly date: string;
  readonly excerpt: string;
  readonly href: string;
  readonly image?: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
    readonly side: 'start' | 'end';
    readonly position?: string;
  };
  readonly wide?: boolean;
};

export const newsSection = {
  eyebrow: 'что у нас нового',
  title: 'Новости',
} as const;

export const news: readonly NewsItem[] = [
  {
    id: 'investment-leaders-2026',
    tag: 'Анонс',
    title: 'Игры на Investment Leaders Forum',
    date: '2026-11-14',
    excerpt:
      '14 ноября — Венчурные игры в треке «Новый русский венчур». Приглашаем стартапы с первой выручкой и старше.',
    href: '#upcoming',
    image: {
      src: '/img/upcoming/investment-leaders-forum-2026.jpg',
      width: 1080,
      height: 1080,
      alt: 'Investment Leaders Forum 2026, 14 ноября, Москва',
      side: 'end',
      position: 'center top',
    },
  },
  {
    id: 'ledentsov-2026',
    tag: 'Мероприятия',
    title: '18-е Венчурные игры на Премии Леденцова',
    date: '2026-09-28',
    excerpt:
      '18-е Венчурные игры от Daily Challenge прошли на Премии Христофора Леденцова: стартапы вышли на сцену перед экспертным жюри.',
    href: '#event-14',
    image: {
      src: '/img/events/14/1.jpg',
      width: 2400,
      height: 1399,
      alt: 'Участники и эксперты 18-х Венчурных игр на Премии Христофора Леденцова',
      side: 'start',
    },
  },
  {
    id: 'time-of-digital-2026',
    tag: 'Мероприятия',
    title: 'Венчурные игры на форуме Время Цифры',
    date: '2026-05-27',
    excerpt:
      '17-ые Венчурные игры прошли на форуме «Время Цифры»: стартапы представили проекты экспертам и инвесторам.',
    href: '#event-13',
    image: {
      src: '/img/events/13/3.jpg',
      width: 2400,
      height: 1800,
      alt: 'Питч стартапа на форуме «Время Цифры»',
      side: 'start',
    },
  },
  {
    id: 'rvf-kazan-2026',
    tag: 'Мероприятия',
    title: '16-е Венчурные игры в Казани',
    date: '2026-04-09',
    excerpt:
      'Daily Challenge провели Венчурные игры на Российском Венчурном Форуме — на большой сцене и в формате баттла.',
    href: '#event-12',
    wide: true,
  },
  {
    id: 'league-plekhanov-2026',
    tag: 'Лига ВУЗов',
    title: '«Лига ВУЗов» в РЭУ им. Плеханова',
    date: '2026-03-13',
    excerpt:
      '15-е Венчурные игры проекта Daily Challenge «Лига ВУЗов»: студенческие стартапы вышли на сцену РЭУ.',
    href: '#event-11',
    image: {
      src: '/img/events/11/2.jpg',
      width: 2207,
      height: 2400,
      alt: 'Зал РЭУ им. Г. В. Плеханова во время «Лиги ВУЗов»',
      side: 'end',
    },
  },
  {
    id: 'msu-science-park-2026',
    tag: 'Мероприятия',
    title: 'Венчурные игры в Научном парке МГУ',
    date: '2026-02-12',
    excerpt:
      '14-е Венчурные игры Daily Challenge собрали стартапы, экспертов и инвесторов в Научном парке МГУ.',
    href: '#event-10',
    image: {
      src: '/img/events/10/1.jpg',
      width: 2400,
      height: 1800,
      alt: 'Участники и эксперты Венчурных игр в Научном парке МГУ',
      side: 'start',
    },
  },
];
