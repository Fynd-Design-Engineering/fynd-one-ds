import React from 'react';
import { IconChevronRight } from '../../icons';
import styles from './Button.module.css';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onDarkBg?: boolean;
  showChevron?: boolean;
}

const variantClass = (variant: string, onDarkBg: boolean): string => {
  if (variant === 'tertiary') return onDarkBg ? styles['tertiary-light'] : styles.tertiary;
  if (variant === 'secondary') return onDarkBg ? styles['secondary-light'] : styles.secondary;
  return onDarkBg ? styles['primary-light'] : styles.primary;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { label, variant = 'primary', onDarkBg = false, showChevron = false, className, ...rest },
    ref
  ) => {
    const showChevronResolved = variant === 'tertiary' || showChevron;
    const classes = [styles.root, variantClass(variant, onDarkBg), className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} {...rest}>
        {label}
        {showChevronResolved && <IconChevronRight />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
