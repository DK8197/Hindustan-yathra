import type { MetadataRoute } from 'next';
import { getAllTourSlugs } from '@/lib/tours-repository';
import { getPathname, routing } from '@/i18n/routing';

const BASE_URL = 'https://hindustanyatra.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllTourSlugs();
  const entries: MetadataRoute.Sitemap = [];

  const staticPaths = ['/', '/destinations', '/gallery', '/contact', '/about'] as const;

  for (const locale of routing.locales) {
    for (const href of staticPaths) {
      const url = `${BASE_URL}${getPathname({ locale, href })}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: href === '/' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((otherLocale) => [
              otherLocale,
              `${BASE_URL}${getPathname({ locale: otherLocale, href })}`,
            ])
          ),
        },
      });
    }

    for (const slug of slugs) {
      const href = { pathname: '/tour/[slug]', params: { slug } } as const;
      entries.push({
        url: `${BASE_URL}${getPathname({ locale, href })}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((otherLocale) => [
              otherLocale,
              `${BASE_URL}${getPathname({ locale: otherLocale, href })}`,
            ])
          ),
        },
      });
    }
  }


  return entries;
}
