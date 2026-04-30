import React, { ReactNode } from 'react';
import { IconChevronRight } from '../../icons';
import styles from './Button.module.css';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onDarkBg?: boolean;
  /**
   * Show the trailing chevron. Defaults to `true` for `tertiary`,
   * `false` for `primary` / `secondary`. Pass an explicit boolean to
   * override the per-variant default in either direction.
   */
  showChevron?: boolean;
  /** Optional icon rendered before the label (e.g., a phone icon on a CTA). */
  iconLeft?: ReactNode;
}

const variantClass = (variant: string, onDarkBg: boolean): string => {
  if (variant === 'tertiary') return onDarkBg ? styles['tertiary-light'] : styles.tertiary;
  if (variant === 'secondary') return onDarkBg ? styles['secondary-light'] : styles.secondary;
  return onDarkBg ? styles['primary-light'] : styles.primary;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { label, variant = 'primary', onDarkBg = false, showChevron, iconLeft, className, ...rest },
    ref
  ) => {
    const showChevronResolved = showChevron ?? variant === 'tertiary';
    const classes = [styles.root, variantClass(variant, onDarkBg), className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} {...rest}>
        {iconLeft && <span className={styles['icon-left']}>{iconLeft}</span>}
        {label}
        {showChevronResolved && <IconChevronRight />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
