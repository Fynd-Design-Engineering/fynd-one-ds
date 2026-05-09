import React, { CSSProperties } from 'react';
import { Text } from '../Typography/Text';
import styles from './StatsGrid.module.css';

export interface StatItem {
  stat: string;
  label: string;
}

export interface StatsGridProps {
  items: StatItem[];
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  items,
  onDarkBg = false,
  className,
  style,
}) => {
  const rootCls = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={rootCls} style={style}>
      {items.map(({ stat, label }) => (
        <div key={label} className={styles.item}>
          <Text variant="heading-m" as="p" weight="medium" color={onDarkBg ? 'white' : 'default'}>
            {stat}
          </Text>
          <Text variant="body-s" as="p" color={onDarkBg ? 'muted' : 'secondary'}>
            {label}
          </Text>
        </div>
      ))}
    </div>
  );
};

StatsGrid.displayName = 'StatsGrid';
export default StatsGrid;
