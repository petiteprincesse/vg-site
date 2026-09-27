import { site } from '@/content/site';

export const dynamic = 'force-static';

const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].join('&');

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    'User-agent: Yandex',
    'Allow: /',
    'Disallow: /api/',
    `Clean-param: ${UTM}`,
    '',
    `Sitemap: ${site.url}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
