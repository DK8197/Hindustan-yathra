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
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: Math.min(index * 0.08, 0.35), ease: [0.16, 1, 0.3, 1] }
      }
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3.5 transition-colors duration-200 hover:border-slate-300"
      data-ui
    >
      <Link href={{ pathname: '/tour/[slug]', params: { slug: tour.slug } }} className="block min-w-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
          {normalizeImageUrl(tour.heroImage) && (
            <Image
              src={normalizeImageUrl(tour.heroImage)}
              alt={tour.title[locale]}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
        </div>

        <div className="min-w-0 px-1 py-4">
          <p className="text-xs font-semibold text-saffron-700">
            {tCategories.has(tour.category)
              ? tCategories(tour.category)
              : tour.category}
          </p>
          <h3 id={`tour-${tour.slug}-heading`} className="mt-1.5 line-clamp-2 break-words font-display text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-himalaya-900">{tour.title[locale]}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{tour.summary[locale]}</p>

          <div className="mt-4 flex flex-wrap items-center justify-between pt-2 gap-x-3 gap-y-2">
            <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-slate-500">
              <Clock size={14} aria-hidden="true" /> {t('duration_compact', { days: tour.durationDays, nights: tour.durationNights })}
            </span>
            <div className="min-w-0 text-right">
              {hasPrice ? (
                <>
                  <div className="text-[11px] text-slate-400">{t('starting_from')}</div>
                  <div className="break-words text-base font-bold text-saffron-700">
                    ₹{tour.priceFrom!.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">{t('per_person')}</span>
                  </div>
                </>
              ) : (
                <div className="text-sm font-semibold text-saffron-700">{t('contact_for_price')}</div>
              )}
            </div>
          </div>
        </div>
      </Link>

      <motion.button
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={(e) => {
          e.preventDefault();
          toggleSaved(tour.slug);
        }}
        aria-label="Save tour"
        aria-pressed={saved}
        className="absolute right-6 top-6 flex min-h-10 min-w-10 items-center justify-center rounded-full bg-white/95 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700"
      >
        <Heart size={16} className={saved ? 'fill-saffron-500 text-saffron-500' : 'text-slate-700'} />
      </motion.button>
    </motion.div>
  );
}
