'use client';

import { Compass, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function FloatingDestinations() {
  const t = useTranslations('nav');

  return (
    <div
      aria-label="Explore Destinations"
      /* Lifted high on mobile (bottom-24), settled to bottom-10 on larger screens */
      className="fixed bottom-24 left-4 z-40 select-none animate-in fade-in slide-in-from-bottom-3 duration-300 sm:bottom-16 sm:left-6 lg:bottom-10 lg:left-8"
    >
      <Link
        href="/destinations"
        /* Compact on mobile, substantially enlarged on laptop/desktop (lg:px-6 lg:py-4) */
        className="group relative flex items-center gap-2.5 rounded-full border border-amber-400/35 bg-[#060c18]/90 px-3.5 py-2.5 text-xs font-semibold text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-[#071322] hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95 sm:px-4 sm:py-3 sm:text-xs lg:px-6 lg:py-4 lg:text-sm"
      >
        {/* Ambient glow effect */}
        <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-amber-400/20 blur-md opacity-70 transition-opacity group-hover:opacity-100" />

        {/* Compass Icon Capsule: Scaled larger on laptop (lg:h-9 lg:w-9) */}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-md transition-transform duration-300 group-hover:rotate-45 sm:h-8 sm:w-8 lg:h-9 lg:w-9">
          <Compass className="h-4 w-4 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5" />
        </span>

        {/* Label */}
        <span className="tracking-wide">{t('destinations')}</span>

        <Sparkles className="h-3.5 w-3.5 text-amber-400 opacity-70 transition-opacity group-hover:opacity-100 lg:h-4 lg:w-4" />
      </Link>
    </div>
  );
}