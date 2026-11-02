import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/i18n/routing';
import DestinationsExplorer from '@/components/destinations/DestinationsExplorer';
import { CustomTourSection } from '@/components/destinations/CustomTourSection';
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
              next: {
                revalidate: 3600,
                tags: ['tours','featured-tours'],
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
    <div className="pb-24">
      <section className="relative isolate overflow-hidden bg-himalaya-900">
        <div
          className="hero-bg absolute inset-0 opacity-30"
          style={{
            '--hero-bg-mobile': `url("${getCdnImageUrl('images-confidential/hero-mobile.webp')}")`,
            '--hero-bg-desktop': `url("${getCdnImageUrl('images-confidential/hero-desktop.webp')}")`,
          } as CSSProperties}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#07111f]/90 via-[#07111f]/55 to-[#07111f]/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-himalaya-900 via-transparent to-himalaya-900/20"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-6 sm:pb-28 sm:pt-14 md:px-12 md:pb-32 md:pt-16">
          <div className="max-w-3xl">
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl">
              {t('heading')}
              <span className="mt-1 block text-saffron-300">
                {t('headingHighlight')}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 md:mt-6">
              {t('subheading')}
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-5 sm:mt-10 sm:gap-x-9">
              <div className="border-l border-white/20 pl-5 first:border-l-0 first:pl-0">
                <div className="tabular-nums text-3xl font-semibold tracking-tight text-white">
                  {tours.length}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
                  {t('stats.tours')}
                </div>
              </div>

              <div className="border-l border-white/20 pl-5">
                <div className="tabular-nums text-3xl font-semibold tracking-tight text-white">
                  {new Set(tours.flatMap((tour) => tour.destinations || [])).size}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
                  {t('stats.destinations')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <DestinationsExplorer
          tours={tours}
          locale={locale}
          initialQuery={q || ''}
          loadFailed={loadFailed}
          customSection={<CustomTourSection />}
        />
      </div>
    </div>
  );
}