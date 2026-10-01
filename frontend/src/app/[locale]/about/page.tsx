import Hero from "@/components/about/Hero";
import Story from "@/components/about/Story";
import Leadership from "@/components/about/Leadership";
import CTA from "@/components/about/CTA";
import { ContactSection } from '@/components/sections/ContactSection';
import { WhyUs } from '@/components/sections/WhyUs';
import GoogleReviewSummary from '@/components/about/GoogleReviewSummary';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'en' | 'kn' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const href = '/about';

  return {
    title: t('about-title'),
    description: t('hero-subheadline'),
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        en: getPathname({ locale: 'en', href }),
        kn: getPathname({ locale: 'kn', href }),
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'kn' }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-white">
      <Hero />
      <Story />
      <WhyUs locale={locale} />
      <GoogleReviewSummary />
      <Leadership />
      <CTA locale={locale} />
      <ContactSection />
    </div>
  );
}