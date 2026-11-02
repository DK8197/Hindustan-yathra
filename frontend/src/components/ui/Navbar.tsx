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
  ChevronDown,
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
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeId | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const badgeContainerRef = useRef<HTMLDivElement>(null);
  const policiesRef = useRef<HTMLDivElement>(null);

  const setUser = useAppStore((s) => s.setUser);

  const links = [
    { href: '/', label: t('home') },
    { href: '/destinations', label: t('destinations') },
    { href: '/gallery', label: t('gallery') },
    { href: '/contact', label: t('contact') },
    { href: '/about', label: t('about') },
  ] as const;

  const policyLinks = [
    { href: '/group-tour-terms', label: t('group_tour_terms') },
    { href: '/cancellation-policy', label: t('cancellation_policy') },
    { href: '/privacy-policy', label: t('privacy_policy') },
  ] as const;
  const policyActive = policyLinks.some((link) => link.href === pathname);

  // Close the desktop policies menu on outside click or Escape.
  useEffect(() => {
    if (!policiesOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Element;
      // The mobile drawer manages its own policies accordion; closing it on
      // mousedown would unmount the links before their click fires.
      if (target.closest?.('#mobile-primary-navigation')) return;
      if (!policiesRef.current?.contains(target)) {
        setPoliciesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPoliciesOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [policiesOpen]);

  // Replace these placeholders with your official social media URLs.
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/hindustanyatrahbl',
      icon: Facebook,
      hoverClass: 'hover:text-blue-600',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@hindustanyatrahubli9865',
      icon: Youtube,
      hoverClass: 'hover:text-red-600',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/hindustanyatrahbl/',
      icon: Instagram,
      hoverClass: 'hover:text-pink-600',
    },
  ] as const;

  const trustBadges: TrustBadge[] = [
    {
      id: 'since',
      label: 'Since 2018',
      sublabel: '7+ Yrs Proven Trust',
      certNumber: 'Certified by 1000s of happy travellers',
      description:
        'Serving travelers with reliable tour and travel experiences since 2018. rated 4.9+ on Google Reviews.',
    },
    {
      id: 'tourism',
      label: 'Dept. of Karnataka Tourism',
      sublabel: 'Karnataka Govt. Recognised',
      image: '/images/karnataka-state-tourism-logo.png',
      certNumber: 'DOT25/03/0000141',
      description:
        'Recognised by the Department of Tourism, Government of Karnataka.',
    },
    {
      id: 'iso',
      label: 'ISO 9001:2015',
      sublabel: 'ISO Certified Agency',
      image: '/images/iso-certified-company.png',
      certNumber: '09114565A',
      description:
        'ISO certified company maintaining global quality and hospitality standards.',
    },
    {
      id: 'irctc',
      label: 'IRCTC Authorised Agent',
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
      const target = event.target as Element;
      if (target.closest?.('#mobile-primary-navigation')) return;
      if (
        badgeContainerRef.current &&
        !badgeContainerRef.current.contains(target)
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
    setPoliciesOpen(false);
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
                ? `flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-sm font-medium text-slate-600 transition-[color,background-color,transform] duration-150 ease-out hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 active:scale-[0.97] sm:gap-2 sm:py-3 sm:text-base ${hoverClass}`
                : `flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-[color,background-color,transform] duration-150 ease-out hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 active:scale-[0.94] ${hoverClass}`
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-gradient-to-b from-sky-100/95 to-sky-300/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_32px_-16px_rgba(2,132,199,0.45)] backdrop-blur-xl backdrop-saturate-150">
      {/* MAIN NAVBAR */}
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 md:h-20 xl:px-10">
        {/* LEFT: LOGO AND DESKTOP ACCREDITATIONS */}
        <div className="flex min-w-0 shrink-0 items-center gap-3 xl:gap-5">
          <Link
            href="/"
            onClick={closeMobileMenu}
            aria-label="Hindustan Yathra home"
            className="logo-3d flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Image
              src="/images/hindustan-yathra-logo.png"
              alt="Hindustan Yathra — travel with new experience"
              width={220}
              height={80}
              priority
              className="h-12 w-auto object-contain sm:h-10 md:h-12 lg:h-16"
            />
          </Link>

          {/* DESKTOP ACCREDITATION CAPSULE */}
          <div
            ref={badgeContainerRef}
            aria-label="Tourism, ISO, and IRCTC certifications"
            className="hidden shrink-0 items-center gap-3 xl:flex"
          >
            <button
              type="button"
              onClick={() =>
                setSelectedBadge(selectedBadge === 'since' ? null : 'since')
              }
              aria-expanded={selectedBadge === 'since'}
              className={`flex min-h-11 items-center gap-1.5 py-1 text-base font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                selectedBadge === 'since'
                  ? 'text-saffron-700'
                  : 'text-slate-600 hover:text-sky-900'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
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
                  className={`logo-3d rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                    selectedBadge === badge.id
                      ? 'opacity-100 ring-2 ring-saffron-400'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={badge.image!}
                    alt={badge.label}
                    width={64}
                    height={64}
                    className={`w-auto object-contain ${
                      badge.id === 'tourism' ? 'h-20' : 'h-8'
                    }`}
                  />
                </button>
              ))}
          </div>
        </div>

        {/* CENTER: DESKTOP NAVIGATION */}
        <nav
          aria-label={t('primary_navigation')}
          className="hidden items-center gap-3 lg:flex"
        >
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-link px-2 py-2 text-base font-medium tracking-wide transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                  isActive
                    ? 'text-sky-900'
                    : 'text-slate-600 hover:text-sky-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div ref={policiesRef} className="relative">
            <button
              type="button"
              onClick={() => setPoliciesOpen((previous) => !previous)}
              aria-expanded={policiesOpen}
              aria-haspopup="true"
              aria-controls="desktop-policies-menu"
              className={`nav-link flex items-center gap-1 px-2 py-2 text-base font-medium tracking-wide transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                policyActive ? 'text-sky-900' : 'text-slate-600 hover:text-sky-900'
              }`}
            >
              {t('policies')}
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-200 ${policiesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {policiesOpen && (
              <ul
                id="desktop-policies-menu"
                className="popover-in absolute right-0 top-full z-50 mt-2 w-60 origin-top-right overflow-hidden rounded-2xl border border-white/70 bg-white/90 py-1 shadow-[0_20px_40px_-16px_rgba(14,116,144,0.35)] backdrop-blur-xl"
              >
                {policyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setPoliciesOpen(false)}
                      aria-current={pathname === link.href ? 'page' : undefined}
                      className={`block px-4 py-3 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-saffron-400 ${
                        pathname === link.href
                          ? 'bg-sky-50 text-sky-900'
                          : 'text-slate-700 hover:bg-sky-50 hover:text-sky-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {/* RIGHT: SOCIAL LINKS, LANGUAGE AND MOBILE MENU */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {renderSocialLinks()}

          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition-[color,background-color,transform] duration-150 ease-out hover:bg-white/70 hover:text-sky-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 active:scale-[0.94] lg:hidden"
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
        <div className="popover-in absolute left-4 top-full z-[60] mt-2 hidden w-80 origin-top-left rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_20px_40px_-16px_rgba(14,116,144,0.35)] backdrop-blur-xl xl:left-56 xl:block">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span className="text-base font-bold text-amber-700">
                {activeBadgeData.label}
              </span>
            </div>

            <span className="text-base text-slate-600">
              {activeBadgeData.certNumber}
            </span>
          </div>

          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {activeBadgeData.description}
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-base font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified Accreditation
            </span>

            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="rounded px-2 py-0.5 text-slate-500 transition-colors duration-150 ease-out hover:bg-sky-100 hover:text-sky-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
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
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-white/60 bg-sky-50/95 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200 ease-out lg:hidden"
        >
          <div className="space-y-3 px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:space-y-5 sm:py-6">
            {/* 1. INTERACTIVE ACCREDITATIONS */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 sm:text-base">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Official Accreditations
                </span>

                <span className="text-xs text-slate-600 sm:text-base">
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
                      className={`flex min-w-0 flex-col items-start gap-1.5 rounded-xl p-2 text-left transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] sm:gap-2 sm:p-2.5 ${
                        isSelected
                          ? 'bg-white text-sky-900 shadow-sm'
                          : 'bg-white/50 text-slate-700 hover:bg-white/80'
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
                          <Calendar className="h-4 w-4 text-amber-600" />
                        )}

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected
                              ? 'bg-amber-500'
                              : 'bg-slate-400'
                          }`}
                        />
                      </div>

                      <span className="w-full truncate text-xs font-semibold text-slate-900 sm:text-base">
                        {badge.label}
                      </span>

                      <span className="text-[0.7rem] text-slate-600 sm:text-base">
                        {badge.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* MOBILE ACCREDITATION DETAILS */}
              {activeBadgeData && (
                <div className="animate-in fade-in zoom-in-95 rounded-xl bg-white p-3 shadow-sm duration-200 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 sm:text-base">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                      <span>{activeBadgeData.label}</span>
                    </div>

                    <span className="text-xs text-slate-600 sm:text-base">
                      {activeBadgeData.certNumber}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">
                    {activeBadgeData.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs sm:mt-4 sm:text-base">
                    <span className="flex items-center gap-1 font-medium text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" />
                      Accreditation Details
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedBadge(null)}
                      className="rounded px-2 py-1 text-slate-500 hover:bg-sky-100 hover:text-sky-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
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
              className="space-y-0.5 pt-2 sm:space-y-1 sm:pt-4"
            >
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-11 items-center justify-between rounded-xl px-3 py-2 text-sm font-medium tracking-wide transition-[color,background-color,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 active:scale-[0.98] sm:py-3 sm:text-base ${
                      isActive
                        ? 'bg-white text-sky-900 shadow-sm'
                        : 'text-slate-700 hover:bg-white/70 hover:text-sky-900'
                    }`}
                  >
                    <span>{link.label}</span>

                    <ChevronRight
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform duration-150 ease-out ${
                        isActive
                          ? 'translate-x-0.5 text-sky-700'
                          : 'text-slate-400'
                      }`}
                    />
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => setPoliciesOpen((previous) => !previous)}
                aria-expanded={policiesOpen}
                aria-controls="mobile-policies-menu"
                className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium tracking-wide transition-[color,background-color,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 active:scale-[0.98] sm:py-3 sm:text-base ${
                  policyActive ? 'text-sky-900' : 'text-slate-700 hover:bg-white/70 hover:text-sky-900'
                }`}
              >
                <span>{t('policies')}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-200 ${policiesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {policiesOpen && (
                <div id="mobile-policies-menu" className="motion-fade-in ml-3 border-l border-sky-200">
                  {policyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      aria-current={pathname === link.href ? 'page' : undefined}
                      className={`flex min-h-11 items-center px-4 py-2 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                        pathname === link.href
                          ? 'text-sky-900'
                          : 'text-slate-600 hover:bg-white/70 hover:text-sky-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </nav>

            {/* 3. MOBILE LANGUAGE SWITCHER */}
            <div className="flex items-center justify-between gap-4 py-1 sm:py-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800 sm:text-base">
                <Globe className="h-4 w-4 text-sky-700" />
                <span>Language / ಭಾಷೆ</span>
              </div>

              <div>
                <LanguageSwitcher />
              </div>
            </div>

            {/* 4. SOCIAL MEDIA LINKS */}
            <section className="pt-2 sm:pt-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-amber-700 sm:mb-3 sm:text-base">
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
