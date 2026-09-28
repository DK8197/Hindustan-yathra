'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle, Download, PhoneCall } from 'lucide-react';
import type { Tour } from '@/types/tour';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919060085635';
const CALL_NUMBER = '+919060085635';

export function TourBookingCard({ tour, locale }: { tour: Tour; locale: 'en' | 'kn' }) {
  const t = useTranslations('tour');
  const hasPrice = typeof tour.priceFrom === 'number' && Number.isFinite(tour.priceFrom) && tour.priceFrom > 0;

  const whatsappMessage = encodeURIComponent(
    `Hi Hindustan Yatra, I'm interested in the ${tour.title.en} package.`,
  );

  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-md">
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

      <div className="mt-4 text-sm text-gray-600">
        {tour.durationDays} days / {tour.durationNights} nights
      </div>

      {hasPrice && (
        <button className="mt-6 w-full rounded-full bg-saffron-500 py-3 font-medium text-white transition hover:bg-saffron-600">
          {t('book_now')}
        </button>
      )}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-green-500 py-3 font-medium text-green-600 transition hover:bg-green-50"
      >
        <MessageCircle size={18} /> {t('enquire_on_whatsapp')}
      </a>

      {!hasPrice && (
        <a
          href={`tel:${CALL_NUMBER}`}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-himalaya-200 py-3 font-medium text-himalaya-800 transition hover:bg-himalaya-50"
        >
          <PhoneCall size={18} /> {t('call_us')}
        </a>
      )}

        <a
          href={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/tours/${tour.slug}/itinerary.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border py-3 font-medium text-himalaya-800 transition hover:bg-himalaya-50"
        >
          <Download size={18} />
          {t('download_itinerary')}
        </a>

      {tour.highlights[locale].length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-semibold text-himalaya-900">{t('highlights')}</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {tour.highlights[locale].map((h, i) => (
              <li key={i}>• {h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
