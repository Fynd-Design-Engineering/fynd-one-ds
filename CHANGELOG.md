# Changelog

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
