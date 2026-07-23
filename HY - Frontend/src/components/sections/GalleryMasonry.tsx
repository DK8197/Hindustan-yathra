'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface GalleryItem {
  url: string;
  alt: string;
  height: number; // relative height for masonry variety
}

// TODO(prod): back this with /api/gallery?page=N reading from the admin-
// managed media library. Seeded with placeholder heights for the demo.
const PAGE_SIZE = 12;
const ALL_ITEMS: GalleryItem[] = Array.from({ length: 60 }).map((_, i) => ({
  url: `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800&auto=format&fit=crop`,
  alt: `Hindustan Yathra travel moment ${i + 1}`,
  height: ([280, 340, 400, 240] as const)[i % 4] ?? 280,
}));

export function GalleryMasonry() {
  const [items, setItems] = useState<GalleryItem[]>(ALL_ITEMS.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    const next = ALL_ITEMS.slice(0, (page + 1) * PAGE_SIZE);
    if (next.length > items.length) {
      setItems(next);
      setPage((p) => p + 1);
    }
  }, [page, items.length]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && loadMore(),
      { rootMargin: '400px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="break-inside-avoid overflow-hidden rounded-xl bg-himalaya-100"
            style={{ height: item.height }}
          >
            <Image
              src={item.url}
              alt={item.alt}
              width={400}
              height={item.height}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div ref={sentinelRef} className="h-10" />
      {items.length >= ALL_ITEMS.length && (
        <p className="py-8 text-center text-sm text-gray-400">You've reached the end of the gallery.</p>
      )}
    </div>
  );
}
