import { Inter, Tektur } from 'next/font/google';

export const tektur = Tektur({
  subsets: ['cyrillic', 'latin'],
  weight: ['500', '600'],
  variable: '--font-tektur',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});
