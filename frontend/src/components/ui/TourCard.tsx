'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Heart, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Tour } from '@/types/tour';
import type { AppLocale } from '@/i18n/routing';
import { useAppStore } from '@/store/useAppStore';
import { normalizeImageUrl } from '@/lib/image-cdn';

export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations('tour');
  const tCategories = useTranslations('categories');
  const shouldReduceMotion = useReducedMotion();
  const hasPrice = typeof tour.priceFrom === 'number' && Number.isFinite(tour.priceFrom) && tour.priceFrom > 0;
  const saved = useAppStore((s) => s.savedTourSlugs.includes(tour.slug));
  const toggleSaved = useAppStore((s) => s.toggleSavedTour);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.05 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:shadow-xl"
    >
      <Link href={{ pathname: '/tour/[slug]', params: { slug: tour.slug } }} className="block min-w-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-himalaya-800 sm:aspect-[3/2]">
          {normalizeImageUrl(tour.heroImage) && (
            <Image
              src={normalizeImageUrl(tour.heroImage)}
              alt={tour.title[locale]}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-himalaya-800">
            {tCategories.has(tour.category)
              ? tCategories(tour.category)
              : tour.category}
          </span>
        </div>

        <div className="min-w-0 p-4 sm:p-5">
          <h3 className="line-clamp-2 break-words font-display text-lg font-semibold leading-snug text-himalaya-900">{tour.title[locale]}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">{tour.summary[locale]}</p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <span className="flex shrink-0 items-center gap-1 text-xs text-gray-500">
              <Clock size={14} aria-hidden="true" /> {t('duration_compact', { days: tour.durationDays, nights: tour.durationNights })}
            </span>
            <div className="min-w-0 text-right">
              {hasPrice ? (
                <>
                  <div className="text-xs text-gray-400">{t('starting_from')}</div>
                  <div className="break-words font-semibold text-saffron-600">
                    ₹{tour.priceFrom!.toLocaleString('en-IN')} <span className="text-xs font-normal text-gray-400">{t('per_person')}</span>
                  </div>
                </>
              ) : (
                <div className="font-semibold text-saffron-600">{t('contact_for_price')}</div>
              )}
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleSaved(tour.slug);
        }}
        aria-label="Save tour"
        aria-pressed={saved}
        className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm transition hover:scale-110"
      >
        <Heart size={16} className={saved ? 'fill-saffron-500 text-saffron-500' : 'text-himalaya-800'} />
      </button>
    </motion.div>
  );
}
