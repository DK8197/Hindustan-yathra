import { Fraunces, Inter, Noto_Sans_Kannada } from 'next/font/google';

// These generate real @font-face rules and expose the result as a CSS
// variable via `.variable` — applied on <body> in each layout. Tailwind's
// fontFamily config (tailwind.config.ts) already points at
// var(--font-display) / var(--font-sans) / var(--font-kannada); this file
// is what actually makes those variables resolve to real fonts instead of
// silently falling back to the browser's default serif/sans-serif.

export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const notoSansKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-kannada',
  display: 'swap',
});
