'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  Send,
} from 'lucide-react';

const WHATSAPP_NUMBER = '919060085635';

type Status = 'idle' | 'submitting' | 'done' | 'error';

function FormStatus({ status, message }: { status: Status; message: string }) {
  if (status === 'idle') return null;

  const Icon = status === 'submitting'
    ? LoaderCircle
    : status === 'done'
      ? CheckCircle2
      : AlertCircle;
  const style = status === 'done'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
    : status === 'error'
      ? 'border-red-200 bg-red-50 text-red-900'
      : 'border-sky-200 bg-sky-50 text-sky-900';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${style}`}
    >
      <Icon
        aria-hidden="true"
        className={`mt-0.5 h-5 w-5 shrink-0 ${status === 'submitting' ? 'animate-spin' : ''}`}
      />
      <p>{message}</p>
    </div>
  );
}

export function ContactSection({
  initialDestination = '',
  headingLevel = 'h2',
}: {
  initialDestination?: string;
  headingLevel?: 'h1' | 'h2';
}) {
  const t = useTranslations('contact');
  const tSections = useTranslations('sections');

  const [status, setStatus] = useState<Status>('idle');
  const Heading = headingLevel;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    setStatus('submitting');

    try {
      const formData = new FormData(form);

      const res = await fetch('/api/leads/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (res.ok) {
        setStatus('done');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 md:px-12"
    >
      <div className="mb-12 text-center">

        <Heading className="mt-4 font-display text-3xl font-bold tracking-tight text-himalaya-900 sm:text-4xl md:text-5xl">
          {tSections('contact')}
        </Heading>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          {t('intro')}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-slate-800">{t('name')}</label>
            <input id="contact-name" name="name" autoComplete="name" required minLength={2} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200" />
          </div>

          <div>
            <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-slate-800">{t('phone')}</label>
            <input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={20} pattern="[0-9+(). -]{10,20}" title={t('phone_format_hint')} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200" />
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-slate-800">{t('email')} <span className="font-normal text-slate-500">({t('optional')})</span></label>
            <input id="contact-email" name="email" type="email" autoComplete="email" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200" />
          </div>

          <div>
            <label htmlFor="contact-destination" className="mb-1.5 block text-sm font-medium text-slate-800">{t('destination')} <span className="font-normal text-slate-500">({t('optional')})</span></label>
            <input id="contact-destination" name="destination" autoComplete="off" defaultValue={initialDestination} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200" />
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-slate-800">{t('message')} <span className="font-normal text-slate-500">({t('optional')})</span></label>
            <textarea id="contact-message" name="message" rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-saffron-600 focus:ring-2 focus:ring-saffron-200" />
          </div>

          <button
            disabled={status === 'submitting'}
            type="submit"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-saffron-700 px-5 py-3 font-semibold text-white transition hover:bg-saffron-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" /> : <Send aria-hidden="true" className="h-5 w-5" />}
            {status === 'submitting' ? t('sending') : t('submit')}
          </button>

          <FormStatus
            status={status}
            message={status === 'submitting' ? t('status_sending') : status === 'done' ? t('status_success') : t('status_error')}
          />
        </form>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-6">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hi Hindustan Yathra, I would like to plan a trip.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-emerald-700 py-4 font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            <MessageCircle size={22} />
            {t('whatsapp')}
          </a>

          

          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
            <iframe
              title="Hindustan Yatra Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.49437530746!2d75.14006667488832!3d15.349689285230303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7a1d1fdc27f%3A0xda2cb0a266c7d9a9!2sHindustan%20Yatra!5e0!3m2!1sen!2sin!4v1783166349537!5m2!1sen!2sin"
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}