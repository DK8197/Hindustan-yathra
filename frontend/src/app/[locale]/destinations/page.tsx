import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { getCdnImageUrl } from '@/lib/image-cdn';
import { getPathname } from '@/i18n/routing';
import DestinationsExplorer from '@/components/destinations/DestinationsExplorer';
import { CustomTourSection } from '@/components/destinations/CustomTourSection';
import type { Tour } from '@/types/tour';

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
      <section className="relative isolate overflow-hidden border-b border-sky-200/60 bg-sky-100">
        <div
          className="hero-bg absolute inset-0 opacity-40"
          style={{
            '--hero-bg-mobile': `url("${getCdnImageUrl('images-confidential/hero-mobile.webp')}")`,
            '--hero-bg-desktop': `url("${getCdnImageUrl('images-confidential/hero-desktop.webp')}")`,
          } as CSSProperties}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-sky-100/95 via-sky-100/70 to-sky-100/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-sky-50 via-transparent to-sky-200/40"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-6 pt-4 sm:px-6 sm:pb-6 sm:pt-5 md:px-12 md:pb-8 md:pt-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-3xl">
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-sky-950 sm:text-4xl md:text-5xl">
              {t('heading')}
              <span className="mt-1 block text-saffron-600">
                {t('headingHighlight')}
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-sky-900/80 sm:text-lg sm:leading-8 md:mt-3">
              {t('subheading')}
            </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-x-7 gap-y-3 sm:gap-x-9">
              <div className="border-l border-sky-900/20 pl-5 first:border-l-0 first:pl-0">
                <div className="tabular-nums text-3xl font-semibold tracking-tight text-sky-950">
                  {tours.length}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-sky-900/70">
                  {t('stats.tours')}
                </div>
              </div>

              <div className="border-l border-sky-900/20 pl-5">
                <div className="tabular-nums text-3xl font-semibold tracking-tight text-sky-950">
                  {new Set(tours.flatMap((tour) => tour.destinations || [])).size}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-sky-900/70">
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