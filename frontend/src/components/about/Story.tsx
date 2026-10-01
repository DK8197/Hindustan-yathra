'use client';
import { useTranslations } from 'next-intl';


export default function Story() {

  const t = useTranslations('about');

  return (
    <section className="py-24">
      <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-2">

        <div>
          <h2 className="mb-6 font-display text-3xl font-bold text-himalaya-900 sm:text-4xl">
            {t('story_title')}
          </h2>

          <p className="text-lg leading-8 text-gray-600">
            {t('story')}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#fbf8f2] p-6 sm:p-8">
          <h3 className="font-display text-2xl font-bold text-himalaya-900 sm:text-3xl">
            {t('mission_title')}
          </h3>

          <p className="mt-5 text-gray-600 leading-8">
            {t('mission')}
          </p>

          <h3 className="mt-8 font-display text-2xl font-bold text-himalaya-900 sm:mt-10 sm:text-3xl">
            {t('vision_title')}
          </h3>

          <p className="mt-5 text-gray-600 leading-8">
            {t('vision')}
          </p>
        </div>

      </div>
    </section>
  );
}