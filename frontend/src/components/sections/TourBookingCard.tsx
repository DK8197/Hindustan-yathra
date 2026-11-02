'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Download, PhoneCall } from 'lucide-react';
import type { Tour } from '@/types/tour';
import { Link } from '@/i18n/routing';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919060085635';
const CALL_NUMBER = '+919060085635';

export function TourBookingCard({ tour, locale }: { tour: Tour; locale: 'en' | 'kn' }) {
  const t = useTranslations('tour');
  const hasPrice = typeof tour.priceFrom === 'number' && Number.isFinite(tour.priceFrom) && tour.priceFrom > 0;

  const whatsappMessage = encodeURIComponent(
    t('whatsapp_tour_message', { tour: tour.title[locale] }),
  );
  const tContact = useTranslations('contact');
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [brochureStatus, setBrochureStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const brochureUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL
    ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/+$/, '')}/tours/${tour.slug}/itinerary.pdf`
    : null;

  // The brochure link is only revealed after the lead has been saved.
  async function handleBrochureSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setBrochureStatus('submitting');

    try {
      const res = await fetch('/api/leads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') ?? '').trim(),
          phone: String(formData.get('phone') ?? ''),
          email: String(formData.get('email') ?? ''),
          destination: tour.title[locale],
          message: `Brochure download requested for ${tour.title[locale]} (consent given)`,
        }),
      });
      setBrochureStatus(res.ok ? 'success' : 'error');
    } catch {
      setBrochureStatus('error');
    }
  }

  return (
    <div id="tour-enquiry" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {hasPrice ? (
        <>
          <div className="text-sm text-gray-400">{t('starting_from')}</div>
          <div className="font-display text-3xl font-semibold text-saffron-600">
            ₹{tour.priceFrom!.toLocaleString('en-IN')}
            <span className="ml-1 text-sm font-normal text-gray-400">{t('per_person')}</span>
          </div>
        </>
      ) : (
        <div className="rounded-xl bg-saffron-50 p-4">
          <div className="font-display text-2xl font-semibold text-saffron-700">
            {t('contact_for_price')}
          </div>
        </div>
      )}

      {(tour.durationDays > 0 || tour.durationNights > 0) && (
        <div className="mt-4 text-sm text-gray-600">
          {t('duration', { days: tour.durationDays, nights: tour.durationNights })}
        </div>
      )}

      <Link
        href={{
          pathname: '/contact',
          query: { destination: tour.title[locale] },
        }}
        className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-saffron-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-saffron-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2"
      >
        {t('ask_travel_expert')}
      </Link>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-emerald-700 py-3 font-medium text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
      >
        <MessageCircle size={18} /> {t('enquire_on_whatsapp')}
      </a>

      {!hasPrice && (
        <a
          href={`tel:${CALL_NUMBER}`}
          className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-himalaya-200 py-3 font-medium text-himalaya-800 transition hover:bg-himalaya-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-himalaya-600 focus-visible:ring-offset-2"
        >
          <PhoneCall size={18} /> {t('call_us')}
        </a>
      )}

      {brochureUrl && (
        <div className="mt-3">
          {brochureStatus === 'success' ? (
            <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <p className="text-sm text-emerald-900">{t('brochure_ready')}</p>
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-himalaya-800 px-4 py-3 font-semibold text-white transition hover:bg-himalaya-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-himalaya-600 focus-visible:ring-offset-2"
              >
                <Download size={18} />
                {t('download_brochure')}
              </a>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setBrochureOpen((open) => !open)}
                aria-expanded={brochureOpen}
                aria-controls="brochure-form"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-himalaya-200 py-3 font-medium text-himalaya-800 transition hover:bg-himalaya-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-himalaya-600 focus-visible:ring-offset-2"
              >
                <Download size={18} />
                {t('download_brochure')}
              </button>

              {brochureOpen && (
                <form
                  id="brochure-form"
                  onSubmit={handleBrochureSubmit}
                  className="mt-3 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm text-slate-700">{t('brochure_prompt')}</p>
                  <div>
                    <label htmlFor="brochure-name" className="mb-1 block text-sm font-medium text-slate-800">
                      {tContact('name')}
                    </label>
                    <input
                      id="brochure-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={100}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="brochure-phone" className="mb-1 block text-sm font-medium text-slate-800">
                      {tContact('phone')}
                    </label>
                    <input
                      id="brochure-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      minLength={10}
                      maxLength={20}
                      pattern="[0-9+\(\). \-]{10,20}"
                      title={tContact('phone_format_hint')}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="brochure-email" className="mb-1 block text-sm font-medium text-slate-800">
                      {tContact('email')}
                    </label>
                    <input
                      id="brochure-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200"
                    />
                  </div>
                  <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-400 accent-saffron-700"
                    />
                    <span>{tContact('prompt_consent')}</span>
                  </label>
                  {brochureStatus === 'error' && (
                    <p role="alert" className="text-sm text-red-700">{t('brochure_error')}</p>
                  )}
                  <button
                    type="submit"
                    disabled={brochureStatus === 'submitting'}
                    className="flex min-h-12 w-full items-center justify-center rounded-full bg-saffron-700 px-4 py-3 font-semibold text-white transition hover:bg-saffron-600 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2"
                  >
                    {brochureStatus === 'submitting' ? tContact('sending') : t('brochure_submit')}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      )}

      {tour.highlights[locale].length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-semibold text-himalaya-900">{t('highlights')}</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {(tour.highlights?.[locale] || []).map((h, i) => (
              <li key={i}>• {h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
