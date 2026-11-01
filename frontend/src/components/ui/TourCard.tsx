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
      className="group relative min-w-0 overflow-hidden bg-white"
    >
      <Link href={{ pathname: '/tour/[slug]', params: { slug: tour.slug } }} className="block min-w-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-himalaya-800">
          {normalizeImageUrl(tour.heroImage) && (
            <Image
              src={normalizeImageUrl(tour.heroImage)}
              alt={tour.title[locale]}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="min-w-0 py-5">
          <p className="text-base font-medium text-himalaya-700">
            {tCategories.has(tour.category)
              ? tCategories(tour.category)
              : tour.category}
          </p>
          <h3 id={`tour-${tour.slug}-heading`} className="mt-2 line-clamp-2 break-words font-display text-lg font-semibold leading-snug text-himalaya-900">{tour.title[locale]}</h3>
          <p className="mt-2 line-clamp-2 text-base leading-relaxed text-himalaya-900">{tour.summary[locale]}</p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <span className="flex shrink-0 items-center gap-1 text-base text-himalaya-700">
              <Clock size={14} aria-hidden="true" /> {t('duration_compact', { days: tour.durationDays, nights: tour.durationNights })}
            </span>
            <div className="min-w-0 text-right">
              {hasPrice ? (
                <>
                  <div className="text-base text-himalaya-700">{t('starting_from')}</div>
                  <div className="break-words font-semibold text-saffron-700">
                    ₹{tour.priceFrom!.toLocaleString('en-IN')} <span className="text-base font-normal text-himalaya-700">{t('per_person')}</span>
                  </div>
                </>
              ) : (
                <div className="font-semibold text-saffron-700">{t('contact_for_price')}</div>
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
        className="absolute right-3 top-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/90 p-2 transition-transform hover:scale-105 motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700"
      >
        <Heart size={16} className={saved ? 'fill-saffron-500 text-saffron-500' : 'text-himalaya-800'} />
      </button>
    </motion.div>
  );
}
