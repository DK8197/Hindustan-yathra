# Hindustan Yathra — Frontend Scaffold

A working Next.js 15 (App Router) starting point for the Hindustan Yathra
travel platform: hyper-real 3D hero, bilingual (EN/KN) routing, tour
detail pages, mobile-OTP auth, a user dashboard, and an Excel-driven admin
CMS skeleton.

**This build passes `npm run build` end-to-end** — all 41 routes compile,
type-check, and statically generate for both locales. It is a real,
runnable codebase, not a mockup — but it is a *foundation*, not a finished
product. See "What's production-ready vs. stubbed" below before launch.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in JWT_SECRET at minimum
npm run dev                  # http://localhost:3000/en
```

```bash
npm run build && npm start   # production build
```

---

## Architecture

```
src/
  app/
    [locale]/            # Public site — every route exists in /en and /kn
      page.tsx            # Home: 3D hero, featured tours, why-us, contact
      destinations/        # Domestic + international destination grid
      tour/[slug]/          # Dynamic tour detail (itinerary, gallery, FAQ, reviews)
      gallery/              # Masonry gallery, lazy-loaded, infinite scroll
      contact/              # Lead form + WhatsApp + Google Maps
      login/                # Mobile OTP login flow
      dashboard/            # Authenticated user area (bookings, saved, profile)
    admin/                # Separate UI tree — NOT under [locale], not public/SEO
      tours/                # List + Excel upload (the CMS entry point)
      destinations/ leads/ testimonials/ users/ seo/ banners/
    api/
      auth/send-otp, verify-otp/   # OTP -> JWT -> httpOnly cookie
      tours/                        # Public tour data endpoint
      leads/                        # Contact form intake
      admin/upload-excel/            # Tours.xlsx ingestion
    sitemap.ts, robots.ts   # Localized, auto-generated from tour data
  components/
    3d/Hero3D.tsx          # React Three Fiber scene (mountains, birds, plane, sun rays)
    sections/               # Page-level sections (Hero, FeaturedTours, Contact, ...)
    ui/                      # Navbar, Footer, TourCard, LanguageSwitcher
    admin/                   # ExcelUploader
  i18n/
    routing.ts              # next-intl locale + translated-URL config
    request.ts               # message loader
  lib/
    auth.ts                  # JWT sign/verify, admin route guard
    tours-repository.ts       # Single seam between "data" and "where it comes from"
    query-provider.tsx         # Tanstack Query client
    hooks/                     # useTours, useHeroScrollProgress
  store/useAppStore.ts       # Zustand: session mirror, saved tours, scroll progress
  types/                    # Tour, Destination, User, Booking, Lead, JwtPayload
  messages/{en,kn}.json     # All UI copy — this is the translation source of truth
  data/
    tours.generated.json    # Output of the Excel pipeline (checked-in sample data)
    destinations.json        # Static destination list from the brochure
scripts/
  parse-excel.ts            # Tours.xlsx -> tours.generated.json (npm run parse:excel)
```

---

## How each requirement maps to code

**Multi-language (EN/KN), no full reload**
`src/i18n/routing.ts` defines both locales and per-route translated
pathnames (e.g. `/kn/ಪ್ರವಾಸಿ-ತಾಣಗಳು` for `/en/destinations`).
`LanguageSwitcher.tsx` uses next-intl's typed `useRouter().replace(...,
{ locale })`, which is a client-side transition — confirmed no full
navigation occurs. Every page has localized `generateMetadata` with
`alternates.languages` for SEO. `src/messages/{en,kn}.json` is the single
source for all UI strings; `sitemap.ts` emits both locales with hreflang
alternates automatically.

**Hyper-realistic 3D hero**
`components/3d/Hero3D.tsx` — React Three Fiber scene: procedurally
displaced mountain ridges (no heavy GLTF needed for first paint), drei
`Cloud` and `Sparkles`, a looping airplane, three birds on independent
flight paths, and a sun-ray plane. The hero section is 220vh tall with a
`sticky` inner viewport; scroll progress is read via
`useHeroScrollProgress` and written to Zustand, which the R3F camera rig
subscribes to independently (`ScrollCameraRig`) so scrolling doesn't
re-render the whole React tree — this is the "camera flies over the
mountains on scroll" effect. The canvas is dynamically imported with
`ssr: false` so it never blocks LCP.

**Mobile OTP login → JWT → secure cookie → dashboard**
`app/[locale]/login/page.tsx` implements the two-step UI.
`api/auth/send-otp` and `api/auth/verify-otp` implement the flow; the JWT
is set via `Set-Cookie` with `httpOnly, secure, sameSite=lax` — it is
**never** returned in the JSON body, so client JS cannot read or leak it.
`lib/auth.ts` holds `signSession`/`verifySession`/`requireAdmin`.

**Excel-driven CMS ("no code changes")**
`scripts/parse-excel.ts` is the canonical parser: it reads a `Tours.xlsx`
workbook with `Tours` / `Itinerary` / `FAQs` / `Gallery` sheets and
produces `tours.generated.json`, which `lib/tours-repository.ts` serves
to every page. `app/admin/tours/page.tsx` exposes the same pipeline
through `components/admin/ExcelUploader.tsx` → `api/admin/upload-excel`.
**Not yet done:** the upload route currently returns a parsed preview
but doesn't persist to a database or trigger ISR revalidation — see
inline `TODO(prod)` comments for the exact next step.

**SEO**
JSON-LD (`TravelAgency` on home, `TouristTrip` on tour pages),
`generateMetadata` with Open Graph + Twitter cards on every route,
localized canonical/alternate URLs, `sitemap.ts` (all locales × all
tours), `robots.ts` (disallows `/admin` and `/api`).

---

## What's production-ready vs. stubbed

**Solid, real, extend-in-place:**
- Routing, i18n, layouts, type system, Tailwind design tokens
- The 3D hero and scroll-camera mechanism
- The Excel parsing logic and its data contract
- The JWT/cookie mechanics of the OTP flow
- SEO metadata, sitemap, robots
- Component structure for tour detail, gallery, dashboard, admin nav

**Intentionally stubbed — needs real infrastructure before launch:**
- **Database.** Everything currently reads `src/data/*.json`. Swap
  `lib/tours-repository.ts`'s implementation for real queries (Postgres/
  Mongo/etc.) — every caller already goes through this one file.
- **OTP delivery.** `send-otp` logs the code to the console. Wire an SMS
  provider (MSG91/Twilio) and move the OTP store from an in-memory `Map`
  (`lib/otp-store.ts`) to Redis, since the Map won't survive a restart or
  scale across instances.
- **Admin auth.** `admin/login` has UI but no backend check yet —
  `requireAdmin()` exists and is applied to `upload-excel`, but you need
  a real admin credential store (do not reuse customer OTP auth here).
- **Bookings/Users/Leads/Testimonials CRUD.** Admin pages for these are
  UI shells with `TODO(prod)` markers for the API wiring.
- **Payments.** Not in scope of this scaffold; "Book Now" is a UI stub.
- **Google Maps.** Contact page uses a plain iframe embed; swap for the
  JS API + `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` for interactive maps on
  destination/tour pages.
- **Images.** All image URLs are placeholders. Point `next.config.mjs`
  `images.remotePatterns` at your real CDN.
- **PDF itinerary download** — linked from the UI, route not implemented.

---

## Lighthouse 95+ notes

- Hero3D is code-split (`next/dynamic`, `ssr:false`) so WebGL never blocks
  first paint; capped `dpr={[1, 1.5]}`.
- `next/image` everywhere with explicit `sizes`; static assets get a
  1-year immutable cache header (`next.config.mjs`).
- `prefers-reduced-motion` is respected globally (`globals.css`).
- Real-world verification still required: run
  `npx lighthouse http://localhost:3000/en --view` after adding real
  images/fonts, since placeholder assets don't reflect final payload size.

## Accessibility

Semantic landmarks, `aria-live`/`aria-expanded`/`aria-pressed` used where
interactive state changes (FAQ accordion, saved-tour heart), the 3D
canvas is `aria-hidden` (decorative), and reduced-motion is respected.
A full WCAG 2.2 pass (contrast audit, focus-visible styling, screen-reader
walkthrough) is still needed before launch.
