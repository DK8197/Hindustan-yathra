import { Info } from 'lucide-react';
import { POLICY_CONTACT, type PolicyDocument } from '@/lib/policy-content';

export function PolicyPage({ doc }: { doc: PolicyDocument }) {
  return (
    <>
    <header className="border-b border-sky-200/60 bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-sky-950 sm:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-sky-900/80">{doc.intro}</p>
      </div>
    </header>
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">

      <nav
        aria-label={`${doc.title} contents`}
        className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5"
      >
        <ol className="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
          {doc.sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="inline-block py-1 text-himalaya-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-600"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-9">
        {doc.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-24"
          >
            <h2
              id={`${section.id}-heading`}
              className="font-display text-xl font-semibold text-himalaya-900"
            >
              {section.heading}
            </h2>

            {section.paragraphs?.map((text) => (
              <p key={text} className="mt-3 text-base leading-relaxed text-slate-700">
                {text}
              </p>
            ))}

            {section.items && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {section.note && (
              <p className="mt-4 flex items-start gap-3 rounded-xl border border-saffron-100 bg-saffron-50 p-4 text-sm text-himalaya-900">
                <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-saffron-700" />
                <span>{section.note}</span>
              </p>
            )}
          </section>
        ))}
      </div>

      <footer className="mt-12 rounded-2xl border border-slate-200 p-5 text-sm text-slate-700">
        <p className="font-semibold text-himalaya-900">Questions?</p>
        <p className="mt-1">
          Email{' '}
          <a className="underline underline-offset-4" href={`mailto:${POLICY_CONTACT.email}`}>
            {POLICY_CONTACT.email}
          </a>{' '}
          or call{' '}
          <a className="underline underline-offset-4" href={`tel:${POLICY_CONTACT.phones[0].replace(/\s/g, '')}`}>
            {POLICY_CONTACT.phones[0]}
          </a>
          .
        </p>
      </footer>
    </article>
    </>
  );
}
