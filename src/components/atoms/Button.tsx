import React, { ReactNode } from 'react';
import { IconChevronRight } from '../../icons';
import styles from './Button.module.css';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Button height. 'lg' = 48px (default), 'md' = 40px. */
  size?: 'lg' | 'md';
  onDarkBg?: boolean;
  /**
   * Show the trailing chevron. Defaults to `true` for `tertiary`,
   * `false` for `primary` / `secondary`. Pass an explicit boolean to
   * override the per-variant default in either direction.
   */
  showChevron?: boolean;
  /** Optional icon rendered before the label (e.g., a phone icon on a CTA). */
  iconLeft?: ReactNode;
  /** Renders the button as an `<a>` with this href. */
  href?: string;
  /** When `href` is set, adds `target="_blank" rel="noopener noreferrer"`. */
  external?: boolean;
  /**
   * Render as a custom component (e.g. Next.js `Link`). The component
   * receives `href` and all remaining props. Overrides the `href` → `<a>`
   * auto-detection.
   */
  as?: React.ElementType;
}

const variantClass = (variant: string, onDarkBg: boolean): string => {
  if (variant === 'tertiary') return onDarkBg ? styles['tertiary-light'] : styles.tertiary;
  if (variant === 'secondary') return onDarkBg ? styles['secondary-light'] : styles.secondary;
  return onDarkBg ? styles['primary-light'] : styles.primary;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      variant = 'primary',
      size = 'lg',
      onDarkBg = false,
      showChevron,
      iconLeft,
      href,
      external,
      as: Tag,
      disabled,
      onClick,
      className,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const showChevronResolved = showChevron ?? variant === 'tertiary';
    const classes = [styles.root, variantClass(variant, onDarkBg), size === 'md' ? styles['size-md'] : undefined, className]
      .filter(Boolean)
      .join(' ');

    const inner = (
      <>
        {iconLeft && <span className={styles['icon-left']}>{iconLeft}</span>}
        {label}
        {showChevronResolved && <IconChevronRight />}
      </>
    );

    if (Tag || href) {
      const Elem = Tag ?? 'a';
      const needsClickHandler = disabled || !!onClick;
      const clickProps = needsClickHandler
        ? {
            onClick: (e: React.MouseEvent) => {
              if (disabled) { e.preventDefault(); return; }
              onClick?.(e as React.MouseEvent<HTMLButtonElement>);
            },
          }
        : undefined;
      return (
        <Elem
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...(disabled ? { 'aria-disabled': true, tabIndex: -1 } : {})}
          {...clickProps}
          {...rest}
        >
          {inner}
        </Elem>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {inner}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
