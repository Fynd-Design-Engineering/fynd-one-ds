/**
 * Fynd One Design System — Layout Tokens
 * Source: One Design System Figma (qtxg951KvgNG3jYzQQU2s4) + Patterns file
 */

// ─── Container sizes ────────────────────────────────────────────────────────
// Source: fynd.com webflow CSS

export const container = {
  /** Main content container: 82.5rem (1320px) */
  default: '82.5rem',
  /** Small container for narrow content: 35.625rem (570px) */
  sm: '35.625rem',
  /** Section header max width */
  header: '720px',
  /** CTA content max width */
  cta: '640px',
} as const;

// ─── Container max-widths per breakpoint ────────────────────────────────────

export const containerMaxWidth = {
  /** ≥992px */
  desktop: '82.5rem',
  /** ≤991px */
  tablet: '728px',
  /** ≤767px — full width */
  mobile: '100%',
} as const;

// ─── Page padding ───────────────────────────────────────────────────────────

export const pagePadding = {
  /** Desktop horizontal padding */
  x: '7.5rem',
  /** Tablet horizontal padding */
  xTablet: '2.5rem',
  /** Mobile horizontal padding */
  xMobile: '1.25rem',
} as const;

// ─── Section padding ────────────────────────────────────────────────────────

export const sectionPadding = {
  /** Desktop/Tablet: 3.5rem (56px) */
  y: '3.5rem',
  /** Mobile (≤767px): 2rem (32px) */
  yMobile: '2rem',
} as const;

// ─── Legacy layout object (for backwards compat) ───────────────────────────

export const layout = {
  containerMax: container.default,
  containerPadding: '2rem',
  containerPaddingMobile: '1.25rem',
  sectionHeaderMax: container.header,
  ctaContentMax: container.cta,
  pagePaddingX: pagePadding.x,
  contentWidth: '1272px',
  fullWidth: '1512px',
  sectionPaddingY: sectionPadding.y,
  middlePadding: '56px',
} as const;

export type LayoutKey = keyof typeof layout;
