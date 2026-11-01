'use client';

import Image from 'next/image';
import React, { memo } from 'react';
import { useEffect,useState }  from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { getPathname, Link } from '@/i18n/routing';
import { getCdnImageUrl } from '@/lib/image-cdn';
import { useHeroScrollProgress } from '@/lib/hooks/useHeroScrollProgress';

const HERO_DESKTOP_IMAGE = getCdnImageUrl('images-confidential/hero-desktop.webp');
const HERO_MOBILE_IMAGE = getCdnImageUrl('images-confidential/hero-mobile.webp');

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
  const [mounted,setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true);
  },[]);

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
        lg:min-h-[calc(100svh-5rem)]
        overflow-hidden
      "
    >
      <div
        className="
          relative
          flex
          flex-col
          min-h-[calc(100svh-4rem)]
          md:min-h-[calc(100svh-5rem)]
          lg:min-h-[calc(100svh-5rem)]
          overflow-hidden
          bg-himalaya-900
        "
      >
        {/* On mobile the artwork becomes a full-bleed backdrop behind the hero content. */}
        <div className="relative shrink-0 max-md:absolute max-md:inset-x-0 max-md:top-0 max-md:h-[44rem]">
          <picture className="block h-auto w-full shrink-0 max-md:h-full">
            <source
              media="(max-width: 767px)"
              srcSet={HERO_MOBILE_IMAGE}
              width={1557}
              height={941}
            />
            <Image
              src={HERO_DESKTOP_IMAGE}
              alt="Hindustan Yathra founders and Karnataka heritage landmarks"
              width={1672}
              height={941}
              sizes="100vw"
              priority
              unoptimized
              className="block h-auto w-full shrink-0 max-md:h-full max-md:object-cover max-md:object-[50%_30%]"
            />
          </picture>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-himalaya-900/70 via-himalaya-900/35 to-himalaya-900/90 md:hidden"
          />
        </div>

        <div className="relative grid flex-1 grid-cols-1 items-center bg-himalaya-900 max-md:bg-transparent lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {/* Content */}
          <div className="relative z-10 w-full px-5 py-5 max-md:flex max-md:min-h-[30rem] max-md:pt-4 max-md:pb-10 sm:px-7 sm:py-8 lg:px-8 lg:py-10">
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
              text-left
              max-md:flex
              max-md:flex-col
            "
          >
            {/* Headline */}
            <h1
              id="home-title"
              className={`
                max-w-[26ch]
                ${
                  isKannada
                    ? 'font-kannada text-[clamp(1.5rem,5.5vw,3.5rem)] leading-[1.25] tracking-normal max-md:text-[clamp(1.75rem,7.5vw,2.25rem)]'
                    : 'font-display text-[clamp(1.75rem,4.3vw,3.5rem)] leading-[1.02] tracking-tight max-md:text-[clamp(2rem,9vw,2.5rem)] max-md:leading-[1.1]'
                }
                font-semibold
                text-white
                [text-wrap:balance]
                max-md:mt-auto
                max-md:pt-6
                max-md:self-center
                max-md:text-center
                max-md:animate-fly-in
                max-md:[animation-delay:100ms]
                max-md:[text-shadow:0_1px_14px_rgba(0,0,0,0.45)]
              `}
            >
              {t('headline')}
            </h1>

            {/* Ornamental divider (mobile only), echoing the hero artwork. */}
            <div
              aria-hidden="true"
              className="mt-3 hidden w-full max-w-[16rem] items-center gap-3 self-center animate-fly-in [animation-delay:250ms] max-md:flex"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-saffron-400/80 to-saffron-400" />
              <span className="font-kannada text-2xl leading-none text-saffron-400 [text-shadow:0_0_12px_rgba(251,191,36,0.45)]">
                ॐ
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-saffron-400/80 to-saffron-400" />
            </div>

            {/* Subheadline */}
            <p
              className={`
                mt-5
                max-w-[48ch]
                max-md:mt-3
                max-md:self-center
                max-md:text-center
                max-md:animate-fly-in
                max-md:[animation-delay:400ms]
                max-md:[text-shadow:0_1px_10px_rgba(0,0,0,0.45)]
                ${
                  isKannada
                    ? 'font-kannada text-base leading-relaxed sm:text-lg'
                    : 'text-base leading-relaxed max-md:leading-snug sm:text-lg'
                }
                text-white
              `}
            >
              {t('subheadline')}
            </p>

            {/* Interactive Section (Lifted slightly upward via negative translation) */}
            <div className="mt-5 flex max-w-2xl flex-col gap-4 max-md:contents">
              {/* Keep the primary destination search first in visual and tab order. */}
              <form
                id="destination-search-form"
                name="destination_search"
                action={destinationsPath}
                method="get"
                role="search"
                className={`
                  flex
                  w-full
                  max-w-2xl
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-white
                  p-1
                  text-left
                  max-md:order-first
                  max-md:rounded-full
                  max-md:p-1.5
                  max-md:shadow-lg
                  sm:gap-2
                  sm:rounded-lg
                  sm:p-1.5
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
                    text-base
                    text-slate-900
                    outline-none
                    text-ellipsis
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
                    text-base
                    font-semibold
                    text-white
                    max-md:flex
                    max-md:h-11
                    max-md:w-11
                    max-md:items-center
                    max-md:justify-center
                    max-md:px-0
                    transition
                    hover:bg-saffron-600
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-saffron-700
                    focus-visible:ring-offset-2
                    sm:px-6
                    ${isKannada ? 'font-kannada' : ''}
                  `}
                >
                  <span className="max-md:sr-only">{t('search_cta')}</span>
                  <ArrowRight aria-hidden="true" className="hidden h-5 w-5 max-md:block" />
                </button>
              </form>

              {/* Secondary routes remain available as plain text links. */}
              <div
                className="flex flex-wrap items-center gap-x-7 gap-y-3 text-base font-semibold max-md:mt-5 max-md:mb-auto max-md:justify-center max-md:gap-x-5 max-md:animate-fly-in max-md:[animation-delay:550ms]"
              >
                <Link
                  href="/destinations"
                  className={`
                    min-h-11
                    py-2
                    text-white
                    underline
                    decoration-white/60
                    underline-offset-4
                    transition-colors
                    hover:text-white/80
                    ${isKannada ? 'font-kannada' : ''}
                  `}
                >
                  {t('cta_explore')}
                </Link>

                <Link
                  href="/contact"
                  className={`
                    min-h-11
                    py-2
                    text-white
                    underline
                    decoration-white/60
                    underline-offset-4
                    transition-colors
                    hover:text-white/80
                    ${isKannada ? 'font-kannada' : ''}
                  `}
                >
                  {t('cta_customize')}
                </Link>
              </div>
            </div>
          </div>
          </div>

          {/* Mobile bottom sheet; transparent to the grid from md upward. */}
          <div className="relative z-10 -mt-14 rounded-t-[2rem] border-t border-white/10 bg-transparent pt-0 md:contents">
            {/* The globe sits in the lower dark panel; on small screens it follows the search. */}
            <div className="relative h-[min(62vw,15rem)] min-h-[200px] w-full overflow-hidden pointer-events-none sm:h-[min(48vw,22rem)] sm:min-h-[220px] lg:h-full lg:min-h-[360px]">
              {mounted && shouldReduceMotion === false && <Hero3D />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSectionComponent.displayName = 'HeroSection';

export const HeroSection = memo(HeroSectionComponent);