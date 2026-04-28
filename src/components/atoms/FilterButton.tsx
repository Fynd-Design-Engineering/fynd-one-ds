'use client';

import React, { CSSProperties } from 'react';
import { IcFilter } from '../../assets/icons/actions';
import styles from './FilterButton.module.css';

export interface FilterButtonProps {
  /** Label text shown on desktop. Hidden on mobile (icon-only). */
  label?: string;
  /** Number of applied filters. When > 0, shows a count badge. */
  filterCount?: number;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label = 'Filter',
  filterCount = 0,
  onClick,
  className,
  style,
}) => {
  const rootCls = [styles.root, className].filter(Boolean).join(' ');

  return (
    <button className={rootCls} style={style} onClick={onClick}>
      <IcFilter className={styles.icon} />
      <span className={styles.label}>{label}</span>
      {filterCount > 0 && (
        <span className={styles.badge}>{filterCount}</span>
      )}
    </button>
  );
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
