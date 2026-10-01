'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
] as const;

export function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
// console.log({
//   locale,
//   pathname,
//   params,
//   href:
//     typeof window !== 'undefined'
//       ? window.location.pathname
//       : 'server',
// });
  const switchLocale = (newLocale: 'en' | 'kn') => {
    if (newLocale === locale) return;

    const { locale: _locale, ...routeParams } = params;

    router.replace(
      {
        pathname,
        params: routeParams
      } as Parameters<typeof router.replace>[0],
      {
        locale: newLocale
      }
    );
  };

  return (
    <div aria-label={t('language')} role="group" className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1">
      {locales.map(({ code, label }) => {
        const isActive = locale === code;

        return (
          <button
            key={code}
            type="button"
            disabled={isActive}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => switchLocale(code)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition ${
              isActive
                ? 'min-h-11 cursor-default bg-white px-3 text-himalaya-800'
                : 'min-h-11 px-3 text-white/90 hover:bg-white/10 hover:text-white'
            } disabled:pointer-events-none`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}