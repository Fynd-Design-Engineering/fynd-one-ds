'use client';

import React, { CSSProperties, useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Text } from '../Typography/Text';
import styles from './TestimonialTabs.module.css';

export interface TestimonialTabsItem {
  /** Brand/company name — used for tab/panel aria-label */
  brand: string;
  /** Logo slot — pass any ReactNode: <img>, <svg>, a component, etc. */
  logo: React.ReactNode;
  /** Testimonial quote text */
  quote: string;
  /** Author attribution line, e.g. "Jane Doe, CEO at Acme" */
  author: string;
}

export interface TestimonialTabsProps {
  items: TestimonialTabsItem[];
  /** Auto-advance interval in ms. Default: 6000. Set to 0 to disable auto-advance. */
  interval?: number;
  /** Controlled active index */
  activeIndex?: number;
  /** Default active index for uncontrolled mode. Default: 0. */
  defaultActiveIndex?: number;
  /** Called when the active tab changes */
  onActiveIndexChange?: (index: number) => void;
  /** aria-label for the tablist. Default: 'Testimonials'. */
  tablistLabel?: string;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const TestimonialTabs: React.FC<TestimonialTabsProps> = ({
  items,
  interval = 6000,
  activeIndex: controlledIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  tablistLabel = 'Testimonials',
  onDarkBg = false,
  className,
  style,
}) => {
  const uid = useId();
  const isControlled = controlledIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex = isControlled ? controlledIndex! : internalIndex;

  // Incrementing this key restarts the CSS progress animation and the setTimeout timer
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const autoAdvance = interval > 0 && Number.isFinite(interval);

  const goTo = useCallback(
    (index: number) => {
      if (!isControlled) setInternalIndex(index);
      onActiveIndexChange?.(index);
      setTimerResetKey((k) => k + 1);
    },
    [isControlled, onActiveIndexChange],
  );

  useEffect(() => {
    if (!autoAdvance || isPaused) return;
    const id = setTimeout(() => {
      goTo((activeIndex + 1) % items.length);
    }, interval);
    return () => clearTimeout(id);
    // timerResetKey resets the timer whenever the active tab changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerResetKey, autoAdvance, isPaused, interval, items.length]);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % items.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next !== null) {
      e.preventDefault();
      goTo(next);
      tabRefs.current[next]?.focus();
    }
  };

  const activeItem = items[activeIndex] ?? items[0];
  const panelId = `${uid}-panel`;

  const rootClass = [
    styles.root,
    isPaused && styles['root--paused'],
    onDarkBg && styles['root--dark'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    '--tt-interval': `${interval}ms`,
    '--tt-tabs': items.length,
    ...style,
  } as CSSProperties;

  const renderFill = (key: string) => (
    <div
      key={key}
      className={[
        styles.progressFill,
        autoAdvance && styles['progressFill--animating'],
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );

  return (
    <div
      className={rootClass}
      style={rootStyle}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Desktop: horizontal tab row + single panel ── */}
      <div className={styles.tabRow} role="tablist" aria-label={tablistLabel}>
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              ref={(el) => { tabRefs.current[i] = el; }}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              id={`${uid}-tab-${i}`}
              tabIndex={isActive ? 0 : -1}
              className={[styles.tab, isActive && styles['tab--active']].filter(Boolean).join(' ')}
              onClick={() => goTo(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              <div className={styles.logoWrap}>{item.logo}</div>
              <div className={styles.progressTrack}>
                {isActive ? renderFill(`fill-${timerResetKey}`) : <div className={styles.progressFill} />}
              </div>
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${activeIndex}`}
        aria-label={activeItem.brand}
        className={styles.panel}
      >
        <Text variant="body-xl" as="blockquote" color={onDarkBg ? 'white' : 'default'} className={styles.quote}>
          {activeItem.quote}
        </Text>
        <Text variant="body-m" as="p" color={onDarkBg ? 'muted' : 'secondary'} className={styles.author}>
          {activeItem.author}
        </Text>
      </div>

      {/* ── Tablet/mobile: stacked accordion ── */}
      <div className={styles.accordionList}>
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              className={[styles.accordionItem, isActive && styles['accordionItem--active']].filter(Boolean).join(' ')}
            >
              <button
                className={[styles.accordionTab, isActive && styles['accordionTab--active']].filter(Boolean).join(' ')}
                onClick={() => goTo(i)}
                aria-expanded={isActive}
                aria-controls={`${uid}-acc-panel-${i}`}
                id={`${uid}-acc-tab-${i}`}
              >
                <div className={styles.logoWrap}>{item.logo}</div>
                <div className={styles.progressTrack}>
                  {isActive ? renderFill(`acc-fill-${timerResetKey}`) : <div className={styles.progressFill} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="panel"
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      id={`${uid}-acc-panel-${i}`}
                      role="region"
                      aria-labelledby={`${uid}-acc-tab-${i}`}
                      className={styles.accordionPanel}
                    >
                      <Text variant="body-xl" as="blockquote" color={onDarkBg ? 'white' : 'default'} className={styles.quote}>
                        {item.quote}
                      </Text>
                      <Text variant="body-m" as="p" color={onDarkBg ? 'muted' : 'secondary'} className={styles.author}>
                        {item.author}
                      </Text>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TestimonialTabs.displayName = 'TestimonialTabs';
