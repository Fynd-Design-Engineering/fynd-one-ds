'use client';

import React, { CSSProperties, useState } from 'react';
import styles from './Tabs.module.css';
import sectionStyles from '../_shared/SectionWrapper.module.css';

export interface TabItem {
  label: string;
  content: React.ReactNode;
  /** Optional color for the tab dot indicator */
  dotColor?: string;
}

export type TabsVariant = 'card' | 'underline';

export interface TabsProps {
  tabs: TabItem[];
  /** Visual variant. 'card' = filled bg tabs, 'underline' = bottom border tabs */
  variant?: TabsVariant;
  defaultIndex?: number;
  className?: string;
  style?: CSSProperties;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  variant = 'card',
  defaultIndex = 0,
  className,
  style,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const classes = [styles.root, className].filter(Boolean).join(' ');
  const isUnderline = variant === 'underline';

  return (
    <div className={classes} style={style}>
      <div className={[styles.bar, isUnderline && styles['bar--underline']].filter(Boolean).join(' ')}>
        {tabs.map((tab, i) => {
          const btnClasses = [
            styles.button,
            isUnderline && styles['button--underline'],
            i === activeIndex && (isUnderline ? styles['button--underline-active'] : styles['button--active']),
          ].filter(Boolean).join(' ');
          return (
            <button
              key={i}
              className={btnClasses}
              onClick={() => setActiveIndex(i)}
            >
              {tab.dotColor && (
                <svg className={styles.dot} width="18" height="10" viewBox="0 0 18 10" fill="none">
                  <rect width="18" height="10" rx="4" fill={tab.dotColor} />
                </svg>
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className={styles.panel}>
        <div className={[styles['panel-content'], sectionStyles.inner].filter(Boolean).join(' ')}>
          {tabs[activeIndex]?.content}
        </div>
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
