import React, { CSSProperties } from 'react';
import styles from './VisualElement.module.css';

export type VisualElementPresetSize =
  | 'icon-32'
  | 'icon-48'
  | 'logo-64'
  | 'logo-80'
  | 'logo-horizontal';

/**
 * Size of the visual chip.
 * - One of the preset strings (`icon-32`, `icon-48`, `logo-64`, `logo-80`,
 *   `logo-horizontal`) for the canonical sizes.
 * - A `number` for a custom square size in px.
 * - A `{ width, height }` object for non-square custom sizes.
 *
 * Custom sizes derive their border-radius proportional to the smaller
 * dimension, mirroring the preset progression (32→4, 48→6, 64→8, 80→12,
 * 96→12, 128→16, …).
 */
export type VisualElementSize =
  | VisualElementPresetSize
  | number
  | { width: number; height: number };

export interface VisualElementProps {
  size?: VisualElementSize;
  /**
   * Render the 1px hairline border. Default `true` — appropriate for
   * brand-logo chips where the bezel reads as part of the icon. Pass
   * `false` for product icons / illustrations that should sit flush.
   */
  bordered?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const isPresetSize = (s: VisualElementSize): s is VisualElementPresetSize =>
  typeof s === 'string';

/** Border-radius for custom sizes, derived from the smaller dimension. */
const inferRadius = (px: number): number => {
  if (px <= 32) return 4;
  if (px <= 48) return 6;
  if (px <= 64) return 8;
  if (px <= 96) return 12;
  if (px <= 128) return 16;
  if (px <= 192) return 20;
  return 24;
};

export const VisualElement: React.FC<VisualElementProps> = ({
  size = 'icon-32',
  bordered = true,
  children,
  className,
  style,
}) => {
  const customSizeStyle: CSSProperties | undefined = isPresetSize(size)
    ? undefined
    : typeof size === 'number'
      ? {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${inferRadius(size)}px`,
        }
      : {
          width: `${size.width}px`,
          height: `${size.height}px`,
          borderRadius: `${inferRadius(Math.min(size.width, size.height))}px`,
        };

  // `logo-horizontal` and any custom size wider than tall render children
  // directly — no inner .content wrapper. Square / icon shapes wrap so the
  // child centers within the chip.
  const isHorizontal =
    size === 'logo-horizontal' ||
    (typeof size === 'object' && size.width > size.height);

  const classes = [
    styles.root,
    isPresetSize(size) ? styles[size] : null,
    !children && styles.empty,
    !bordered && styles['no-border'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      style={{ ...customSizeStyle, ...style }}
    >
      {children && (
        <div className={isHorizontal ? undefined : styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};

VisualElement.displayName = 'VisualElement';

export default VisualElement;
