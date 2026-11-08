import { getTranslations } from 'next-intl/server';
import { getFeaturedToursResult } from '@/lib/tours-repository';
import { FeaturedToursSearch } from './FeaturedToursSearch';

export async function FeaturedTours({ locale }: { locale: 'en' | 'kn' }) {
  const { tours, loadFailed } = await getFeaturedToursResult();
  const t = await getTranslations({ locale, namespace: 'sections' });

  return (
    <section id="featured-tours" aria-labelledby="featured-tours-heading" className="w-full px-[clamp(1rem,2.2vw,2rem)] py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="featured-tours-heading" className="font-display text-3xl font-semibold tracking-tight text-himalaya-900 md:text-5xl">
          {t('featured_tours')}
        </h2>
        <p className="mt-3 text-base text-slate-600 md:text-lg">
          {t('featured_subtitle')}
        </p>
      </div>

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