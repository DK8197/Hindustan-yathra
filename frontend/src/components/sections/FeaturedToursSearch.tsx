'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

import type { Tour } from '@/types/tour';
import { TourCard } from '@/components/ui/TourCard';
import { searchTours } from '@/lib/search/tours-search';
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { Link } from '@/i18n/routing';

export function FeaturedToursSearch({
  tours,
}: {
  tours: Tour[];
}) {
  const t = useTranslations('sections');

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tour[]>(tours);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const debouncedQuery =
    useDebouncedValue(query, 300);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function performSearch() {
      if (!debouncedQuery.trim()) {
        setResults(tours);
        setSearchError(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setSearchError(false);

        const data =
          await searchTours(debouncedQuery, controller.signal);

        if (!cancelled) setResults(data);
      } catch (error) {
        if (!cancelled) {
          setResults([]);
          setSearchError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    performSearch();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [debouncedQuery, retryCount, tours]);

  const displayedResults =
    query.trim() || showAll
      ? results
      : results.slice(0, 8);

  return (
    <>
      <div className="relative mx-auto mt-8 max-w-md">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          aria-label={t('search_featured_label')}
          type="search"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder={t(
            'search_featured_placeholder'
          )}
          className="min-h-11 w-full rounded-full border border-slate-300 py-2.5 pl-9 pr-11 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-saffron-700 focus:ring-2 focus:ring-saffron-200"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label={t('clear_search')}
            className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {loading && (
        <div role="status" aria-live="polite" className="mt-6 text-center text-sm text-gray-600">
          {t('searching')}
        </div>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        {query.trim() && !loading && !searchError
          ? t('search_results_count', { count: results.length })
          : ''}
      </p>

      <div className="mt-10 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {displayedResults.map((tour, i) => (
          <div key={tour.slug} className={!query.trim() && !showAll && i >= 4 ? 'hidden sm:block' : ''}>
            <TourCard tour={tour} index={i} />
          </div>
        ))}
      </div>

      {!query.trim() && results.length > 4 && !showAll && (
          <div className="mt-8 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="min-h-11 rounded-full bg-saffron-700 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-saffron-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2"
            >
              {t('view_more_tours')}
            </button>
          </div>
      )}

      {!query.trim() && results.length > 8 && !showAll && (
        <div className="mt-8 hidden justify-center sm:flex">
          <button type="button" onClick={() => setShowAll(true)} className="rounded-full bg-saffron-700 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-saffron-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2">
            {t('view_more_tours')}
          </button>
        </div>
      )}

      {!query.trim() && showAll && results.length > 4 && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShowAll(false)} className="rounded-full border border-himalaya-700 bg-white px-8 py-3 font-medium text-himalaya-900 transition hover:bg-himalaya-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-himalaya-700 focus-visible:ring-offset-2">
            {t('show_less_tours')}
          </button>
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="col-span-full py-10 text-center" role={searchError ? 'alert' : 'status'}>
          <p className="text-slate-700">
            {searchError
              ? t('search_error')
              : query.trim()
                ? t('no_tours_found')
                : t('no_featured_tours')}
          </p>
          {!query.trim() && !searchError && (
            <Link href="/destinations" className="mt-3 inline-flex min-h-11 items-center rounded-full border border-himalaya-700 px-5 py-2 font-medium text-himalaya-900 hover:bg-himalaya-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-himalaya-700">
              {t('explore_all_journeys')}
            </Link>
          )}
          {searchError && (
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-3 min-h-11 rounded-full border border-himalaya-700 px-5 py-2 font-medium text-himalaya-900 hover:bg-himalaya-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700"
            >
              {t('retry_search')}
            </button>
          )}
        </div>
      )}
    </>
  );
}
