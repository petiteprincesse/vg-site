export const partnerCategories = [
  { id: 'all', label: 'Все партнёры' },
  { id: 'media', label: 'Информационные партнёры' },
  { id: 'tech', label: 'Технологические партнёры' },
  { id: 'startups', label: 'Стартапы-партнёры' },
  { id: 'telegram', label: 'Телеграм-каналы' },
] as const;

export type PartnerCategoryId = (typeof partnerCategories)[number]['id'];

export type Partner = {
  readonly id: string;
  readonly name: string;
  readonly categories: readonly Exclude<PartnerCategoryId, 'all'>[];
  readonly href?: string;
  readonly logo: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly fit: 'cover' | 'contain' | 'badge';
  };
};

export const partnersSection = {
  eyebrow: 'наши партнёры',
  title: 'Партнёры',
  body: [
    'Венчурные игры проходят при поддержке ведущих университетов, технологических форумов, акселераторов и деловых СМИ.',
    'Мы благодарим партнёров за доверие и совместную работу по развитию технологического предпринимательства.',
  ],
  cta: { label: 'Стать партнёром', href: '#contact' },
  image: {
    src: '/img/events/02/1.jpg',
    width: 2400,
    height: 1799,
    alt: 'Участники и партнёры Российских Венчурных игр',
  },
} as const;

export const partners: readonly Partner[] = [
  {
    id: 'expert',
    name: 'Эксперт — деловая журналистика с 1995 года',
    categories: ['media'],
    logo: { src: '/img/logo-expert.png', width: 1080, height: 1080, fit: 'cover' },
  },
  {
    id: 'kvindo',
    name: 'Kvindo',
    categories: ['tech'],
    logo: { src: '/img/partners/kvindo.svg', width: 378, height: 86, fit: 'contain' },
  },
  {
    id: 'vcdc',
    name: 'VC.DC — Venture Career',
    categories: ['startups'],
    logo: { src: '/img/partners/vcdc.svg', width: 1000, height: 195, fit: 'contain' },
  },
  {
    id: 'study-grants',
    name: 'Study Grants',
    categories: ['telegram', 'media'],
    logo: { src: '/img/partners/study-grants.jpg', width: 720, height: 720, fit: 'badge' },
  },
];
