import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactSection } from '@/components/sections/ContactSection';

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

  return {
    title: t('contact'),
  };
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  );
}