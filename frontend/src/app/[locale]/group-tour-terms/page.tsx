import type { Metadata } from 'next';
import { PolicyPage } from '@/components/sections/PolicyPage';
import { getPathname } from '@/i18n/routing';
import { groupTourTerms } from '@/lib/policy-content';

type Params = { locale: 'en' | 'kn' };
const href = '/group-tour-terms';

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: groupTourTerms.title,
    description: groupTourTerms.description,
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        en: getPathname({ locale: 'en', href }),
        kn: getPathname({ locale: 'kn', href }),
      },
    },
  };
}

export default function GroupTourTermsPage() {
  return <PolicyPage doc={groupTourTerms} />;
}
