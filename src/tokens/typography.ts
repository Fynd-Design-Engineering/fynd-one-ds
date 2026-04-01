/**
 * Fynd One Design System — Typography Tokens
 * Source: One Design System Figma (qtxg951KvgNG3jYzQQU2s4)
 *
 * Font families:
 *   Title  → Fynd Sans (Compact style) — used for Heading XXL → Heading M
 *   Body   → Inter Variable              — used for Heading S + all Body styles
 *
 * Font loading: Both fonts must be available in your project.
 * Add to your global CSS:
 *   @font-face { font-family: 'Fynd Sans'; src: url('/fonts/FyndSans-Compact.woff2'); }
 *   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
 */

// ─── Font families ────────────────────────────────────────────────────────────

export const fontFamily = {
  title: "'Fynd Sans', sans-serif",            // Compact style (display / heading XXL–M)
  body: "'Inter Display', sans-serif", // Medium / Regular / SemiBold
  ui: "'Inter', sans-serif",                    // Buttons, nav links, badges, table headers
} as const;

// ─── Font weights ─────────────────────────────────────────────────────────────

export const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
} as const;

// ─── Letter spacing ───────────────────────────────────────────────────────────
/**
 * Values are in `em` (relative to font size), sourced directly from Figma
 * where they are stored as percentages.
 *
 * Figma %  →  em       →  Figma CSS output example
 * ─────────────────────────────────────────────────────
 *  -4%     →  -0.04em  →  -2.88px at 72px
 *  -3%     →  -0.03em  →  -1.20px at 40px
 *  -2%     →  -0.02em  →  -0.52px at 26px
 *  -1%     →  -0.01em  →  -0.18px at 18px
 *   0%     →   0em     →   0
 * +25%     →  +0.25em  →  +3.00px at 12px  (caps, desktop)
 * +24%     →  +0.24em  →  +2.88px at 12px  (caps, mobile)
 */
export const letterSpacing = {
  n4:     '-0.04em',  // -4%  — Heading XXL desktop/tablet
  n3:     '-0.03em',  // -3%  — Heading XL desktop / Heading L desktop
  n2:     '-0.02em',  // -2%  — Heading M, Heading S desktop/tablet
  n1:     '-0.01em',  // -1%  — Body L desktop regular
  none:   '0em',      //  0%  — all body styles
  caps_d: '0.25em',   // +25% — Body XS SemiBold Caps (desktop)
  caps_m: '0.24em',   // +24% — Body XS SemiBold Caps (mobile)
} as const;

// ─── Type scale ───────────────────────────────────────────────────────────────
// Each entry: { fontSize (px), lineHeight (ratio or px), letterSpacing (em), fontWeight, fontFamily }
// Keys: {variant}-{breakpoint}[-{weight}][-caps]

export const typeScale = {
  // ── Heading XXL ─────────────────────────────────────────────────────────────
  'heading-xxl-desktop': { fontSize: 72, lineHeight: 1.1,  letterSpacing: letterSpacing.n4, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },
  'heading-xxl-tablet':  { fontSize: 56, lineHeight: 1.1,  letterSpacing: letterSpacing.n4, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },
  'heading-xxl-mobile':  { fontSize: 40, lineHeight: 1.1,  letterSpacing: letterSpacing.n3, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },

  // ── Heading XL ──────────────────────────────────────────────────────────────
  'heading-xl-desktop':  { fontSize: 56, lineHeight: 1.1,  letterSpacing: letterSpacing.n4, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },
  'heading-xl-tablet':   { fontSize: 40, lineHeight: 1.1,  letterSpacing: letterSpacing.n3, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },
  'heading-xl-mobile':   { fontSize: 32, lineHeight: 1.2,  letterSpacing: letterSpacing.n2, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },

  // ── Heading L ───────────────────────────────────────────────────────────────
  'heading-l-desktop':   { fontSize: 40, lineHeight: 1.1,  letterSpacing: letterSpacing.n3, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },
  'heading-l-tablet':    { fontSize: 32, lineHeight: 1.2,  letterSpacing: letterSpacing.n2, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },
  'heading-l-mobile':    { fontSize: 24, lineHeight: 1.3,  letterSpacing: letterSpacing.n2, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },

  // ── Heading M ───────────────────────────────────────────────────────────────
  'heading-m-desktop':   { fontSize: 32, lineHeight: 1.2,  letterSpacing: letterSpacing.n2, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },
  'heading-m-tablet':    { fontSize: 24, lineHeight: 1.3,  letterSpacing: letterSpacing.n2, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },
  'heading-m-mobile':    { fontSize: 20, lineHeight: 1.4,  letterSpacing: letterSpacing.n2, fontWeight: fontWeight.regular, fontFamily: fontFamily.title },

  // ── Heading S (switches to body font + medium weight) ───────────────────────
  'heading-s-desktop':   { fontSize: 26, lineHeight: '34px', letterSpacing: letterSpacing.n2,   fontWeight: fontWeight.medium, fontFamily: fontFamily.body },
  'heading-s-tablet':    { fontSize: 22, lineHeight: '28px', letterSpacing: letterSpacing.n2,   fontWeight: fontWeight.medium, fontFamily: fontFamily.body },
  'heading-s-mobile':    { fontSize: 18, lineHeight: '24px', letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium, fontFamily: fontFamily.body },

  // ── Body XL ─────────────────────────────────────────────────────────────────
  'body-xl-desktop-medium':  { fontSize: 20, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-xl-desktop-regular': { fontSize: 20, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },
  'body-xl-tablet-medium':   { fontSize: 16, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-xl-tablet-regular':  { fontSize: 16, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },
  'body-xl-mobile-medium':   { fontSize: 16, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-xl-mobile-regular':  { fontSize: 16, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },

  // ── Body L ──────────────────────────────────────────────────────────────────
  'body-l-desktop-medium':   { fontSize: 18, lineHeight: 1.5, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-l-desktop-regular':  { fontSize: 18, lineHeight: 1.5, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },
  'body-l-tablet-medium':    { fontSize: 16, lineHeight: 1.5, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-l-tablet-regular':   { fontSize: 16, lineHeight: 1.5, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },
  'body-l-mobile-medium':    { fontSize: 16, lineHeight: 1.5, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-l-mobile-regular':   { fontSize: 16, lineHeight: 1.5, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },

  // ── Body M ──────────────────────────────────────────────────────────────────
  'body-m-desktop-medium':   { fontSize: 16, lineHeight: 1.55, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-m-desktop-regular':  { fontSize: 16, lineHeight: 1.5,  letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },
  'body-m-tablet-medium':    { fontSize: 14, lineHeight: 1.45, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-m-tablet-regular':   { fontSize: 14, lineHeight: 1.45, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },
  'body-m-mobile-medium':    { fontSize: 14, lineHeight: 1.45, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-m-mobile-regular':   { fontSize: 14, lineHeight: 1.45, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },

  // ── Body S ──────────────────────────────────────────────────────────────────
  'body-s-desktop-medium':   { fontSize: 14, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-s-desktop-regular':  { fontSize: 14, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },
  'body-s-tablet-medium':    { fontSize: 14, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-s-tablet-regular':   { fontSize: 14, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },
  'body-s-mobile-medium':    { fontSize: 14, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.medium,  fontFamily: fontFamily.body },
  'body-s-mobile-regular':   { fontSize: 14, lineHeight: 1.4, letterSpacing: letterSpacing.none, fontWeight: fontWeight.regular, fontFamily: fontFamily.body },

  // ── Body XS ─────────────────────────────────────────────────────────────────
  'body-xs-desktop-semibold':       { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.none,   fontWeight: fontWeight.semiBold, fontFamily: fontFamily.body },
  'body-xs-desktop-medium':         { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.none,   fontWeight: fontWeight.medium,   fontFamily: fontFamily.body },
  'body-xs-desktop-regular':        { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.none,   fontWeight: fontWeight.regular,  fontFamily: fontFamily.body },
  'body-xs-desktop-semibold-caps':  { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.caps_d, fontWeight: fontWeight.semiBold, fontFamily: fontFamily.body, textTransform: 'uppercase' as const },

  'body-xs-tablet-semibold':        { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.none,   fontWeight: fontWeight.semiBold, fontFamily: fontFamily.body },
  'body-xs-tablet-medium':          { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.none,   fontWeight: fontWeight.medium,   fontFamily: fontFamily.body },
  'body-xs-tablet-regular':         { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.none,   fontWeight: fontWeight.regular,  fontFamily: fontFamily.body },
  'body-xs-tablet-semibold-caps':   { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.caps_d, fontWeight: fontWeight.semiBold, fontFamily: fontFamily.body, textTransform: 'uppercase' as const },

  'body-xs-mobile-semibold':        { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.none,   fontWeight: fontWeight.semiBold, fontFamily: fontFamily.body },
  'body-xs-mobile-medium':          { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.none,   fontWeight: fontWeight.medium,   fontFamily: fontFamily.body },
  'body-xs-mobile-regular':         { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.none,   fontWeight: fontWeight.regular,  fontFamily: fontFamily.body },
  'body-xs-mobile-semibold-caps':   { fontSize: 12, lineHeight: 1.3, letterSpacing: letterSpacing.caps_m, fontWeight: fontWeight.semiBold, fontFamily: fontFamily.body, textTransform: 'uppercase' as const },
} as const;

export type TypeScaleKey = keyof typeof typeScale;
