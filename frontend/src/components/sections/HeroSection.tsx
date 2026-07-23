'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
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
        h-[100vh]
        overflow-hidden
      "
    >
      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
        "
      >
        {/* Background Image */}
        <div
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
            px-6
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
                text-5xl
                font-semibold
                leading-[0.9]
                tracking-tight
                text-white
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
                mt-8
                max-w-3xl
                text-lg
                leading-relaxed
                text-white/90
                sm:text-xl
                md:text-2xl
              "
            >
              {t('subheadline')}
            </p>

            <div
              className="
                mt-12
                flex
                flex-wrap
                justify-center
                gap-4
              "
            >
              <Link
                href="/destinations"
                className="
                  rounded-full
                  border
                  border-white/20
                  bg-white/15
                  px-8
                  py-4
                  font-medium
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:bg-white/25
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
                  px-8
                  py-4
                  font-medium
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:bg-black/30
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
            bottom-10
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
                mb-4
                text-[11px]
                uppercase
                tracking-[0.4em]
                text-white/70
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
              className="mt-2 text-white/70"
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