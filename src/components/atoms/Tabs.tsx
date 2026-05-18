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

export type TabsVariant = 'card' | 'underline' | 'pill';

export interface TabsProps {
  tabs: TabItem[];
  /** Visual variant. 'card' = filled bg tabs, 'underline' = bottom border tabs */
  variant?: TabsVariant;
  defaultIndex?: number;
  /** Activate tabs on hover in addition to click. Touch devices are unaffected. */
  hoverToChange?: boolean;
  /**
   * Remove the inner container (max-width + centering) and all padding from the
   * panel content slot. Use when Tabs is placed inside a fullBleedContent Section
   * so the panel content can reach the viewport edges.
   */
  fullBleedPanel?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  variant = 'card',
  defaultIndex = 0,
  hoverToChange = false,
  fullBleedPanel = false,
  className,
  style,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const classes = [styles.root, className].filter(Boolean).join(' ');
  const isUnderline = variant === 'underline';
  const isPill = variant === 'pill';

  const barCls = [
    styles.bar,
    isUnderline && styles['bar--underline'],
    isPill && styles['bar--pill'],
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <div className={barCls}>
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
              onMouseEnter={hoverToChange ? () => setActiveIndex(i) : undefined}
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
      <div className={[styles.panel, isPill && styles['panel--pill']].filter(Boolean).join(' ')}>
        <div className={[
          styles['panel-content'],
          fullBleedPanel ? styles['panel-content--fullbleed'] : sectionStyles.inner,
        ].filter(Boolean).join(' ')}>
          {tabs[activeIndex]?.content}
        </div>
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
