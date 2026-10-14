'use client';

import { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  const phoneNumber = '919060085635';
  const defaultMessage = encodeURIComponent(
    'Hello Hindustan Yatra! I would like to inquire about your tour packages.'
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <aside
      aria-label="Quick contact"
      /* Lifted high on mobile (bottom-24), settled to bottom-10 on larger screens */
      className="fixed bottom-24 right-4 z-40 flex select-none flex-col items-end gap-3 sm:bottom-16 sm:right-6 lg:bottom-10 lg:right-8"
    >
      {/* Expanded Quick Options: Scaled for laptop */}
      {open && (
        <div className="flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Direct Phone Call Option */}
          <a
            href={callUrl}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-[#060c18]/95 px-4 py-2.5 text-xs font-semibold text-slate-100 shadow-[0_10px_28px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-200 hover:border-amber-400/50 hover:bg-[#060c18] hover:text-amber-300 lg:px-5 lg:py-3.5 lg:text-sm"
          >
            <span>Call Us Now</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-slate-950 lg:h-8 lg:w-8">
              <Phone className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
            </span>
          </a>

          {/* WhatsApp Direct Option */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full border border-emerald-500/40 bg-emerald-950/85 px-4 py-2.5 text-xs font-semibold text-emerald-100 shadow-[0_10px_28px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-900/90 lg:px-5 lg:py-3.5 lg:text-sm"
          >
            <span>Chat on WhatsApp</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md lg:h-8 lg:w-8">
              <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5" />
            </span>
          </a>
        </div>
      )}

      {/* Main Trigger Button: Scaled from 48px on mobile up to 64px on laptop (lg:h-16 lg:w-16) */}
      <div className="group relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close quick contact' : 'Open quick contact options'}
          className={`relative flex h-12 w-12 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 active:scale-95 sm:h-14 sm:w-14 lg:h-16 lg:w-16 ${
            open
              ? 'border border-white/20 bg-[#060c18] text-white shadow-xl'
              : 'border border-emerald-400/40 bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.55)]'
          }`}
        >
          {/* Beacon pulse ring when closed */}
          {!open && (
            <span className="pointer-events-none absolute -inset-1.5 -z-10 animate-ping rounded-full bg-emerald-500/35" />
          )}

          {open ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
          ) : (
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          )}
        </button>
      </div>
    </aside>
  );
}