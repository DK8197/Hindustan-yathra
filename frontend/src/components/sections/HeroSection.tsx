'use client';

import { memo, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { getCdnImageUrl } from '@/lib/image-cdn';
import { useHeroScrollProgress } from '@/lib/hooks/useHeroScrollProgress';

const Hero3D = dynamic(
  () => import('@/components/3d/Hero3D'),
  {
    ssr: false,
    loading: () => null,
  }
);

function HeroSectionComponent() {
  const t = useTranslations('hero');
  const scrollRef = useHeroScrollProgress();
  console.log('headline:', t('headline'));
  console.log('subheadline:', t('subheadline'));

  return (
    <section
      ref={scrollRef}
      className="
        relative
        h-[100svh]
        min-h-[34rem]
        overflow-hidden
      "
    >
      <div
        className="
          sticky
          top-0
          h-[100svh]
          min-h-[34rem]
          overflow-hidden
        "
      >
        {/* Background Image */}
        <div
          style={{
            '--hero-bg-mobile': `url("${getCdnImageUrl('images-confidential/hero-mobile.webp')}")`,
            '--hero-bg-desktop': `url("${getCdnImageUrl('images-confidential/hero-desktop.webp')}")`,
          } as CSSProperties}
          className="
            hero-bg
            absolute
            inset-0
            z-0
          "
        />

        {/* Globe */}
        <div
          className="
            absolute
            inset-0
            z-10
            pointer-events-none
          "
        >
          <Hero3D />
        </div>

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            z-20
            bg-gradient-to-b
            from-black/55
            via-black/25
            to-black/75
          "
        />

        {/* Content */}
        <div
          className="
            relative
            z-30
            flex
            h-full
            items-center
            justify-center
            px-4
            py-20
            sm:px-6
          "
        >
            <div
              className="
                mx-auto
                max-w-7xl
                text-center
              "
            >
            <h1
              className="
                mx-auto
                max-w-6xl
                font-display
                text-[clamp(2.25rem,8vw,4rem)]
                font-semibold
                leading-[0.98]
                tracking-tight
                text-white
                [text-wrap:balance]
                [text-shadow:0_8px_40px_rgba(0,0,0,0.8)]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
                xl:text-[7rem]
              "
            >
              {t('headline')}
            </h1>

            <p
              className="
                mx-auto
                mt-5
                max-w-3xl
                text-base
                leading-relaxed
                text-white/90
                sm:mt-8
                sm:text-xl
                md:text-2xl
              "
            >
              {t('subheadline')}
            </p>

            <div
              className="
                mt-7
                flex
                flex-wrap
                justify-center
                gap-3
                sm:mt-12
                sm:gap-4
              "
            >
              <Link
                href="/destinations"
                className="
                  rounded-full
                  border
                  border-white/20
                  bg-white/15
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:bg-white/25
                  sm:px-8
                  sm:py-4
                  sm:text-base
                "
              >
                {t('cta_explore')}
              </Link>

              <Link
                href="/contact"
                className="
                  rounded-full
                  border
                  border-white/20
                  bg-black/20
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:bg-black/30
                  sm:px-8
                  sm:py-4
                  sm:text-base
                "
              >
                {t('cta_customize')}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="
            absolute
            inset-x-0
            bottom-4
            z-40
            flex
            justify-center
            pointer-events-none
          "
        >
          <m.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center"
          >
            <span
              className="
                mb-2
                text-[10px]
                uppercase
                tracking-[0.4em]
                text-white/70
                sm:mb-4
                sm:text-[11px]
              "
            >
              {t('scroll_hint')}
            </span>

            <div
              className="
                flex
                h-11
                w-7
                justify-center
                rounded-full
                border
                border-white/30
              "
            >
              <div
                className="
                  mt-2
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-white
                "
              />
            </div>

            <ChevronDown
              size={16}
                className="mt-1 text-white/70 sm:mt-2"
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}

HeroSectionComponent.displayName =
  'HeroSection';

export const HeroSection = memo(
  HeroSectionComponent
);