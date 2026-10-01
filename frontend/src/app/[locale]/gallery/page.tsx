import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { InfiniteGallery } from '@/components/gallery/InfiniteGallery';
import { getAllGalleryImages } from '@/lib/r2-gallery';
import { getPathname } from '@/i18n/routing';

type Params = {
  locale: 'en' | 'kn';
};

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
  const href = '/gallery';

  return {
    title: t('gallery'),
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        en: getPathname({ locale: 'en', href }),
        kn: getPathname({ locale: 'kn', href }),
      },
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'sections',
  });

  let images: string[] = [];
  let loadFailed = false;

  try {
    images = await getAllGalleryImages();
  } catch {
    loadFailed = true;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-12 md:py-16">
      <h1 className="mb-10 font-display text-3xl font-semibold text-himalaya-900 md:text-4xl">
        {t('gallery')}
      </h1>

      <InfiniteGallery
        images={images}
      />
      {images.length === 0 && (
        <p role="status" className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-700">
          {loadFailed ? t('gallery_unavailable') : t('gallery_empty')}
        </p>
      )}
    </div>
  );
}