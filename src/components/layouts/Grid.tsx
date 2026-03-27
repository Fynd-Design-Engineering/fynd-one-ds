import React, { CSSProperties } from 'react';

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
  const grid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    width: '100%',
    ...style,
  };

  return (
    <div className={className} style={grid}>
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
