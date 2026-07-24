'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Star,
  Plane,
  Mountain,
  Heart,
  Users,
  Building2,
} from 'lucide-react';


type Tour = {
  id: number;
  slug: string;
  category: string;
  featured: boolean;
  active: boolean;
  isDomestic: boolean;
  priceFrom: number;
  currency: string;
  region?: string;
  durationDays: number;
  durationNights: number;
  heroImage?: string;
  destinations: string[];
  title: {
    en?: string;
    kn?: string;
  };
  summary: {
    en?: string;
    kn?: string;
  };
};

type Props = {
  tours: Tour[];
  locale: 'en' | 'kn';
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
}: Props) {
  const [search, setSearch] = useState('');
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

    const filteredTours = useMemo(() => {
      let filtered = [...tours];

      if (search.trim()) {
        const q = search.toLowerCase();

        filtered = filtered.filter((tour) => {
          const title = getTitle(tour).toLowerCase();

          return (
            title.includes(q) ||
            tour.category.toLowerCase().includes(q)
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
          (tour) =>
            tour.region?.toLowerCase() === region
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
              Search Destinations
            </h3>

            <p className="text-sm text-orange-700">
              Find your next adventure
            </p>
          </div>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destination, category..."
          className="mb-6 w-full rounded-2xl border border-orange-200 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setRegion('all')}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              region === 'all'
                ? 'bg-orange-600 text-white'
                : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
            }`}
          >
            All Tours
          </button>

          <button
          onClick={() => {
            setTourType('domestic');
            setRegion('all');
          }}
          className={`rounded-full px-5 py-2 text-sm font-medium transition ${
            tourType === 'domestic'
              ? 'bg-orange-600 text-white'
              : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
          }`}
        >
          🇮🇳 Domestic
        </button>

            <button
              onClick={() => {
                setTourType('international');
                setRegion('all');
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                tourType === 'international'
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
            >
              🌎 International
            </button>
        </div>
        {tourType === 'domestic' && (
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { value: 'all', label: '🇮🇳 All India' },
                { value: 'north', label: '🏔️ North' },
                { value: 'south', label: '🌴 South' },
                { value: 'east', label: '🌅 East' },
                { value: 'west', label: '🏜️ West' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() =>
                    setRegion(item.value as typeof region)
                  }
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
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
            Popular Categories
          </h2>

          <p className="mt-2 text-slate-500">
            Explore tours by interest
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {categories.map((category) => {
            const Icon =
              categoryIcons[
                category.toLowerCase()
              ] || Plane;

            return (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
                className={`flex items-center gap-3 rounded-2xl border px-5 py-3 transition-all ${
                  selectedCategory ===
                  category
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                    : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <Icon className="h-4 w-4" />

                <span className="capitalize">
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Tours */}
      {featuredTours.length > 0 && (
        <section>
          <div className="mb-8 flex items-center gap-3">
            <Star className="h-6 w-6 fill-amber-400 text-amber-400" />

            <h2 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text md:text-5xl">
              Featured Experiences
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredTours
              .slice(0, 3)
              .map((tour) => {
                    const image =
                      tour.heroImage ||
                      '/images/placeholders/destination.jpg';

                return (
                  <Link
                    key={tour.id}
                    href={`/${locale}/tour/${tour.slug}`}
                    className="group relative h-[420px] overflow-hidden rounded-[32px]"
                  >
                    <Image
                      src={image}
                      alt={getTitle(tour)}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute left-5 top-5 rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-900">
                      Featured
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
                          ₹{tour.priceFrom?.toLocaleString()}
                        </span>

                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                          {tour.durationDays}D / {tour.durationNights}N
                        </span>

                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                          {tour.isDomestic
                            ? 'Domestic'
                            : 'International'}
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
              Explore Tours
            </h2>

            <p className="mt-2 text-slate-500">
              Showing {displayedTours.length} of{' '}
              {filteredTours.length} tours
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4" />
            Curated Experiences
          </div>
        </div>

        {displayedTours.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200 bg-white py-20 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              No destinations found
            </h3>

            <p className="mt-3 text-slate-500">
              Try changing search criteria or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {displayedTours.map((tour) => {
                const image =
                  tour.heroImage ||
                  '/images/placeholders/destination.jpg';

              const cardContent = (
                <>
                  <Image
                    src={image}
                    alt={getTitle(tour)}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {tour.featured && (
                    <div className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-900">
                      ⭐ Featured
                    </div>
                  )}

                  {!tour.active && (
                    <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                      Coming Soon
                    </div>
                  )}

                  <div className="absolute bottom-0 w-full p-5 text-white">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/20 px-2 py-1 text-[11px] backdrop-blur">
                        ₹{tour.priceFrom?.toLocaleString()}
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
                        Explore →
                      </span>
                    </div>
                  </div>
                </>
              );

              if (tour.active) {
                return (
                  <Link
                    key={tour.id}
                    href={`/${locale}/tour/${tour.slug}`}
                    className="group relative h-[420px] overflow-hidden rounded-[32px] bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={tour.id}
                  className="group relative h-[420px] overflow-hidden rounded-[32px] bg-white opacity-80 shadow-lg"
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
              View More Tours
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
              Show Less
            </button>
          </div>
        )}
      </section>

      {/* Travel Stats */}
      <section className="rounded-[40px] bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 p-8 text-white md:p-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-4xl font-bold">
              {tours.length}+
            </div>
            <div className="mt-2 text-white/80">
              Curated Tours
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
              }+
            </div>

            <div className="mt-2 text-white/80">
              Destinations
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold">
              10K+
            </div>

            <div className="mt-2 text-white/80">
              Happy Travellers
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold">
              4.9★
            </div>

            <div className="mt-2 text-white/80">
              Customer Rating
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}