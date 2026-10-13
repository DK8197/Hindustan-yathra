'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  Calendar,
  Globe,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAppStore } from '@/store/useAppStore';

type BadgeId = 'since' | 'tourism' | 'iso' | 'irctc';

interface TrustBadge {
  id: BadgeId;
  label: string;
  sublabel: string;
  image?: string;
  certNumber: string;
  description: string;
}

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeId | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const badgeContainerRef = useRef<HTMLDivElement>(null);

  const setUser = useAppStore((s) => s.setUser);

  const links = [
    { href: '/', label: t('home') },
    { href: '/destinations', label: t('destinations') },
    { href: '/gallery', label: t('gallery') },
    { href: '/contact', label: t('contact') },
    { href: '/about', label: t('about') },
  ] as const;

  const trustBadges: TrustBadge[] = [
    {
      id: 'since',
      label: 'Since 2018',
      sublabel: '7+ Yrs Proven Trust',
      certNumber: 'HY-ESTD-2018',
      description: 'Serving travelers with reliable tour and travel experiences since 2018.',
    },
    {
      id: 'tourism',
      label: 'Dept. of Tourism',
      sublabel: 'Govt. Recognised',
      image: '/images/karnataka-state-tourism-logo.png',
      certNumber: 'KST-AUTH-8982',
      description: 'Recognised by the Department of Tourism, Government of Karnataka.',
    },
    {
      id: 'iso',
      label: 'ISO 9001:2015',
      sublabel: 'Certified Agency',
      image: '/images/iso-certified-company.png',
      certNumber: 'ISO-QMS-2024',
      description: 'ISO certified company maintaining global quality and hospitality standards.',
    },
    {
      id: 'irctc',
      label: 'IRCTC Authorised',
      sublabel: 'Official Partner',
      image: '/images/irctc-logo.png',
      certNumber: 'IRCTC-AGT-6119',
      description: 'Authorised agency for confirmed railway packages and travel services.',
    },
  ];

  // Close verification dropdown when clicking outside (desktop)
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (badgeContainerRef.current && !badgeContainerRef.current.contains(e.target as Node)) {
        setSelectedBadge(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    const syncSession = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'same-origin',
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch {
        // ignore
      }
    };
    void syncSession();
  }, [setUser]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  // Lock body scroll on mobile when menu opens
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const activeBadgeData = trustBadges.find((b) => b.id === selectedBadge);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/90 shadow-[0_8px_32px_rgba(2,6,23,0.6)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 sm:h-18 md:h-20 max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 xl:px-10">
        
        {/* LEFT: LOGO & DESKTOP BADGES */}
        <div className="flex min-w-0 shrink-0 items-center gap-3 xl:gap-5">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-transform hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Image
              src="/images/hindustan-yathra-logo.png"
              alt="Hindustan Yatra — travel with new experience"
              width={220}
              height={80}
              priority
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP ACCREDITATION CAPSULE */}
          <div
            ref={badgeContainerRef}
            aria-label="Tourism, ISO, and IRCTC certifications"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 shadow-inner backdrop-blur-md xl:flex"
          >
            <button
              type="button"
              onClick={() => setSelectedBadge(selectedBadge === 'since' ? null : 'since')}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 focus-visible:outline-none ${
                selectedBadge === 'since'
                  ? 'border border-amber-400/80 bg-amber-400/20 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'border border-transparent text-slate-300 hover:text-white'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span>Since 2018</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedBadge(selectedBadge === 'tourism' ? null : 'tourism')}
              title="Recognised by the Department of Tourism, Government of Karnataka"
              className={`rounded-full p-1 transition-all duration-200 focus-visible:outline-none ${
                selectedBadge === 'tourism'
                  ? 'border border-amber-400/80 bg-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'border border-transparent hover:opacity-100 opacity-80'
              }`}
            >
              <Image
                src="/images/karnataka-state-tourism-logo.png"
                alt="Recognised by the Department of Tourism, Government of Karnataka"
                width={64}
                height={64}
                className="h-6 w-auto object-contain"
              />
            </button>

            <button
              type="button"
              onClick={() => setSelectedBadge(selectedBadge === 'iso' ? null : 'iso')}
              title="ISO certified"
              className={`rounded-full p-1 transition-all duration-200 focus-visible:outline-none ${
                selectedBadge === 'iso'
                  ? 'border border-amber-400/80 bg-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'border border-transparent hover:opacity-100 opacity-80'
              }`}
            >
              <Image
                src="/images/iso-certified-company.png"
                alt="ISO certified"
                width={64}
                height={64}
                className="h-6 w-auto object-contain"
              />
            </button>

            <button
              type="button"
              onClick={() => setSelectedBadge(selectedBadge === 'irctc' ? null : 'irctc')}
              title="IRCTC certified"
              className={`rounded-full p-1 transition-all duration-200 focus-visible:outline-none ${
                selectedBadge === 'irctc'
                  ? 'border border-amber-400/80 bg-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'border border-transparent hover:opacity-100 opacity-80'
              }`}
            >
              <Image
                src="/images/irctc-logo.png"
                alt="IRCTC certified"
                width={64}
                height={64}
                className="h-6 w-auto object-contain"
              />
            </button>
          </div>
        </div>

        {/* CENTER: DESKTOP NAV */}
        <nav
          className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-md lg:flex"
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none ${
                  isActive
                    ? 'border border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.25)]'
                    : 'border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: DESKTOP LANGUAGE + MOBILE MENU BUTTON */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block rounded-xl border border-white/10 bg-black/35 p-1 backdrop-blur-md">
            <LanguageSwitcher />
          </div>

          {/* Premium Mobile Menu Toggle */}
          <button
            ref={menuButtonRef}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-slate-200 shadow-md backdrop-blur-xl transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-primary-navigation"
            aria-label={open ? t('close_menu') : t('open_menu')}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* DESKTOP VERIFICATION POPOVER */}
      {activeBadgeData && (
        <div className="hidden xl:block absolute left-4 sm:left-6 xl:left-56 top-full z-[60] mt-2 w-80 animate-in fade-in slide-in-from-top-2 duration-200 rounded-2xl border border-amber-400/40 bg-[#060c18]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300">
                {activeBadgeData.label}
              </span>
            </div>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-300">
              {activeBadgeData.certNumber}
            </span>
          </div>

          <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
            {activeBadgeData.description}
          </p>

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px]">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified Accreditation
            </span>
            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="rounded px-2 py-0.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ================= PREMIUM MOBILE GLASS DRAWER ================= */}
      {open && (
        <div
          id="mobile-primary-navigation"
          aria-label={t('primary_navigation')}
          role="navigation"
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-[#060c18]/95 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-in slide-in-from-top-4 duration-300 lg:hidden"
        >
          <div className="space-y-5 px-4 py-6">
            
            {/* 1. INTERACTIVE TRUST BADGES 2x2 GRID */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Official Accreditations
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Tap to verify</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {trustBadges.map((badge) => {
                  const isSelected = selectedBadge === badge.id;
                  return (
                    <button
                      key={badge.id}
                      type="button"
                      onClick={() => setSelectedBadge(isSelected ? null : badge.id)}
                      className={`flex flex-col items-start gap-1 rounded-xl border p-2.5 text-left transition-all duration-200 active:scale-98 ${
                        isSelected
                          ? 'border-amber-400/70 bg-gradient-to-br from-amber-400/20 to-black/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        {badge.image ? (
                          <Image
                            src={badge.image}
                            alt={badge.label}
                            width={22}
                            height={22}
                            className="h-4.5 w-auto object-contain"
                          />
                        ) : (
                          <Calendar className="h-4 w-4 text-amber-400" />
                        )}
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected ? 'bg-amber-400 shadow-[0_0_6px_#fbbf24]' : 'bg-slate-500'
                          }`}
                        />
                      </div>
                      <span className="mt-1 text-xs font-semibold text-white truncate w-full">
                        {badge.label}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-tight">
                        {badge.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* IN-DRAWER DYNAMIC ACCREDITATION CARD */}
              {activeBadgeData && (
                <div className="rounded-xl border border-amber-400/40 bg-gradient-to-b from-[#091426]/90 to-black/80 p-3.5 shadow-lg backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>{activeBadgeData.label}</span>
                    </div>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-slate-300">
                      {activeBadgeData.certNumber}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {activeBadgeData.description}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/10 text-[10px]">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="h-3 w-3" />
                      Authentic Certification
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedBadge(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. NAVIGATION LINKS */}
            <div className="space-y-1 border-t border-white/10 pt-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition-all ${
                      isActive
                        ? 'border border-amber-400/40 bg-gradient-to-r from-amber-400/15 to-transparent text-amber-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                        : 'text-slate-200 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        isActive ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* 3. MOBILE FOOTER: LANGUAGE TOGGLE */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 pt-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Globe className="h-4 w-4 text-amber-400" />
                <span>Language / ಭಾಷೆ</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/40 p-0.5">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}