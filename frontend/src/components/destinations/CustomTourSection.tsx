'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, LoaderCircle, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react';
import { customTours, type CustomTourCategory } from '@/data/custom-tours';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919060085635';

type Status = 'idle' | 'submitting' | 'done' | 'error';

const fieldClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-[border-color,box-shadow] duration-150 focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200';

const pressClass =
  'transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100';

export function CustomTourSection() {
  const t = useTranslations('destinations.custom');
  const tContact = useTranslations('contact');

  const [category, setCategory] = useState<CustomTourCategory>('domestic');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const visibleTours = customTours.filter((tour) => tour.category === category);

  function selectTour(id: string | 'custom') {
    setStatus('idle');
    setSelectedId(id);

    if (id === 'custom') {
      setDestination('');
      setMessage(t('custom_message'));
    } else {
      const tour = customTours.find((item) => item.id === id);
      if (!tour) return;
      setDestination(tour.name);
      setMessage(tour.message);
    }

    // Move the visitor to the pre-filled form on small screens.
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('submitting');

    try {
      const res = await fetch('/api/leads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email'),
          destination,
          message,
        }),
      });

      if (res.ok) {
        setStatus('done');
        form.reset();
        setSelectedId(null);
        setDestination('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="custom-tours"
      aria-labelledby="custom-tours-heading"
      className="scroll-mt-24 py-2"
    >
      <div className="relative max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-saffron-200 bg-saffron-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-saffron-700">
          <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
          {t('eyebrow')}
        </p>
        <h2
          id="custom-tours-heading"
          className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-himalaya-900 md:text-5xl"
        >
          {t('heading')}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
          {t('subheading')}
        </p>
      </div>

      <div
        className="mt-8 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1"
        role="group"
        aria-label={t('category_label')}
      >
        {(['domestic', 'island'] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setCategory(value)}
            aria-pressed={category === value}
            className={`min-h-11 rounded-full px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-600 ${pressClass} ${
              category === value
                ? 'bg-himalaya-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-himalaya-900'
            }`}
          >
            {t(`category_${value}`)}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ul key={category} className="grid content-start gap-3 sm:grid-cols-2">
          {visibleTours.map((tour, index) => {
            const selected = selectedId === tour.id;
            return (
              <li
                key={tour.id}
                className="animate-rise-in motion-reduce:animate-none"
                style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
              >
                <button
                  type="button"
                  onClick={() => selectTour(tour.id)}
                  aria-pressed={selected}
                  className={`group flex h-full w-full flex-col rounded-2xl border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-600 ${pressClass} ${
                    selected
                      ? 'border-saffron-600 bg-saffron-50 shadow-[0_8px_24px_-12px_rgba(180,83,9,0.45)]'
                      : 'border-slate-200 bg-white [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-himalaya-300 [@media(hover:hover)]:hover:shadow-[0_12px_28px_-16px_rgba(15,23,42,0.35)]'
                  }`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-lg font-semibold leading-snug text-himalaya-900">
                      {tour.name}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      {selected && (
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-5 w-5 animate-rise-in text-saffron-700 motion-reduce:animate-none"
                        />
                      )}
                      <span className="rounded-full bg-himalaya-900 px-2.5 py-1 text-xs font-semibold tabular-nums text-white">
                        {t('days', { count: tour.days })}
                      </span>
                    </span>
                  </span>
                  {tour.from && (
                    <span className="mt-1 flex items-center gap-1 text-sm text-slate-600">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                      {t('departing', { city: tour.from })}
                    </span>
                  )}
                  <span className="mt-2 text-sm leading-snug text-slate-700">
                    {tour.places.join(' · ')}
                  </span>
                </button>
              </li>
            );
          })}

          <li className="sm:col-span-2">
            <button
              type="button"
              onClick={() => selectTour('custom')}
              aria-pressed={selectedId === 'custom'}
              className={`w-full rounded-2xl border border-dashed p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-600 ${pressClass} ${
                selectedId === 'custom'
                  ? 'border-saffron-600 bg-saffron-50'
                  : 'border-himalaya-300 bg-white [@media(hover:hover)]:hover:bg-himalaya-50'
              }`}
            >
              <span className="font-display text-lg font-semibold text-himalaya-900">
                {t('custom_title')}
              </span>
              <span className="mt-1 block text-sm text-slate-700">{t('custom_body')}</span>
            </button>
          </li>
        </ul>

        <form
          ref={formRef}
          name="custom_tour_enquiry"
          onSubmit={handleSubmit}
          className="h-fit scroll-mt-24 space-y-4 rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)] sm:p-7 lg:sticky lg:top-28"
        >
          <h3 className="font-display text-xl font-semibold text-himalaya-900">{t('form_title')}</h3>
          <p className="text-sm text-slate-600">{t('form_hint')}</p>

          <div>
            <label htmlFor="custom-name" className="mb-1.5 block text-base font-medium text-slate-800">
              {tContact('name')}
            </label>
            <input id="custom-name" name="name" type="text" autoComplete="name" required minLength={2} className={fieldClass} />
          </div>

          <div>
            <label htmlFor="custom-phone" className="mb-1.5 block text-base font-medium text-slate-800">
              {tContact('phone')}
            </label>
            <input
              id="custom-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              minLength={10}
              maxLength={20}
              pattern="[0-9+\(\). \-]{10,20}"
              title={tContact('phone_format_hint')}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="custom-email" className="mb-1.5 block text-base font-medium text-slate-800">
              {tContact('email')} <span className="font-normal text-slate-600">({tContact('optional')})</span>
            </label>
            <input id="custom-email" name="email" type="email" autoComplete="email" className={fieldClass} />
          </div>

          <div>
            <label htmlFor="custom-destination" className="mb-1.5 block text-base font-medium text-slate-800">
              {tContact('destination')}
            </label>
            <input
              id="custom-destination"
              type="text"
              autoComplete="off"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="custom-message" className="mb-1.5 block text-base font-medium text-slate-800">
              {tContact('message')}
            </label>
            <textarea
              id="custom-message"
              rows={8}
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t('message_placeholder')}
              className={fieldClass}
            />
          </div>

          <label className="flex items-start gap-3 text-base text-slate-700">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-400 accent-saffron-700"
            />
            <span>{tContact('prompt_consent')}</span>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-saffron-700 px-5 py-3 font-semibold text-white shadow-[0_10px_24px_-12px_rgba(180,83,9,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 [@media(hover:hover)]:hover:bg-saffron-600 ${pressClass}`}
            >
              {status === 'submitting' ? (
                <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
              ) : (
                <Send aria-hidden="true" className="h-5 w-5" />
              )}
              {status === 'submitting' ? tContact('sending') : tContact('submit')}
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                message || (destination ? `Hello Hindustan Yatra, I would like to enquire about ${destination}.` : 'Hello Hindustan Yatra, I would like to plan a custom tour.')
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-emerald-600 bg-emerald-50 px-5 py-3 font-semibold text-emerald-800 transition-colors hover:bg-emerald-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${pressClass}`}
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5 text-emerald-600 group-hover:text-white" />
              {tContact('whatsapp')}
            </a>
          </div>

          <div aria-live="polite">
            {status === 'done' && (
              <p className="flex animate-rise-in items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                {tContact('status_success')}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
                {tContact('status_error')}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
