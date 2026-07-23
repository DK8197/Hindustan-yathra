import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DestinationsExplorer from '@/components/destinations/DestinationsExplorer';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
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
    namespace: 'sections',
  });

  return {
    title: t('popular_destinations'),
    description:
      'Explore domestic and international tours with Hindustan Yatra',
  };
}

async function getTours() {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/tours?limit=100`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data.items || [];
  } catch {
    return [];
  }
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;

  const tours = await getTours();

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900">
        <div className="absolute inset-0 bg-[url('/textures/hero-background-desktop.jpg')] opacity-10" />

        <div className="relative mx-auto max-w-7xl px-6 py-28">
          <div className="max-w-3xl">
            {/* <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              Hindustan Yathra
            </span> */}

            <h1 className="mt-8 text-5xl font-bold text-white md:text-7xl">
              Explore
              <span className="block text-cyan-300">
                Destinations
              </span>
            </h1>

            <p className="mt-6 text-lg text-blue-100 md:text-xl">
              Discover hand-crafted journeys
              across India and around the world.
            </p>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold text-white">
                  {tours.length}+
                </div>

                <div className="text-blue-200">
                  Tours
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-white">
                  50+
                </div>

                <div className="text-blue-200">
                  Destinations
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-white">
                  10K+
                </div>

                <div className="text-blue-200">
                  Happy Travellers
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
        />
      </div>
    </div>
  );
}