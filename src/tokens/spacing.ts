/**
 * Fynd One Design System — Spacing Tokens
 * Source: One Design System Figma (qtxg951KvgNG3jYzQQU2s4)
 *
 * Always use tokens, never magic numbers.
 * CSS: var(--spacing--16)  or Figma shorthand var(--16)
 * JS:  spacing[16]  →  '16px'
 */

export const spacing = {
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  32: '32px',
  40: '40px',
  56: '56px',
  64: '64px',
  80: '80px',
} as const;

export type SpacingKey = keyof typeof spacing;
