import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTourBySlug, getAllTourSlugs } from '@/lib/tours-repository';
import { TourItineraryTimeline } from '@/components/sections/TourItineraryTimeline';
import { TourFAQ } from '@/components/sections/TourFAQ';
import { TourReviews } from '@/components/sections/TourReviews';
import { TourGallery } from '@/components/sections/TourGallery';
import { TourBookingCard } from '@/components/sections/TourBookingCard';
import { TourInclusionsExclusions } from '@/components/sections/TourInclusionsExclusions';

type Params = { locale: 'en' | 'kn'; slug: string };

export async function generateStaticParams() {
  const slugs = await getAllTourSlugs();
  // console.log(slugs)
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = await getTourBySlug(slug);
  console.log(tour)
  if (!tour) return {};

  return {
    title: tour.seo.title[locale],
    description: tour.seo.description[locale],
    alternates: {
      canonical: `https://hindustanyathra.com/${locale}/tour/${slug}`,
      languages: {
        en: `https://hindustanyathra.com/en/tour/${slug}`,
        kn: `https://hindustanyathra.com/kn/tour/${slug}`,
      },
    },
    openGraph: {
      title: tour.seo.title[locale],
      description: tour.seo.description[locale],
      images: [tour.seo.ogImage],
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

  const tour =
    await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

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
            offers: {
              '@type': 'Offer',
              priceCurrency:
                tour.currency ??
                'INR',
              price:
                tour.priceFrom,
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title[locale]}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-6 pb-12 md:px-12">
            <div className="max-w-4xl">
              <div className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md">
                {tour.category}
              </div>

              <h1 className="font-display text-4xl font-semibold text-white md:text-6xl">
                {tour.title[locale]}
              </h1>

              <p className="mt-4 max-w-3xl text-lg text-white/90 md:text-xl">
                {tour.summary[locale]}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-16 lg:col-span-2">

          {/* Highlights */}
          {tour.highlights?.[
            locale
          ]?.length > 0 && (
            <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold">
                {locale === 'kn'
                  ? 'ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು'
                  : 'Tour Highlights'}
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

          {/* Inclusions & Exclusions */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-2xl font-semibold text-emerald-700">
                  {locale === 'kn'
                    ? 'ಒಳಗೊಂಡಿರುವವು'
                    : 'Inclusions'}
                </h2>

                <ul className="space-y-3">
                  {tour.inclusions?.[
                    locale
                  ]?.map(
                    (
                      item: string,
                      index: number
                    ) => (
                      <li
                        key={index}
                        className="flex gap-3"
                      >
                        <span className="text-emerald-600">
                          ✓
                        </span>

                        <span>
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-semibold text-red-700">
                  {locale === 'kn'
                    ? 'ಒಳಗೊಂಡಿಲ್ಲ'
                    : 'Exclusions'}
                </h2>

                <ul className="space-y-3">
                  {tour.exclusions?.[
                    locale
                  ]?.map(
                    (
                      item: string,
                      index: number
                    ) => (
                      <li
                        key={index}
                        className="flex gap-3"
                      >
                        <span className="text-red-600">
                          ✕
                        </span>

                        <span>
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </section>

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
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <TourBookingCard
              tour={tour}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </>
  );
}