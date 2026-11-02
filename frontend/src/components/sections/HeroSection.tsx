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
import { DESKTOP_SLIDES, HeroAlbum, MOBILE_SLIDES } from '@/components/sections/HeroAlbum';
import { useHeroScrollProgress } from '@/lib/hooks/useHeroScrollProgress';

const HERO_DESKTOP_IMAGE = getCdnImageUrl('images-confidential/hero-desktop.webp');

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
          lg:h-[calc(100svh-5rem)]
          lg:min-h-[32rem]
          overflow-hidden
          bg-gradient-to-b
          from-sky-100
          via-sky-50
          to-white
        "
      >
        {/* Same banner as desktop; on phones it is cropped to a fixed height and rounded like a native sheet header. */}
        <div className="relative h-[clamp(6.5rem,16svh,8.5rem)] shrink-0 overflow-hidden max-md:rounded-b-[1.75rem] max-md:shadow-[0_14px_32px_-18px_rgba(2,132,199,0.55)] md:h-auto">
          <Image
            src={HERO_DESKTOP_IMAGE}
            alt="Hindustan Yathra founders and Karnataka heritage landmarks"
            width={2172}
            height={429}
            sizes="100vw"
            priority
            unoptimized
            className="block h-full w-full object-cover object-[50%_45%] md:h-auto"
          />
        </div>

        <div className="relative grid min-h-0 flex-1 grid-cols-1 max-md:flex max-md:flex-col max-md:items-stretch max-md:justify-start items-center lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.3fr)_minmax(0,0.8fr)] lg:gap-x-6 xl:gap-x-10">
                  {/* Desktop-only album, left of the copy. */}
                  <HeroAlbum slides={DESKTOP_SLIDES} />

                  {/* Content */}
          <div className="relative z-10 w-full px-5 py-5 max-md:flex max-md:pb-2 max-md:pt-5 sm:px-7 sm:py-8 lg:px-8 lg:py-6">
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
                    ? 'font-kannada text-sky-950 text-[clamp(1.5rem,5.5vw,3.5rem)] leading-[1.25] tracking-normal max-md:text-[clamp(1.75rem,7.5vw,2.25rem)]'
                    : 'font-[family-name:var(--font-brochure-script)] text-[clamp(2rem,4.8vw,3.9rem)] font-bold italic leading-[1.1] tracking-normal text-emerald-600 lg:whitespace-nowrap lg:text-[clamp(1.5rem,2.9vw,3.5rem)] max-md:text-[clamp(2.25rem,10vw,2.75rem)] max-md:leading-[1.1]'
                }
                font-semibold
                [text-wrap:balance]
                max-md:self-center
                max-md:text-center
                max-md:animate-fly-in
                max-md:[animation-delay:0ms]
              `}
            >
              {t('headline')}
            </h1>

            {/* Subheadline */}
            <p
              className={`
                mt-5
                max-w-[48ch]
                max-md:mt-3
                max-md:self-center
                max-md:text-center
                max-md:animate-fly-in
                max-md:[animation-delay:60ms]
                ${
                  isKannada
                    ? 'font-kannada text-base leading-relaxed sm:text-lg'
                    : 'text-base leading-relaxed max-md:leading-snug sm:text-base lg:text-[0.95rem]'
                }
                text-sky-950
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
                  max-md:mt-4
                  max-md:rounded-full
                  max-md:p-1.5
                  max-md:animate-fly-in
                  max-md:[animation-delay:120ms]
                  border
                  border-sky-200
                  shadow-[0_12px_32px_-16px_rgba(2,132,199,0.35)]
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
                    transition-[transform,background-color]
                    duration-150
                    ease-out
                    active:scale-95
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
                className="flex flex-wrap items-center gap-x-7 gap-y-3 text-base font-semibold max-md:mt-2 max-md:justify-center max-md:gap-x-6 max-md:animate-fly-in max-md:[animation-delay:180ms]"
              >
                <Link
                  href="/destinations"
                  className={`
                    min-h-11
                    py-2
                    text-sky-900
                    underline
                    decoration-sky-900/40
                    underline-offset-4
                    transition-[transform,color]
                    duration-150
                    ease-out
                    active:scale-[0.97]
                    hover:text-sky-700
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
                    text-sky-900
                    underline
                    decoration-sky-900/40
                    underline-offset-4
                    transition-[transform,color]
                    duration-150
                    ease-out
                    active:scale-[0.97]
                    hover:text-sky-700
                    ${isKannada ? 'font-kannada' : ''}
                  `}
                >
                  {t('cta_customize')}
                </Link>
              </div>
            </div>
          </div>
          </div>

          <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-1 lg:hidden">
            <HeroAlbum slides={MOBILE_SLIDES} display="mobile" />
          </div>

          {/* The globe sits beside the copy from md upward. */}
          <div className="relative z-10 rounded-t-[2rem] bg-transparent pt-0 max-md:hidden md:contents">
            {/* The globe sits beside the copy from md upward; it is omitted on phones. */}
            <div className="relative h-[min(48vw,22rem)] min-h-[220px] w-full overflow-hidden pointer-events-none lg:self-center lg:h-[min(100%,36rem)] lg:min-h-[240px]">
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