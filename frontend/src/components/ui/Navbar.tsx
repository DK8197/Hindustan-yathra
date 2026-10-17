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
  Facebook,
  Instagram,
  Youtube,
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

  // Replace these placeholders with your official social media URLs.
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/hindustanyatrahbl',
      icon: Facebook,
      hoverClass: 'hover:text-blue-400 hover:border-blue-400/40',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@hindustanyatrahubli9865',
      icon: Youtube,
      hoverClass: 'hover:text-red-400 hover:border-red-400/40',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/hindustanyatrahbl/',
      icon: Instagram,
      hoverClass: 'hover:text-pink-400 hover:border-pink-400/40',
    },
  ] as const;

  const trustBadges: TrustBadge[] = [
    {
      id: 'since',
      label: 'Since 2018',
      sublabel: '7+ Yrs Proven Trust',
      certNumber: 'HY-ESTD-2018',
      description:
        'Serving travelers with reliable tour and travel experiences since 2018.',
    },
    {
      id: 'tourism',
      label: 'Dept. of Tourism',
      sublabel: 'Govt. Recognised',
      image: '/images/karnataka-state-tourism-logo.png',
      certNumber: 'KST-AUTH-8982',
      description:
        'Recognised by the Department of Tourism, Government of Karnataka.',
    },
    {
      id: 'iso',
      label: 'ISO 9001:2015',
      sublabel: 'Certified Agency',
      image: '/images/iso-certified-company.png',
      certNumber: 'ISO-QMS-2024',
      description:
        'ISO certified company maintaining global quality and hospitality standards.',
    },
    {
      id: 'irctc',
      label: 'IRCTC Authorised',
      sublabel: 'Official Partner',
      image: '/images/irctc-logo.png',
      certNumber: 'IRCTC-AGT-6119',
      description:
        'Authorised agency for confirmed railway packages and travel services.',
    },
  ];

  const activeBadgeData = trustBadges.find(
    (badge) => badge.id === selectedBadge
  );

  // Close the accreditation popover when clicking outside.
  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        badgeContainerRef.current &&
        !badgeContainerRef.current.contains(event.target as Node)
      ) {
        setSelectedBadge(null);
      }
    };

    document.addEventListener('mousedown', handleOutside);

    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Synchronize the authenticated user.
  useEffect(() => {
    const syncSession = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'same-origin',
        });

        if (!response.ok) return;

        const data = await response.json();

        if (data.user) {
          setUser(data.user);
        }
      } catch {
        // Authentication sync is optional for the public navbar.
      }
    };

    void syncSession();
  }, [setUser]);

  // Close the mobile drawer when Escape is pressed.
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

  // Lock background scrolling while the mobile drawer is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMobileMenu = () => {
    setOpen(false);
  };

  const renderSocialLinks = (mobile = false) => (
    <div
      className={
        mobile
          ? 'grid grid-cols-3 gap-2'
          : 'hidden items-center gap-1 lg:flex'
      }
    >
      {socialLinks.map(({ name, href, icon: Icon, hoverClass }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit Hindustan Yathra on ${name} (opens in a new tab)`}
          title={name}
          className={
            mobile
              ? `flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3 text-xs font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${hoverClass}`
              : `flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${hoverClass}`
          }
        >
          <Icon
            className={mobile ? 'h-4 w-4 shrink-0' : 'h-[17px] w-[17px]'}
            aria-hidden="true"
          />
          {mobile && <span>{name}</span>}
        </a>
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/90 shadow-[0_8px_32px_rgba(2,6,23,0.6)] backdrop-blur-xl">
      {/* MAIN NAVBAR */}
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 md:h-20 xl:px-10">
        {/* LEFT: LOGO AND DESKTOP ACCREDITATIONS */}
        <div className="flex min-w-0 shrink-0 items-center gap-3 xl:gap-5">
          <Link
            href="/"
            onClick={closeMobileMenu}
            aria-label="Hindustan Yathra home"
            className="flex shrink-0 items-center transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Image
              src="/images/hindustan-yathra-logo.png"
              alt="Hindustan Yathra — travel with new experience"
              width={220}
              height={80}
              priority
              className="h-8 w-auto object-contain sm:h-10 md:h-12"
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
              onClick={() =>
                setSelectedBadge(selectedBadge === 'since' ? null : 'since')
              }
              aria-expanded={selectedBadge === 'since'}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                selectedBadge === 'since'
                  ? 'border-amber-400/80 bg-amber-400/20 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span>Since 2018</span>
            </button>

            {trustBadges
              .filter((badge) => badge.image)
              .map((badge) => (
                <button
                  key={badge.id}
                  type="button"
                  onClick={() =>
                    setSelectedBadge(
                      selectedBadge === badge.id ? null : badge.id
                    )
                  }
                  aria-label={badge.label}
                  aria-expanded={selectedBadge === badge.id}
                  title={badge.description}
                  className={`rounded-full border p-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    selectedBadge === badge.id
                      ? 'border-amber-400/80 bg-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={badge.image!}
                    alt={badge.label}
                    width={64}
                    height={64}
                    className="h-6 w-auto object-contain"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* CENTER: DESKTOP NAVIGATION */}
        <nav
          aria-label={t('primary_navigation')}
          className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-md lg:flex"
        >
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.25)]'
                    : 'border-transparent text-slate-300 hover:border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: SOCIAL LINKS, LANGUAGE AND MOBILE MENU */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {renderSocialLinks()}

          <div className="hidden rounded-xl border border-white/10 bg-black/35 p-1 backdrop-blur-md sm:block">
            <LanguageSwitcher />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-slate-200 shadow-md backdrop-blur-xl transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 lg:hidden"
            onClick={() => setOpen((previous) => !previous)}
            aria-expanded={open}
            aria-controls="mobile-primary-navigation"
            aria-label={open ? t('close_menu') : t('open_menu')}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* DESKTOP ACCREDITATION POPOVER */}
      {activeBadgeData && (
        <div className="absolute left-4 top-full z-[60] mt-2 hidden w-80 animate-in fade-in slide-in-from-top-2 duration-200 rounded-2xl border border-amber-400/40 bg-[#060c18]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-2xl xl:left-56 xl:block">
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
              className="rounded px-2 py-0.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* PREMIUM MOBILE NAVIGATION DRAWER */}
      {open && (
        <div
          id="mobile-primary-navigation"
          aria-label={t('primary_navigation')}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-white/10 bg-[#060c18]/95 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-in slide-in-from-top-4 duration-300 lg:hidden"
        >
          <div className="space-y-5 px-4 py-6">
            {/* 1. INTERACTIVE ACCREDITATIONS */}
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Official Accreditations
                </span>

                <span className="text-[10px] font-medium text-slate-400">
                  Tap to verify
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {trustBadges.map((badge) => {
                  const isSelected = selectedBadge === badge.id;

                  return (
                    <button
                      key={badge.id}
                      type="button"
                      onClick={() =>
                        setSelectedBadge(isSelected ? null : badge.id)
                      }
                      aria-expanded={isSelected}
                      className={`flex min-w-0 flex-col items-start gap-1 rounded-xl border p-2.5 text-left transition-all duration-200 active:scale-[0.98] ${
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
                            className="h-[18px] w-auto object-contain"
                          />
                        ) : (
                          <Calendar className="h-4 w-4 text-amber-400" />
                        )}

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected
                              ? 'bg-amber-400 shadow-[0_0_6px_#fbbf24]'
                              : 'bg-slate-500'
                          }`}
                        />
                      </div>

                      <span className="mt-1 w-full truncate text-xs font-semibold text-white">
                        {badge.label}
                      </span>

                      <span className="text-[9px] uppercase tracking-tight text-slate-400">
                        {badge.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* MOBILE ACCREDITATION DETAILS */}
              {activeBadgeData && (
                <div className="animate-in fade-in zoom-in-95 rounded-xl border border-amber-400/40 bg-gradient-to-b from-[#091426]/90 to-black/80 p-3.5 shadow-lg duration-200">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
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

                  <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-[10px]">
                    <span className="flex items-center gap-1 font-medium text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Accreditation Details
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedBadge(null)}
                      className="rounded px-2 py-1 text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* 2. MOBILE NAVIGATION LINKS */}
            <nav
              aria-label={t('primary_navigation')}
              className="space-y-1 border-t border-white/10 pt-4"
            >
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isActive
                        ? 'border border-amber-400/40 bg-gradient-to-r from-amber-400/15 to-transparent text-amber-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                        : 'text-slate-200 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>

                    <ChevronRight
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform ${
                        isActive
                          ? 'translate-x-0.5 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* 3. MOBILE LANGUAGE SWITCHER */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Globe className="h-4 w-4 text-amber-400" />
                <span>Language / ಭಾಷೆ</span>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/40 p-0.5">
                <LanguageSwitcher />
              </div>
            </div>

            {/* 4. SOCIAL MEDIA LINKS */}
            <section className="border-t border-white/10 pt-4">
              <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                Follow Our Journeys
              </p>

              {renderSocialLinks(true)}
            </section>
          </div>
        </div>
      )}
    </header>
  );
}
