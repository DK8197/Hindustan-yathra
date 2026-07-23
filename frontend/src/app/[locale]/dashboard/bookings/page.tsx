'use client';

import { useTranslations } from 'next-intl';
import { Download } from 'lucide-react';

// TODO(prod): fetch via useQuery(['bookings']) -> GET /api/bookings (auth-scoped by JWT cookie).
const mockBookings = [
  { id: 'b1', tour: 'Chardham Yatra', date: '2026-09-12', status: 'confirmed', travellers: 4 },
];

export default function BookingsPage() {
  const t = useTranslations('dashboard');

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-himalaya-900">{t('my_bookings')}</h1>
      <div className="mt-6 space-y-4">
        {mockBookings.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-xl border p-5">
            <div>
              <p className="font-medium text-himalaya-900">{b.tour}</p>
              <p className="text-sm text-gray-500">
                {b.date} · {b.travellers} travellers · <span className="capitalize">{b.status}</span>
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-himalaya-50">
              <Download size={16} /> {t('download_itinerary')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
