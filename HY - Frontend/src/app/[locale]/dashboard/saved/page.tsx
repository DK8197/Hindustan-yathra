'use client';

import { useTranslations } from 'next-intl';
import { useAppStore } from '@/store/useAppStore';
import { useAllTours } from '@/lib/hooks/useTours';
import { TourCard } from '@/components/ui/TourCard';

export default function SavedToursPage() {
  const t = useTranslations('dashboard');
  const savedSlugs = useAppStore((s) => s.savedTourSlugs);
  const { data: tours = [], isLoading } = useAllTours();

  const saved = tours.filter((tour) => savedSlugs.includes(tour.slug));

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-himalaya-900">{t('saved_tours')}</h1>
      {isLoading && <p className="mt-4 text-sm text-gray-400">Loading…</p>}
      {!isLoading && saved.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Tap the heart icon on any tour to save it here.</p>
      )}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {saved.map((tour, i) => (
          <TourCard key={tour.id} tour={tour} index={i} />
        ))}
      </div>
    </div>
  );
}
