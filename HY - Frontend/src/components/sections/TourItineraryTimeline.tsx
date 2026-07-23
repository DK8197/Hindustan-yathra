import { useTranslations } from 'next-intl';
import type { ItineraryDay } from '@/types/tour';

export function TourItineraryTimeline({
  itinerary,
}: {
  itinerary: ItineraryDay[];
  locale: 'en' | 'kn';
}) {
  const t = useTranslations('tour');

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-himalaya-900">{t('itinerary')}</h2>
      <ol className="mt-8 space-y-8 border-l-2 border-saffron-200 pl-6">
        {itinerary.map((day) => (
          <li key={day.day} className="relative">
            <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-saffron-500 text-xs font-bold text-white">
              {day.day}
            </span>
            <h3 className="font-semibold text-himalaya-900">
              {t('day')} {day.day}: {day.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{day.description}</p>
            {day.meals && day.meals.length > 0 && (
              <p className="mt-1 text-xs text-gray-400">Meals: {day.meals.join(', ')}</p>
            )}
            {day.stayLocation && <p className="text-xs text-gray-400">Stay: {day.stayLocation}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
