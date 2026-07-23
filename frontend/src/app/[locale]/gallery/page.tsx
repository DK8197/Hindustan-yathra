import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { InfiniteGallery } from '@/components/gallery/InfiniteGallery';
import { getAllGalleryImages } from '@/lib/r2-gallery';

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

  return {
    title: t('gallery'),
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

  const images =
    await getAllGalleryImages();

  return (
    <div className="mx-auto max-w-7xl px-6 py-28 md:px-12">
      <h1 className="mb-10 font-display text-3xl font-semibold text-himalaya-900 md:text-4xl">
        {t('gallery')}
      </h1>

      <InfiniteGallery
        images={images}
      />
    </div>
  );
}