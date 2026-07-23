'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useAppStore } from '@/store/useAppStore';

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUser(data.user);
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="font-display text-2xl font-semibold text-himalaya-900">Hindustan Yatra</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-gray-700">{t('enter_mobile')}</label>
        <div className="flex items-center rounded-lg border px-4 py-3">
          <span className="mr-2 text-gray-400">+91</span>
          <input
            type="tel"
            required
            maxLength={10}
            pattern="[6-9]\d{9}"
            placeholder={t('mobile_placeholder')}
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
            className="w-full outline-none"
          />
        </div>

        <label className="block text-sm font-medium text-gray-700">{t('enter_password')}</label>
        <input
          type="password"
          required
          placeholder={t('password_placeholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-saffron-500 py-3 font-medium text-white disabled:opacity-60"
        >
          {t('login')}
        </button>
      </form>
    </div>
  );
}
