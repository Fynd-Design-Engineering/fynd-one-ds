'use client';

import React, {
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FloatingPortal } from '@floating-ui/react';
import styles from './Modal.module.css';

export interface ModalProps {
  /** Element that opens the modal on click. Cloned to inject onClick — if you also pass an onClick on the trigger, both will run. */
  trigger?: ReactElement;
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Open-state change handler — fires for both controlled and uncontrolled modes */
  onOpenChange?: (open: boolean) => void;
  /** Modal body */
  children: ReactNode;
  /** Modal width — number is treated as px, string used verbatim. Defaults to 550. */
  width?: number | string;
  /** Show the built-in close (×) button. Default true. */
  showClose?: boolean;
  /** Click on the overlay closes the modal. Default true. */
  closeOnOverlayClick?: boolean;
  /** Hide the page scroll while the modal is open. Default true. */
  lockScroll?: boolean;
  /** Optional className applied to the inner modal box (the white card). */
  className?: string;
  /** Optional inline styles applied to the inner modal box. */
  style?: CSSProperties;
  /** Accessible label — used for aria-label on the dialog when no visible heading exists. */
  ariaLabel?: string;
  /** ID of an element inside `children` to use as aria-labelledby. */
  ariaLabelledBy?: string;
}

const SPRING = { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const };
const MOBILE_QUERY = '(max-width: 767px)';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);
  return isMobile;
};

const CloseGlyph = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path
      d="M5.33333 6.21917L1.06868 10.484C0.952253 10.6003 0.805909 10.6599 0.629652 10.6627C0.453534 10.6653 0.304528 10.6058 0.182633 10.484C0.0608776 10.3621 0 10.2145 0 10.041C0 9.86755 0.0608776 9.71988 0.182633 9.59798L4.44749 5.33333L0.182633 1.06868C0.0663418 0.952254 0.00679535 0.805909 0.00399317 0.629652C0.00133109 0.453534 0.0608776 0.304528 0.182633 0.182633C0.304528 0.0608776 0.452203 0 0.625658 0C0.799114 0 0.946789 0.0608776 1.06868 0.182633L5.33333 4.44749L9.59798 0.182633C9.71441 0.0663418 9.86076 0.00679535 10.037 0.00399317C10.2131 0.00133109 10.3621 0.0608776 10.484 0.182633C10.6058 0.304528 10.6667 0.452203 10.6667 0.625659C10.6667 0.799114 10.6058 0.94679 10.484 1.06868L6.21917 5.33333L10.484 9.59798C10.6003 9.71441 10.6599 9.86076 10.6627 10.037C10.6653 10.2131 10.6058 10.3621 10.484 10.484C10.3621 10.6058 10.2145 10.6667 10.041 10.6667C9.86755 10.6667 9.71988 10.6058 9.59798 10.484L5.33333 6.21917Z"
      fill="currentColor"
    />
  </svg>
);

export const Modal: React.FC<ModalProps> = ({
  trigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  width = 550,
  showClose = true,
  closeOnOverlayClick = true,
  lockScroll = true,
  className,
  style,
  ariaLabel,
  ariaLabelledBy,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const cardRef = useRef<HTMLDivElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const cardInitial = isMobile
    ? { y: '100%' as const, opacity: 1 }
    : { opacity: 0, scale: 0.96, y: 12 };
  const cardAnimate = isMobile
    ? { y: 0, opacity: 1 }
    : { opacity: 1, scale: 1, y: 0 };
  const cardExit = cardInitial;

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );

  // Esc closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, setOpen]);

  // Body scroll lock + focus management
  useEffect(() => {
    if (!open || !lockScroll) return;
    const prev = document.body.style.overflow;
    previousFocus.current = (document.activeElement as HTMLElement) ?? null;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      // Restore focus to the trigger.
      previousFocus.current?.focus?.();
    };
  }, [open, lockScroll]);

  // Initial focus: first focusable element inside the card so keyboard users
  // start on a meaningful field (typically the first input). The close button
  // is rendered last in DOM order so it falls to the end of the tab cycle.
  useEffect(() => {
    if (!open) return;
    const card = cardRef.current;
    if (!card) return;
    const focusables = card.querySelectorAll<HTMLElement>(
      'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    // Skip the close button (rendered last but appears in this list); pick
    // the first focusable that is NOT the close button.
    const firstField = Array.from(focusables).find(
      (el) => !el.closest(`.${styles.close}`)
    );
    (firstField ?? card).focus({ preventScroll: true });
  }, [open]);

  const triggerWithClick =
    isValidElement(trigger) ?
      cloneElement(trigger as ReactElement<{ onClick?: (e: React.MouseEvent) => void }>, {
        onClick: (e: React.MouseEvent) => {
          (trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
          setOpen(true);
        },
      })
    : null;

  const widthValue = typeof width === 'number' ? `${width}px` : width;

  return (
    <>
      {triggerWithClick}
      <AnimatePresence>
        {open && (
          <FloatingPortal>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
              onClick={(e) => {
                if (!closeOnOverlayClick) return;
                if (e.target === e.currentTarget) setOpen(false);
              }}
            >
              <motion.div
                ref={cardRef}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabelledBy ? undefined : ariaLabel}
                aria-labelledby={ariaLabelledBy}
                tabIndex={-1}
                className={[styles.card, className].filter(Boolean).join(' ')}
                style={{ width: isMobile ? undefined : widthValue, ...style }}
                initial={cardInitial}
                animate={cardAnimate}
                exit={cardExit}
                transition={SPRING}
              >
                {/* Scrollable region — children render first so the natural
                    tab order starts at the first focusable inside the user's
                    content (e.g. the first form field). */}
                <div className={styles.scroll}>{children}</div>
              </motion.div>
              {/* Close button is rendered as a sibling of the card so it
                  sits OUTSIDE the modal — top-right corner of the overlay
                  on desktop, centered above the bottom-sheet on mobile.
                  Order keeps it last in tab sequence. */}
              {showClose && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={styles.close}
                  aria-label="Close"
                >
                  <CloseGlyph />
                </button>
              )}
            </motion.div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  );
};

Modal.displayName = 'Modal';

export default Modal;
