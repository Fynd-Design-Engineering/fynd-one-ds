import React, { CSSProperties } from 'react';
import styles from './Grid.module.css';

export interface GridProps {
  children: React.ReactNode;
  /** Number of columns at desktop (≥992px). Auto-collapses at smaller breakpoints. */
  columns?: number;
  /** Override auto-computed tablet column count (768–991px). */
  tabletColumns?: number;
  /** Override auto-computed mobile column count (<768px). Defaults to 1. */
  mobileColumns?: number;
  gap?: number;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

function getTabletColumns(cols: number): number {
  if (cols <= 2) return cols;
  if (cols <= 4) return 2;
  return 3;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  tabletColumns,
  mobileColumns,
  gap = 20,
  id,
  className,
  style,
}) => {
  const cls = [styles.root, className].filter(Boolean).join(' ');

  const gridStyle: CSSProperties = {
    '--grid-cols': columns,
    '--grid-cols-tablet': tabletColumns ?? getTabletColumns(columns),
    '--grid-cols-mobile': mobileColumns ?? 1,
    '--grid-gap': `${gap}px`,
    ...style,
  } as CSSProperties;

  return (
    <div id={id} className={cls} style={gridStyle}>
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
