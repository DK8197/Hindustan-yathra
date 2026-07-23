'use client';

type Props = {
  inclusions: {
    en: string[];
    kn: string[];
  };
  exclusions: {
    en: string[];
    kn: string[];
  };
  locale: 'en' | 'kn';
};

export function TourInclusionsExclusions({
  inclusions,
  exclusions,
  locale,
}: Props) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Inclusions */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-emerald-700">
            {locale === 'kn'
              ? 'ಒಳಗೊಂಡಿರುವವು'
              : 'Inclusions'}
          </h2>

          <ul className="space-y-3">
            {inclusions[locale].map(
              (item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 text-emerald-600">
                    ✓
                  </span>

                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Exclusions */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-red-700">
            {locale === 'kn'
              ? 'ಒಳಗೊಂಡಿಲ್ಲ'
              : 'Exclusions'}
          </h2>

          <ul className="space-y-3">
            {exclusions[locale].map(
              (item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 text-red-600">
                    ✕
                  </span>

                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}