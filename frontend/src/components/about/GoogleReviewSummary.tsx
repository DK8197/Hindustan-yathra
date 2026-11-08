'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, ExternalLink, Star } from 'lucide-react';
import { useRef, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { GOOGLE_REVIEWS_DATA } from '@/data/google-reviews';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Hindustan+Yatra/@15.3496893,75.1426416,17z/data=!3m1!5s0x3bb8d767e0538faf:0x1665ec8aba781a39!4m8!3m7!1s0x3bb8d7a1d1fdc27f:0xda2cb0a266c7d9a9!8m2!3d15.3496893!4d75.1426416!9m1!1b1!16s%2Fg%2F11g4dtpl5r';
const GOOGLE_WRITE_REVIEW_URL =
  'https://www.google.com/maps/place/Hindustan+Yatra/@15.3496893,75.1426416,17z/data=!3m1!5s0x3bb8d767e0538faf:0x1665ec8aba781a39!4m8!3m7!1s0x3bb8d7a1d1fdc27f:0xda2cb0a266c7d9a9!8m2!3d15.3496893!4d75.1426416!9m1!1b1!16s%2Fg%2F11g4dtpl5r';

// Emil Kowalski spring tokens
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 280, damping: 26 } as const;

export default function GoogleReviewSummary() {
  const t = useTranslations('about');
  const locale = useLocale() as 'en' | 'kn';
  const railRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const scroll = (direction: -1 | 1) => {
    if (!railRef.current) return;
    const cardWidth = 320;
    railRef.current.scrollBy({
      left: direction * (cardWidth + 16),
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-labelledby="google-review-heading"
      className="bg-slate-50/70 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Header Card following the uploaded image style */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 md:flex-row md:items-center md:justify-between sm:p-8"
          data-ui
        >
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                4.9
              </span>
            </div>

            <div className="flex flex-col">
              <div
                role="img"
                className="flex items-center gap-1 text-amber-500"
                aria-label={t('google_rating_accessible', { rating: '4.9' })}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={shouldReduceMotion ? false : { scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.05,
                      type: 'spring',
                      stiffness: 450,
                      damping: 25,
                    }}
                  >
                    <Star
                      aria-hidden="true"
                      className="h-5 w-5 fill-amber-500 text-amber-500"
                    />
                  </motion.div>
                ))}
              </div>
              <span className="mt-1 text-sm font-medium text-slate-500">
                {t('google_reviews_based_on')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_SNAPPY}
              href={GOOGLE_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              {t('google_write_review')}
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_SNAPPY}
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <span className="hidden sm:inline">{t('read_google_reviews')}</span>
              <span className="sm:hidden">Google</span>
              <ExternalLink aria-hidden="true" className="h-4 w-4 text-slate-500" />
            </motion.a>

            {/* Navigation arrows */}
            <div className="flex items-center gap-1 pl-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING_SNAPPY}
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous reviews"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING_SNAPPY}
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next reviews"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Carousel Rail */}
        <div
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label="Google customer reviews carousel"
          className="mt-6 flex gap-4 overflow-x-auto pb-4 pt-1 outline-none snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {GOOGLE_REVIEWS_DATA.map((rev, index) => {
            const isExpanded = expandedId === rev.id;
            const reviewText = rev.text[locale] || rev.text.en;
            const timeAgoText = rev.timeAgo[locale] || rev.timeAgo.en;
            const tourTypeText = rev.tourType ? rev.tourType[locale] || rev.tourType.en : null;

            return (
              <motion.article
                key={rev.id}
                layout
                data-ui
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.3),
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  layout: SPRING_SMOOTH,
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                className="flex w-[290px] shrink-0 flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 snap-start sm:w-[320px] sm:p-6"
              >
                <div>
                  {/* Author Avatar & Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${rev.avatarBg}`}
                      aria-hidden="true"
                    >
                      {rev.avatarText}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {rev.author}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <span>{timeAgoText}</span>
                        {tourTypeText && (
                          <>
                            <span>•</span>
                            <span className="truncate text-slate-500">{tourTypeText}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 5-Star Rating */}
                  <div
                    role="img"
                    className="mt-3 flex items-center gap-0.5 text-amber-500"
                    aria-label={t('google_rating_accessible', { rating: rev.rating })}
                  >
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className="h-4 w-4 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>

                  {/* Review Text with Layout Animation */}
                  <motion.div
                    layout="position"
                    transition={SPRING_SMOOTH}
                    className="mt-3 text-sm leading-relaxed text-slate-700"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={isExpanded ? 'expanded' : 'collapsed'}
                        initial={shouldReduceMotion ? false : { opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className={isExpanded ? '' : 'line-clamp-4'}
                      >
                        {reviewText}
                      </motion.p>
                    </AnimatePresence>
                  </motion.div>
                </div>

                {reviewText.length > 130 && (
                  <motion.button
                    layout="position"
                    whileTap={{ scale: 0.95 }}
                    transition={SPRING_SNAPPY}
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : rev.id)}
                    className="mt-3 self-start text-xs font-semibold text-saffron-700 hover:text-saffron-600 focus-visible:outline-none focus-visible:underline"
                  >
                    {isExpanded ? t('read_less') : t('read_more')}
                  </motion.button>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
