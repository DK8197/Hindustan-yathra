'use client';

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
  const itineraryPdfUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL
    ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/+$/, '')}/tours/${tour.slug}/itinerary.pdf`
    : null;

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

        {itineraryPdfUrl && <a
          href={itineraryPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border py-3 font-medium text-himalaya-800 transition hover:bg-himalaya-50"
        >
          <Download size={18} />
          {t('download_itinerary')}
        </a>}

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
