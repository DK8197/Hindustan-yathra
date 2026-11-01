'use client';

import Image from 'next/image';
import React, { memo } from 'react';
import { useEffect,useState }  from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';
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
        {/* Use the same CDN artwork on every viewport without cropping its embedded text or portraits. */}
        <Image
          src={getCdnImageUrl('images-confidential/hero-desktop.webp')}
          alt="Hindustan Yathra founders and Karnataka heritage landmarks"
          width={1672}
          height={941}
          sizes="100vw"
          priority
          className="block h-auto w-full shrink-0"
        />

        <div className="relative grid flex-1 grid-cols-1 items-center bg-himalaya-900 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {/* Content */}
          <div className="relative z-10 w-full px-5 py-7 sm:px-7 sm:py-8 lg:px-8 lg:py-10">
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
              text-left
            "
          >
            {/* Headline */}
            <h1
              id="home-title"
              className={`
                max-w-[26ch]
                ${
                  isKannada
                    ? 'font-kannada text-[clamp(1.5rem,5.5vw,3.5rem)] leading-[1.25] tracking-normal'
                    : 'font-display text-[clamp(1.75rem,4.3vw,3.5rem)] leading-[1.02] tracking-tight'
                }
                font-semibold
                text-white
                [text-wrap:balance]
              `}
            >
              {t('headline')}
            </h1>

            {/* Subheadline */}
            <p
              className={`
                mt-5
                max-w-[48ch]
                ${
                  isKannada
                    ? 'font-kannada text-base leading-relaxed sm:text-lg'
                    : 'text-base leading-relaxed sm:text-lg'
                }
                text-white
              `}
            >
              {t('subheadline')}
            </p>

            {/* Interactive Section (Lifted slightly upward via negative translation) */}
            <div className="mt-5 flex max-w-2xl flex-col gap-4">
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
                  {t('search_cta')}
                </button>
              </form>

              {/* Secondary routes remain available as plain text links. */}
              <div
                className="flex flex-wrap items-center gap-x-7 gap-y-3 text-base font-semibold"
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

          {/* The globe sits in the lower dark panel; on small screens it follows the search. */}
          <div className="relative h-[min(58vw,18rem)] min-h-[220px] w-full overflow-hidden pointer-events-none sm:h-[min(48vw,22rem)] lg:h-full lg:min-h-[360px]">
            {mounted && shouldReduceMotion === false && <Hero3D />}
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSectionComponent.displayName = 'HeroSection';

export const HeroSection = memo(HeroSectionComponent);