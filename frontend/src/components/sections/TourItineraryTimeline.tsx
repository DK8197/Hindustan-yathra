import { useTranslations } from 'next-intl';
import type { ItineraryDay } from '@/types/tour';

export function TourItineraryTimeline({
  itinerary,
}: {
  itinerary?: ItineraryDay[];
  locale: 'en' | 'kn';
}) {
  const t = useTranslations('tour');

  if (!itinerary?.length) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-himalaya-900">{t('itinerary')}</h2>
      <ol className="mt-8 space-y-8 border-l-2 border-saffron-200 pl-5 sm:pl-6">
        {itinerary.map((day) => (
          <li key={day.day} className="relative">
            <span aria-hidden="true" className="absolute -left-[26px] flex h-6 w-6 items-center justify-center rounded-full bg-saffron-600 text-xs font-bold text-white sm:-left-[31px]">
              {day.day}
            </span>
            <h3 className="font-semibold text-himalaya-900">
              {t('day')} {day.day}: {day.title}
            </h3>
            {day.description && <p className="mt-1 text-sm leading-relaxed text-gray-600">{day.description}</p>}
            {day.meals && day.meals.length > 0 && (
              <p className="mt-2 text-sm text-gray-600"><span className="font-medium">{t('meals')}:</span> {day.meals.join(', ')}</p>
            )}
            {day.stayLocation && <p className="mt-1 text-sm text-gray-600"><span className="font-medium">{t('stay')}:</span> {day.stayLocation}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
