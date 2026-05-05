'use client';

import React, { useState, useLayoutEffect, useRef, CSSProperties } from 'react';
import { Text } from '../Typography/Text';
import { IconChevronRight } from '../../icons';
import styles from './Accordion.module.css';

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple items open at once */
  multiple?: boolean;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  onDarkBg = false,
  className,
  style,
}) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.height = openIndices.has(i) ? `${el.scrollHeight}px` : '0px';
    });
  }, [openIndices]);

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const rootCls = [
    styles.root,
    onDarkBg ? styles['root--dark'] : styles['root--light'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls} style={style}>
      {items.map((item, i) => {
        const isOpen = openIndices.has(i);
        return (
          <div
            key={i}
            className={[
              styles.item,
              onDarkBg ? styles['item--dark'] : styles['item--light'],
            ].filter(Boolean).join(' ')}
          >
            <button
              className={styles.question}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <Text
                variant="body-l"
                weight="medium"
                color={onDarkBg ? 'white' : 'default'}
                as="span"
              >
                {item.question}
              </Text>
              <span className={[styles.chevron, isOpen ? styles['chevron--open'] : ''].filter(Boolean).join(' ')}>
                <IconChevronRight color={onDarkBg ? '#ffffff' : '#101319'} />
              </span>
            </button>
            <div
              className={styles.panel}
              ref={(el) => { panelRefs.current[i] = el; }}
            >
              <div className={styles.panelInner}>
                <Text
                  variant="body-m"
                  color={onDarkBg ? 'muted' : 'secondary'}
                >
                  {item.answer}
                </Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
