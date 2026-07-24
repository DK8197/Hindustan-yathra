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
    'https://hindustanyatra.com'
  ),

  title: {
    default:
      "Hindustan Yatra | Best Travel Agency in Hubballi | Domestic & International Tours",
    template:
      '%s | Hindustan Yatra',
  },

  description:
    "Hindustan Yatra is a trusted travel agency in Hubballi offering pilgrimage tours, customized holidays, family vacations, honeymoon packages, visa assistance, and international tour packages.",

  keywords: [
  "Travel Agency Hubballi",
  "Travel Agency Hubli",
  "Hindustan Yatra",
  "Hindusthan Yathra",
  "Hindustan Yathra",
  "Pilgrimage Tours",
  "Chardham Yatra",
  "Kashi Tour",
  "Nepal Tour",
  "Bhutan Tour",
  "Sri Lanka Ramayana Tour",
  "Family Tour Packages",
  "International Tours",
],
  openGraph: {
    title: 'Hindustan Yatra',
    description:
      'Discover curated travel experiences across India and international destinations.',
    url: 'https://hindustanyatra.com',
    siteName: 'Hindustan Yatra',
    type: 'website',
    images: [
    {
      url: "/textures/hindustan-yatra-image.png",
      width: 1200,
      height: 630,
      alt: "Hindustan Yatra",
    },
  ],
  },

  twitter: {
  card: "summary_large_image",
  title: "Hindustan Yatra",
  description:
    "Trusted Travel Agency in Hubballi for Domestic & International Tours.",
  images: ["/textures/hindustan-yatra-image.png"],
    },

    authors: [
  {
    name: "Hindustan Yatra",
    url: "https://hindustanyatra.com",
  },
],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
  icon: "/textures/favicon.ico",
  apple: "/textures/apple-touch-icon.png",
},
  other: {
    'theme-color': '#0b1220',
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
          href="https://cdn.hindustanyatra.com"
        />

        <link
          rel="dns-prefetch"
          href="//cdn.hindustanyatra.com"
        />

        {/* Desktop hero preload */}
        <link
          rel="preload"
          as="image"
          href="https://cdn.hindustanyatra.com/images-confidential/hero-desktop.webp"
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