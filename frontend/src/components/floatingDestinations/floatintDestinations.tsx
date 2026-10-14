'use client';

import { Compass, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function FloatingDestinations() {
  const t = useTranslations('nav');

  return (
    <div
      aria-label="Explore Destinations"
      className="fixed bottom-6 left-6 z-50 select-none animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <Link
        href="/destinations"
        className="group relative flex items-center gap-2.5 rounded-full border border-amber-400/30 bg-[#060c18]/85 px-4 py-3 text-xs font-semibold text-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-[#071322] hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
      >
        {/* Subtle glowing beacon behind button */}
        <span className="absolute -inset-0.5 -z-10 rounded-full bg-amber-400/20 blur-sm transition-opacity group-hover:opacity-100 opacity-60 pointer-events-none" />

        {/* Compass Icon Badge */}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-sm transition-transform duration-300 group-hover:rotate-45">
          <Compass className="h-4 w-4" />
        </span>

        {/* Label */}
        <span className="tracking-wide">{t('destinations')}</span>

        <Sparkles className="h-3.5 w-3.5 text-amber-400 opacity-70 transition-opacity group-hover:opacity-100" />
      </Link>
    </div>
  );
}