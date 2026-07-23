import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedTours } from '@/components/sections/FeaturedTours';
import { WhyUs } from '@/components/sections/WhyUs';
import { ContactSection } from '@/components/sections/ContactSection';
import SocialMediaFeed from '@/components/sections/SocialMediaFeed';

import { getSocialLinks } from '@/lib/social-repository';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'en' | 'kn' }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'hero',
  });

  return {
    title: t('headline'),
    description: t('subheadline'),
    openGraph: {
      title: t('headline'),
      description: t('subheadline'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('headline'),
      description: t('subheadline'),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'kn' }>;
}) {
  const { locale } = await params;

  const social = await getSocialLinks();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Hindustan Yatra',
    slogan: 'Travel with New Experience',
    url: 'https://hindustanyatra.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hubballi',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

        <HeroSection />

        <div
          className="
            relative
            z-20
            -mt-12
            rounded-t-[40px]
            bg-background
            shadow-[0_-20px_80px_rgba(0,0,0,0.25)]
          "
        >
          <FeaturedTours locale={locale} />

          <SocialMediaFeed
            youtube={social.youtube}
            instagram={social.instagram}
          />

          <WhyUs locale={locale} />

          <ContactSection />
        </div>
    </>
  );
}