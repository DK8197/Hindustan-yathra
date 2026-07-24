import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'kn'],
  defaultLocale: 'en',
  localePrefix: 'always', // -> /en/... and /kn/...

  // URL translation: same page, different slugs per locale.
  // e.g. /en/destinations <-> /kn/ಪ್ರವಾಸಿ-ತಾಣಗಳು
  pathnames: {
    '/': '/',
    '/destinations': { en: '/destinations', kn: '/ಪ್ರವಾಸಿ-ತಾಣಗಳು' },
    '/tour/[slug]': { en: '/tour/[slug]', kn: '/ಪ್ರವಾಸ/[slug]' },
    '/gallery': { en: '/gallery', kn: '/ಗ್ಯಾಲರಿ' },
    '/contact': { en: '/contact', kn: '/ಸಂಪರ್ಕ' },
    '/login': { en: '/login', kn: '/ಲಾಗಿನ್' },
    '/about': { en: '/about', kn: '/ನಮ್ಮ-ಬಗ್ಗೆ' },
    '/dashboard': { en: '/dashboard', kn: '/ಡ್ಯಾಶ್‌ಬೋರ್ಡ್' },
    '/dashboard/bookings': { en: '/dashboard/bookings', kn: '/ಡ್ಯಾಶ್‌ಬೋರ್ಡ್/ಬುಕಿಂಗ್‌ಗಳು' },
    '/dashboard/saved': { en: '/dashboard/saved', kn: '/ಡ್ಯಾಶ್‌ಬೋರ್ಡ್/ಉಳಿಸಿದವು' },
    '/dashboard/profile': { en: '/dashboard/profile', kn: '/ಡ್ಯಾಶ್‌ಬೋರ್ಡ್/ಪ್ರೊಫೈಲ್' },
  },
});

// Typed, locale-aware navigation helpers used everywhere instead of next/link & next/navigation.
// Switching locale with these preserves the current route and does NOT trigger a full page reload.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export type AppLocale = (typeof routing.locales)[number];
