'use client';

import { useTranslations } from 'next-intl';
import { useAppStore } from '@/store/useAppStore';

export default function ProfilePage() {
  const t = useTranslations('dashboard');
  const user = useAppStore((s) => s.user);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-himalaya-900">{t('profile')}</h1>
      <form className="mt-6 max-w-md space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Full name</label>
          <input defaultValue={user?.name ?? ''} className="mt-1 w-full rounded-lg border px-4 py-3" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Mobile number</label>
          <input defaultValue={user?.mobile ?? ''} disabled className="mt-1 w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-500" />
        </div>
        <button type="submit" className="rounded-full bg-saffron-500 px-6 py-3 font-medium text-white">
          Save changes
        </button>
      </form>
    </div>
  );
}
