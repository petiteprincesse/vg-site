import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { inter, tektur } from '@/lib/fonts';
import { site } from '@/content/site';
import { faq } from '@/content/faq';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.seoDescription,
  applicationName: site.name,
  keywords: [
    'венчурные игры',
    'Daily Challenge',
    'питч стартапов',
    'питч-баттл',
    'конкурс стартапов',
    'инвесторы',
    'лига вузов',
    'студенческие стартапы',
  ],
  authors: [{ name: site.organizer.name, url: site.organizer.url }],
  publisher: site.organizer.name,
  alternates: { canonical: '/' },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.seoDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: '#232124',
  colorScheme: 'light',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      alternateName: site.legalName,
      url: site.url,
      logo: `${site.url}/icon-512.png`,
      description: site.seoDescription,
      parentOrganization: { '@type': 'Organization', name: site.organizer.name, url: site.organizer.url },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'ru-RU',
      publisher: { '@id': `${site.url}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${tektur.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.dataset.js=""' }} />
      </head>
      <body>
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}[style*="clip-path"]{clip-path:none!important}`}</style>
        </noscript>
        <MotionProvider>
          <ScrollProgress />
          {children}
          <BackToTop />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
