'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Plane,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const WHATSAPP_NUMBER = '919060085635';

type Status = 'idle' | 'submitting' | 'done' | 'error';

function FormStatus({ status }: { status: Status }) {
  return (
    <AnimatePresence mode="wait">
      {status === 'submitting' && (
        <motion.div
          key="submitting"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="relative overflow-hidden rounded-2xl border border-sky-100 bg-sky-50 p-4"
        >
          <motion.div
            className="absolute left-0 top-1/2"
            animate={{ x: ['-10%', '110%'] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'linear',
            }}
          >
            <Plane size={16} className="text-sky-500" />
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'linear',
              }}
            >
              <Plane className="text-sky-600" size={20} />
            </motion.div>

            <div>
              <p className="font-medium text-sky-900">
                Sending your travel enquiry...
              </p>
              <p className="text-sm text-sky-700">
                Our travel experts are preparing your next adventure.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {status === 'done' && (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 250 }}
            >
              <CheckCircle2 className="text-emerald-600" size={24} />
            </motion.div>

            <div>
              <p className="font-semibold text-emerald-900">
                Enquiry Sent Successfully!
              </p>
              <p className="text-sm text-emerald-700">
                Your journey starts here. Our team will contact you shortly.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          key="error"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-2xl border border-red-100 bg-red-50 p-4"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600" size={22} />

            <div>
              <p className="font-medium text-red-900">
                Couldn't send your enquiry
              </p>
              <p className="text-sm text-red-700">
                Please try again or contact us via WhatsApp.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ContactSection() {
  const t = useTranslations('contact');
  const tSections = useTranslations('sections');

  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status === 'done' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [status]);

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
      className="mx-auto max-w-7xl px-6 py-24 md:px-12"
    >
      <div className="mb-12 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-display text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-himalaya-800 via-saffron-600 to-himalaya-800 bg-clip-text md:text-5xl"
        >
          {tSections('contact')}
        </motion.h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Tell us where you want to go and we'll craft the perfect journey
          tailored just for you.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5"
        >
          <input
            name="name"
            required
            placeholder={t('name')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
          />

          <input
            name="phone"
            required
            placeholder={t('phone')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
          />

          <input
            name="email"
            type="email"
            placeholder={t('email')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
          />

          <input
            name="destination"
            placeholder={t('destination')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
          />

          <textarea
            name="message"
            rows={5}
            placeholder={t('message')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
          />

          <motion.button
            whileHover={{
              scale: status === 'submitting' ? 1 : 1.02,
            }}
            whileTap={{
              scale: status === 'submitting' ? 1 : 0.98,
            }}
            disabled={status === 'submitting'}
            type="submit"
            className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 py-4 font-semibold text-white shadow-lg disabled:cursor-not-allowed"
          >
            {status === 'submitting' && (
              <motion.div
                className="absolute left-0"
                animate={{
                  x: ['-10%', '700%'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'linear',
                }}
              >
                <Plane size={18} />
              </motion.div>
            )}

            {status === 'submitting' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: 'linear',
                  }}
                >
                  <Plane size={18} />
                </motion.div>
                Sending Enquiry...
              </>
            ) : status === 'done' ? (
              <>
                <CheckCircle2 size={18} />
                Journey Requested
              </>
            ) : (
              <>
                <Plane size={18} />
                Start My Journey
              </>
            )}
          </motion.button>

          <FormStatus status={status} />
        </motion.form>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hi Hindustan Yathra, I would like to plan a trip.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 rounded-3xl bg-green-500 py-5 font-semibold text-white shadow-lg transition-all hover:bg-green-600"
          >
            <MessageCircle size={22} />
            Chat on WhatsApp
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
        </motion.div>
      </div>
    </section>
  );
}