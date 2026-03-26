/**
 * Fynd One Design System — Component-level Tokens
 * Source: One Design System Figma (qtxg951KvgNG3jYzQQU2s4)
 *
 * These tokens define the styling contracts for reusable components.
 * Components reference these tokens rather than raw values.
 */

// ─── Button ─────────────────────────────────────────────────────────────────

export const buttonTokens = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: 1.6,
  letterSpacing: '0',
  borderRadius: '32px',
  gap: '8px',
  paddingX: '24px',
  transition: 'all 0.3s',
} as const;

// ─── Badge ──────────────────────────────────────────────────────────────────

export const badgeTokens = {
  paddingY: '8px',
  paddingX: '12px',
  borderRadius: '2000px',
  fontSize: '12px',
  fontWeight: 400,
} as const;

// ─── Card ───────────────────────────────────────────────────────────────────

export const cardTokens = {
  borderRadius: '16px',
  padding: '16px',
  borderColor: '#e3e3e3',
} as const;

// ─── Icon sizes ─────────────────────────────────────────────────────────────

export const iconSize = {
  ui: '16px',
  feature: '20px',
  decorative: '24px',
} as const;

export type IconSizeKey = keyof typeof iconSize;
