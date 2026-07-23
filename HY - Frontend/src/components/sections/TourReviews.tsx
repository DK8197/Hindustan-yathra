import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import type { Review } from '@/types/tour';

export function TourReviews({ reviews }: { reviews: Review[] }) {
  const t = useTranslations('tour');

  if (!reviews.length) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-himalaya-900">{t('reviews')}</h2>
      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border p-5">
            <div className="flex items-center justify-between">
              <span className="font-medium text-himalaya-900">{review.author}</span>
              <span className="flex items-center gap-1 text-saffron-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < review.rating ? 'fill-saffron-500' : 'text-gray-200'} />
                ))}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
