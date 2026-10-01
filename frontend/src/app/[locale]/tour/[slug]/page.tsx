import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { lookupTourBySlug, getAllTourSlugs } from '@/lib/tours-repository';
import { normalizeImageUrl } from '@/lib/image-cdn';
import { getTranslations } from 'next-intl/server';
import { getPathname, Link } from '@/i18n/routing';
import { TourItineraryTimeline } from '@/components/sections/TourItineraryTimeline';
import { TourFAQ } from '@/components/sections/TourFAQ';
import { TourReviews } from '@/components/sections/TourReviews';
import { TourGallery } from '@/components/sections/TourGallery';
import { TourBookingCard } from '@/components/sections/TourBookingCard';
import { TourInclusionsExclusions } from '@/components/sections/TourInclusionsExclusions';

type Params = { locale: 'en' | 'kn'; slug: string };

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllTourSlugs();
  // console.log(slugs)
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await lookupTourBySlug(slug);
  if (result.status !== 'found') return {};
  const { tour } = result;

  const href = { pathname: '/tour/[slug]', params: { slug } } as const;

  return {
    title: tour.seo.title[locale],
    description: tour.seo.description[locale],
    alternates: {
      canonical: `https://hindustanyatra.com${getPathname({ locale, href })}`,
      languages: {
        en: `https://hindustanyatra.com${getPathname({ locale: 'en', href })}`,
        kn: `https://hindustanyatra.com${getPathname({ locale: 'kn', href })}`,
      },
    },
    openGraph: {
      title: tour.seo.title[locale],
      description: tour.seo.description[locale],
      images: [normalizeImageUrl(tour.seo.ogImage)],
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } =
    await params;
  const tTour = await getTranslations({ locale, namespace: 'tour' });
  const tCategory = await getTranslations({ locale, namespace: 'categories' });

  const result = await lookupTourBySlug(slug);

  if (result.status === 'not-found') {
    notFound();
  }

  if (result.status === 'unavailable') {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h1 className="font-display text-3xl font-semibold text-himalaya-900 sm:text-4xl">
          {tTour('tour_load_error_title')}
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-700">
          {tTour('tour_load_error_description')}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full bg-saffron-700 px-6 py-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2">
            {tTour('ask_travel_expert')}
          </Link>
          <Link href="/destinations" className="inline-flex min-h-11 items-center justify-center rounded-full border border-himalaya-700 px-6 py-3 font-semibold text-himalaya-900 hover:bg-himalaya-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-himalaya-700 focus-visible:ring-offset-2">
            {tTour('browse_journeys')}
          </Link>
        </div>
      </section>
    );
  }

  const { tour } = result;

  const hasPrice = typeof tour.priceFrom === 'number' && Number.isFinite(tour.priceFrom) && tour.priceFrom > 0;
  const heroImage = typeof tour.heroImage === 'string' && tour.heroImage.trim()
    ? tour.heroImage.trim()
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context':
              'https://schema.org',
            '@type':
              'TouristTrip',
            name:
              tour.title[locale],
            description:
              tour.summary[locale],
            touristType:
              tour.category,
            offers: hasPrice ? {
              '@type': 'Offer',
              priceCurrency:
                tour.currency ??
                'INR',
              price:
                tour.priceFrom,
            } : undefined,
          }),
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[70svh] w-full overflow-hidden bg-gradient-to-br from-himalaya-800 via-himalaya-700 to-saffron-700 sm:min-h-[65vh]">
        {heroImage && (
          <Image
            src={normalizeImageUrl(heroImage)}
            alt={tour.title[locale]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl items-end px-4 pb-8 pt-24 sm:min-h-[65vh] sm:px-6 sm:pb-12 md:px-12">
            <div className="max-w-4xl">
              <div className="mb-3 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md sm:mb-4">
                {tCategory.has(tour.category) ? tCategory(tour.category) : tour.category}
              </div>

              <h1 className="break-words font-display text-3xl font-semibold leading-tight text-white [text-wrap:balance] sm:text-4xl md:text-6xl">
                {tour.title[locale]}
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/90 sm:mt-4 sm:text-lg md:text-xl">
                {tour.summary[locale]}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                {tour.destinations?.map(
                  (
                    destination: string
                  ) => (
                    <span
                      key={
                        destination
                      }
                      className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md"
                    >
                      {
                        destination
                      }
                    </span>
                  )
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-white sm:gap-3">
                <span className="rounded-full border border-white/20 bg-black/30 px-4 py-2 font-semibold">
                  {hasPrice
                    ? `${tTour('starting_from')} ₹${tour.priceFrom!.toLocaleString('en-IN')} ${tTour('per_person')}`
                    : tTour('contact_for_price')}
                </span>
                {(tour.durationDays > 0 || tour.durationNights > 0) && (
                  <span className="rounded-full border border-white/20 bg-black/30 px-4 py-2">
                    {tTour('duration', { days: tour.durationDays, nights: tour.durationNights })}
                  </span>
                )}
              </div>

              <a
                href="#tour-enquiry"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-saffron-700 px-6 py-3 font-semibold text-white transition hover:bg-saffron-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-himalaya-900"
              >
                {tTour('ask_travel_expert')}
              </a>
            </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-28 pt-8 sm:px-6 sm:py-12 md:px-12 lg:grid-cols-3 lg:gap-12">
        {/* Main Content */}
        <div className="order-last min-w-0 space-y-16 lg:order-first lg:col-span-2">

          {/* Highlights */}
          {tour.highlights?.[
            locale
          ]?.length > 0 && (
            <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold">
                {tTour('highlights')}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {tour.highlights[
                  locale
                ].map(
                  (
                    item: string,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-2xl bg-neutral-50 p-4"
                    >
                      <span className="text-emerald-600">
                        ✓
                      </span>

                      <span>
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          <TourInclusionsExclusions
            inclusions={tour.inclusions}
            exclusions={tour.exclusions}
            locale={locale}
          />

          {/* Itinerary */}
          <TourItineraryTimeline
            itinerary={
              tour.itinerary
            }
            locale={locale}
          />

          {/* Gallery */}
          <TourGallery
            gallery={
              tour.gallery
            }
          />

          {/* FAQ */}
          <TourFAQ
            faqs={tour.faqs}
          />

          {/* Reviews */}
          <TourReviews
            reviews={
              tour.reviews
            }
          />
        </div>

        {/* Sidebar */}
        <div className="order-first min-w-0 lg:order-last lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <TourBookingCard
              tour={tour}
              locale={locale}
            />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pt-3 backdrop-blur lg:hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.75rem)' }}>
        <a
          href="#tour-enquiry"
          className="mx-auto flex min-h-12 max-w-xl items-center justify-center rounded-full bg-saffron-600 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-saffron-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2"
        >
          {tTour('ask_travel_expert')}
        </a>
      </div>
    </>
  );
}