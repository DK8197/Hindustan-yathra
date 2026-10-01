import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactSection } from '@/components/sections/ContactSection';
import { getPathname } from '@/i18n/routing';

type Params = { locale: 'en' | 'kn' };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'sections',
  });
  const href = '/contact';

  return {
    title: t('contact'),
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        en: getPathname({ locale: 'en', href }),
        kn: getPathname({ locale: 'kn', href }),
      },
    },
  };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string }>;
}) {
  const { destination } = await searchParams;

  return (
    <div>
      <ContactSection initialDestination={destination} headingLevel="h1" />
    </div>
  );
}