import { useLocale, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import type { Review } from '@/types/tour';

export function TourReviews({ reviews = [] }: { reviews?: Review[] }) {
  const t = useTranslations('tour');
  const locale = useLocale();

  if (!reviews.length) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-himalaya-900">{t('reviews')}</h2>
      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border p-5">
            <div className="flex items-center justify-between">
              <span className="font-medium text-himalaya-900">{review.author}</span>
              <span role="img" className="flex items-center gap-1 text-saffron-700" aria-label={t('rating_out_of_five', { rating: Math.max(0, Math.min(5, review.rating)) })}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star aria-hidden="true" key={i} size={14} className={i < Math.max(0, Math.min(5, review.rating)) ? 'fill-saffron-600 text-saffron-700' : 'text-gray-300'} />
                ))}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
            {review.date && <time dateTime={review.date} className="mt-3 block text-xs text-slate-600">{new Date(review.date).toLocaleDateString(locale)}</time>}
          </div>
        ))}
      </div>
    </section>
  );
}
