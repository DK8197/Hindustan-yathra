import type { Metadata } from 'next';
import { PolicyPage } from '@/components/sections/PolicyPage';
import { getPathname } from '@/i18n/routing';
import { cancellationPolicy } from '@/lib/policy-content';

type Params = { locale: 'en' | 'kn' };
const href = '/cancellation-policy';

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: cancellationPolicy.title,
    description: cancellationPolicy.description,
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        en: getPathname({ locale: 'en', href }),
        kn: getPathname({ locale: 'kn', href }),
      },
    },
  };
}

export default function CancellationPolicyPage() {
  return <PolicyPage doc={cancellationPolicy} />;
}
