# Animation implementation plans

Plans approved by the user after the motion audit. Implementations and verification are complete based on build/browser checks and the user's mobile sign-off. The browser performance sample is not a pre-change or instrumented device benchmark.

| # | Plan | Severity | Status | Related finding | Verification |
|---|---|---|---|---|---|
| 001 | [Decouple hero scroll motion from React renders](001-decouple-hero-scroll-rendering.md) | MEDIUM | DONE | 1 | Build, browser checks, paired desktop sample, and user mobile sign-off complete |
| 002 | [Preserve useful feedback in reduced-motion mode](002-preserve-useful-reduced-motion-feedback.md) | MEDIUM | DONE | 2 | Build, responsive, reduced-motion, keyboard, and user mobile checks complete |
| 003 | [Shorten browse-card image hover motion](003-shorten-browse-card-hover-motion.md) | LOW | DONE | 3 | Build, hover timing, fine-pointer gating, and user mobile sign-off complete |

## Recommended execution order

1. **001** — isolate the hero's scroll-driven 3D updates and profile before/after.
2. **002** — make reduced-motion behavior intentional and verify accessibility.
3. **003** — tune repeated browse-card hover feedback; coordinate its reduced-motion handling with **002**.

## Dependencies

- **003** depends on the reduced-motion policy established by **002**.
- **001** is independent of **002** and **003**.

## Additional audited UX opportunities implemented

- FAQ answers now expand/collapse with measured height and opacity transitions; reduced-motion mode snaps the height while retaining brief opacity feedback.
- Gallery lightboxes now fade in on mount; Escape and keyboard navigation remain functional.
- Enquiry success/error/submitting status messages now fade in; the reduced-motion duration follows the 120ms global feedback rule.
- The contact phone pattern now escapes Unicode Sets syntax characters so current Chromium accepts common formatted phone numbers.
- Tailwind hover variants now apply only when the input supports hover and a fine pointer, preventing touch taps from leaving hover-only transforms or visual states stuck on mobile.
- Live checks passed for FAQ transition/state, gallery lightbox entrance/Escape close, and enquiry status with normal and reduced-motion preferences. The enquiry request was intercepted locally and was not sent to the backend.
- A formatted phone value (`+1 (555) 123-4567`) passes native validity checks in the refreshed production preview.
- Final production viewport checks passed at 390px for homepage/destinations and 1440px for homepage; the home search stayed visible, no horizontal overflow occurred, and the hero canvas was present with standard motion but absent after reload with reduced motion enabled.
- Kannada homepage and localized destinations route also passed the 390px reduced-motion overflow/H1 check; the decorative canvas remained unmounted.

## Overall status

All three approved motion plans are DONE. The final lint-disabled production build completed successfully, including TypeScript validation and all 105 static pages. The standard lint-enabled build remains blocked by existing lint issues outside these changes. Paired desktop idle/scroll frame samples are recorded, but no before/after or instrumented real-device performance claim is made. The updated production preview runs at `http://localhost:3002`; R2 image URLs may return 404 until uploaded.
