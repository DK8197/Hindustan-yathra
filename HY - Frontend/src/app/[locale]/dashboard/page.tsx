import { useTranslations } from 'next-intl';

export default function DashboardHome() {
  const t = useTranslations('dashboard');
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-himalaya-900">{t('my_bookings')}</h1>
      <p className="mt-2 text-sm text-gray-500">
        Use the sidebar to view bookings, saved tours, or edit your profile.
      </p>
    </div>
  );
}
