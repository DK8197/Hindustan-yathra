'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LoaderCircle, Send, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { useAppStore } from '@/store/useAppStore';

const PROMPT_DELAY_MS = 4000;
const DISMISS_KEY = 'hy-contact-prompt-done';

type Status = 'idle' | 'submitting' | 'done' | 'error';

const inputClass =
  'w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200';

export function ContactPrompt() {
  const t = useTranslations('contact');
  const user = useAppStore((state) => state.user);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const dialogRef = useRef<HTMLDivElement>(null);

  const onContactPage = pathname === '/contact';

  // Show once per browser session, 5 seconds after the visitor lands.
  useEffect(() => {
    if (onContactPage) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), PROMPT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [onContactPage]);

  function close() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    dialogRef.current?.querySelector<HTMLInputElement>('input')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    try {
      const formData = new FormData(event.currentTarget);
      const res = await fetch('/api/leads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (res.ok) {
        sessionStorage.setItem(DISMISS_KEY, '1');
        setStatus('done');
        window.setTimeout(() => setOpen(false), 2500);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-prompt-title"
        className="motion-fade-in relative max-h-full w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
      >
        <button
          type="button"
          onClick={close}
          aria-label={t('prompt_close')}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <h2
          id="contact-prompt-title"
          className="pr-10 font-display text-xl font-bold text-himalaya-900 sm:text-2xl"
        >
          {t('prompt_title')}
        </h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">{t('prompt_body')}</p>

        {status === 'done' ? (
          <p
            role="status"
            className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"
          >
            {t('status_success')}
          </p>
        ) : (
          <form
            name="contact_prompt"
            onSubmit={handleSubmit}
            className="mt-5 space-y-3"
          >
            <div>
              <label htmlFor="prompt-name" className="mb-1 block text-sm font-medium text-slate-800">
                {t('name')}
              </label>
              <input
                id="prompt-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                defaultValue={user?.name ?? ''}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="prompt-phone" className="mb-1 block text-sm font-medium text-slate-800">
                {t('phone')}
              </label>
              <input
                id="prompt-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                minLength={10}
                maxLength={20}
                pattern="[0-9+\(\). \-]{10,20}"
                title={t('phone_format_hint')}
                defaultValue={user?.mobile ?? ''}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="prompt-email" className="mb-1 block text-sm font-medium text-slate-800">
                {t('email')}{' '}
                <span className="font-normal text-slate-600">({t('optional')})</span>
              </label>
              <input
                id="prompt-email"
                name="email"
                type="email"
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <input type="hidden" name="message" value="Contact details shared via homepage prompt (consent given)" />

            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-400 accent-saffron-700"
              />
              <span>{t('prompt_consent')}</span>
            </label>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-saffron-700 px-5 py-3 font-semibold text-white transition hover:bg-saffron-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
              ) : (
                <Send aria-hidden="true" className="h-5 w-5" />
              )}
              {status === 'submitting' ? t('sending') : t('submit')}
            </button>

            {status === 'error' && (
              <p role="alert" className="text-sm text-red-700">
                {t('status_error')}
              </p>
            )}

            <Link
              href="/contact"
              onClick={close}
              className="block py-2 text-center text-sm font-medium text-himalaya-700 underline underline-offset-4"
            >
              {t('prompt_full_form')}
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
