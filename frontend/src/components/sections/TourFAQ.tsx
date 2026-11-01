'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/types/tour';

export function TourFAQ({ faqs = [] }: { faqs?: FAQItem[] }) {
  const t = useTranslations('tour');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const answerContentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    answerRefs.current.forEach((answer, index) => {
      if (!answer) return;
      answer.style.height = openIndex === index
        ? `${answer.scrollHeight}px`
        : '0px';
    });
  }, [faqs, openIndex]);

  useEffect(() => {
    if (openIndex === null || typeof ResizeObserver === 'undefined') return;

    const answer = answerRefs.current[openIndex];
    const content = answerContentRefs.current[openIndex];
    if (!answer || !content) return;

    const observer = new ResizeObserver(() => {
      answer.style.height = `${content.scrollHeight}px`;
    });
    observer.observe(content);

    return () => observer.disconnect();
  }, [faqs, openIndex]);

  if (!faqs.length) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-himalaya-900">{t('faq')}</h2>
      <div className="mt-6 divide-y rounded-2xl border">
        {faqs.map((faq, i) => {
          const answerId = `tour-faq-answer-${i}`;
          return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={openIndex === i}
              aria-controls={answerId}
            >
              <span className="font-medium text-himalaya-900">{faq.question}</span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                className={`shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              ref={(element) => {
                answerRefs.current[i] = element;
              }}
              id={answerId}
              aria-hidden={openIndex !== i}
              data-open={openIndex === i}
              className="faq-answer"
            >
              <div
                ref={(element) => {
                  answerContentRefs.current[i] = element;
                }}
                className="px-5 pb-4 text-sm leading-relaxed text-gray-600"
              >
                {faq.answer}
              </div>
            </div>
          </div>
        )})}
      </div>
    </section>
  );
}
