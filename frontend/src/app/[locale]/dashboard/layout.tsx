import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CalendarCheck, Heart, User, Bell } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('dashboard');

  const links = [
    { href: '/dashboard/bookings', label: t('my_bookings'), icon: CalendarCheck },
    { href: '/dashboard/saved', label: t('saved_tours'), icon: Heart },
    { href: '/dashboard/profile', label: t('profile'), icon: User },
  ] as const;

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-28 md:grid-cols-4 md:px-12">
      <aside className="space-y-1 md:col-span-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-himalaya-800 hover:bg-himalaya-50"
          >
            <Icon size={18} /> {label}
          </Link>
        ))}
        <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50">
          <Bell size={18} /> {t('notifications')}
        </button>
      </aside>
      <div className="md:col-span-3">{children}</div>
    </div>
  );
}
