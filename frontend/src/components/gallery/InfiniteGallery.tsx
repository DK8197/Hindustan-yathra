'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  images: string[];
}

const PAGE_SIZE = 40;

export function InfiniteGallery({
  images,
}: Props) {
  const [visible, setVisible] =
    useState(PAGE_SIZE);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight +
          window.scrollY >
        document.body.offsetHeight -
          1000
      ) {
        setVisible((prev) =>
          Math.min(
            prev + PAGE_SIZE,
            images.length
          )
        );
      }
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, [images.length]);

  return (
    <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
      {images
        .slice(0, visible)
        .map((url, i) => (
          <div
            key={i}
            className="mb-4 break-inside-avoid"
          >
            <Image
              src={url}
              alt=""
              width={1200}
              height={800}
              className="w-full rounded-xl"
            />
          </div>
        ))}
    </div>
  );
}