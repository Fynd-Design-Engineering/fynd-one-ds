import React, { CSSProperties } from 'react';
import styles from './Grid.module.css';

export interface GridProps {
  children: React.ReactNode;
  /** Number of columns at desktop (≥992px). Auto-collapses at smaller breakpoints. */
  columns?: number;
  gap?: number;
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
  gap = 20,
  className,
  style,
}) => {
  const cls = [styles.root, className].filter(Boolean).join(' ');

  const tabletCols = getTabletColumns(columns);

  const gridStyle: CSSProperties = {
    '--grid-cols': columns,
    '--grid-cols-tablet': tabletCols,
    '--grid-cols-mobile': 1,
    '--grid-gap': `${gap}px`,
    ...style,
  } as CSSProperties;

  return (
    <div className={cls} style={gridStyle}>
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
