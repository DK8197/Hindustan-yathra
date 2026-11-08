'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import type { Tour } from '@/types/tour';
import { TourCard } from '@/components/ui/TourCard';
import { searchTours } from '@/lib/search/tours-search';
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { Link } from '@/i18n/routing';

const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;

export function FeaturedToursSearch({
  tours,
}: {
  tours: Tour[];
}) {
  const t = useTranslations('sections');
  const shouldReduceMotion = useReducedMotion();

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
      } catch {
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
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-8 max-w-md"
      >
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
          className="min-h-11 w-full rounded-full border border-slate-300 py-2.5 pl-9 pr-11 text-base text-slate-900 outline-none placeholder:text-slate-600 focus:border-saffron-700 focus:ring-2 focus:ring-saffron-200"
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
      </motion.div>

      {loading && (
        <div role="status" aria-live="polite" className="mt-6 text-center text-base text-himalaya-900">
          {t('searching')}
        </div>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        {query.trim() && !loading && !searchError
          ? t('search_results_count', { count: results.length })
          : ''}
      </p>

      <div className="mt-10 flex min-w-0 flex-wrap justify-center gap-5 sm:gap-6">
        {displayedResults.map((tour, i) => (
          <div
            key={tour.slug}
            className={`w-full min-w-0 sm:w-[calc(50%_-_0.75rem)] lg:w-[calc(33.333333%_-_1rem)] ${!query.trim() && !showAll && i >= 4 ? 'hidden sm:block' : ''}`}
          >
            <TourCard tour={tour} index={i} />
          </div>
        ))}
      </div>

      {!query.trim() && results.length > 4 && !showAll && (
          <div className="mt-8 flex justify-center sm:hidden">
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              transition={SPRING_SNAPPY}
              type="button"
              onClick={() => setShowAll(true)}
              className="min-h-11 rounded-full bg-saffron-700 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-saffron-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2"
            >
              {t('view_more_tours')}
            </motion.button>
          </div>
      )}

      {!query.trim() && results.length > 8 && !showAll && (
        <div className="mt-8 hidden justify-center sm:flex">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={SPRING_SNAPPY}
            type="button"
            onClick={() => setShowAll(true)}
            className="min-h-11 rounded-full bg-saffron-700 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-saffron-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2"
          >
            {t('view_more_tours')}
          </motion.button>
        </div>
      )}

      {!query.trim() && showAll && results.length > 4 && (
        <div className="mt-8 flex justify-center">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={SPRING_SNAPPY}
            type="button"
            onClick={() => setShowAll(false)}
            className="rounded-full border border-himalaya-700 bg-white px-8 py-3 font-medium text-himalaya-900 transition hover:bg-himalaya-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-himalaya-700 focus-visible:ring-offset-2"
          >
            {t('show_less_tours')}
          </motion.button>
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
