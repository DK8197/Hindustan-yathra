# 001 — Decouple hero scroll motion from React renders

- **Status**: DONE
- **Commit**: c387ed8
- **Severity**: MEDIUM
- **Category**: Performance
- **Related finding**: 1
- **Estimated scope**: 2 files; small refactor
- **Verification status**: Implementation applied; final type-check and lint-disabled production build passed. On the production page at 1280×800 in desktop Chromium/Electron, paired 180-frame samples measured idle at 16.67ms average / 16.8ms p95 / 17.0ms max, and scrolling at 16.67ms average / 16.9ms p95 / 17.1ms max, with no long tasks in the final sample. The user confirmed mobile testing looks good. This remains a single-machine browser sample, not a pre-change comparison or instrumented real-device benchmark. The normal lint-enabled build remains blocked by existing lint issues unrelated to this plan.

## Problem

Every scheduled scroll frame writes `heroScrollProgress` to Zustand. `Hero3DComponent` subscribes to that value and derives a changing `scale` prop, so scrolling can reconcile the React/R3F scene. The hook comment says the expensive tree avoids per-tick re-renders, but the live subscriber contradicts that claim. The code path is verified; runtime frame impact has not been measured.

Current code in `frontend/src/lib/hooks/useHeroScrollProgress.ts:20-29`:

```tsx
let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const rect = el.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
    setHeroScrollProgress(progress);
    ticking = false;
  });
};
```

Current subscription and scale calculation in `frontend/src/components/3d/Hero3D.tsx:214-241`:

```tsx
const scrollProgress =
  useAppStore((state) => state.heroScrollProgress);

const isMobile = typeof window !== 'undefined' &&
  window.matchMedia('(max-width:768px)').matches;

const scale = useMemo(() => {
  const start = isMobile ? 1.5 : 2.0;
  const end = isMobile ? 6.0 : 6.0;
  return start + (end - start) * scrollProgress;
}, [scrollProgress, isMobile]);
```

The scale is passed through `MemoScene` to the Earth group. The globe rotation already runs in `useFrame` in the same component.

## Target

Keep the scroll response visually identical while removing the React subscription to per-frame progress. Read the current Zustand value inside the existing R3F frame loop and update a `THREE.Group` scale imperatively. Preserve the existing interpolation endpoints exactly: mobile `1.5 → 6.0`; desktop `2.0 → 6.0`; normalized progress remains clamped to `[0, 1]`. Do not change the globe rotation rates, DPR caps, geometry, textures, or reduced-motion behavior.

## Repo conventions to follow

- Use the existing R3F `useFrame` loop and refs in `frontend/src/components/3d/Hero3D.tsx` rather than adding an animation library or a new loop.
- Preserve the existing Zustand store and scroll listener in `frontend/src/lib/hooks/useHeroScrollProgress.ts`; the imperative frame consumer should read the store snapshot without subscribing React to each update.
- Existing rotation rates are `0.12` and `0.15` radians-per-second multipliers in the current `useFrame` callback; leave them unchanged.

## Steps

1. In `Hero3D.tsx`, remove the component-level `useAppStore` selector and the `useMemo` scale calculation based on scroll progress.
2. Give the Earth group a stable `THREE.Group` ref and update its scalar scale inside the existing `useFrame` callback using `useAppStore.getState().heroScrollProgress`.
3. Keep the viewport class test and mobile/desktop start scales unchanged; use end scale `6.0` for both breakpoints, matching current code.
4. Remove the now-unneeded `scale` prop from `Scene`/`Earth` where appropriate. Update the hook comment to describe the actual imperative consumer without claiming the React tree cannot re-render unless that is now true.
5. Confirm the canvas still mounts only when reduced motion is not requested.

## Boundaries

- Allowed files: `frontend/src/components/3d/Hero3D.tsx`, `frontend/src/lib/hooks/useHeroScrollProgress.ts`.
- Do not change the brand, hero layout, camera, textures, globe/cloud rotation, DPR settings, translations, or app-store persistence.
- Do not add dependencies or move the 3D effect to another library.
- If the live source no longer matches the excerpts, stop and report drift rather than improvising.

## Accessibility

Preserve `HeroSection`'s existing `useReducedMotion()` guard so the decorative 3D scene remains absent for reduced-motion users. The hero content and controls must remain available without the canvas.

## Performance considerations

The goal is to prevent React/R3F reconciliation on each scroll-frame store update, not to change the visual render rate. Keep the existing requestAnimationFrame scroll throttle and avoid adding React state updates or new per-frame allocations.

## Verification

- **Mechanical**: from `frontend/`, run `npm.cmd run build`. Run `npx.cmd tsc --noEmit` if it is supported by the installed project setup. No new ESLint configuration should be generated as part of this plan.
- **Functional**: scroll the hero slowly and quickly; confirm the globe reaches the same scale endpoints on desktop and mobile, and that the page remains scrollable.
- **Visual**: compare at 1440px and 390px widths; confirm no change to the hero image, globe placement, text, search, or CTAs.
- **Feel check**: inspect at normal speed and at 10% playback; repeatedly reverse scroll direction and confirm the scale retargets from its current value without jumping. Test with reduced motion enabled and confirm the 3D scene stays absent. Profile a real mobile device or throttled mobile emulation and compare React commits/frame pacing before and after; do not claim a performance win without measurement.
- **Done when**: scroll progress no longer causes `Hero3DComponent` React subscriptions/renders, visual scaling matches the existing endpoints, build/type checks pass, and profiling shows no regression.
