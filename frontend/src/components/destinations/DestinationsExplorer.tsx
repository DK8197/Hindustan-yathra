'use client';

import { useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  Search,
  MapPin,
  Star,
  Plane,
  Mountain,
  Heart,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { normalizeImageUrl } from '@/lib/image-cdn';
import type { Tour } from '@/types/tour';

type Props = {
  tours: Tour[];
  locale: 'en' | 'kn';
  initialQuery?: string;
  loadFailed?: boolean;
};

const INITIAL_COUNT = 8;


const categoryIcons: Record<string, any> = {
  honeymoon: Heart,
  adventure: Mountain,
  family: Users,
  business: Building2,
};

export default function DestinationsExplorer({
  tours,
  locale,
  initialQuery = '',
  loadFailed = false,
}: Props) {
  const t = useTranslations('destinations');
  const tTour = useTranslations('tour');
  const tCategory = useTranslations('categories');
  const [search, setSearch] = useState(initialQuery);
  const [tourType, setTourType] = useState<
    'all' | 'domestic' | 'international'
  >('all');

const [region, setRegion] = useState<
  'all' | 'north' | 'south' | 'east' | 'west'
>('all');

  const [selectedCategory, setSelectedCategory] =
    useState('all');

  const [visibleCount, setVisibleCount] =
    useState(INITIAL_COUNT);
  const categoryRailRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: -1 | 1) => {
    const rail = categoryRailRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.max(220, rail.clientWidth * 0.75),
      behavior: 'smooth',
    });
  };

  const getTitle = (tour: Tour) =>
    locale === 'kn'
      ? tour.title?.kn || tour.title?.en || ''
      : tour.title?.en || '';

  const getSummary = (tour: Tour) =>
    locale === 'kn'
      ? tour.summary?.kn ||
        tour.summary?.en ||
        ''
      : tour.summary?.en || '';

  const categories = useMemo(() => {
    return [
      'all',
      ...Array.from(
        new Set(
          tours.map((tour) => tour.category)
        )
      ),
    ];
  }, [tours]);

  const regionStates = {
    north: ['jammu', 'kashmir', 'ladakh', 'himachal', 'uttarakhand', 'punjab', 'haryana', 'delhi', 'uttar pradesh'],
    south: ['andhra', 'telangana', 'karnataka', 'kerala', 'tamil nadu', 'puducherry'],
    east: ['bihar', 'jharkhand', 'odisha', 'orissa', 'west bengal', 'sikkim'],
    west: ['rajasthan', 'gujarat', 'maharashtra', 'goa', 'madhya pradesh', 'chhattisgarh'],
  } as const;

    const filteredTours = useMemo(() => {
      let filtered = [...tours];

      if (search.trim()) {
        const q = search.toLowerCase();

        filtered = filtered.filter((tour) => {
          const title = getTitle(tour).toLowerCase();
          const summary = getSummary(tour).toLowerCase();
          const destinations = (tour.destinations || [])
            .join(' ')
            .toLowerCase();

          return (
            title.includes(q) ||
            summary.includes(q) ||
            destinations.includes(q) ||
            tour.category.toLowerCase().includes(q) ||
            (tour.region || '').toLowerCase().includes(q)
          );
        });
      }

      // Domestic / International
      if (tourType === 'domestic') {
        filtered = filtered.filter(
          (tour) => tour.isDomestic
        );
      }

      if (tourType === 'international') {
        filtered = filtered.filter(
          (tour) => !tour.isDomestic
        );
      }

      // North / South / East / West
      if (
        tourType === 'domestic' &&
        region !== 'all'
      ) {
        filtered = filtered.filter(
          (tour) => {
            const tourRegion = tour.region?.toLowerCase() || '';
            return tourRegion === region || regionStates[region].some(
              (state) => tourRegion.includes(state)
            );
          }
        );
      }

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(
          (tour) =>
            tour.category === selectedCategory
        );
      }

      return filtered.sort((a, b) => {
        if (a.featured && !b.featured)
          return -1;

        if (!a.featured && b.featured)
          return 1;

        return 0;
      });
    }, [
      tours,
      search,
      tourType,
      region,
      selectedCategory,
    ]);

  const featuredTours =
    filteredTours.filter(
      (tour) => tour.featured
    );

  const displayedTours =
    filteredTours.slice(
      0,
      visibleCount
    );

  return (
  <div className="space-y-16">
  {/* Search Panel */}
  <section className="relative -mt-16 z-20">
    <div className="overflow-hidden rounded-[32px] border border-orange-200 bg-orange-50/90 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
      <div className="p-6 lg:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
            <Search className="h-6 w-6 text-orange-600" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-orange-900">
              {t('search_title')}
            </h3>

            <p className="text-sm text-orange-700">
              {t('search_subtitle')}
            </p>
          </div>
        </div>

        <label htmlFor="destination-search" className="sr-only">
          {t('search_label')}
        </label>
        <input
          id="destination-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search_placeholder')}
          className="mb-6 w-full rounded-2xl border border-orange-200 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            aria-pressed={tourType === 'all'}
            onClick={() => {
              setTourType('all');
              setRegion('all');
            }}
            className={`min-h-11 rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                region === 'all'
                ? 'bg-orange-700 text-white'
                : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
            }`}
          >
            {t('filter_all')}
          </button>

          <button
          type="button"
          aria-pressed={tourType === 'domestic'}
          onClick={() => {
            setTourType('domestic');
            setRegion('all');
          }}
          className={`min-h-11 rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
              tourType === 'domestic'
              ? 'bg-orange-700 text-white'
              : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
          }`}
        >
          {t('filter_domestic')}
        </button>

            <button
              type="button"
              aria-pressed={tourType === 'international'}
              onClick={() => {
                setTourType('international');
                setRegion('all');
              }}
              className={`min-h-11 rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                  tourType === 'international'
                  ? 'bg-orange-700 text-white'
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
            >
              {t('filter_international')}
            </button>
        </div>
        {tourType === 'domestic' && (
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { value: 'all', label: t('regions.all') },
                { value: 'north', label: t('regions.north') },
                { value: 'south', label: t('regions.south') },
                { value: 'east', label: t('regions.east') },
                { value: 'west', label: t('regions.west') },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={region === item.value}
                  onClick={() =>
                    setRegion(item.value as typeof region)
                  }
                  className={`min-h-11 rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                    region === item.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
  </section>  {/* Search Panel */}


      {/* Categories */}
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text md:text-5xl">
            {t('categories_title')}
          </h2>

          <p className="mt-2 text-slate-500">
            {t('categories_subtitle')}
          </p>
        </div>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => scrollCategories(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={categoryRailRef}
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
            aria-label="Popular tour categories"
          >
          {categories.map((category) => {
            const Icon =
              categoryIcons[
                category.toLowerCase()
              ] || Plane;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={(event) => {
                  setSelectedCategory(category);
                  event.currentTarget.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                  });
                }}
                className={`flex min-h-11 shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-2xl border px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 sm:gap-3 sm:px-5 ${
                  selectedCategory ===
                  category
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                    : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <Icon className="h-4 w-4" />

                <span>
                  {category === 'all'
                    ? t('filter_all')
                    : tCategory.has(category)
                      ? tCategory(category)
                      : category}
                </span>
              </button>
            );
          })}
          </div>

          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollCategories(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Featured Tours */}
      {featuredTours.length > 0 && (
        <section>
          <div className="mb-8 flex items-center gap-3">
            <Star className="h-6 w-6 fill-amber-400 text-amber-400" />

            <h2 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text md:text-5xl">
              {t('featured_title')}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredTours
              .slice(0, 3)
              .map((tour) => {
                    const image =
                          normalizeImageUrl(tour.heroImage || '');

                return (
                  <Link
                    key={tour.id}
                    href={{ pathname: '/tour/[slug]', params: { slug: tour.slug } }}
                    className="group relative h-[min(26rem,calc(100svh-8rem))] min-h-[20rem] min-w-0 overflow-hidden rounded-[32px] bg-himalaya-800"
                  >
                    {image && <Image
                      src={image}
                      alt={getTitle(tour)}
                      fill
                      sizes="(max-width: 1023px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute left-5 top-5 rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-900">
                      {t('featured_badge')}
                    </div>

                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="text-2xl font-bold">
                        {getTitle(tour)}
                      </h3>

                      <p className="mt-3 line-clamp-2 text-white/90">
                        {getSummary(tour)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                            {typeof tour.priceFrom === 'number' && tour.priceFrom > 0
                              ? `₹${tour.priceFrom.toLocaleString()}`
                              : tTour('contact_for_price')}
                        </span>

                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                          {tour.durationDays}D / {tour.durationNights}N
                        </span>

                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                          {tour.isDomestic
                            ? t('filter_domestic')
                            : t('filter_international')}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      )}

      {/* All Tours */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text md:text-5xl">
              {t('explore_title')}
            </h2>

            <p className="mt-2 text-slate-500">
              {t('results_count', {
                shown: displayedTours.length,
                total: filteredTours.length,
              })}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4" />
            {t('curated_experiences')}
          </div>
        </div>

        {displayedTours.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200 bg-white py-20 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              {loadFailed ? t('load_error_title') : t('empty_title')}
            </h3>

            <p className="mt-3 text-slate-500">
              {loadFailed ? t('load_error_description') : t('empty_description')}
            </p>
            {loadFailed && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-full bg-himalaya-900 px-5 py-3 font-medium text-white transition hover:bg-himalaya-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
              >
                {t('retry')}
              </button>
            )}
            {(search || tourType !== 'all' || region !== 'all' || selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setTourType('all');
                  setRegion('all');
                  setSelectedCategory('all');
                }}
                className="mt-5 rounded-full bg-himalaya-900 px-5 py-3 font-medium text-white transition hover:bg-himalaya-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
              >
                {t('clear_filters')}
              </button>
            )}
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {displayedTours.map((tour) => {
                const image =
                  normalizeImageUrl(tour.heroImage || '');

              const cardContent = (
                <>
                  {image && <Image
                    src={image}
                    alt={getTitle(tour)}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {tour.featured && (
                    <div className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-900">
                      ⭐ {t('featured_badge')}
                    </div>
                  )}

                  {!tour.active && (
                    <div className="absolute right-4 top-4 rounded-full bg-orange-700 px-3 py-1 text-xs font-semibold text-white">
                      Coming Soon
                    </div>
                  )}

                  <div className="absolute bottom-0 w-full p-5 text-white">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/20 px-2 py-1 text-[11px] backdrop-blur">
                          {typeof tour.priceFrom === 'number' && tour.priceFrom > 0
                            ? `₹${tour.priceFrom.toLocaleString()}`
                            : tTour('contact_for_price')}
                      </span>

                      <span className="rounded-full bg-white/20 px-2 py-1 text-[11px] backdrop-blur">
                        {tour.durationDays}D /{' '}
                        {tour.durationNights}N
                      </span>
                    </div>

                    <h3 className="text-lg font-bold">
                      {getTitle(tour)}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-white/90">
                      {getSummary(tour)}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs capitalize backdrop-blur">
                        {tour.category}
                      </span>

                      <span className="text-sm font-medium">
                        {t('view_journey')} →
                      </span>
                    </div>
                  </div>
                </>
              );

              if (tour.active) {
                return (
                  <Link
                    key={tour.id}
                    href={{ pathname: '/tour/[slug]', params: { slug: tour.slug } }}
                    className="group relative h-[min(26rem,calc(100svh-8rem))] min-h-[20rem] min-w-0 overflow-hidden rounded-[32px] bg-himalaya-800 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={tour.id}
                  className="group relative h-[min(26rem,calc(100svh-8rem))] min-h-[20rem] min-w-0 overflow-hidden rounded-[32px] bg-himalaya-800 opacity-90 shadow-lg"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        )}

        {/* View More */}
        {filteredTours.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() =>
                setVisibleCount((prev) => prev + 8)
              }
              className="rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
            >
              {t('view_more')}
            </button>
          </div>
        )}

        {/* Show Less */}
        {visibleCount > INITIAL_COUNT && (
          <div className="mt-4 text-center">
            <button
              onClick={() =>
                setVisibleCount(INITIAL_COUNT)
              }
              className="rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {t('show_less')}
            </button>
          </div>
        )}
      </section>

      {/* Travel Stats */}
      <section className="rounded-3xl bg-himalaya-900 p-6 text-white sm:p-8 md:p-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-4xl font-bold">
              {tours.length}
            </div>
            <div className="mt-2 text-white/80">
              {t('stats.tours')}
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold">
              {
                new Set(
                  tours.flatMap(
                    (tour) =>
                      tour.destinations || []
                  )
                ).size
              }
            </div>

            <div className="mt-2 text-white/80">
              {t('stats.destinations')}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}