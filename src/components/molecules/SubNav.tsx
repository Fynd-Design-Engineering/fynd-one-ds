'use client';

import React, { CSSProperties, MouseEvent, ReactNode } from 'react';
import styles from './SubNav.module.css';

export interface SubNavItem {
  label: string;
  /** When set, renders as `<a href>`. Without href the item renders as `<button>`. */
  href?: string;
  /** External link (target=_blank, rel=noopener). */
  external?: boolean;
  /** Visually highlight as the current section. Applies aria-current="page". */
  active?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  /** Optional leading icon. */
  icon?: ReactNode;
}

export interface SubNavProps {
  items: SubNavItem[];
  /** Sticks to the top of the viewport. Default `true`. */
  sticky?: boolean;
  /**
   * Offset from the top edge when sticky — useful when stacking under a
   * sticky `<Navbar>` so this row sits below it. Number is treated as
   * px, string passed through. Default 0.
   */
  stickyOffset?: number | string;
  /** Render with the dark variant (inverted colors). */
  onDarkBg?: boolean;
  /** Accessible label for the nav landmark. Default "Section navigation". */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

const toCssLength = (v: number | string): string =>
  typeof v === 'number' ? `${v}px` : v;

export const SubNav: React.FC<SubNavProps> = ({
  items,
  sticky = true,
  stickyOffset = 0,
  onDarkBg = false,
  ariaLabel = 'Section navigation',
  className,
  style,
}) => {
  const rootClasses = [
    styles.root,
    sticky && styles['root--sticky'],
    onDarkBg && styles['root--dark'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle: CSSProperties = {
    ...style,
    ...(sticky ? { top: toCssLength(stickyOffset) } : {}),
  };

  return (
    <nav className={rootClasses} style={rootStyle} aria-label={ariaLabel}>
      <div className={styles.container}>
        {items.map((item, idx) => {
          const className = [styles.item, item.active && styles['item--active']]
            .filter(Boolean)
            .join(' ');
          if (item.href) {
            return (
              <a
                key={`${item.label}-${idx}`}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-current={item.active ? 'page' : undefined}
                onClick={item.onClick}
                className={className}
              >
                {item.icon}
                {item.label}
              </a>
            );
          }
          return (
            <button
              key={`${item.label}-${idx}`}
              type="button"
              aria-current={item.active ? 'page' : undefined}
              onClick={item.onClick}
              className={className}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

SubNav.displayName = 'SubNav';

export default SubNav;
