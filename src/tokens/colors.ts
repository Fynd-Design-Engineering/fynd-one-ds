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
