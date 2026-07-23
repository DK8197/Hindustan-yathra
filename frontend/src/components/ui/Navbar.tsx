'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, User } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAppStore } from '@/store/useAppStore';

export function Navbar() {
  const t = useTranslations('nav');

  const [open, setOpen] =
    useState(false);

  const user = useAppStore(
    (s) => s.user
  );

  const setUser =
    useAppStore(
      (s) => s.setUser
    );

  const links = [
    {
      href: '/',
      label: t('home'),
    },
    {
      href: '/destinations',
      label: t('destinations'),
    },
    {
      href: '/gallery',
      label: t('gallery'),
    },
    {
      href: '/contact',
      label: t('contact'),
    },
  ] as const;

  useEffect(() => {
    const syncSession =
      async () => {
        try {
          const res =
            await fetch(
              '/api/auth/me',
              {
                credentials:
                  'same-origin',
              }
            );

          const data =
            await res.json();

          if (data.user) {
            setUser(
              data.user
            );
          }
        } catch {
          // ignore
        }
      };

    void syncSession();
  }, [setUser]);

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-50
        border-b
        border-white/10
        bg-slate-950/95
        shadow-lg
        backdrop-blur-md
      "
    >
        <div
          className="
            mx-auto
            flex
            h-25
            max-w-[1800px]
            items-center
            justify-between
            px-5
            lg:px-10
          "
        >
 {/* LEFT */}
<div className="flex items-center gap-5">
  <Link
    href="/"
    className="shrink-0"
  >
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-amber-400/20
        bg-slate-900/80
        px-4
        py-2
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-amber-400/50
      "
    >
      <Image
        src="/images/hindustan-yathra-logo.png"
        alt="Hindustan Yatra"
        width={220}
        height={80}
        priority
        className="text-2xl font-serif font-bold text-white tracking-normal leading-tight
        "
      />

        <div className="hidden xl:block">
          <h1
            className="
              text-xl
              font-extrabold
              text-white
              tracking-tight
              leading-none
            "
          >
            Hindustan Yatra
          </h1>
            <p
              className="
                mt-1
                text-sm
                italic
                font-semibold
                tracking-wide
                text-emerald-300
                drop-shadow-[0_0_8px_rgba(110,231,183,0.35)]
              "
              style={{
                fontFamily:
                  "'Playfair Display', 'Cormorant Garamond', serif",
              }}
            >
              Travel with new experience
            </p>

          <div
            className="
              mt-2
              h-px
              w-32
              bg-gradient-to-r
              from-amber-400
              via-amber-300
              to-transparent
            "
          />

          <p
            className="
              mt-2
              text-[10px]
              uppercase
              tracking-[0.55em]
              text-amber-300
              font-semibold
            "
          >
            Explore • Discover • Experience
          </p>
        </div>
    </div>
  </Link>

  {/* CERTIFICATIONS */}
  <div
    className="
      hidden
      lg:flex
      items-center
      gap-4
      rounded-full
      border
      border-white/10
      bg-white/[0.04]
      px-4
      py-2
      backdrop-blur-md
    "
  >
    {/* Karnataka Tourism */}
    <div className="group relative">
      <Image
        src="/images/karnataka-state-tourism-logo.png"
        alt="Karnataka Tourism"
        width={64}
        height={64}
        className="
          h-10
          w-auto
          cursor-pointer
          opacity-80
          transition-all
          duration-300
          group-hover:scale-125
          group-hover:opacity-100
          group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-full
          mt-2
          -translate-x-1/2
          whitespace-nowrap
          rounded-lg
          border
          border-white/10
          bg-slate-900
          px-3
          py-1.5
          text-xs
          text-white
          opacity-0
          shadow-xl
          transition-all
          duration-300
          group-hover:opacity-100
        "
      >
        Recognised by dept. of Karnataka Tourism
      </div>
    </div>

    {/* ISO */}
    <div className="group relative">
      <Image
        src="/images/iso-certified-company.png"
        alt="ISO Certified"
        width={64}
        height={64}
        className="
          h-10
          w-auto
          cursor-pointer
          opacity-80
          transition-all
          duration-300
          group-hover:scale-125
          group-hover:opacity-100
          group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-full
          mt-2
          -translate-x-1/2
          whitespace-nowrap
          rounded-lg
          border
          border-white/10
          bg-slate-900
          px-3
          py-1.5
          text-xs
          text-white
          opacity-0
          shadow-xl
          transition-all
          duration-300
          group-hover:opacity-100
        "
      >
        ISO Certified
      </div>
    </div>

    {/* IRCTC */}
    <div className="group relative">
      <Image
        src="/images/irctc-logo.png"
        alt="IRCTC"
        width={64}
        height={64}
        className="
          h-10
          w-auto
          cursor-pointer
          opacity-80
          transition-all
          duration-300
          group-hover:scale-125
          group-hover:opacity-100
          group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-full
          mt-2
          -translate-x-1/2
          whitespace-nowrap
          rounded-lg
          border
          border-white/10
          bg-slate-900
          px-3
          py-1.5
          text-xs
          text-white
          opacity-0
          shadow-xl
          transition-all
          duration-300
          group-hover:opacity-100
        "
      >
        IRCTC Partner
      </div>
    </div>
  </div>
</div>

        {/* DESKTOP NAV */}
        <nav
          className="
            hidden
            md:flex
            items-center
            gap-6
          "
        >
          {links.map(
            (link) => (
              <Link
                key={
                  link.href
                }
                href={
                  link.href
                }
                className="
                  relative
                  text-sm
                  font-medium
                  text-slate-200
                  transition-all
                  duration-300
                  hover:text-amber-300
                  after:absolute
                  after:-bottom-1
                  after:left-0
                  after:h-[2px]
                  after:w-0
                  after:bg-amber-400
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {
                  link.label
                }
              </Link>
            )
          )}
        </nav>

        {/* RIGHT */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-3
          "
        >
          <LanguageSwitcher />

          <Link
            href={
              user
                ? '/dashboard'
                : '/login'
            }
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-amber-400
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-900
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <User
              size={15}
            />

            {user
              ? t(
                  'dashboard'
                )
              : t(
                  'login'
                )}
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="
            rounded-lg
            border
            border-white/10
            bg-white/5
            p-2
            text-white
            md:hidden
          "
          onClick={() =>
            setOpen(
              !open
            )
          }
          aria-label="Toggle menu"
        >
          {open ? (
            <X
              size={22}
            />
          ) : (
            <Menu
              size={22}
            />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            border-t
            border-white/10
            bg-slate-950
            md:hidden
          "
        >
          <div className="px-5 py-5">
            <div className="flex flex-col gap-5">
              {links.map(
                (
                  link
                ) => (
                  <Link
                    key={
                      link.href
                    }
                    href={
                      link.href
                    }
                    onClick={() =>
                      setOpen(
                        false
                      )
                    }
                    className="
                      text-base
                      font-medium
                      text-white
                      transition
                      hover:text-amber-300
                    "
                  >
                    {
                      link.label
                    }
                  </Link>
                )
              )}
            </div>

            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                border-t
                border-white/10
                pt-5
              "
            >
              <LanguageSwitcher />

              <Link
                href={
                  user
                    ? '/dashboard'
                    : '/login'
                }
                onClick={() =>
                  setOpen(
                    false
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-amber-400
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-slate-900
                "
              >
                <User
                  size={
                    15
                  }
                />

                {user
                  ? t(
                      'dashboard'
                    )
                  : t(
                      'login'
                    )}
              </Link>
            </div>

            <div
              className="
                mt-5
                flex
                items-center
                justify-center
                gap-4
                border-t
                border-white/10
                pt-5
              "
            >
              <Image
                src="/images/karnataka-state-tourism-logo.png"
                alt="Karnataka Tourism"
                width={40}
                height={40}
                className="h-6 w-auto opacity-80"
              />

              <Image
                src="/images/iso-certified-company.png"
                alt="ISO Certified"
                width={40}
                height={40}
                className="h-6 w-auto opacity-80"
              />

              <Image
                src="/images/irctc-logo.png"
                alt="IRCTC"
                width={40}
                height={40}
                className="h-6 w-auto opacity-80"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}