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
  fontSize: '14px',
  fontSizeLg: '16px',
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: '0',
  borderRadius: '250px',
  paddingY: '10px',
  paddingX: '24px',
  paddingYLg: '14px',
  paddingXLg: '32px',
  transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',

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
    border: '#e3e3e3',
    bgHover: '#f8f8f9',
    borderHover: '#5b5c5d',
  },
  secondaryLight: {
    bg: 'transparent',
    color: '#ffffff',
    border: 'rgba(255, 255, 255, 0.3)',
    bgHover: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(255, 255, 255, 0.5)',
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
