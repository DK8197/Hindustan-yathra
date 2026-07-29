'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('about');
  console.log(t('hero-title'));

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/textures/hero-background-desktop.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Decorative glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-6 py-24 text-center md:min-h-[85vh]">
        <div className="max-w-4xl">

          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t('hero-title')}
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
            {t('hero-subheadline')}
          </p>

          <div className="mt-10">
            <Link
              href="/destinations"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-saffron-500
                px-8
                py-4
                text-base
                font-semibold
                text-white
                shadow-xl
                shadow-saffron-500/30
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-saffron-600
                hover:shadow-2xl
              "
            >
              {t('hero-cta')}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}