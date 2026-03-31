import React, { CSSProperties } from 'react';
import { IconChevronRight } from '../../icons';
import styles from './Button.module.css';

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onDarkBg?: boolean;
  showChevron?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
}

const variantClass = (variant: string, onDarkBg: boolean): string => {
  if (variant === 'tertiary') return onDarkBg ? styles['button--tertiary-light'] : styles['button--tertiary'];
  if (variant === 'secondary') return onDarkBg ? styles['button--secondary-light'] : styles['button--secondary'];
  return onDarkBg ? styles['button--primary-light'] : styles['button--primary'];
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  onDarkBg = false,
  showChevron = false,
  onClick,
  className,
  style,
}) => {
  const showChevronResolved = variant === 'tertiary' || showChevron;
  const classes = [styles.button, variantClass(variant, onDarkBg), className].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      style={style}
      onClick={onClick}
    >
      {label}
      {showChevronResolved && <IconChevronRight />}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
