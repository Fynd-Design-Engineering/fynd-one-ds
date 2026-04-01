import React, { CSSProperties } from 'react';
import { IconStar } from '../../icons';
import styles from './Chip.module.css';

export type ChipDotColor =
  | 'blue' | 'green' | 'peach'
  | 'yellow' | 'lavender' | 'violet' | 'red' | 'gray' | 'teal';

export interface ChipProps {
  label: string;
  variant?: 'anchor' | 'filled' | 'outlined';
  showDot?: boolean;
  dotColor?: ChipDotColor;
  icon?: React.ReactNode;
  breakpoint?: 'lg' | 'md' | 'sm';
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'anchor',
  showDot = true,
  dotColor = 'blue',
  icon,
  breakpoint = 'lg',
  onDarkBg = false,
  className,
  style,
}) => {
  const isCompact = breakpoint === 'md' || breakpoint === 'sm';
  const isAnchor = variant === 'anchor';

  const variantClass = styles[variant as keyof typeof styles];
  const classes = [
    styles.root,
    variantClass,
    isCompact && styles.compact,
    onDarkBg && styles.dark,
    className,
  ].filter(Boolean).join(' ');

  const resolvedIcon = icon ?? (!isAnchor ? <IconStar size={16} /> : null);

  return (
    <span className={classes} style={style} data-figma-id="961:34535">
      {resolvedIcon}
      {!resolvedIcon && showDot && (
        <span className={[styles.dot, styles[`dot--${dotColor}` as keyof typeof styles]].filter(Boolean).join(' ')} />
      )}
      <span className={styles.text}>{label}</span>
    </span>
  );
};

Chip.displayName = 'Chip';

export default Chip;
