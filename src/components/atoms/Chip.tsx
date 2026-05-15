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
  /** Hide the leading icon entirely (overrides the default star for non-anchor variants). */
  showIcon?: boolean;
  breakpoint?: 'lg' | 'md' | 'sm';
  onDarkBg?: boolean;
  /** Toggled/active state. Only meaningful for `outlined` variant. */
  selected?: boolean;
  /** Custom background color for the `filled` variant. Accepts any CSS color value. */
  bg?: string;
  /** Makes the chip interactive — renders as a `<button>`. */
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'anchor',
  showDot = true,
  dotColor = 'blue',
  icon,
  showIcon = true,
  breakpoint = 'lg',
  onDarkBg = false,
  selected = false,
  bg,
  onClick,
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
    selected && styles.selected,
    onClick && styles.interactive,
    className,
  ].filter(Boolean).join(' ');

  const resolvedIcon = showIcon ? (icon ?? (!isAnchor ? <IconStar size={16} /> : null)) : null;

  const content = (
    <>
      {resolvedIcon}
      {!resolvedIcon && showDot && (
        <span className={[styles.dot, styles[`dot--${dotColor}` as keyof typeof styles]].filter(Boolean).join(' ')} />
      )}
      <span className={styles.text}>{label}</span>
    </>
  );

  const resolvedStyle: CSSProperties = {
    ...(bg ? { '--fds-chip-bg': bg } as CSSProperties : null),
    ...style,
  };

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        style={resolvedStyle}
        onClick={onClick}
        aria-pressed={selected}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={classes} style={resolvedStyle}>
      {content}
    </span>
  );
};

Chip.displayName = 'Chip';

export default Chip;
