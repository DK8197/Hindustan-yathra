'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';

/**
 * Tracks how far the hero section has scrolled past, normalized 0-1,
 * and writes it to the store so Hero3D's camera rig can react — keeps
 * the expensive R3F tree from re-rendering on every scroll tick since
 * only the store subscriber (useFrame) reads the value.
 */
export function useHeroScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const setHeroScrollProgress = useAppStore((s) => s.setHeroScrollProgress);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        setHeroScrollProgress(progress);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [setHeroScrollProgress]);

  return ref;
}
