
'use client';

import { Compass } from 'lucide-react';
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
      className={`hidden min-[900px]:block fixed left-4 select-none z-40 sm:left-6 lg:left-8 ${
        isTourPage
          ? 'bottom-24 sm:bottom-16 lg:bottom-10'
          : 'bottom-6 sm:bottom-8 lg:bottom-8'
      }`}
    >
      <Link
        href="/destinations"
        aria-label={t('destinations')}
        title={t('destinations')}
        className="group relative flex h-12 w-12 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#060c18] p-0 text-base font-semibold text-white transition-colors duration-200 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 active:scale-95 sm:h-auto sm:w-auto sm:justify-start sm:overflow-visible sm:px-4 sm:py-3 lg:px-6 lg:py-4"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-saffron-500 text-slate-950 transition-colors duration-200 group-hover:bg-saffron-400 sm:h-8 sm:w-8 lg:h-9 lg:w-9">
          <Compass className="h-5 w-5 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5" />
        </span>

        <span className="hidden tracking-wide sm:inline">
          {t('destinations')}
        </span>

      </Link>
    </div>
  );
}
