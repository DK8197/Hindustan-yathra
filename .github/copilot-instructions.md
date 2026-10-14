Build a premium, production-quality responsive web UI for a modern mobile application showcase.

### Visual Direction

Create a **high-end glassmorphic interface** with a sophisticated, cinematic feel. The design should feel like a premium consumer technology product — minimal, polished, immersive, and intentional.

Use:

* Deep navy / midnight background
* Subtle blue, violet, and indigo ambient gradients
* Translucent glass panels
* `backdrop-filter: blur(...)`
* Thin semi-transparent borders
* Soft inner highlights
* Subtle shadows and glow
* Large rounded corners
* Smooth gradients rather than flat colors
* Generous spacing and strong visual hierarchy
* Subtle animated light effects in the background

Avoid excessive neon, excessive gradients, visual clutter, or anything that makes the interface feel like a generic template.

### Hero Section

Create a visually impressive hero section with:

**Left side**

* Small premium eyebrow label
* Large, confident headline
* Short supporting description
* Primary CTA
* Secondary CTA
* Small trust / platform indicators

Example structure:

"Your day.
Designed around you."

Supporting copy should communicate that the product helps users organize, focus, and understand their daily activity.

**Right side**
Show a composition of **three premium smartphone mockups** floating at slightly different angles.

The phones should represent:

1. Main dashboard
2. AI assistant / conversational experience
3. Analytics / insights

Use realistic phone proportions and polished device frames.

The screens should contain realistic UI rather than placeholder rectangles.

### Glassmorphism Components

Use reusable glass components throughout the page.

Example:

* `GlassCard`
* `GlassButton`
* `GlassBadge`
* `GlassStat`
* `GlassNavigation`
* `GlassPhone`
* `GlassInsightCard`

Cards should have:

* translucent backgrounds
* subtle blur
* 1px low-opacity borders
* soft shadows
* slight gradient highlights
* hover elevation
* smooth transitions

The glass effect should remain elegant and readable rather than overly transparent.

### Phone UI

The phone interfaces should look like a real finished application.

Dashboard:

* Greeting
* Daily progress
* Tasks
* Focus time
* Quick actions
* Bottom navigation

AI Assistant:

* Assistant header
* Conversational messages
* Suggested actions
* Planning interface
* Text input
* Contextual response cards

Insights:

* Productivity graph
* Weekly/monthly selector
* Activity breakdown
* Progress statistics
* Visual trend indicators

Keep typography, spacing, iconography, and component styling consistent across all screens.

### Responsive Design

The design must work exceptionally well on:

* Desktop
* Tablet
* iPhone
* Android phones
* Small mobile screens

Do not simply shrink the desktop layout.

On mobile:

* Reflow the hero intelligently
* Stack content naturally
* Keep phone mockups visually prominent
* Reduce decorative elements where necessary
* Maintain readable typography
* Ensure CTAs remain easy to tap
* Respect safe areas
* Avoid horizontal overflow

The final experience should feel intentionally designed for both iOS and Android.

### Animation

Use subtle premium motion:

* Floating phone movement
* Background light movement
* Glass cards appearing with staggered transitions
* Soft hover elevation
* Button interaction feedback
* Smooth section transitions
* Subtle parallax where appropriate

Animations should feel expensive and restrained.

Do NOT use excessive bouncing, spinning, flashy transitions, or distracting effects.

### Typography

Use a modern premium sans-serif typeface.

Hierarchy should be strong:

* Large expressive hero heading
* Medium-weight section headings
* Compact supporting text
* Small uppercase labels where appropriate

Use careful letter spacing and line height.

### Navigation

Create a minimal floating glass navigation bar.

Include:

* Product/logo
* Features
* Experience
* Insights
* About
* CTA

On mobile, convert it into a compact mobile navigation without breaking the visual language.

### Sections After Hero

Include:

1. **Product Experience**

   * Showcase key application capabilities using large glass cards.

2. **AI Assistant**

   * Large conversational UI showcase.

3. **Insights**

   * Analytics visualization with glass cards.

4. **Features**

   * 3–6 feature cards with minimal iconography.

5. **Platform Compatibility**

   * Clearly communicate support for both Apple/iOS and Android.
   * Use platform badges/icons elegantly rather than making them visually dominant.

6. **Final CTA**

   * Large premium glass panel with a strong CTA.

### Design Quality Requirements

The result must look like a deliberately designed premium product website, not a generic landing-page template.

Prioritize:

* visual hierarchy
* spacing
* typography
* realistic product UI
* consistency
* subtle depth
* responsive behavior
* accessibility
* performance

Avoid:

* generic stock-dashboard layouts
* excessive rounded cards everywhere
* excessive glowing text
* overly bright neon
* cheap-looking gradients
* placeholder lorem ipsum
* unnecessary UI elements
* excessive animations
* visual clutter

Use realistic content and believable application data.

The final result should feel **premium, cinematic, modern, minimal, and highly polished**, with glassmorphism integrated naturally into the product rather than being used as a gimmick.
# Hindustan Yathra — Copilot Project Instructions

## Project at a glance

This workspace contains a travel-booking website, API, and tour-content artifacts:

- `frontend/`: Next.js 15 App Router, React 18, TypeScript (strict), Tailwind, next-intl, Zustand, React Three Fiber.
- `HY -  Backend/`: Flask API, SQLAlchemy, MySQL in the current Compose configuration, optional Redis, pytest.
- `Artifacts/South_india_5days/`: source tour Markdown, spreadsheets, generated workbooks, and a Jupyter notebook for tour/Excel preparation. Treat these as business content and source data; don't overwrite or regenerate them unless requested.

Read the target area before editing. Keep changes scoped to the relevant application; there is no root-level build/test command. Prefer existing patterns and dependencies over adding new ones.

## Frontend guidance

- Run frontend commands from `frontend/`. Use `npm run dev`, `npm run build`, `npm start`, and `npm run parse:excel -- <workbook-path>` as appropriate. `npm run lint` is declared, but verify it works with the installed Next.js version before relying on it. There is no test script currently defined in `package.json`.
- Public pages live under `src/app/[locale]/`; the operational admin UI is under `src/app/admin/`, outside the locale tree. API handlers are under `src/app/api/`.
- Locales are `en` and `kn`. Keep localized user-facing copy in `src/messages/en.json` and `src/messages/kn.json`. Respect the translated pathnames and typed navigation helpers in `src/i18n/routing.ts`; do not bypass them for localized links/routes.
- Use the existing shared types in `src/types/`. For tour reads, preserve the repository seam in `src/lib/tours-repository.ts` rather than introducing ad-hoc data access in pages/components. The Excel parser is `scripts/parse-excel.ts`; inspect its expected sheet/column contract before changing it.
- Prefer server components/data loading for server-rendered pages and keep client components limited to interactive browser behavior. Preserve accessibility, responsive styling, and reduced-motion support when changing UI or animation.
- Environment variables and credentials are secrets. Never expose server-only values through `NEXT_PUBLIC_*`, log them, or include them in commits/examples. Follow the established server-side proxy pattern for calls to Flask and validate request data at API boundaries.

## Backend guidance

- Run backend commands from `HY -  Backend/`. Dependencies are in `requirements.txt`; tests use `pytest -q`. The GitHub Actions workflow targets Python 3.12 and runs `pip install -r requirements.txt` then `pytest -q`.
- `app/__init__.py` owns `create_app()`, shared Flask extensions, and blueprint registration. Endpoints are grouped in `app/blueprints/` and `app/blueprints_admin/`; business logic belongs in `app/services/`; ORM models and request schemas are in `app/models/` and `app/schemas/`.
- The current `docker-compose.yml` provisions MySQL 8.4 and Redis 7. The architecture document mentions PostgreSQL, but verify executable configuration and runtime code rather than assuming docs are synchronized. Backend integration uses `API_SECRET` / `X-App-Key`; use environment configuration and never hard-code or print key material.
- Preserve the existing API response and model contracts unless the corresponding frontend consumers and tests are updated together. Add/update pytest coverage for backend behavior changes. Avoid schema changes without an accompanying migration/data-compatibility review.

## Cross-cutting cautions

- This repository contains evolving scaffold code and duplicated/inconsistent implementations. README descriptions can be aspirational or stale: inspect the actual route, caller, model, and configuration before relying on claims about persistence, authentication, OTP delivery, caching, or production readiness.
- Frontend API handlers often proxy requests to Flask, and the backend's registered URL prefixes are in `app/__init__.py`. Check both sides when changing an endpoint or payload.
- Treat authentication, admin access, uploads, and secrets as security-sensitive. Existing cookie names, auth flows, and middleware checks are not uniform; verify the complete request/authorization path rather than treating presence of a cookie as proof of authorization. Do not weaken validation, password/token handling, rate limits, or upload protections.
- Tour data exists in both generated JSON/artifacts and backend persistence. Confirm which path the affected runtime actually uses before editing data or changing the importer.
- Keep Kannada text/Unicode intact. Avoid broad formatting or generated-file churn unrelated to the requested change.
- Before finishing, run the narrowest relevant checks (frontend build/type-check or backend tests) and report any checks that could not run or any unrelated existing failures. Never claim a check passed unless it was run.
