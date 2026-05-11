'use client';

import React, { CSSProperties, forwardRef } from 'react';
import { IcFilter } from '../../assets/icons/actions';
import styles from './FilterButton.module.css';

export interface FilterButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /** Label text shown on desktop. Hidden on mobile (icon-only). */
  label?: string;
  /** Number of applied filters. When > 0, shows a count badge. */
  filterCount?: number;
  className?: string;
  style?: CSSProperties;
}

export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(({
  label = 'Filter',
  filterCount = 0,
  className,
  style,
  ...rest
}, ref) => {
  const rootCls = [styles.root, className].filter(Boolean).join(' ');

  return (
    <button ref={ref} className={rootCls} style={style} {...rest}>
      <IcFilter className={styles.icon} />
      <span className={styles.label}>{label}</span>
      {filterCount > 0 && (
        <span className={styles.badge}>{filterCount}</span>
      )}
    </button>
  );
});

FilterButton.displayName = 'FilterButton';

export default FilterButton;
