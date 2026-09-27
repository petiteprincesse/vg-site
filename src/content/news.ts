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
  };
  readonly wide?: boolean;
};

export const newsSection = {
  eyebrow: 'что у нас нового',
  title: 'Новости',
} as const;

export const news: readonly NewsItem[] = [
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
      side: 'end',
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
    image: {
      src: '/img/events/12/1.jpg',
      width: 2400,
      height: 1800,
      alt: 'Раунд «Питч без презентации» на Российском Венчурном Форуме',
      side: 'start',
    },
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
      side: 'start',
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
    wide: true,
  },
];
