'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:5000';

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${API_URL}/api/v1/adminauth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
              'X-App-Key': process.env.API_SECRET!,
          },
          body: JSON.stringify({
            mobile,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Invalid mobile number or password'
        );
      }

      if (!data?.access_token) {
        throw new Error(
          'Access token not received'
        );
      }

      const cookieResponse = await fetch(
        '/api/admin/session',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            accessToken:
              data.access_token,
            refreshToken:
              data.refresh_token,
            user: data.user,
          }),
        }
      );

      if (!cookieResponse.ok) {
        throw new Error(
          'Failed to create session'
        );
      }

      router.replace('/admin');
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to access the dashboard
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Mobile Number
            </label>

            <input
              type="text"
              value={mobile}
              onChange={(e) =>
                setMobile(
                  e.target.value
                )
              }
              placeholder="9876543210"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? 'Signing In...'
              : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}