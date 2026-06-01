# Changelog

## [0.33.2] — 2026-06-02

### Added

- feat(navbar): `FyndMarketingNavActions` accepts `signedInUser` for avatar pill.

## [0.33.1] — 2026-06-01

### Fixed

- `Navbar`: desktop dropdown triggers no longer close on click. Because dropdowns open on hover, clicking an already-open trigger was toggling it shut. Click now always opens; closing remains available via Escape, click-outside, mouse-leave, or selecting a link.

## [0.33.0] — 2026-06-01

### Added

- `FyndMarketingNavActions`, `FyndMarketingNavMobileActions`, and `ContactCTASection`: `formProps` prop — forwarded verbatim to the internal `ContactForm` so consumers can set attributes on the rendered `<form>` (e.g. `data-hs-do-not-collect="true"` to opt the preset nav/CTA modals out of HubSpot's Collected Forms listener) without DOM workarounds. Completes the `formProps` passthrough started in 0.32.0. Optional and non-breaking — existing call sites are unaffected.

## [0.32.1] — 2026-06-01

### Added

- `Tabs` (`card` + `pill` variants): horizontally overflowing tab bars now show a gradient edge-fade indicating hidden content. Driven by a scroll-progress timeline, so it appears only when the bar actually overflows (typically mobile) and fades whichever side(s) still have off-screen tabs. The `underline` variant is unaffected. Degrades to no fade where scroll-driven animations are unsupported.

## [0.32.0] — 2026-05-29

### Added

- `ContactForm` + `GatedForm`: `formProps` prop — extra attributes (`React.FormHTMLAttributes`) spread onto the underlying `<form>` element. Useful for integration hooks like `data-hs-do-not-collect="true"` (skips HubSpot's Collected Forms listener). The component's own `className` (merged, not overwritten) and `onSubmit` always win, so internal behavior can't be clobbered.

## [0.31.0] — 2026-05-27

### Added

- `ContactForm` + `ContactCTASection`: `initialValues` prop to preselect any field on mount.

## [0.29.47] — 2026-05-18

### Fixed
- **CustomerStoryCard**: added `height: 100%` to `.root` so the card stretches to fill its grid/flex cell when siblings are taller. The existing `justify-content: space-between` on `.content` now correctly pins the CTA button to the bottom in equal-height grid rows. Standalone usage is unaffected (intrinsic height unchanged when parent has no explicit height).

## [0.29.46] — 2026-05-18

### Added
- **InteractiveAccordion** `edgeBleed`: added `mediaRatio` prop (CSS `aspect-ratio`, defaults to `'3 / 4'` when `edgeBleed` is true). Increased list column top/bottom padding to `3.5rem` in edge-bleed mode. Media panel uses `align-self: start` so the aspect ratio is correctly honoured.

## [0.29.45] — 2026-05-18

### Added
- **InteractiveAccordion**: `edgeBleed` prop — negates parent SectionWrapper's `--fds-section-px` horizontal padding so the media panel stretches to the viewport edge. Removes border-radius, clip-path, and shadow in bleed mode. List column outer-edge padding is restored. Desktop only; mobile is unaffected.

## [0.29.44] — earlier

### Added
- **CTABannerSection**: `actions` ReactNode slot — replaces `primaryButton` / `secondaryButton` when provided, enabling Modal triggers and custom button compositions.
- **CTABanner**: `subtextMaxWidth` prop for per-instance control of subtext line length.
- **FeatureSplit**: tablet/mobile image proportions preserved (no forced full-width); `border-radius: 1rem` on stacked images; content column outer edge now aligns with inner-container grid on wide viewports.
- **Section / SectionWrapper**: `verticalPadding` prop — `'default'` (4rem), `'lg'` (6rem desktop / 3rem mobile), `'xl'` (8rem desktop / 4rem mobile).
- **Stepper**: `contentAlign: 'center'` now correctly aligns title baseline with node center across all variants (DotTrail, CountFlow, NodeLink, NodeSolo). Added `--fds-stepper-node-h` CSS custom property.
