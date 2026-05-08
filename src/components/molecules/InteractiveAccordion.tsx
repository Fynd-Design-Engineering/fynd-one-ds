'use client';

import React, {
  CSSProperties,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Text } from '../Typography/Text';
import { IcAdd, IcMinus } from '../../icons';
import { MediaHolder, MediaHolderLayer, MediaHolderAspectRatio } from '../atoms/MediaHolder';
import styles from './InteractiveAccordion.module.css';

export type { MediaHolderLayer as InteractiveAccordionMedia };

export interface InteractiveAccordionItem {
  question: ReactNode;
  answer: ReactNode;
  media: MediaHolderLayer;
}

export interface InteractiveAccordionProps {
  items: InteractiveAccordionItem[];
  /** Which side the media panel sits on (desktop only — mobile always renders
   *  media inline below the expanded item). Default `'right'`. */
  mediaSide?: 'left' | 'right';
  /** Aspect ratio of the media panel and inline media. Default `'portrait'` (3:4). */
  aspectRatio?: MediaHolderAspectRatio;
  /** Which item is open initially (uncontrolled). Default `0`. */
  defaultOpenIndex?: number;
  /** Controlled open index. */
  openIndex?: number;
  onOpenIndexChange?: (i: number) => void;
  /** Background color behind the media panel and inline media. */
  mediaBg?: string;
  /** How media fills its container. Default `'contain'`. */
  mediaObjectFit?: 'cover' | 'contain';
  /**
   * Drop the card shadow. Default `true`.
   * Pass `false` when the page bg is already tinted.
   * Ignored on dark — uses bg-color contrast instead.
   */
  shadow?: boolean;
  /** Inverted on dark sections — flips text/icon colors and dividers. */
  onDarkBg?: boolean;
  /** Semantic heading level for each accordion question. Default `'h3'`. */
  questionAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  style?: CSSProperties;
}

export const InteractiveAccordion: React.FC<InteractiveAccordionProps> = ({
  items,
  mediaSide = 'right',
  aspectRatio = 'portrait',
  defaultOpenIndex = 0,
  openIndex: controlledOpenIndex,
  onOpenIndexChange,
  mediaBg,
  mediaObjectFit = 'contain',
  shadow = true,
  onDarkBg = false,
  questionAs: QuestionTag = 'h3',
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
  const inlineVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Pause non-active videos to avoid burning CPU on hidden media.
  useEffect(() => {
    panelVideoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === openIndex) video.play().catch(() => {});
      else video.pause();
    });
    inlineVideoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === openIndex) video.play().catch(() => {});
      else video.pause();
    });
  }, [openIndex]);

  // JS-driven panel height animation.
  useLayoutEffect(() => {
    panelRefs.current.forEach((el, idx) => {
      if (!el) return;
      const inner = el.firstElementChild as HTMLElement | null;
      const target = inner?.scrollHeight ?? 0;
      el.style.height = idx === openIndex ? `${target}px` : '0px';
    });
  }, [openIndex]);

  // Keep open panel in sync when content reflows (images / fonts load).
  useEffect(() => {
    const observers: ResizeObserver[] = [];
    panelRefs.current.forEach((el, idx) => {
      if (!el) return;
      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner) return;
      const ro = new ResizeObserver(() => {
        if (idx === openIndex && el.style.height !== '0px') {
          el.style.height = `${inner.scrollHeight}px`;
        }
      });
      ro.observe(inner);
      observers.push(ro);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [openIndex, items]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
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

  const outerCls = [
    styles.outer,
    !onDarkBg && shadow && styles['outer--shadow'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootCls = [
    styles.root,
    mediaSide === 'left' ? styles['media-left'] : styles['media-right'],
    onDarkBg ? styles['root--dark'] : styles['root--light'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={outerCls} style={style}>
      <div className={rootCls}>
        <div
          className={styles.mediaPanel}
          style={mediaBg ? { background: mediaBg } : undefined}
        >
          <MediaHolder
            aspectRatio={aspectRatio}
            layers={items.map((i) => i.media)}
            activeIndex={openIndex}
            videoRef={(el, i) => {
              panelVideoRefs.current[i] = el;
            }}
            background={mediaBg}
            objectFit={mediaObjectFit}
          />
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
                <QuestionTag className={styles.questionHeading}>
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
                    {typeof item.question === 'string' ? (
                      <Text
                        variant="body-xl"
                        weight="medium"
                        color={onDarkBg ? 'white' : 'default'}
                        as="span"
                      >
                        {item.question}
                      </Text>
                    ) : (
                      item.question
                    )}
                    <span className={styles.toggleIcon} aria-hidden="true">
                      {isOpen ? <IcMinus /> : <IcAdd />}
                    </span>
                  </button>
                </QuestionTag>

                <div
                  ref={(el) => {
                    panelRefs.current[idx] = el;
                  }}
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={styles.panel}
                >
                  <div className={styles.panelInner}>
                    {typeof item.answer === 'string' ? (
                      <Text
                        variant="body-m"
                        color={onDarkBg ? 'muted' : 'secondary'}
                        as="p"
                      >
                        {item.answer}
                      </Text>
                    ) : (
                      item.answer
                    )}
                    <div
                      className={styles.inlineMedia}
                      style={mediaBg ? { background: mediaBg } : undefined}
                    >
                      <MediaHolder
                        aspectRatio={aspectRatio}
                        layers={[item.media]}
                        activeIndex={0}
                        videoRef={(el) => {
                          inlineVideoRefs.current[idx] = el;
                        }}
                        background={mediaBg}
                        objectFit={mediaObjectFit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

InteractiveAccordion.displayName = 'InteractiveAccordion';
export default InteractiveAccordion;
