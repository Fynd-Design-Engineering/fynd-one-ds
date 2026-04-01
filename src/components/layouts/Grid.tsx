import React, { CSSProperties } from 'react';
import styles from './Grid.module.css';

export interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = 20,
  className,
  style,
}) => {
  const cls = [styles.root, className].filter(Boolean).join(' ');

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    ...style,
  };

  return (
    <div className={cls} style={gridStyle}>
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
