'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAppStore } from '@/store/useAppStore';

export function Navbar() {
  const t = useTranslations('nav');

  const [open, setOpen] =
    useState(false);

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
    {
      href: '/about',
      label: t('about'),
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
        border-white/15
        bg-[#07111f]
        shadow-[0_8px_30px_rgba(2,6,23,0.45)]
      "
    >
        <div
          className="
              mx-auto
              flex
              h-16
              md:h-20
              max-w-[1600px]
              items-center
              justify-between
              gap-3
              px-4
              sm:px-6
              xl:px-10
            ">
 {/* LEFT */}
<div className="flex min-w-0 shrink-0 items-center gap-3 xl:gap-5">
  <Link
    href="/"
    className="flex shrink-0 items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
  >
        <Image
          src="/images/hindustan-yathra-logo.png"
          alt="Hindustan Yatra — travel with new experience"
          width={220}
          height={80}
          priority
          className="h-auto w-32 object-contain md:w-44"
        />
  </Link>
</div>

        {/* DESKTOP NAV */}
        <nav
          className="
            hidden
              lg:flex
            items-center
              gap-2
              lg:gap-3
              xl:gap-5
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
                  whitespace-nowrap
                  rounded-lg
                  px-2.5
                  py-2
                  text-sm
                  font-semibold
                  text-slate-100
                  transition-all
                  duration-300
                  hover:bg-white/10
                  hover:text-amber-300
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-amber-400
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
            lg:flex
            items-center
            gap-2
            xl:gap-3
          "
        >
          <LanguageSwitcher />

          {/* <Link
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
          </Link> */}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="
            rounded-lg
            border
            border-white/20
            bg-slate-800
            p-2
            text-white
            lg:hidden
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
            lg:hidden
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

              {/* <Link
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
              </Link> */}
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