import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
} from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { QueryProvider } from '@/lib/query-provider';

import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export const dynamic = 'force-static';
export const revalidate = 86400;



export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'brand',
  });

  return {
    metadataBase: new URL(
      'https://hindustanyatra.com'
    ),

    title: {
      default: `${t('name')} | ${t('tagline')}`,
      template: `%s | ${t('name')}`,
    },

    description: t('tagline'),

    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        kn: '/kn',
      },
    },

    openGraph: {
      siteName: t('name'),
      title: t('name'),
      description: t('tagline'),
      locale:
        locale === 'kn'
          ? 'kn_IN'
          : 'en_IN',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
    },

    robots: {
      index: true,
      follow: true,
    },

    other: {
      'theme-color': '#0b1220',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (
    !routing.locales.includes(
      locale as (typeof routing.locales)[number]
    )
  ) {
    notFound();
  }

const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
        <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <QueryProvider>
        <div
          className={
            locale === 'kn'
              ? 'font-kannada min-h-screen flex flex-col'
              : 'font-sans min-h-screen flex flex-col'
          }
        >
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}