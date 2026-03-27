/**
 * Fynd One Design System — Effects Tokens (Shadows, Blur, Breakpoints)
 * Source: One Design System Figma (qtxg951KvgNG3jYzQQU2s4)
 */

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadows = {
  s: '1px 2px 15px 0px rgba(0, 0, 0, 0.02)',
  m: [
    '0px 1px 2px 0px rgba(48, 48, 48, 0.03)',
    '0px 3px 3px 0px rgba(48, 48, 48, 0.02)',
    '0px 7px 4px 0px rgba(48, 48, 48, 0.01)',
    '0px 13px 5px 0px rgba(48, 48, 48, 0.00)',
    '0px 21px 6px 0px rgba(48, 48, 48, 0.00)',
  ].join(', '),
  'card-high': [
    '1px 5px 10px 0px rgba(41, 41, 41, 0.05)',
    '2px 19px 19px 0px rgba(41, 41, 41, 0.04)',
    '5px 42px 26px 0px rgba(41, 41, 41, 0.02)',
    '8px 76px 30px 0px rgba(41, 41, 41, 0.01)',
    '13px 118px 33px 0px rgba(41, 41, 41, 0.00)',
  ].join(', '),
} as const;

export type ShadowKey = keyof typeof shadows;

// ─── Blur ─────────────────────────────────────────────────────────────────────

export const blur = {
  100: 'blur(50px)',
} as const;

// ─── Breakpoints ──────────────────────────────────────────────────────────────

export const breakpoints = {
  xlDesktop: 1440,
  desktop: 992,
  tablet: 768,
  mobile: 480,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

// ─── Media query helpers ──────────────────────────────────────────────────────
/** Raw media query conditions — use in window.matchMedia() or template literals */
export const mq = {
  xlDesktop: `@media (min-width: ${breakpoints.xlDesktop}px)`,
  desktop:   `@media (min-width: ${breakpoints.desktop}px)`,
  tablet:    `@media (max-width: ${breakpoints.desktop - 1}px)`,
  mobile:    `@media (max-width: ${breakpoints.tablet - 1}px)`,
} as const;
