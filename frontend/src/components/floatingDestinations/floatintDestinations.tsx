
'use client';

import { Compass, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export function FloatingDestinations() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  // Check if current route is a tour page
  const isTourPage = pathname.includes('/tour');

  return (
    <div
      aria-label="Explore Destinations"
      className={`fixed left-4 select-none z-40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 sm:left-6 lg:left-8 ${
        isTourPage
          ? 'bottom-24 sm:bottom-16 lg:bottom-10'
          : 'bottom-6 sm:bottom-8 lg:bottom-8'
      }`}
    >
      <Link
        href="/destinations"
        aria-label={t('destinations')}
        title={t('destinations')}
        className="group relative flex h-12 w-12 items-center justify-center gap-2.5 overflow-hidden rounded-full border border-amber-400/35 bg-[#060c18]/90 p-0 text-xs font-semibold text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-[#071322] hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95 sm:h-auto sm:w-auto sm:justify-start sm:overflow-visible sm:px-4 sm:py-3 lg:px-6 lg:py-4 lg:text-sm"
      >
        <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-amber-400/20 blur-md opacity-70 transition-opacity group-hover:opacity-100" />

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-md transition-transform duration-300 group-hover:rotate-45 sm:h-8 sm:w-8 lg:h-9 lg:w-9">
          <Compass className="h-5 w-5 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5" />
        </span>

        <span className="hidden tracking-wide sm:inline">
          {t('destinations')}
        </span>

        <Sparkles className="hidden h-3.5 w-3.5 text-amber-400 opacity-70 transition-opacity group-hover:opacity-100 lg:inline lg:h-4 lg:w-4" />
      </Link>
    </div>
  );
}
