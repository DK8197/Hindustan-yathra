# 002 — Preserve useful feedback in reduced-motion mode

- **Status**: DONE
- **Commit**: c387ed8
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Related finding**: 2
- **Estimated scope**: 5–7 frontend files; scoped CSS/class changes
- **Verification status**: Final lint-disabled production build and type-check passed; production checks confirm no horizontal overflow and visible H1 at desktop/mobile sizes, and no hero canvas when reduced motion is enabled before load. FAQ keyboard state, lightbox Escape close, enquiry feedback, and phone validation were verified. The user confirmed mobile testing looks good. The regular lint-enabled build remains blocked by existing lint errors unrelated to this plan.

## Problem

The global reduced-motion rule disables every animation and transition. That removes even simple state feedback, while transforms on hover can still change instantly because the global rule removes the transition but does not neutralize the transform. For example, the FAQ chevron rotates when `openIndex` changes, but its transition is globally canceled.

Current code in `frontend/src/app/globals.css:9-18`:

```css
/* Respect motion preferences for transitions and browser scrolling. */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  * {
    animation: none !important;
    scroll-behavior: auto !important;
    transition: none !important;
  }
}
```

Current FAQ cue in `frontend/src/components/sections/TourFAQ.tsx:26-34`:

```tsx
<ChevronDown
  size={18}
  aria-hidden="true"
  className={`shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
/>
```

## Target

Make reduced motion meaningfully gentler rather than a blanket removal: stop continuous/decorative CSS animation, turn off smooth page scrolling, suppress positional/scale movement on affected interactive elements, and retain modest color/opacity feedback at **120ms**. The 120ms choice is a documented design decision within the audit's 100–160ms button-feedback budget. The FAQ must still expose its open state immediately through `aria-expanded`; no information may depend on animation.

Use Tailwind's existing `motion-reduce` variant for the identified transform/translation utilities in cards and gallery controls. Do not change the default-motion experience. Keep existing Framer Motion `useReducedMotion()` branches and the hero's reduced-motion guard.

## Repo conventions to follow

- Central global CSS already owns the `prefers-reduced-motion` policy in `frontend/src/app/globals.css`.
- `TourCard.tsx`, `WhyUs.tsx`, and `HeroSection.tsx` already use Framer Motion's `useReducedMotion()`; follow these patterns rather than adding a preference store.
- Tailwind is already used for responsive/state variants; do not add a CSS-in-JS library or motion dependency.

## Steps

1. Replace the global `transition: none` blanket with a reduced-motion policy that retains only color, background-color, border-color, and opacity transitions at `120ms`; keep `scroll-behavior: auto`.
2. Keep continuous CSS keyframe motion disabled under reduced motion so it does not loop. Verify the form loading state remains understandable through its text/status semantics when its spinner is static.
3. Add `motion-reduce:transform-none` (or equivalent component-scoped reduced-motion styling) to the existing hover/active transform effects on tour/destination/gallery controls covered by this audit. Preserve layout transforms used for centering; do not apply a global `transform: none` rule.
4. Confirm CSS transforms do not snap to a scaled/translated hover state in reduced-motion mode; the UI may still provide color/opacity feedback.
5. Keep `TourFAQ`'s `aria-expanded` and `aria-controls` behavior unchanged. The chevron may change orientation immediately in reduced-motion mode.

## Boundaries

- Allowed files: `frontend/src/app/globals.css`, `frontend/src/components/ui/TourCard.tsx`, `frontend/src/components/sections/TourFAQ.tsx`, `frontend/src/components/destinations/DestinationsExplorer.tsx`, `frontend/src/components/gallery/InfiniteGallery.tsx`, and `frontend/src/components/sections/TourGallery.tsx` if required by the verified transforms.
- Do not add animation to the page, alter standard-motion timing, remove accessibility semantics, or change hero behavior.
- Do not globally clear transforms; many transforms establish layout positioning.
- Do not add dependencies or introduce a new visual language.
- If source has drifted from the cited code, stop and report it.

## Accessibility

Test `prefers-reduced-motion: reduce` with keyboard and touch interactions. All functionality and focus indicators must remain. Status and accordion state must be announced/readable without motion; reduced-motion mode should suppress spatial movement while preserving restrained color/opacity feedback.

## Performance considerations

Avoid adding JS listeners for the media preference. Prefer CSS/Tailwind media variants. Continuous loops must not run in reduced-motion mode; do not animate layout dimensions or add filters/blur.

## Verification

- **Mechanical**: from `frontend/`, run `npm.cmd run build`; run `npx.cmd tsc --noEmit` if supported.
- **Functional**: open/close FAQs, save a tour, hover/tap destination and gallery cards, use the contact status UI, and verify all state changes still work.
- **Visual**: inspect standard and reduced-motion modes at desktop and mobile sizes; verify layout transforms remain intact and no element snaps to an unexpected scaled position.
- **Feel check**: test at normal and 10% playback, keyboard through the controls, and check an actual mobile device. Confirm useful state/color cues remain while movement/continuous decoration is reduced. Check for layout shifts and jank.
- **Done when**: the blanket `transition: none` no longer removes all feedback, key movements are suppressed in reduced-motion mode, semantics remain unchanged, and mechanical checks pass.
