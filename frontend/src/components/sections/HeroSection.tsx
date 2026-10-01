'use client';

import { memo, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { m, useReducedMotion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { getPathname, Link } from '@/i18n/routing';
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
  const locale = useLocale() as 'en' | 'kn';
  const isKannada = locale === 'kn';
  const shouldReduceMotion = useReducedMotion();

  const destinationsPath = getPathname({
    locale,
    href: '/destinations',
  });

  const scrollRef = useHeroScrollProgress();

  return (
    <section
      ref={scrollRef}
      className="
        relative
        min-h-[calc(100svh-4rem)]
        md:min-h-[calc(100svh-5rem)]
        lg:min-h-[100svh]
        overflow-hidden
      "
    >
      <div
        className="
          relative
          min-h-[calc(100svh-4rem)]
          md:min-h-[calc(100svh-5rem)]
          lg:min-h-[100svh]
          overflow-hidden
        "
      >
        {/* Background Image */}
        <div
          style={{
            '--hero-bg-mobile': `url("${getCdnImageUrl(
              'images-confidential/hero-mobile.webp'
            )}")`,
            '--hero-bg-desktop': `url("${getCdnImageUrl(
              'images-confidential/hero-desktop.webp'
            )}")`,
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
          {shouldReduceMotion === false && <Hero3D />}
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
            absolute
            inset-x-0
            bottom-0
            z-30
            px-4
            pb-32
            sm:px-6
            sm:pb-30
            md:pb-28
            lg:pb-23
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-6xl
              text-center
            "
          >
            {/* Headline */}
            <h1
              className={`
                mx-auto
                max-w-6xl
                ${
                  isKannada
                    ? 'font-kannada text-[clamp(1.55rem,7.6vw,2.4rem)] leading-[1.3] tracking-normal sm:text-4xl md:text-5xl lg:text-6xl'
                    : 'font-display text-[clamp(2.25rem,8vw,4rem)] leading-[0.98] tracking-tight sm:text-6xl md:text-6xl lg:text-6xl xl:text-[5.5rem]'
                }
                font-semibold
                text-white
                [text-wrap:balance]
                [text-shadow:0_8px_40px_rgba(0,0,0,0.8)]
              `}
            >
              {t('headline')}
            </h1>

            {/* Subheadline */}
            <p
              className={`
                mx-auto
                mt-8
                max-w-3xl
                ${
                  isKannada
                    ? 'font-kannada text-[0.95rem] leading-[1.65] sm:text-lg'
                    : 'text-base leading-relaxed sm:text-xl md:text-2xl'
                }
                text-white/90
                sm:mt-10
              `}
            >
              {t('subheadline')}
            </p>

            {/* Search */}
            <form
              action={destinationsPath}
              method="get"
              role="search"
              className={`
                mx-auto
                mt-5
                flex
                w-full
                max-w-2xl
                items-center
                gap-1.5
                rounded-2xl
                bg-white
                p-1.5
                text-left
                shadow-xl
                sm:mt-8
                sm:gap-2
                sm:rounded-full
                sm:p-2
                ${isKannada ? 'font-kannada' : ''}
              `}
            >
              <Search
                aria-hidden="true"
                className="
                  ml-3
                  h-5
                  w-5
                  shrink-0
                  text-himalaya-600
                "
              />

              <label
                htmlFor="hero-destination-search"
                className="sr-only"
              >
                {t('search_label')}
              </label>

              <input
                id="hero-destination-search"
                name="q"
                type="search"
                placeholder={t('search_placeholder')}
                className={`
                  min-w-0
                  flex-1
                  bg-transparent
                  px-1.5
                  py-3
                  text-sm
                  text-slate-900
                  outline-none
                  placeholder:text-slate-600
                  focus-visible:ring-2
                  focus-visible:ring-inset
                  focus-visible:ring-saffron-700
                  sm:px-2
                  sm:text-base
                  ${isKannada ? 'font-kannada' : ''}
                `}
              />

              <button
                type="submit"
                className={`
                  min-h-11
                  shrink-0
                  rounded-full
                  bg-saffron-700
                  px-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-saffron-700
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-saffron-700
                  focus-visible:ring-offset-2
                  sm:px-6
                  ${isKannada ? 'font-kannada' : ''}
                `}
              >
                {t('search_cta')}
              </button>
            </form>

            {/* CTAs */}
            <div
              className="
                mt-5
                flex
                flex-wrap
                justify-center
                gap-3
                sm:mt-10
                sm:gap-4
              "
            >
              <Link
                href="/destinations"
                className={`
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
                  ${isKannada ? 'font-kannada' : ''}
                `}
              >
                {t('cta_explore')}
              </Link>

              <Link
                href="/contact"
                className={`
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
                  ${isKannada ? 'font-kannada' : ''}
                `}
              >
                {t('cta_customize')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSectionComponent.displayName = 'HeroSection';

export const HeroSection = memo(HeroSectionComponent);