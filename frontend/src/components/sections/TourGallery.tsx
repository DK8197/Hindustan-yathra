'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Images,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
  Maximize2,
} from 'lucide-react';
import type { GalleryImage } from '@/types/tour';
import { normalizeImageUrl } from '@/lib/image-cdn';

const INITIAL_VISIBLE_IMAGES = 4;
const EXPAND_STEP = 8;
const GALLERY_URL = '/gallery';

interface NormalizedGalleryImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export function TourGallery({
  gallery,
}: {
  gallery?: GalleryImage[];
}) {
  const t = useTranslations('tour');

  const [visibleCount, setVisibleCount] = useState(
    INITIAL_VISIBLE_IMAGES
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    null
  );

  const images: NormalizedGalleryImage[] = Array.from(
    new Map(
      (gallery || [])
        .flatMap((item) => {
          if (!item?.url) return [];

          let urls: string[] = [];

          try {
            const parsed: unknown = JSON.parse(item.url);

            urls = Array.isArray(parsed)
              ? parsed.filter(
                  (url): url is string =>
                    typeof url === 'string'
                )
              : [item.url];
          } catch {
            urls = item.url
              .split(',')
              .map((url) => url.trim());
          }

          return urls
            .filter(
              (url) =>
                url &&
                (url.startsWith('https://') ||
                  url.startsWith('http://') ||
                  url.startsWith('/'))
            )
            .map((url) => ({
              url,
              alt: item.alt || '',
              width: item.width || 1600,
              height: item.height || 1067,
            }));
        })
        .map((image) => [image.url, image] as const)
    ).values()
  );

  const closeViewer = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current - 1 + images.length) % images.length
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current + 1) % images.length
    );
  }, [images.length]);

  // Keyboard navigation and background scroll locking.
  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, closeViewer, showNext, showPrevious]);

  if (!images.length) return null;

  const visibleImages = images.slice(0, visibleCount);
  const hasMoreImages = visibleCount < images.length;
  const remainingImages = images.length - visibleCount;
  const selectedImage =
    selectedIndex === null ? null : images[selectedIndex];

  const expandGallery = () => {
    setVisibleCount((current) =>
      Math.min(current + EXPAND_STEP, images.length)
    );
  };

  const collapseGallery = () => {
    setVisibleCount(INITIAL_VISIBLE_IMAGES);

    document.getElementById('tour-gallery')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <section
        id="tour-gallery"
        className="mt-12 scroll-mt-28"
        aria-labelledby="tour-gallery-heading"
      >
        {/* Gallery heading */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
              <Images className="h-4 w-4" />
              Travel memories
            </p>

            <h2
              id="tour-gallery-heading"
              className="font-display text-2xl font-semibold text-himalaya-900 sm:text-3xl"
            >
              {t('gallery')}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {images.length}{' '}
              {images.length === 1 ? 'photo' : 'photos'} from this
              journey
            </p>
          </div>

          <a
            href={GALLERY_URL}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            View gallery
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Responsive image grid */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {visibleImages.map((image, index) => (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View image ${index + 1} of ${images.length} in full screen`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                <Image
                  src={normalizeImageUrl(image.url)}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                  View full size
                </span>
              </button>
            ))}
          </div>

          {/* Expand and collapse */}
          {images.length > INITIAL_VISIBLE_IMAGES && (
            <div className="mt-5 flex flex-col items-center">
              {hasMoreImages ? (
                <>
                  <button
                    type="button"
                    onClick={expandGallery}
                    aria-controls="tour-gallery"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-amber-500/30 bg-white px-6 py-3 text-sm font-semibold text-himalaya-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <Images className="h-4 w-4 text-amber-600" />

                    {visibleCount === INITIAL_VISIBLE_IMAGES
                      ? `Explore ${remainingImages} more ${
                          remainingImages === 1 ? 'photo' : 'photos'
                        }`
                      : `Show ${Math.min(
                          EXPAND_STEP,
                          remainingImages
                        )} more ${
                          Math.min(EXPAND_STEP, remainingImages) === 1
                            ? 'photo'
                            : 'photos'
                        }`}

                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </button>

                  <p className="mt-2 text-xs text-slate-400">
                    Showing {visibleCount} of {images.length} photos
                  </p>
                </>
              ) : (
                <button
                  type="button"
                  onClick={collapseGallery}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-amber-400 hover:bg-amber-50 hover:text-himalaya-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <ChevronUp className="h-4 w-4" />
                  Show less
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FULL-SCREEN IMAGE VIEWER */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen photo viewer"
          onClick={closeViewer}
        >
          {/* Top toolbar */}
          <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {selectedImage.alt || 'Tour gallery'}
              </p>
              <p className="mt-1 text-xs text-white/60">
                {selectedIndex + 1} of {images.length} photos
              </p>
            </div>

            <button
              type="button"
              onClick={closeViewer}
              aria-label="Close full-screen image viewer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-16 sm:pb-6">
            {/* Previous */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-white/20 sm:left-5 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
            )}

            <div
              className="relative h-full max-h-full w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                key={selectedImage.url}
                src={normalizeImageUrl(selectedImage.url)}
                alt={
                  selectedImage.alt ||
                  `Gallery image ${selectedIndex + 1}`
                }
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Next */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-white/20 sm:right-5 sm:h-12 sm:w-12"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            )}
          </div>

          {/* Bottom toolbar */}
          <div className="flex shrink-0 items-center justify-center gap-4 px-4 pb-5 pt-2 text-xs text-white/60">
            {images.length > 1 ? (
              <span>
                Use <kbd className="rounded border border-white/20 px-1.5 py-0.5">←</kbd>{' '}
                <kbd className="rounded border border-white/20 px-1.5 py-0.5">→</kbd>{' '}
                to navigate · <kbd className="rounded border border-white/20 px-1.5 py-0.5">Esc</kbd>{' '}
                to close
              </span>
            ) : (
              <span>
                Press <kbd className="rounded border border-white/20 px-1.5 py-0.5">Esc</kbd>{' '}
                to close
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}