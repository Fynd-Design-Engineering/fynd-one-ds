'use client';

import React, { CSSProperties, useId, useRef, useState } from 'react';
import { Text } from '../Typography/Text';
import styles from './SectionTabs.module.css';

export interface SectionTabsItem {
  /** Tab label */
  label: string;
  /** Full section content rendered below the tab bar when this tab is active */
  content: React.ReactNode;
}

export interface SectionTabsProps {
  items: SectionTabsItem[];
  /** Controlled active index */
  activeIndex?: number;
  /** Default active index (uncontrolled). Default: 0. */
  defaultActiveIndex?: number;
  /** Called when the active tab changes */
  onActiveIndexChange?: (index: number) => void;
  /** aria-label for the tablist */
  tablistLabel?: string;
  /**
   * Pin the tab bar under the navbar while the user scrolls through sections.
   * Reads `--fds-nav-h` set by `<Navbar>` + `--fds-banner-h` set by `<SiteBanner>`.
   */
  sticky?: boolean;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const SectionTabs: React.FC<SectionTabsProps> = ({
  items,
  activeIndex: controlledIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  tablistLabel = 'Sections',
  sticky = false,
  onDarkBg = false,
  className,
  style,
}) => {
  const uid = useId();
  const isControlled = controlledIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex = isControlled ? controlledIndex! : internalIndex;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goTo = (index: number) => {
    if (!isControlled) setInternalIndex(index);
    onActiveIndexChange?.(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next !== null) {
      e.preventDefault();
      goTo(next);
      tabRefs.current[next]?.focus();
    }
  };

  const rootClass = [styles.root, onDarkBg && styles['root--dark'], className]
    .filter(Boolean)
    .join(' ');

  const tabBarOuterClass = [styles.tabBarOuter, sticky && styles['tabBarOuter--sticky']]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      style={{ '--st-tabs': items.length, ...style } as CSSProperties}
    >
      <div className={tabBarOuterClass}>
      <div className={styles.tabBar} role="tablist" aria-label={tablistLabel}>
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${uid}-panel-${i}`}
              id={`${uid}-tab-${i}`}
              tabIndex={isActive ? 0 : -1}
              className={[styles.tab, isActive && styles['tab--active']].filter(Boolean).join(' ')}
              onClick={() => goTo(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              <Text
                variant="body-m"
                weight={isActive ? 'medium' : 'regular'}
                color={isActive ? (onDarkBg ? 'white' : 'default') : (onDarkBg ? 'muted' : 'secondary')}
                className={styles.tabLabel}
              >
                {item.label}
              </Text>
            </button>
          );
        })}
      </div>
      </div>

      {items.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={i}
            id={`${uid}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${i}`}
            className={[styles.panel, !isActive && styles['panel--hidden']].filter(Boolean).join(' ')}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};

SectionTabs.displayName = 'SectionTabs';
