import { useTranslations } from 'next-intl';


export default function Story() {

  const t = useTranslations('about');

  return (
    <section className="py-24">
      <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-2">

        <div>
          <h2 className="mb-6 text-4xl font-bold">
            Our Story
          </h2>

          <p className="text-lg leading-8 text-gray-600">
            {t('story')}
          </p>
        </div>

        <div className="rounded-3xl bg-orange-50 p-10">
          <h3 className="text-3xl font-bold">
            Our Mission
          </h3>

          <p className="mt-5 text-gray-600 leading-8">
            {t('mission')}
          </p>

          <h3 className="mt-10 text-3xl font-bold">
            Our Vision
          </h3>

          <p className="mt-5 text-gray-600 leading-8">
            {t('vision')}
          </p>
        </div>

      </div>
    </section>
  );
}