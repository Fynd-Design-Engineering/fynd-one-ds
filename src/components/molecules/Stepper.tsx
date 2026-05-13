'use client';

import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import styles from './Stepper.module.css';

export type StepperVariant = 'DotTrail' | 'NodeLink' | 'NodeSolo' | 'CountFlow';

export interface StepperItem {
  title: string;
  subtext?: string;
  /** Icon/image ReactNode — rendered inside the 40px node slot for NodeLink and NodeSolo. */
  icon?: ReactNode;
}

export interface StepperProps {
  items: StepperItem[];
  variant?: StepperVariant;
  /**
   * Index of the "current" step. Items at index ≤ activeIndex render active/dark;
   * items above render muted. Ignored in animated mode.
   * Default: 0.
   */
  activeIndex?: number;
  /**
   * Auto-cycles through steps with a connector-fill animation.
   * Works on DotTrail, NodeLink, and CountFlow. NodeSolo has no connectors so this has no effect.
   * Default: false.
   */
  animated?: boolean;
  /**
   * Time each step stays active (in ms) before the connector fill begins.
   * Default: 2500.
   */
  stepDuration?: number;
  /** Semantic heading level for each step title. Default: 'h3'. */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Stepper: React.FC<StepperProps> = ({
  items,
  variant = 'DotTrail',
  activeIndex: controlledActiveIndex = 0,
  animated = false,
  stepDuration = 2500,
  titleAs: TitleTag = 'h3',
  onDarkBg = false,
  className,
  style,
}) => {
  const hasConnector = variant !== 'NodeSolo';
  const shouldAnimate = animated && hasConnector;

  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const [fillingIndex, setFillingIndex] = useState(-1);

  const activeIdx = shouldAnimate ? internalActiveIndex : controlledActiveIndex;

  useEffect(() => {
    if (!shouldAnimate) return;

    // Fill starts immediately; advance to the next step once fill completes.
    setFillingIndex(internalActiveIndex);

    const fillTimer = setTimeout(() => {
      setFillingIndex(-1);
      setInternalActiveIndex((prev) => (prev + 1) % items.length);
    }, stepDuration);

    return () => clearTimeout(fillTimer);
  }, [internalActiveIndex, shouldAnimate, stepDuration, items.length]);

  const rootClass = [styles.root, onDarkBg && styles.dark, className].filter(Boolean).join(' ');

  return (
    <div
      className={rootClass}
      style={{ '--fds-stepper-fill-duration': `${stepDuration}ms`, ...style } as CSSProperties}
    >
      {items.map((item, idx) => {
        const isMuted = idx > activeIdx;
        const isLast = idx === items.length - 1;
        const showConnector = hasConnector && !isLast;

        const connectorFillClass = [
          styles['connector__fill'],
          idx < activeIdx && styles['connector__fill--done'],
          idx === fillingIndex && styles['connector__fill--animating'],
        ]
          .filter(Boolean)
          .join(' ');


        return (
          <div key={idx} className={styles.step}>
            {/* Indicator column */}
            <div className={styles.indicator}>
              {variant === 'DotTrail' && (
                <div
                  className={[styles.dot, isMuted && styles['dot--muted']]
                    .filter(Boolean)
                    .join(' ')}
                />
              )}

              {variant === 'CountFlow' && (
                <div
                  className={[styles.count, isMuted && styles['count--muted']]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
              )}

              {(variant === 'NodeLink' || variant === 'NodeSolo') && (
                <div
                  className={[styles.node, isMuted && styles['node--muted']]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {item.icon}
                </div>
              )}

              {showConnector && (
                <div className={styles.connector}>
                  {/* muted dashed track */}
                  <svg className={styles.connectorSvg} aria-hidden="true">
                    <line className={styles.connectorTrack} x1="1" y1="0" x2="1" y2="100%" />
                  </svg>
                  {/* fill SVG — clip-path reveals dashes top→bottom */}
                  <svg className={connectorFillClass} aria-hidden="true">
                    <line className={styles.connectorFillLine} x1="1" y1="0" x2="1" y2="100%" />
                  </svg>
                </div>
              )}
            </div>

            {/* Text column */}
            <div className={styles.text}>
              <TitleTag className={styles.title}>{item.title}</TitleTag>
              {item.subtext && <p className={styles.subtext}>{item.subtext}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Stepper.displayName = 'Stepper';
export default Stepper;
