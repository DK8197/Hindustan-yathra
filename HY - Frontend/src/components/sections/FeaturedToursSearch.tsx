'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

import type { Tour } from '@/types/tour';
import { TourCard } from '@/components/ui/TourCard';
import { searchTours } from '@/lib/search/tours-search';
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';

export function FeaturedToursSearch({
  tours,
}: {
  tours: Tour[];
}) {
  const t = useTranslations('sections');

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tour[]>(tours);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const debouncedQuery =
    useDebouncedValue(query, 300);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener(
      'resize',
      handleResize
    );

    return () =>
      window.removeEventListener(
        'resize',
        handleResize
      );
  }, []);

  useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery.trim()) {
        setResults(tours);
        return;
      }

      try {
        setLoading(true);

        const data =
          await searchTours(debouncedQuery);

        setResults(data);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [debouncedQuery, tours]);

  const visibleCount = isMobile ? 4 : 8;

  const displayedResults =
    query.trim() || showAll
      ? results
      : results.slice(0, visibleCount);

  return (
    <>
      <div className="relative mx-auto mt-8 max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder={t(
            'search_featured_placeholder'
          )}
          className="w-full rounded-full border py-2.5 pl-9 pr-9 text-sm outline-none focus:border-saffron-400"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {loading && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Searching...
        </div>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedResults.map((tour, i) => (
          <TourCard
            key={tour.slug}
            tour={tour}
            index={i}
          />
        ))}
      </div>

      {!query.trim() &&
        results.length > visibleCount && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() =>
                setShowAll(!showAll)
              }
              className="
                rounded-full
                bg-gradient-to-r
                from-saffron-500
                to-saffron-600
                px-8
                py-3
                font-medium
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
              "
            >
              {showAll
                ? 'Show Less'
                : 'View More Tours'}
            </button>
          </div>
        )}

      {!loading && results.length === 0 && (
        <p className="col-span-full py-10 text-center text-gray-400">
          {t('no_tours_found')}
        </p>
      )}
    </>
  );
}
