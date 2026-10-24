'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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

type TourType = 'all' | 'domestic' | 'international';
type Region = 'all' | 'north' | 'south' | 'east' | 'west';

const INITIAL_COUNT = 8;
const PAGE_SIZE = 8;

const categoryIcons: Record<string, typeof Heart> = {
  honeymoon: Heart,
  adventure: Mountain,
  family: Users,
  business: Building2,
};

/**
 * Normalize text so searches ignore case, accents, punctuation and spacing.
 * Example: "Char Dham", "char-dham" and "Chardham" normalize consistently.
 *
 * FIX: combining marks (\p{M}) are now kept. Previously every Kannada vowel
 * sign / virama was replaced with a space, which split Kannada words apart
 * and broke Kannada search. Only Latin accent marks (U+0300–U+036F) are stripped.
 */
function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function compactSearchText(value: string): string {
  return normalizeSearchText(value).replace(/\s/g, '');
}

/** Levenshtein distance, with a small length guard for efficient fuzzy matching. */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  if (Math.abs(a.length - b.length) > 1) return 2;

  let previous: number[] = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const current: number[] = [i];

    for (let j = 1; j <= b.length; j++) {
      const left = current[j - 1] ?? 0;
      const up = previous[j] ?? 0;
      const diagonal = previous[j - 1] ?? 0;

      current[j] = Math.min(
        left + 1,
        up + 1,
        diagonal + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1),
      );
    }

    previous = current;
  }

  return previous[b.length] ?? 0;
}

function fuzzyWordMatch(queryWord: string, fieldWords: string[]): boolean {
  if (queryWord.length < 5) return false;

  return fieldWords.some((fieldWord) => {
    if (fieldWord === queryWord || fieldWord.includes(queryWord)) return true;
    return editDistance(queryWord, fieldWord) <= 1;
  });
}

/**
 * Higher scores mean better matches. All searchable fields are localized where
 * applicable, while destination names and region metadata are searched too.
 */
function getSearchScore(
  query: string,
  title: string,
  summary: string,
  destinations: string[],
  category: string,
  region: string,
): number {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return 1;

  const compactQuery = normalizedQuery.replace(/\s/g, '');
  const queryWords = normalizedQuery.split(' ').filter(Boolean);

  const fields = {
    title: normalizeSearchText(title),
    summary: normalizeSearchText(summary),
    destinations: normalizeSearchText(destinations.join(' ')),
    category: normalizeSearchText(category),
    region: normalizeSearchText(region),
  };

  const compactFields = {
    title: compactSearchText(title),
    summary: compactSearchText(summary),
    destinations: compactSearchText(destinations.join(' ')),
    category: compactSearchText(category),
    region: compactSearchText(region),
  };

  // Exact title and title-prefix matches should rank highest.
  if (compactFields.title === compactQuery) return 100;
  if (compactFields.title.startsWith(compactQuery)) return 90;
  if (compactFields.title.includes(compactQuery)) return 80;

  // Prefer destination, category and region matches over summary-only matches.
  if (compactFields.destinations.includes(compactQuery)) return 75;
  if (compactFields.category.includes(compactQuery)) return 65;
  if (compactFields.region.includes(compactQuery)) return 60;
  if (compactFields.summary.includes(compactQuery)) return 45;

  const allWords = Object.values(fields)
    .join(' ')
    .split(' ')
    .filter(Boolean);

  // Every query word must be found somewhere across the searchable fields.
  const allQueryWordsMatch = queryWords.every((word) =>
    allWords.some(
      (fieldWord) =>
        fieldWord.includes(word) ||
        (word.length >= 5 && editDistance(word, fieldWord) <= 1),
    ),
  );

  if (allQueryWordsMatch) return 35;

  // Fuzzy fallback for a small typo in a title or destination.
  const titleWords = fields.title.split(' ').filter(Boolean);
  const destinationWords = fields.destinations.split(' ').filter(Boolean);
  const otherWords = [
    ...fields.category.split(' '),
    ...fields.region.split(' '),
    ...fields.summary.split(' '),
  ].filter(Boolean);

  if (queryWords.every((word) => fuzzyWordMatch(word, titleWords))) return 30;
  if (queryWords.every((word) => fuzzyWordMatch(word, destinationWords))) return 28;

  if (
    queryWords.every((word) =>
      fuzzyWordMatch(word, [...titleWords, ...destinationWords, ...otherWords]),
    )
  ) {
    return 20;
  }

  return 0;
}

const REGION_PLACES: Record<Exclude<Region, 'all'>, readonly string[]> = {
  north: [
    'jammu', 'kashmir', 'ladakh', 'himachal', 'uttarakhand', 'punjab',
    'haryana', 'delhi', 'chandigarh', 'uttar pradesh', 'manali', 'shimla',
    'dharamshala', 'dalhousie', 'spiti', 'leh', 'srinagar', 'gulmarg',
    'pahalgam', 'katra', 'vaishno devi', 'amritsar', 'haridwar', 'rishikesh',
    'kedarnath', 'badrinath', 'gangotri', 'yamunotri', 'char dham', 'chardham',
    'mussoorie', 'nainital', 'auli', 'agra', 'mathura', 'vrindavan', 'varanasi',
    'ayodhya', 'prayagraj', 'lucknow',
  ],
  south: [
    'andhra', 'telangana', 'karnataka', 'kerala', 'tamil nadu', 'puducherry',
    'pondicherry', 'lakshadweep', 'andaman', 'bengaluru', 'bangalore', 'mysuru',
    'mysore', 'hampi', 'badami', 'pattadakal', 'vijayapura', 'hubballi', 'hubli',
    'dharwad', 'murudeshwar', 'udupi', 'gokarna', 'coorg', 'kodagu',
    'chikmagalur', 'mangaluru', 'mangalore', 'sringeri', 'dharmasthala',
    'tirupati', 'tirumala', 'srisailam', 'vijayawada', 'visakhapatnam', 'vizag',
    'araku', 'hyderabad', 'warangal', 'chennai', 'madurai', 'rameswaram',
    'rameshwaram', 'kanyakumari', 'ooty', 'coonoor', 'kodaikanal',
    'mahabalipuram', 'thanjavur', 'kanchipuram', 'kochi', 'cochin', 'munnar',
    'alleppey', 'alappuzha', 'thekkady', 'wayanad', 'kovalam',
    'thiruvananthapuram', 'trivandrum', 'varkala', 'guruvayur', 'port blair',
    'havelock island',
  ],
  east: [
    'bihar', 'jharkhand', 'odisha', 'orissa', 'west bengal', 'sikkim', 'assam',
    'arunachal pradesh', 'meghalaya', 'manipur', 'mizoram', 'nagaland', 'tripura',
    'kolkata', 'darjeeling', 'kalimpong', 'sundarbans', 'gangasagar',
    'shantiniketan', 'digha', 'patna', 'bodh gaya', 'gaya', 'nalanda', 'ranchi',
    'jamshedpur', 'deoghar', 'parasnath', 'bhubaneswar', 'puri', 'konark',
    'chilika', 'cuttack', 'sambalpur', 'gangtok', 'pelling', 'lachung', 'yumthang',
    'guwahati', 'kaziranga', 'shillong', 'cherrapunji', 'sohra', 'tawang', 'ziro',
    'imphal', 'kohima', 'agartala', 'aizawl',
  ],
  west: [
    'rajasthan', 'gujarat', 'maharashtra', 'goa', 'madhya pradesh', 'chhattisgarh',
    'daman', 'diu', 'dadra and nagar haveli', 'jaipur', 'udaipur', 'jodhpur',
    'jaisalmer', 'bikaner', 'pushkar', 'ajmer', 'mount abu', 'ranthambore',
    'ahmedabad', 'dwarka', 'somnath', 'gir', 'rann of kutch', 'statue of unity',
    'vadodara', 'surat', 'mumbai', 'pune', 'nashik', 'shirdi', 'aurangabad',
    'chhatrapati sambhajinagar', 'ajanta', 'ellora', 'mahabaleshwar', 'lonavala',
    'ratnagiri', 'ganpatipule', 'panaji', 'north goa', 'south goa', 'calangute',
    'bhopal', 'indore', 'ujjain', 'omkareshwar', 'khajuraho', 'gwalior', 'orchha',
    'kanha', 'bandhavgarh', 'raipur', 'jagdalpur', 'chitrakote',
  ],
};

// FIX: normalize aliases once instead of on every tour for every filter run.
const NORMALIZED_REGION_PLACES = Object.fromEntries(
  (Object.keys(REGION_PLACES) as Exclude<Region, 'all'>[]).map((key) => [
    key,
    REGION_PLACES[key].map(normalizeSearchText).filter(Boolean),
  ]),
) as Record<Exclude<Region, 'all'>, string[]>;

/**
 * FIX: match whole words/phrases only. Previously plain substring matching
 * caused false positives ("gir" in "girish", "goa" in "goat", "leh" in "sleh",
 * and a tour region such as "north goa" or "northeast" counting as "north"/"east").
 */
function containsPhrase(haystack: string, phrase: string): boolean {
  return ` ${haystack} `.includes(` ${phrase} `);
}

function matchesRegion(
  tourRegion: string,
  destinations: string[],
  region: Exclude<Region, 'all'>,
): boolean {
  const regionText = normalizeSearchText(tourRegion);

  if (regionText === region || regionText === `${region} india`) return true;

  const searchablePlaces = normalizeSearchText([tourRegion, ...destinations].join(' '));

  return NORMALIZED_REGION_PLACES[region].some((place) =>
    containsPhrase(searchablePlaces, place),
  );
}

const getTitle = (tour: Tour, locale: 'en' | 'kn') =>
  locale === 'kn' ? tour.title?.kn || tour.title?.en || '' : tour.title?.en || '';

const getSummary = (tour: Tour, locale: 'en' | 'kn') =>
  locale === 'kn' ? tour.summary?.kn || tour.summary?.en || '' : tour.summary?.en || '';

export default function DestinationsExplorer({
  tours,
  locale,
  initialQuery = '',
  loadFailed = false,
}: Props) {
  const t = useTranslations('destinations');
  const tTour = useTranslations('tour');
  const tCategory = useTranslations('categories');

  // The hero form sends ?q=..., so the URL is the primary source of the query;
  // the initialQuery prop is kept as a fallback.
  const searchParams = useSearchParams();
  const urlQuery = (searchParams.get('q') ?? initialQuery).trim().slice(0, 100);

  const [search, setSearch] = useState(urlQuery);
  const [debouncedSearch, setDebouncedSearch] = useState(urlQuery);
  const [tourType, setTourType] = useState<TourType>('all');
  const [region, setRegion] = useState<Region>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const categoryRailRef = useRef<HTMLDivElement>(null);

  // Apply immediately (no debounce) when the URL query changes, e.g. a new
  // search submitted from the hero while already on /destinations.
  useEffect(() => {
    setSearch(urlQuery);
    setDebouncedSearch(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [debouncedSearch, tourType, region, selectedCategory]);

  const scrollCategories = (direction: -1 | 1) => {
    const rail = categoryRailRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.max(220, rail.clientWidth * 0.75),
      behavior: 'smooth',
    });
  };

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(tours.map((tour) => tour.category).filter(Boolean)))],
    [tours],
  );

  const getCategoryLabel = (category: string) => {
    if (category === 'all') return t('filter_all');
    try {
      return tCategory.has(category) ? tCategory(category) : category;
    } catch {
      return category;
    }
  };

  const filteredTours = useMemo(() => {
    const query = debouncedSearch.trim();

    let filtered = tours
      .map((tour, index) => ({
        tour,
        index,
        score: query
          ? getSearchScore(
              query,
              getTitle(tour, locale),
              getSummary(tour, locale),
              tour.destinations || [],
              tour.category || '',
              tour.region || '',
            )
          : 0,
      }))
      .filter(({ score }) => !query || score > 0);

    if (tourType === 'domestic') {
      filtered = filtered.filter(({ tour }) => tour.isDomestic);
    } else if (tourType === 'international') {
      filtered = filtered.filter(({ tour }) => !tour.isDomestic);
    }

    if (tourType === 'domestic' && region !== 'all') {
      filtered = filtered.filter(({ tour }) =>
        matchesRegion(tour.region || '', tour.destinations || [], region),
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(({ tour }) => tour.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      const featuredDifference =
        Number(Boolean(b.tour.featured)) - Number(Boolean(a.tour.featured));

      if (featuredDifference !== 0) return featuredDifference;
      return a.index - b.index;
    });

    return filtered.map(({ tour }) => tour);
  }, [tours, debouncedSearch, tourType, region, selectedCategory, locale]);

  // FIX: featured cards are links, so inactive ("Coming Soon") tours must not
  // appear there; they were previously clickable in the featured section only.
  const featuredTours = filteredTours.filter((tour) => tour.featured && tour.active);
  const displayedTours = filteredTours.slice(0, visibleCount);
  const hasActiveFilters =
    Boolean(search.trim()) ||
    tourType !== 'all' ||
    region !== 'all' ||
    selectedCategory !== 'all';

  const destinationCount = useMemo(
    () => new Set(tours.flatMap((tour) => tour.destinations || [])).size,
    [tours],
  );

  const clearFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setTourType('all');
    setRegion('all');
    setSelectedCategory('all');
    setVisibleCount(INITIAL_COUNT);
  };

  // FIX: fixed locale so server and client render the same string
  // (toLocaleString() without a locale causes hydration mismatches).
  const renderPrice = (priceFrom: number | null | undefined) =>
    typeof priceFrom === 'number' && priceFrom > 0
      ? `₹${priceFrom.toLocaleString('en-IN')}`
      : tTour('contact_for_price');

  return (
    <div className="space-y-16">
      {/* Search and filters */}
      <section className="relative z-20 -mt-16">
        <div className="overflow-hidden rounded-[32px] border border-orange-200 bg-orange-50/90 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                <Search className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-900">
                  {t('search_title')}
                </h3>
                <p className="text-sm text-orange-700">{t('search_subtitle')}</p>
              </div>
            </div>

            <label htmlFor="destination-search" className="sr-only">
              {t('search_label')}
            </label>
            <input
              id="destination-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('search_placeholder')}
              autoComplete="off"
              className="mb-6 w-full rounded-2xl border border-orange-200 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

            <div className="flex flex-wrap gap-3">
              {(
                [
                  { value: 'all', label: t('filter_all') },
                  { value: 'domestic', label: t('filter_domestic') },
                  { value: 'international', label: t('filter_international') },
                ] as { value: TourType; label: string }[]
              ).map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={tourType === item.value}
                  onClick={() => {
                    setTourType(item.value);
                    setRegion('all');
                  }}
                  className={`min-h-11 rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                    tourType === item.value
                      ? 'bg-orange-700 text-white'
                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
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
                    onClick={() => setRegion(item.value as Region)}
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
      </section>

      {/* Categories */}
      <section>
        <div className="mb-8">
          <h2 className="bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl">
            {t('categories_title')}
          </h2>
          <p className="mt-2 text-slate-500">{t('categories_subtitle')}</p>
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
            role="group"
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
            aria-label="Popular tour categories"
          >
            {categories.map((category) => {
              const Icon = categoryIcons[category.toLowerCase()] || Plane;

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
                    selectedCategory === category
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                      : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-md'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{getCategoryLabel(category)}</span>
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

      {/* Featured tours */}
      {featuredTours.length > 0 && (
        <section>
          <div className="mb-8 flex items-center gap-3">
            <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
            <h2 className="bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl">
              {t('featured_title')}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredTours.slice(0, 3).map((tour) => {
              const image = normalizeImageUrl(tour.heroImage || '');

              return (
                <Link
                  key={tour.id}
                  href={{ pathname: '/tour/[slug]', params: { slug: tour.slug } }}
                  className="group relative h-[min(26rem,calc(100svh-8rem))] min-h-[20rem] min-w-0 overflow-hidden rounded-[32px] bg-himalaya-800"
                >
                  {image && (
                    <Image
                      src={image}
                      alt={getTitle(tour, locale)}
                      fill
                      sizes="(max-width: 1023px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-900">
                    {t('featured_badge')}
                  </div>
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{getTitle(tour, locale)}</h3>
                    <p className="mt-3 line-clamp-2 text-white/90">{getSummary(tour, locale)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                        {renderPrice(tour.priceFrom)}
                      </span>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                        {tour.durationDays}D / {tour.durationNights}N
                      </span>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                        {tour.isDomestic ? t('filter_domestic') : t('filter_international')}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* All tours */}
      <section>
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl">
              {t('explore_title')}
            </h2>
            <p className="mt-2 text-slate-500" aria-live="polite">
              {t('results_count', {
                shown: displayedTours.length,
                total: filteredTours.length,
              })}
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 md:flex">
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

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-full bg-himalaya-900 px-5 py-3 font-medium text-white transition hover:bg-himalaya-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
              >
                {t('clear_filters')}
              </button>
            )}
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {displayedTours.map((tour) => {
              const image = normalizeImageUrl(tour.heroImage || '');

              const cardContent = (
                <>
                  {image && (
                    <Image
                      src={image}
                      alt={getTitle(tour, locale)}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  )}
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
                        {renderPrice(tour.priceFrom)}
                      </span>
                      <span className="rounded-full bg-white/20 px-2 py-1 text-[11px] backdrop-blur">
                        {tour.durationDays}D / {tour.durationNights}N
                      </span>
                    </div>

                    <h3 className="text-lg font-bold">{getTitle(tour, locale)}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/90">
                      {getSummary(tour, locale)}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs capitalize backdrop-blur">
                        {getCategoryLabel(tour.category || '')}
                      </span>
                      {tour.active && (
                        <span className="text-sm font-medium">{t('view_journey')} →</span>
                      )}
                    </div>
                  </div>
                </>
              );

              const cardClass =
                'group relative h-[min(26rem,calc(100svh-8rem))] min-h-[20rem] min-w-0 overflow-hidden rounded-[32px] bg-himalaya-800 shadow-lg';

              if (tour.active) {
                return (
                  <Link
                    key={tour.id}
                    href={{ pathname: '/tour/[slug]', params: { slug: tour.slug } }}
                    className={`${cardClass} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={tour.id} className={`${cardClass} opacity-90`}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        )}

        {filteredTours.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((previous) => previous + PAGE_SIZE)}
              className="rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
            >
              {t('view_more')}
            </button>
          </div>
        )}

        {visibleCount > INITIAL_COUNT && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount(INITIAL_COUNT)}
              className="rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {t('show_less')}
            </button>
          </div>
        )}
      </section>

      {/* Travel statistics */}
      <section className="rounded-3xl bg-himalaya-900 p-6 text-white sm:p-8 md:p-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-4xl font-bold">{tours.length}</div>
            <div className="mt-2 text-white/80">{t('stats.tours')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{destinationCount}</div>
            <div className="mt-2 text-white/80">{t('stats.destinations')}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
