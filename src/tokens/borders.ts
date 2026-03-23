/**
 * Fynd One Design System — Border Tokens
 * Source: One Design System Figma (qtxg951KvgNG3jYzQQU2s4)
 *
 * Rules:
 *   - All buttons use `pill` (250px) — fully rounded, not square-cornered.
 *   - Badges/tags use `tag` (2000px).
 *   - Cards use `16` (16px).
 *   - CTA boxes / large containers use `24` (24px).
 *   - Inputs / small elements use `8` (8px).
 */

export const borderRadius = {
  pill: '250px',
  tag: '2000px',
  8: '8px',
  16: '16px',
  24: '24px',
} as const;

export type BorderRadiusKey = keyof typeof borderRadius;
