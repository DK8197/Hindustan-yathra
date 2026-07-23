import type { Metadata } from 'next';
import {
  Plus_Jakarta_Sans,
  Playfair_Display,
} from 'next/font/google';

import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://hindustanyathra.com'
  ),

  title: {
    default:
      'Hindustan Yathra | Travel with New Experience',
    template:
      '%s | Hindustan Yathra',
  },

  description:
    'Discover curated travel experiences across India and international destinations with Hindustan Yatra.',

  openGraph: {
    title: 'Hindustan Yatra',
    description:
      'Discover curated travel experiences across India and international destinations.',
    url: 'https://hindustanyatra.com',
    siteName: 'Hindustan Yatra',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${playfair.variable}`}
    >
      <head>
        {/* Hero CDN warmup */}
        <link
          rel="preconnect"
          href="https://cdn.instabotai.online"
        />

        <link
          rel="dns-prefetch"
          href="//cdn.instabotai.online"
        />

        {/* Desktop hero preload */}
        <link
          rel="preload"
          as="image"
          href="https://cdn.instabotai.online/images-confidential/hero-desktop.webp"
        />
      </head>

      <body
        suppressHydrationWarning
        className="
          font-sans
          antialiased
          bg-background
          text-foreground
        "
      >
        {children}
      </body>
    </html>
  );
}