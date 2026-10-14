'use client';

import { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  // Replace with your company's actual phone number (country code + number, no + or -)
  const phoneNumber = '919060085635';
  const defaultMessage = encodeURIComponent(
    'Hello Hindustan Yatra! I would like to inquire about your tour packages.'
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <aside
      aria-label="Quick contact"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none"
    >
      {/* Expanded Quick Options Menu */}
      {open && (
        <div className="flex flex-col items-end gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Direct Phone Call Option */}
          <a
            href={callUrl}
            className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#060c18]/90 px-4 py-2.5 text-xs font-semibold text-slate-100 shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-200 hover:border-amber-400/50 hover:bg-[#060c18] hover:text-amber-300"
          >
            <span>Call Us Now</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-slate-950">
              <Phone className="h-3.5 w-3.5" />
            </span>
          </a>

          {/* WhatsApp Direct Option */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-950/80 px-4 py-2.5 text-xs font-semibold text-emerald-100 shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-900/90"
          >
            <span>Chat on WhatsApp</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
              <MessageCircle className="h-4 w-4" />
            </span>
          </a>
        </div>
      )}

      {/* Main Trigger Floating Button */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close quick contact' : 'Open quick contact options'}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 active:scale-95 ${
            open
              ? 'border border-white/20 bg-[#060c18] text-white'
              : 'border border-emerald-400/40 bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]'
          }`}
        >
          {/* Animated pulse beacon when closed */}
          {!open && (
            <span className="absolute -inset-1 -z-10 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
          )}

          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-7 w-7" />
          )}
        </button>
      </div>
    </aside>
  );
}