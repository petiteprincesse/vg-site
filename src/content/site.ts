export const site = {
  name: 'Венчурные игры',
  legalName: 'Venture Games',
  url: 'https://vg-dc.ru',
  copyright: '© 2026 Venture Games',
  title: 'Венчурные игры Daily Challenge — питч-баттлы стартапов с инвесторами',
  seoDescription:
    'Питч-баттлы стартапов от Daily Challenge перед инвесторами, экспертами и корпорациями: МГУ, МФТИ, ИТМО, Российский Венчурный Форум. Подайте заявку на участие.',
  organizer: { name: 'Daily Challenge', url: 'https://daily-challenge.com' },
  tagline: 'Растем сегодня, лидируем завтра',
  privacy: { label: 'Политика конфиденциальности', href: '/privacy' },
} as const;

export type NavItem = { readonly label: string; readonly href: `#${string}` };

export const navigation: readonly NavItem[] = [
  { label: 'О нас', href: '#about' },
  { label: 'Для кого', href: '#audience' },
  { label: 'Преимущества', href: '#history' },
  { label: 'Партнеры', href: '#partners' },
  { label: 'Команда', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
];
