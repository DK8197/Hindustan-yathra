import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/i18n/routing';
import DestinationsExplorer from '@/components/destinations/DestinationsExplorer';
import type { Tour } from '@/types/tour';
import { getCdnImageUrl } from '@/lib/image-cdn';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:5000';

type Params = {
  locale: 'en' | 'kn';
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'destinations',
  });
  const href = '/destinations';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        en: getPathname({ locale: 'en', href }),
        kn: getPathname({ locale: 'kn', href }),
      },
    },
  };
}

async function getTours(): Promise<{ tours: Tour[]; loadFailed: boolean }> {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/tours?limit=100`,
      {
        cache: 'force-cache',
        next: {
          revalidate: 86400,
        },
        headers: {
          'X-App-Key': process.env.API_SECRET!,
        },
      }
    );

    if (!res.ok) {
      return { tours: [], loadFailed: true };
    }

    const data = await res.json();
    return { tours: (data.items ?? []) as Tour[], loadFailed: false };
  } catch {
    return { tours: [], loadFailed: true };
  }
}

export default async function DestinationsPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ locale }, { q }] = await Promise.all([
    params,
    searchParams,
  ]);

  const { tours, loadFailed } = await getTours();

  const t = await getTranslations({
    locale,
    namespace: 'destinations',
  });

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-himalaya-900">
        <div
          className="hero-bg absolute inset-0 opacity-15"
          style={{
            '--hero-bg-mobile': `url("${getCdnImageUrl('images-confidential/hero-mobile.webp')}")`,
            '--hero-bg-desktop': `url("${getCdnImageUrl('images-confidential/hero-desktop.webp')}")`,
          } as CSSProperties}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pb-28 md:px-12">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
              {t('heading')}
              <span className="block text-saffron-300">
                {t('headingHighlight')}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg md:mt-6 md:text-xl">
              {t('subheading')}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5 sm:mt-10">
              <div>
                <div className="text-3xl font-bold text-white">
                  {tours.length}
                </div>

                <div className="text-blue-200">
                  {t('stats.tours')}
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-white">
                  {new Set(tours.flatMap((tour) => tour.destinations || [])).size}
                </div>

                <div className="text-blue-200">
                  {t('stats.destinations')}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <DestinationsExplorer
          tours={tours}
          locale={locale}
          initialQuery={q || ''}
          loadFailed={loadFailed}
        />
      </div>
    </div>
  );
}