/**
 * Icons barrel — top-level re-export of every SVGR icon across all 16
 * categories, plus the hand-crafted Icon* React components.
 *
 * Two import styles are supported:
 *
 *   // 1. Top-level barrel (ergonomic, autocompletes 1400+ names)
 *   import { IcCart, IcLogisticsTruck } from '@fynd-design-engineering/fynd-one-ds';
 *
 *   // 2. Category subpath (smaller bundle for older bundlers)
 *   import { IcCart } from '@fynd-design-engineering/fynd-one-ds/icons/commerce';
 *
 * Modern bundlers (Vite, Next.js 13+, Webpack 5) tree-shake either path
 * cleanly. Use the subpath form when bundle size is in scope and you only
 * need a handful of icons from one category.
 *
 * NOTE on cross-category name collisions:
 * Eight names appear in more than one category. Per the ES Modules spec,
 * `export *` collisions silently drop those names from the barrel. We
 * re-export each collision explicitly below from its canonical category
 * so the name resolves at the top level. The other category still owns
 * its own copy via subpath import.
 */

// ── Hand-crafted icons (stable, do not rename) ────────────────────────────
export type { IconProps } from './types';
export { IconChevronRight } from './IconChevronRight';
export { IconArrowDiagonal } from './IconArrowDiagonal';
export { IconStar } from './IconStar';

// ── Category re-exports ───────────────────────────────────────────────────
export * from '../assets/icons/actions';
export * from '../assets/icons/AI';
export * from '../assets/icons/code';
export * from '../assets/icons/commerce';
export * from '../assets/icons/communication';
export * from '../assets/icons/data';
export * from '../assets/icons/device';
export * from '../assets/icons/editor';
export * from '../assets/icons/features';
export * from '../assets/icons/feedback';
export * from '../assets/icons/hardware';
export * from '../assets/icons/location';
export * from '../assets/icons/media';
export * from '../assets/icons/miscellaneous';
export * from '../assets/icons/navigation';
export * from '../assets/icons/user';

// ── Collision resolutions: canonical source for cross-category clashes ───
export { IcAddBackground, IcBackground, IcTemplate } from '../assets/icons/AI';
export { IcBeauty } from '../assets/icons/features';
export { IcBulkEdit, IcCrop } from '../assets/icons/editor';
export { IcCompare } from '../assets/icons/commerce';
export { IcWifi } from '../assets/icons/hardware';
