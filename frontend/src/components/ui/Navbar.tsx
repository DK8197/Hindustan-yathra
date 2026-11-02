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
      if (!policiesRef.current?.contains(event.target as Node)) {
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
                ? `flex min-h-11 items-center justify-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 sm:gap-2 sm:py-3 sm:text-base ${hoverClass}`
                : `flex h-10 w-10 items-center justify-center text-slate-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${hoverClass}`
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#07111f]/85 shadow-[0_8px_32px_-18px_rgba(0,0,0,0.8)] backdrop-blur-xl">
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
              className="h-9 w-auto object-contain sm:h-10 md:h-12"
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
              className={`flex min-h-11 items-center gap-1.5 py-1 text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                selectedBadge === 'since'
                  ? 'text-saffron-400'
                  : 'text-slate-300 hover:text-white'
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
                  className={`p-1 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
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
                    className="h-6 w-auto object-contain"
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
                className={`px-2 py-2 text-base font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                  isActive
                    ? 'text-saffron-400'
                    : 'text-slate-300 hover:text-white'
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
              className={`flex items-center gap-1 px-2 py-2 text-base font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                policyActive ? 'text-saffron-400' : 'text-slate-300 hover:text-white'
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
                className="motion-fade-in absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-himalaya-900/95 py-1 shadow-xl backdrop-blur-xl"
              >
                {policyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setPoliciesOpen(false)}
                      aria-current={pathname === link.href ? 'page' : undefined}
                      className={`block px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-saffron-400 ${
                        pathname === link.href
                          ? 'text-saffron-400'
                          : 'text-slate-200 hover:bg-white/[0.06] hover:text-white'
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
            className="flex h-11 w-11 items-center justify-center text-slate-200 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 active:scale-95 lg:hidden"
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
        <div className="absolute left-4 top-full z-[60] mt-2 hidden w-80 bg-[#060c18] p-5 xl:left-56 xl:block">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-base font-bold text-amber-300">
                {activeBadgeData.label}
              </span>
            </div>

            <span className="text-base text-slate-200">
              {activeBadgeData.certNumber}
            </span>
          </div>

          <p className="mt-3 text-base leading-relaxed text-white">
            {activeBadgeData.description}
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-base font-medium text-emerald-300">
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
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-[#060c18] animate-in slide-in-from-top-4 duration-300 lg:hidden"
        >
          <div className="space-y-3 px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:space-y-5 sm:py-6">
            {/* 1. INTERACTIVE ACCREDITATIONS */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 sm:text-base">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Official Accreditations
                </span>

                <span className="text-xs text-slate-300 sm:text-base">
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
                      className={`flex min-w-0 flex-col items-start gap-1.5 p-2 text-left transition-colors duration-200 active:scale-[0.98] sm:gap-2 sm:p-2.5 ${
                        isSelected
                          ? 'bg-white/10 text-white'
                          : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
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
                              ? 'bg-amber-400'
                              : 'bg-slate-500'
                          }`}
                        />
                      </div>

                      <span className="w-full truncate text-xs font-semibold text-white sm:text-base">
                        {badge.label}
                      </span>

                      <span className="text-[0.7rem] text-slate-300 sm:text-base">
                        {badge.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* MOBILE ACCREDITATION DETAILS */}
              {activeBadgeData && (
                <div className="animate-in fade-in zoom-in-95 bg-[#101b29] p-3 duration-200 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 sm:text-base">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>{activeBadgeData.label}</span>
                    </div>

                    <span className="text-xs text-slate-200 sm:text-base">
                      {activeBadgeData.certNumber}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-white sm:mt-3 sm:text-base">
                    {activeBadgeData.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs sm:mt-4 sm:text-base">
                    <span className="flex items-center gap-1 font-medium text-emerald-300">
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
                    className={`flex min-h-11 items-center justify-between px-3 py-2 text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 sm:py-3 sm:text-base ${
                      isActive
                        ? 'text-saffron-400'
                        : 'text-slate-200 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>

                    <ChevronRight
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform ${
                        isActive
                          ? 'translate-x-0.5 text-saffron-400'
                          : 'text-slate-600'
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
                className={`flex min-h-11 w-full items-center justify-between px-3 py-2 text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 sm:py-3 sm:text-base ${
                  policyActive ? 'text-saffron-400' : 'text-slate-200 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span>{t('policies')}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-200 ${policiesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {policiesOpen && (
                <div id="mobile-policies-menu" className="motion-fade-in ml-3 border-l border-white/10">
                  {policyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      aria-current={pathname === link.href ? 'page' : undefined}
                      className={`flex min-h-11 items-center px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                        pathname === link.href
                          ? 'text-saffron-400'
                          : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
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
              <div className="flex items-center gap-2 text-sm font-medium text-white sm:text-base">
                <Globe className="h-4 w-4 text-saffron-400" />
                <span>Language / ಭಾಷೆ</span>
              </div>

              <div>
                <LanguageSwitcher />
              </div>
            </div>

            {/* 4. SOCIAL MEDIA LINKS */}
            <section className="pt-2 sm:pt-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-amber-300 sm:mb-3 sm:text-base">
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
