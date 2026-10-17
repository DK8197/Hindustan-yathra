
'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslations } from 'next-intl';
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Expand,
  Images as ImagesIcon,
  X,
} from 'lucide-react';

interface Props {
  images: string[];
}

const PAGE_SIZE = 40;

export function InfiniteGallery({ images }: Props) {
  const t = useTranslations('sections');

  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const total = images.length;
  const visibleImages = images.slice(0, visible);
  const hasMore = visible < total;

  const loadMore = useCallback(() => {
    setVisible((prev) => Math.min(prev + PAGE_SIZE, images.length));
  }, [images.length]);

  // Reset pagination when the image collection changes.
  useEffect(() => {
    setVisible(PAGE_SIZE);
    setSelectedIndex(null);
  }, [images]);

  // Load more images when the visitor approaches the bottom.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];

            if (entry?.isIntersecting) {
              setVisible((prev) =>
                Math.min(prev + PAGE_SIZE, images.length)
              );
            }
          },
      {
        rootMargin: '900px 0px',
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, images.length, visible]);

  // Keyboard navigation and background scroll locking.
  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % total
        );
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + total) % total
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, total]);

  const showPrevious = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + total) % total
    );
  };

  const showNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % total
    );
  };

  if (!total) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-orange-100 bg-orange-50/50 px-6 py-20 text-center">
        <Camera className="mb-4 h-12 w-12 text-orange-400" />
        <h2 className="text-xl font-semibold text-himalaya-900">
          Memories are on their way
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-himalaya-600">
          We are preparing beautiful moments from our journeys.
          Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-himalaya-600">
          <ImagesIcon className="h-4 w-4 text-orange-500" />
          <span>
            Showing{' '}
            <strong className="text-himalaya-900">
              {visibleImages.length}
            </strong>{' '}
            of {total} memories
          </span>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
          Every picture tells a story
        </span>
      </div>

      {/* Masonry gallery */}
      <div className="columns-2 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4">
        {visibleImages.map((url, i) => (
          <button
            key={`${url}-${i}`}
            type="button"
            onClick={() => setSelectedIndex(i)}
            aria-label={`Open gallery image ${i + 1} of ${total}`}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-orange-50 text-left shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:mb-4 sm:rounded-2xl"
          >
            <Image
              src={url}
              alt={t('gallery_image_alt', { index: i + 1 })}
              width={1200}
              height={800}
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
              loading={i < 8 ? 'eager' : 'lazy'}
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            {/* Hover overlay */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between p-3 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-4">
              <span className="text-xs font-medium sm:text-sm">
                Memory #{i + 1}
              </span>
              <Expand className="h-4 w-4 shrink-0" />
            </span>

            <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/30 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      {/* Infinite-scroll trigger */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex min-h-28 flex-col items-center justify-center gap-3 py-8"
          aria-live="polite"
        >
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-orange-200 border-t-orange-600" />
          <p className="text-sm text-himalaya-600">
            Discovering more memories...
          </p>
        </div>
      )}

      {/* Manual fallback */}
      {hasMore && (
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            disabled={isLoadingMore}
            onClick={() => {
              setIsLoadingMore(true);
              loadMore();
              setIsLoadingMore(false);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-700 shadow-sm transition-all hover:border-orange-400 hover:bg-orange-50 hover:shadow-md disabled:opacity-60"
          >
            Load more memories
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}

      {!hasMore && total > PAGE_SIZE && (
        <p className="mt-8 text-center text-sm text-himalaya-500">
          You've explored all {total} memories. Every journey leaves a story.
        </p>
      )}

      {/* Full-screen lightbox */}
      {selectedIndex !== null && images[selectedIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top toolbar */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-4 py-5 sm:px-8">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Camera className="h-5 w-5 text-orange-400" />
              <span>
                {selectedIndex + 1} / {total}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close photo viewer"
              className="rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Previous */}
          {total > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-2 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-orange-500 sm:left-6 sm:p-4"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Main image */}
          <div
            className="relative h-[78vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={images[selectedIndex]}
              src={images[selectedIndex]}
              alt={t('gallery_image_alt', {
                index: selectedIndex + 1,
              })}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Next */}
          {total > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-2 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-orange-500 sm:right-6 sm:p-4"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Bottom hint */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/60 to-transparent px-4 pb-5 pt-12 text-center text-xs text-white/70 sm:pb-7 sm:text-sm">
            Use ← → to navigate · Press Esc to close
          </div>
        </div>
      )}
    </>
  );
}
