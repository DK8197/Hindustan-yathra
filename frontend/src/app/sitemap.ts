import type { MetadataRoute } from 'next';
import { getAllTourSlugs } from '@/lib/tours-repository';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://hindustanyatra.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllTourSlugs();
  const entries: MetadataRoute.Sitemap = [];

  const staticPaths = ['', '/destinations', '/gallery', '/contact','/about'];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`])),
        },
      });
    }

    for (const slug of slugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/tour/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((l) => [l, `${BASE_URL}/${l}/tour/${slug}`])),
        },
      });
    }
  }


  return entries;
}
