import type { Metadata } from 'next';
import { PolicyPage } from '@/components/sections/PolicyPage';
import { getPathname } from '@/i18n/routing';
import { privacyPolicy } from '@/lib/policy-content';

type Params = { locale: 'en' | 'kn' };
const href = '/privacy-policy';

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: privacyPolicy.title,
    description: privacyPolicy.description,
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        en: getPathname({ locale: 'en', href }),
        kn: getPathname({ locale: 'kn', href }),
      },
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PolicyPage doc={privacyPolicy} />;
}
