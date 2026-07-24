import Link from "next/link";
import { useTranslations } from 'next-intl';


export default function Hero() {
  const t = useTranslations('about');

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/textures/hero-background-desktop.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto px-6 py-32 text-center text-white">
        <h1 className="text-5xl font-bold">
          {t('hero-title')}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-200">
          {t('hero-subheadline')}
        </p>

        <Link
          href="/destinations"
          className="mt-10 inline-flex rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          {t('hero-cta')}
        </Link>
      </div>
    </section>
  );
}