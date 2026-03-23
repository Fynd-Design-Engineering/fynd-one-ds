/**
 * Fynd One Design System — Color & Gradient Tokens
 * Source: One Design System Figma (qtxg951KvgNG3jYzQQU2s4)
 */

// ─── Color primitives ─────────────────────────────────────────────────────────

export const colors = {
  white: '#FFFFFF',
  black: '#000000',

  // Gradient color stops
  blue20: 'rgba(216, 226, 245, 0.7)',
  blue40: 'rgba(92, 152, 247, 0.7)',

  peach20: 'rgba(234, 177, 141, 0.4)',
  peach40: 'rgba(169, 97, 51, 0.4)',

  green20: 'rgba(102, 175, 131, 0.35)',
  green40: 'rgba(19, 104, 53, 0.35)',

  grey20: 'rgba(142, 142, 142, 0.35)',
  grey40: 'rgba(40, 40, 40, 0.35)',

  aiFrom: 'rgb(226, 195, 254)',
  aiMid:  'rgb(146, 126, 255)',
  aiTo:   'rgb(8, 111, 253)',
} as const;

export type ColorKey = keyof typeof colors;

// ─── Gradients ────────────────────────────────────────────────────────────────

export const gradients = {
  blue:  `linear-gradient(106.18deg, ${colors.blue20} 28.66%, ${colors.blue40} 74.97%)`,
  peach: `linear-gradient(109.38deg, ${colors.peach20} 27.74%, ${colors.peach40} 72.52%)`,
  green: `linear-gradient(106.72deg, ${colors.green20} 27.77%, ${colors.green40} 73.70%)`,
  grey:  `linear-gradient(124.76deg, ${colors.grey20} 21.93%, ${colors.grey40} 70.49%)`,
  ai:    `linear-gradient(269.82deg, ${colors.aiFrom} 0.24%, ${colors.aiMid} 60.58%, ${colors.aiTo} 102.73%)`,
} as const;

export type GradientKey = keyof typeof gradients;

// ─── Semantic text colors ────────────────────────────────────────────────────

export const textColors = {
  title: '#0e0e0e',
  subtext: '#5b5c5d',
  titleInverse: '#ffffff',
  subtextInverse: '#a0a1a2',
} as const;

export type TextColorKey = keyof typeof textColors;

// ─── Background colors ──────────────────────────────────────────────────────

export const backgroundColors = {
  light: '#ffffff',
  medium: '#f8f8f9',
  dark: '#5b5c5d',
  darkest: '#0e0e0e',
} as const;

export type BackgroundColorKey = keyof typeof backgroundColors;

// ─── Neutral scale ──────────────────────────────────────────────────────────

export const neutralScale = {
  20: '#f8f8f9',
  30: '#e3e3e3',
  60: '#5b5c5d',
  100: '#0e0e0e',
} as const;

export type NeutralStep = keyof typeof neutralScale;

// ─── Brand color families ───────────────────────────────────────────────────
// Each brand color has 4 semantic aliases: fill (light bg), stroke (border),
// primary (accent), text (dark text on tinted bg).

export interface BrandColorFamily {
  readonly fill: string;
  readonly stroke: string;
  readonly primary: string;
  readonly text: string;
}

export const brandColors: Record<string, BrandColorFamily> = {
  blue:     { fill: '#f9fbff', stroke: '#d8e2f5', primary: '#5c98f7', text: '#07285a' },
  peach:    { fill: '#fef5ee', stroke: '#eab18d', primary: '#a96133', text: '#5a2d10' },
  green:    { fill: '#f0faf3', stroke: '#66af83', primary: '#136835', text: '#0a3a1d' },
  gold:     { fill: '#fdf6db', stroke: '#e5c44a', primary: '#9a6700', text: '#533800' },
  lavender: { fill: '#f5f0ff', stroke: '#c9b8f8', primary: '#703ff5', text: '#3a1d8e' },
  red:      { fill: '#fef2f2', stroke: '#f5a8a8', primary: '#c13515', text: '#6e1a08' },
} as const;

export type BrandColorKey = keyof typeof brandColors;

// ─── Status colors ──────────────────────────────────────────────────────────

export const statusColors = {
  yes: '#0d7a3a',
  partial: '#9a6700',
  no: '#c13515',
} as const;

export type StatusColorKey = keyof typeof statusColors;

// ─── Border colors ──────────────────────────────────────────────────────────

export const borderColor = {
  medium: '#e3e3e3',
} as const;
