import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { historyEvents } from '@/content/history';
import { teamGroups } from '@/content/team';

export default function sitemap(): MetadataRoute.Sitemap {
  const images = [
    '/img/hero.jpg',
    ...historyEvents.flatMap((event) => event.gallery.flatMap((media) => (media.kind === 'image' ? [media.src] : []))),
    ...teamGroups.flatMap((group) => group.members.map((member) => member.photo.src)),
  ].map((src) => `${site.url}${src}`);

  return [{ url: site.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1, images }];
}
