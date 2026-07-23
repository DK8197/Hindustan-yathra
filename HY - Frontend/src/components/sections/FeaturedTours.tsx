import { getTranslations } from 'next-intl/server';
import { getFeaturedTours } from '@/lib/tours-repository';
import { FeaturedToursSearch } from './FeaturedToursSearch';

export async function FeaturedTours({ locale }: { locale: 'en' | 'kn' }) {
  const tours = await getFeaturedTours();
  const t = await getTranslations({ locale, namespace: 'sections' });

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <h2 className="text-center font-display text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text md:text-5xl">
          {t('featured_tours')}
        </h2>

      <FeaturedToursSearch tours={tours} />
    </section>
  );
}