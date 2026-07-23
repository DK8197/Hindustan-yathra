import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { GalleryImage } from '@/types/tour';

export function TourGallery({
  gallery,
}: {
  gallery?: GalleryImage[];
}) {
  const t = useTranslations('tour');

  const images = Array.from(
    new Map(
      (gallery || [])
        .flatMap((item) => {
          if (!item?.url) {
            return [];
          }

          let urls: string[] = [];

          try {
            const parsed = JSON.parse(item.url);

            if (Array.isArray(parsed)) {
              urls = parsed;
            } else {
              urls = [item.url];
            }
          } catch {
            urls = item.url
              .split(',')
              .map((u) => u.trim());
          }

          return urls
            .filter(
              (url) =>
                url &&
                (url.startsWith('http') ||
                  url.startsWith('/'))
            )
            .map((url) => ({
              url,
              alt: item.alt || '',
              width: item.width || 1600,
              height: item.height || 1067,
            }));
        })
        .map((img) => [img.url, img])
    ).values()
  );

  if (!images.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold text-himalaya-900">
        {t('gallery')}
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, index) => (
          <div
            key={`${img.url}-${index}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100"
          >
            <Image
              src={img.url}
              alt={
                img.alt ||
                `Gallery Image ${index + 1}`
              }
              fill
              loading="lazy"
              sizes="
                (max-width: 768px) 50vw,
                (max-width: 1024px) 33vw,
                25vw
              "
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />
          </div>
        ))}
      </div>
    </section>
  );
}