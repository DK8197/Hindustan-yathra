# 003 — Shorten browse-card image hover motion

- **Status**: DONE
- **Commit**: c387ed8
- **Severity**: LOW
- **Category**: Easing & duration
- **Related finding**: 3
- **Estimated scope**: 3 files; small class changes
- **Verification status**: Final lint-disabled production build and type-check passed; live destination and tour-gallery hovers measured at 200ms with original scale targets; infinite-gallery hover stayed at scale 1.0 under reduced motion and used 200ms/1.04 normally. Tailwind's generated CSS gates hover variants behind `(hover: hover) and (pointer: fine)`. The user confirmed mobile testing looks good. The regular lint-enabled build remains blocked by existing lint errors unrelated to this plan.

## Problem

The destination and gallery browsing surfaces use 500–700ms image-scale transitions. These cards are interactive browsing UI encountered repeatedly, so their hover response may feel slow. The audit allows longer motion for marketing/explanatory imagery, so preserve the visual zoom but shorten only the repeated interactive response.

Current code in `frontend/src/components/gallery/InfiniteGallery.tsx:170`:

```tsx
className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
```

Current destination card image classes in `frontend/src/components/destinations/DestinationsExplorer.tsx:591` and `:693`:

```tsx
className="object-cover transition duration-700 group-hover:scale-110"
```

Current tour gallery image in `frontend/src/components/sections/TourGallery.tsx:205`:

```tsx
className="object-cover transition-transform duration-500 group-hover:scale-105"
```

## Target

Set only these interactive image-scale transitions to **200ms** and hover easing to the CSS `ease` keyword, as prescribed for hover/color motion by the audit. Preserve current scale targets exactly (`1.04`, `1.10`, `1.05`), overlay opacity durations, and image composition. The 200ms duration is grounded in the existing navigation/color feedback convention and is below the audit's 300ms UI budget.

Keep the transform transition on the image itself; do not animate width, height, margins, or layout.

## Repo conventions to follow

- The navbar and floating controls already use 200ms interaction feedback in `frontend/src/components/ui/Navbar.tsx` and the floating-control components.
- Existing gallery imagery uses transform-only transitions; keep that property-specific pattern and do not replace it with `transition-all`.
- Use existing Tailwind utilities and an arbitrary timing function only if required to express the literal CSS `ease` keyword.

## Steps

1. Change the `InfiniteGallery` image transform duration from `700ms` to `200ms` and use `ease` timing.
2. Apply the same 200ms/ease response to both destination card image scale interactions in `DestinationsExplorer.tsx`.
3. Change the `TourGallery` image scale transition from `500ms` to `200ms` and use `ease` timing.
4. Keep hover scaling disabled or suppressed under reduced motion in accordance with plan 002; do not alter focus-visible overlays or focus access.

## Boundaries

- Allowed files: `frontend/src/components/gallery/InfiniteGallery.tsx`, `frontend/src/components/destinations/DestinationsExplorer.tsx`, `frontend/src/components/sections/TourGallery.tsx`.
- Do not change scale amounts, card dimensions, image loading, content, overlays, or gallery navigation.
- Do not add dependencies or animate shadows/layout properties as part of this plan.
- If the source class names or durations have changed since commit c387ed8, stop and report drift.

## Accessibility

Keep focus-visible content and labels available; hover must not be required to discover or operate a gallery image. Ensure reduced-motion users do not receive animated scale movement, and verify touch devices do not depend on hover.

## Performance considerations

Only animate `transform`. Keep the transition at 200ms; do not add blur, animated shadows, or JS animation loops.

## Verification

- **Mechanical**: from `frontend/`, run `npm.cmd run build`; run `npx.cmd tsc --noEmit` if supported.
- **Functional**: open cards, focus gallery items by keyboard, and test touch behavior on mobile; image selection/navigation must be unchanged.
- **Visual**: compare desktop destination cards, infinite gallery, and tour gallery before/after; scale endpoints and surrounding crop must remain unchanged.
- **Feel check**: test at normal speed and 10% playback, re-enter/leave hover repeatedly, keyboard-tab through images, and test reduced-motion mode. Confirm the response feels prompt without a visible abrupt jump; inspect for jank and layout shift on a real mobile device.
- **Done when**: the three cited browse-image interactions use 200ms transform-only hover motion with `ease`, their existing scale targets are unchanged, and reduced-motion and build checks pass.
