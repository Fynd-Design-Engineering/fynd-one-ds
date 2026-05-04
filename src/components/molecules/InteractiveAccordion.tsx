'use client';

import React, {
  CSSProperties,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Text } from '../Typography/Text';
import { IcAdd, IcMinus } from '../../icons';
import styles from './InteractiveAccordion.module.css';

export interface InteractiveAccordionMedia {
  type: 'image' | 'video';
  src: string;
  /** Required for type === 'image'; ignored for video. */
  alt?: string;
  /** Optional poster for video. */
  poster?: string;
}

export interface InteractiveAccordionItem {
  question: string;
  answer: string;
  media: InteractiveAccordionMedia;
}

export interface InteractiveAccordionProps {
  items: InteractiveAccordionItem[];
  /** Which side the media panel sits on (desktop/tablet only — mobile
   *  always renders media inline below the expanded item). Default `'right'`. */
  mediaSide?: 'left' | 'right';
  /** Which item is open initially (uncontrolled). Default `0`. */
  defaultOpenIndex?: number;
  /** Controlled open index. When provided, the component is fully
   *  controlled by the consumer. */
  openIndex?: number;
  onOpenIndexChange?: (i: number) => void;
  /** Optional background fill behind the media panel — any CSS color. */
  mediaBg?: string;
  /** Inverted on dark sections — flips text/icon colors and dividers. */
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const InteractiveAccordion: React.FC<InteractiveAccordionProps> = ({
  items,
  mediaSide = 'right',
  defaultOpenIndex = 0,
  openIndex: controlledOpenIndex,
  onOpenIndexChange,
  mediaBg,
  onDarkBg = false,
  className,
  style,
}) => {
  const isControlled = controlledOpenIndex !== undefined;
  const [internalOpenIndex, setInternalOpenIndex] = useState(defaultOpenIndex);
  const openIndex = isControlled ? controlledOpenIndex : internalOpenIndex;

  const setOpenIndex = (i: number) => {
    if (!isControlled) setInternalOpenIndex(i);
    onOpenIndexChange?.(i);
  };

  const idBase = useId();
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);

  // Pause non-active videos so we don't burn CPU on hidden videos.
  useEffect(() => {
    panelVideoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === openIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    if (inlineVideoRef.current) {
      inlineVideoRef.current.play().catch(() => {});
    }
  }, [openIndex]);

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    let next: number | null = null;
    if (e.key === 'ArrowDown') next = (idx + 1) % items.length;
    else if (e.key === 'ArrowUp') next = (idx - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next !== null) {
      e.preventDefault();
      triggerRefs.current[next]?.focus();
    }
  };

  const rootCls = [
    styles.root,
    mediaSide === 'left' ? styles['media-left'] : styles['media-right'],
    onDarkBg ? styles['root--dark'] : styles['root--light'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderPanelMedia = (item: InteractiveAccordionItem, idx: number) => {
    if (item.media.type === 'video') {
      return (
        <video
          ref={(el) => {
            panelVideoRefs.current[idx] = el;
          }}
          src={item.media.src}
          poster={item.media.poster}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      );
    }
    return (
      <img
        src={item.media.src}
        alt={item.media.alt ?? ''}
        loading={idx === 0 ? 'eager' : 'lazy'}
        decoding="async"
        aria-hidden={idx !== openIndex}
      />
    );
  };

  const renderInlineMedia = (item: InteractiveAccordionItem) => {
    if (item.media.type === 'video') {
      return (
        <video
          ref={inlineVideoRef}
          src={item.media.src}
          poster={item.media.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      );
    }
    return (
      <img
        src={item.media.src}
        alt={item.media.alt ?? ''}
        loading="lazy"
        decoding="async"
      />
    );
  };

  return (
    <div className={rootCls} style={style}>
      <div
        className={styles.mediaPanel}
        style={mediaBg ? { background: mediaBg } : undefined}
      >
        <div className={styles.mediaCanvas}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className={[
                styles.mediaSlot,
                idx === openIndex ? styles['mediaSlot--active'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {renderPanelMedia(item, idx)}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.list}>
        {items.map((item, idx) => {
          const isOpen = idx === openIndex;
          const triggerId = `${idBase}-trigger-${idx}`;
          const panelId = `${idBase}-panel-${idx}`;
          return (
            <div
              key={idx}
              className={[styles.item, isOpen ? styles['item--open'] : '']
                .filter(Boolean)
                .join(' ')}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[idx] = el;
                }}
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={styles.trigger}
                type="button"
              >
                <Text
                  variant="body-l"
                  weight="medium"
                  color={onDarkBg ? 'white' : 'default'}
                  as="span"
                >
                  {item.question}
                </Text>
                <span className={styles.toggleIcon} aria-hidden="true">
                  {isOpen ? <IcMinus /> : <IcAdd />}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                hidden={!isOpen}
                className={styles.panel}
              >
                <Text
                  variant="body-m"
                  color={onDarkBg ? 'muted' : 'secondary'}
                  as="p"
                >
                  {item.answer}
                </Text>
                {isOpen && (
                  <div
                    className={styles.inlineMedia}
                    style={mediaBg ? { background: mediaBg } : undefined}
                  >
                    {renderInlineMedia(item)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

InteractiveAccordion.displayName = 'InteractiveAccordion';

export default InteractiveAccordion;
