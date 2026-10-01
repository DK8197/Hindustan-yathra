'use client';

import { useTranslations } from 'next-intl';

interface SocialMediaItem {
  id: number;
  platform: 'youtube' | 'instagram';
  url: string;
  thumbnail: string;
  display_order?: number;
}

interface Props {
  youtube: SocialMediaItem[];
  instagram: SocialMediaItem[];
}

function VideoCard({
  item,
  openLabel,
}: {
  item: SocialMediaItem;
  openLabel: string;
}) {
  const isInstagram = item.platform === 'instagram';

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={openLabel}
      className="group block shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2"
    >
      <img
        src={item.thumbnail}
        alt=""
        loading="lazy"
        className={
          isInstagram
            ? `
              h-[260px]
              w-[150px]
              object-cover

              sm:h-[290px]
              sm:w-[165px]

              lg:h-[320px]
              lg:w-[180px]
            `
            : `
              h-[170px]
              w-[300px]
              object-cover

              sm:h-[180px]
              sm:w-[320px]

              lg:h-[190px]
              lg:w-[340px]
            `
        }
      />
    </a>
  );
}

function StoryRail({
  items,
  openLabel,
  railLabel,
}: {
  items: SocialMediaItem[];
  openLabel: (platform: string) => string;
  railLabel: string;
}) {
  return (
    <div
      role="region"
      tabIndex={0}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 scroll-smooth"
      aria-label={railLabel}
    >
      {items.map((item) => (
        <VideoCard
          key={item.id}
          item={item}
          openLabel={openLabel(item.platform)}
        />
      ))}
    </div>
  );
}

export default function SocialMediaFeed({
  youtube,
  instagram,
}: Props) {
  const t = useTranslations('sections');

  if (
    youtube.length === 0 &&
    instagram.length === 0
  ) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-himalaya-900 sm:text-4xl">
            {t('social_title')}
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            {t('social_description')}
          </p>
        </div>

        {instagram.length > 0 && (
          <div>
            <h3 className="mb-5 text-xl font-semibold text-himalaya-900 sm:text-2xl">
              {t('instagram_reels')}
            </h3>

            <StoryRail
              items={instagram}
              openLabel={(platform) => t('open_social', { platform: platform === 'instagram' ? t('instagram') : t('youtube') })}
              railLabel={t('social_rail_label')}
            />
          </div>
        )}

        {youtube.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-5 text-xl font-semibold text-himalaya-900 sm:text-2xl">
              {t('youtube_videos')}
            </h3>

            <StoryRail
              items={youtube}
              openLabel={(platform) => t('open_social', { platform: platform === 'instagram' ? t('instagram') : t('youtube') })}
              railLabel={t('social_rail_label')}
            />
          </div>
        )}
      </div>
    </section>
  );
}