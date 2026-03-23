/**
 * Fynd One Design System — Layout Tokens
 * Source: One Design System Figma (qtxg951KvgNG3jYzQQU2s4) + Patterns file
 */

export const layout = {
  containerMax: '1200px',
  containerPadding: '2rem',
  containerPaddingMobile: '1.25rem',
  sectionHeaderMax: '720px',
  ctaContentMax: '640px',
  pagePaddingX: '120px',
  contentWidth: '1272px',
  fullWidth: '1512px',
  sectionPaddingY: '80px',
  middlePadding: '56px',
} as const;

export type LayoutKey = keyof typeof layout;
