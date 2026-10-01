import { ExternalLink, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/search/?api=1&query=Hindustan%20Yatra%2C%20Hubballi%2C%20Karnataka';

export default function GoogleReviewSummary() {
  const t = useTranslations('about');

  return (
    <section
      aria-labelledby="google-review-heading"
      className="border-y border-slate-200 bg-[#fbf8f2] px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-himalaya-700">
            Google
          </p>
          <h2
            id="google-review-heading"
            className="mt-2 font-display text-2xl font-semibold text-himalaya-900 sm:text-3xl"
          >
            {t('google_reviews_title')}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
            {t('google_reviews_description')}
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
          <div role="img" className="flex items-center gap-2" aria-label={t('google_rating_accessible', { rating: '4.9' })}>
            <span aria-hidden="true" className="text-3xl font-semibold tabular-nums text-himalaya-900">4.9</span>
            <span aria-hidden="true" className="text-sm text-slate-600">/ 5</span>
            <Star aria-hidden="true" className="h-6 w-6 fill-amber-500 text-amber-700" />
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-himalaya-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-himalaya-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2"
          >
            {t('read_google_reviews')}
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
