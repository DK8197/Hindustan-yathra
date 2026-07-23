'use client';

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
}: {
  item: SocialMediaItem;
}) {
  const isInstagram =
    item.platform === 'instagram';

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      <img
        src={item.thumbnail}
        alt={item.platform}
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

function InfiniteScroller({
  items,
}: {
  items: SocialMediaItem[];
}) {
  return (
    <div className="overflow-hidden">
      <div className="social-marquee">
        {[...items, ...items].map(
          (item, index) => (
            <VideoCard
              key={`${item.id}-${index}`}
              item={item}
            />
          )
        )}
      </div>
    </div>
  );
}

export default function SocialMediaFeed({
  youtube,
  instagram,
}: Props) {
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
          <h2 className="text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text md:text-5xl">
            Travel Stories & Reels
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Explore our latest travel videos,
            destination reels and unforgettable
            experiences.
          </p>
        </div>

        {instagram.length > 0 && (
          <div>
            <h3 className="mb-8 text-2xl font-semibold text-himalaya-900">
              Instagram Reels
            </h3>

            <InfiniteScroller
              items={instagram}
            />
          </div>
        )}

        {youtube.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-8 text-2xl font-semibold text-himalaya-900">
              YouTube Videos
            </h3>

            <InfiniteScroller
              items={youtube}
            />
          </div>
        )}
      </div>
    </section>
  );
}