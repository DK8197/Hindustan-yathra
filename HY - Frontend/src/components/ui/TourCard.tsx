'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Heart, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Tour } from '@/types/tour';
import type { AppLocale } from '@/i18n/routing';
import { useAppStore } from '@/store/useAppStore';

export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations('tour');
  const saved = useAppStore((s) => s.savedTourSlugs.includes(tour.slug));
  const toggleSaved = useAppStore((s) => s.toggleSavedTour);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:shadow-xl"
    >
      <Link href={{ pathname: '/tour/[slug]', params: { slug: tour.slug } }} className="block">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={tour.title[locale]}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-himalaya-800">
            {tour.category}
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-himalaya-900">{tour.title[locale]}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">{tour.summary[locale]}</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={14} /> {tour.durationDays}D/{tour.durationNights}N
            </span>
            <div className="text-right">
              <div className="text-xs text-gray-400">{t('starting_from')}</div>
              <div className="font-semibold text-saffron-600">
                ₹{tour.priceFrom.toLocaleString('en-IN')} <span className="text-xs font-normal text-gray-400">{t('per_person')}</span>
              </div>
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
