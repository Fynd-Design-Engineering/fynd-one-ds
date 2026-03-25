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

  primary: {
    bg: '#0e0e0e',
    color: '#ffffff',
    bgHover: '#303030',
  },
  primaryLight: {
    bg: '#ffffff',
    color: '#0e0e0e',
    bgHover: '#f8f8f9',
  },
  secondary: {
    bg: 'transparent',
    color: '#0e0e0e',
    border: '#0e0e0e',
    bgHover: '#0e0e0e',
    borderHover: '#0e0e0e',
    colorHover: '#ffffff',
  },
  secondaryLight: {
    bg: 'transparent',
    color: '#ffffff',
    border: '#ffffff',
    bgHover: '#ffffff',
    borderHover: '#ffffff',
    colorHover: '#0e0e0e',
  },
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
