/**
 * Fynd One Design System — Color & Gradient Tokens
 * Source: One Design System Figma (qtxg951KvgNG3jYzQQU2s4)
 */

// ─── Primitives — Neutrals ───────────────────────────────────────────────────

export const neutrals = {
  0:   '#ffffff',
  10:  '#f8f8f9',
  20:  '#f2f2f2',
  30:  '#e3e3e3',
  40:  '#a0a1a2',
  50:  '#797a7c',
  60:  '#5b5c5d',
  80:  '#4a4b4c',
  100: '#0e0e0e',
} as const;

// ─── Primitives — Blue ──────────────────────────────────────────────────────

export const blue = {
  10: '#f9fbff',
  20: '#d8e2f5',
  40: '#5c98f7',
  50: '#2f7af6',
  60: '#084bb8',
  90: '#07285a',
} as const;

// ─── Primitives — Peach ─────────────────────────────────────────────────────

export const peach = {
  10: '#fbf7f4',
  20: '#e7cdbc',
  40: '#f2c49f',
  50: '#eeb384',
  60: '#a4521e',
  90: '#793c16',
} as const;

// ─── Primitives — Green ─────────────────────────────────────────────────────

export const green = {
  10: '#f4fbf7',
  20: '#c4d9cd',
  40: '#a2ddb7',
  50: '#80d99f',
  60: '#187b3f',
  90: '#124f2a',
} as const;

// ─── Primitives — Gold ──────────────────────────────────────────────────────

export const gold = {
  10: '#fdf5db',
  20: '#fbe9ae',
  40: '#f8d160',
  50: '#ebb537',
  60: '#8b6b20',
  90: '#362a0d',
} as const;

// ─── Primitives — Lavender ──────────────────────────────────────────────────

export const lavender = {
  10: '#f0e9fd',
  20: '#ceb8fa',
  40: '#8d61f6',
  50: '#703ff5',
  60: '#4322c8',
  90: '#27126c',
} as const;

// ─── Primitives — Red ───────────────────────────────────────────────────────

export const red = {
  10: '#f8cfd1',
  20: '#f1a1a4',
  40: '#ea5250',
  50: '#e9372e',
  60: '#a72218',
  90: '#51110b',
} as const;

// ─── Gradient color stops (keep for GradientSurface) ────────────────────────

export const colors = {
  white: '#FFFFFF',
  black: '#000000',

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
  title: neutrals[100],
  subtext: neutrals[60],
  titleInverse: neutrals[0],
  subtextInverse: neutrals[40],
} as const;

export type TextColorKey = keyof typeof textColors;

// ─── Background colors ──────────────────────────────────────────────────────

export const backgroundColors = {
  light: neutrals[0],
  medium: neutrals[10],
  dark: neutrals[60],
  darkest: neutrals[100],
} as const;

export type BackgroundColorKey = keyof typeof backgroundColors;

// ─── Icon colors ─────────────────────────────────────────────────────────────

export const iconColors = {
  darkest: neutrals[100],
  dark: neutrals[50],
  medium: neutrals[20],
  light: neutrals[0],
} as const;

export type IconColorKey = keyof typeof iconColors;

// ─── Border colors ──────────────────────────────────────────────────────────

export const borderColors = {
  light: neutrals[10],
  medium: neutrals[30],
  dark: neutrals[50],
  darkest: neutrals[80],
} as const;

export type BorderColorKey = keyof typeof borderColors;

// ─── Neutral scale (legacy alias) ──────────────────────────────────────────

export const neutralScale = neutrals;

export type NeutralStep = keyof typeof neutralScale;

// ─── Button colors ──────────────────────────────────────────────────────────

export const buttonColors = {
  primary: {
    bg: neutrals[100],
    text: neutrals[0],
    bgHover: '#303030',
  },
  primaryLight: {
    bg: neutrals[0],
    text: neutrals[100],
    bgHover: neutrals[10],
  },
  secondary: {
    bg: 'transparent',
    text: neutrals[100],
    border: neutrals[100],
    bgHover: neutrals[100],
    borderHover: neutrals[100],
    textHover: neutrals[0],
  },
  secondaryLight: {
    bg: 'transparent',
    text: neutrals[0],
    border: neutrals[0],
    bgHover: neutrals[0],
    borderHover: neutrals[0],
    textHover: neutrals[100],
  },
  tertiary: {
    text: blue[60],
    textLight: neutrals[0],
  },
} as const;

// ─── Status colors ──────────────────────────────────────────────────────────

export const statusColors = {
  yes: green[60],
  partial: gold[60],
  no: red[60],
} as const;

export type StatusColorKey = keyof typeof statusColors;

// ─── Legacy border alias ────────────────────────────────────────────────────

export const borderColor = {
  medium: neutrals[30],
} as const;
