import { getTranslations } from 'next-intl/server';
import { getFeaturedToursResult } from '@/lib/tours-repository';
import { FeaturedToursSearch } from './FeaturedToursSearch';

export async function FeaturedTours({ locale }: { locale: 'en' | 'kn' }) {
  const { tours, loadFailed } = await getFeaturedToursResult();
  const t = await getTranslations({ locale, namespace: 'sections' });

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <h2 className="text-center font-display text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text md:text-5xl">
          {t('featured_tours')}
        </h2>

      {loadFailed ? (
        <p role="status" className="mx-auto mt-8 max-w-xl rounded-xl border border-slate-200 bg-white p-5 text-center text-slate-700">
          {t('featured_load_error')}
        </p>
      ) : (
        <FeaturedToursSearch tours={tours} />
      )}
    </section>
  );
}