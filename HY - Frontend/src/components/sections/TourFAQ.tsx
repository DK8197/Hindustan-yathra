'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/types/tour';

export function TourFAQ({ faqs }: { faqs: FAQItem[] }) {
  const t = useTranslations('tour');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs.length) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-himalaya-900">{t('faq')}</h2>
      <div className="mt-6 divide-y rounded-2xl border">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium text-himalaya-900">{faq.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === i && <p className="px-5 pb-4 text-sm text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
