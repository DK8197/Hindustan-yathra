import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function CTA({ locale }: { locale: 'en' | 'kn' }) {
  const t = useTranslations('about');

  return (
    <section className="bg-himalaya-900 py-16 text-white sm:py-20">

      <div className="container mx-auto px-4 text-center sm:px-6">

        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          {t('cta_title')}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
          {t('cta_description')}
        </p>

        <Link
          href="/destinations"
          locale={locale}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-saffron-700 px-7 py-3 font-semibold text-white transition hover:bg-saffron-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-himalaya-900"
        >
          {t('cta_button')}
        </Link>

      </div>

    </section>
  );
}