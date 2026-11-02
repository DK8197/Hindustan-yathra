'use client';

import Image from 'next/image';
import { memo, type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const SLIDE_INTERVAL_MS = 5000;

// Placeholder CDN images; replace with the real album list.
export const DESKTOP_SLIDES = [
  { src: 'https://picsum.photos/seed/hy-album-1/640/800', title: 'Andaman Islands', note: 'Turquoise shores & coral reefs' },
  { src: 'https://picsum.photos/seed/hy-album-2/640/800', title: 'Kashi', note: 'Ghats, aarti & ancient lanes' },
  { src: 'https://picsum.photos/seed/hy-album-3/640/800', title: 'Karnataka', note: 'Heritage that stays with you' },
  { src: 'https://picsum.photos/seed/hy-album-4/640/800', title: 'Recognised Journeys', note: 'Trusted by travellers since 2018' },
  { src: 'https://picsum.photos/seed/hy-album-5/640/800', title: 'Our Founders', note: 'The people behind every yathra' },
] as const;

// Separate placeholder list for the mobile hero.
export const MOBILE_SLIDES = [
  { src: 'https://picsum.photos/seed/hy-mobile-1/640/800', title: 'Hampi', note: 'Ruins of an empire' },
  { src: 'https://picsum.photos/seed/hy-mobile-2/640/800', title: 'Varanasi', note: 'Dawn on the ghats' },
  { src: 'https://picsum.photos/seed/hy-mobile-3/640/800', title: 'Mysuru', note: 'Palaces and festivals' },
  { src: 'https://picsum.photos/seed/hy-mobile-4/640/800', title: 'Kerala', note: 'Backwater mornings' },
  { src: 'https://picsum.photos/seed/hy-mobile-5/640/800', title: 'Ladakh', note: 'High passes, open skies' },
] as const;

type Orientation = 'portrait' | 'landscape';

// Frame sizes in rem; the frame adapts to each photo's natural aspect ratio.
const FRAME_SIZES: Record<Orientation, { w: number; h: number }> = {
  portrait: { w: 15, h: 22 },
  landscape: { w: 22, h: 16 },
};

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

function wrapOffset(index: number, active: number, total: number) {
  let diff = (index - active) % total;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

type Slide = { readonly src: string; readonly title: string; readonly note: string };

interface HeroAlbumProps {
  slides: readonly Slide[];
  /** Which breakpoint range renders this album. */
  display?: 'desktop' | 'mobile';
}

function HeroAlbumComponent({ slides, display = 'desktop' }: HeroAlbumProps) {
  const isMobile = display === 'mobile';
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipeStart = useRef<{ x: number; t: number } | null>(null);

  const [orientations, setOrientations] = useState<Record<string, Orientation>>({});

  const goTo = useCallback((index: number) => setActive(index), []);

  const handleImageLoad = useCallback((src: string, img: HTMLImageElement) => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    const next: Orientation = img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait';
    setOrientations((current) => (current[src] === next ? current : { ...current, [src]: next }));
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, active, slides.length]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Photo album"
      className={
        isMobile
          ? 'relative z-10 flex w-full min-w-0 items-center justify-center lg:hidden'
          : 'relative z-10 hidden w-full min-w-0 items-center justify-center px-2 lg:flex'
      }
      style={
        {
          '--u': isMobile
            ? 'clamp(7px, min(3vw, 1.7svh), 10.5px)'
            : 'clamp(6px, min(0.95vw, calc((100svh - 8rem - 19.75vw) / 26)), 16px)',
        } as CSSProperties
      }
      onPointerEnter={(event) => event.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex w-full max-w-full flex-col items-center gap-3 lg:gap-5">
        <div
          className="relative w-full touch-pan-y select-none [perspective:1200px]"
          style={{ height: 'calc(24 * var(--u))' }}
          onPointerDown={(event) => {
            swipeStart.current = { x: event.clientX, t: event.timeStamp };
          }}
          onPointerUp={(event) => {
            const start = swipeStart.current;
            swipeStart.current = null;
            if (!start) return;
            const dx = event.clientX - start.x;
            const velocity = Math.abs(dx) / Math.max(event.timeStamp - start.t, 1);
            if (Math.abs(dx) < 40 && velocity < 0.11) return;
            if (Math.abs(dx) < 12) return;
            setActive((value) => (value + (dx < 0 ? 1 : -1) + slides.length) % slides.length);
          }}
          onPointerCancel={() => {
            swipeStart.current = null;
          }}
          aria-live={paused ? 'polite' : 'off'}
        >
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {slides.map((slide, index) => {
              const offset = wrapOffset(index, active, slides.length);
              const distance = Math.abs(offset);
              const isActive = offset === 0;
              const base = FRAME_SIZES[orientations[slide.src] ?? 'portrait'];
              const size = base;
              const transform = shouldReduceMotion
                ? 'none'
                : `translate3d(${offset * 42}%, 0, ${-distance * 140}px) rotateY(${-offset * 26}deg) scale(${1 - distance * 0.06})`;

              return (
                <figure
                  key={slide.src}
                  aria-hidden={!isActive}
                  aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
                  className="absolute inset-y-0 left-1/2 m-auto origin-center overflow-hidden rounded-[1.75rem] border-2 border-sky-900 bg-gradient-to-b from-sky-100/95 to-sky-300/75 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_48px_-20px_rgba(2,132,199,0.55)] backdrop-blur-xl will-change-transform"
                  style={{
                                      width: `calc(${size.w} * var(--u))`,
                                      height: `calc(${size.h} * var(--u))`,
                                      marginLeft: `calc(${-size.w / 2} * var(--u))`,
                                      transform,
                    opacity: distance > 1 ? 0 : isActive ? 1 : 0.55,
                    zIndex: 10 - distance,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: `transform 700ms ${EASE_OUT}, opacity 500ms ${EASE_OUT}`,
                  }}
                >
                  <div className="relative w-full overflow-hidden rounded-[1.25rem]" style={{ height: 'calc(100% - 5 * var(--u))' }}>
                    <Image
                      src={slide.src}
                      alt={isActive ? slide.title : ''}
                      fill
                      sizes="352px"
                      onLoad={(event) => handleImageLoad(slide.src, event.currentTarget)}
                      unoptimized
                      priority={index === 0}
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-sky-950/25 via-transparent to-white/10"
                    />
                  </div>
                  <figcaption className="px-2 pt-3 text-sky-950">
                    <p className="text-sm font-semibold leading-tight">{slide.title}</p>
                    <p className="mt-0.5 truncate text-xs text-sky-900/70">{slide.note}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1" role="group" aria-label="Choose photo">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${slide.title}`}
              aria-current={index === active}
              className="group flex h-8 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
            >
              <span
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  index === active ? 'w-6 bg-sky-900' : 'w-1.5 bg-sky-900/25 group-hover:bg-sky-900/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const HeroAlbum = memo(HeroAlbumComponent);
