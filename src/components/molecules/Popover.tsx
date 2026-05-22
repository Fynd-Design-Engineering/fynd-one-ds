'use client';

import React, {
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset as offsetMiddleware,
  Placement,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import styles from './Popover.module.css';

export type PopoverPlacement = Placement;

export type PopoverRole = 'menu' | 'listbox' | 'dialog';

export interface PopoverProps {
  /** The element that toggles the popover. Must forward ref to its underlying DOM element. */
  trigger: ReactElement;
  /** Panel content. Arbitrary children — consumers compose their own list, form, etc. */
  children: ReactNode;
  /** Placement preference. Auto-flips on collision. Default 'bottom-start'. */
  placement?: PopoverPlacement;
  /** Pixel distance between trigger and panel. Default 8. */
  offset?: number;
  /** ARIA role. 'menu' / 'listbox' enable arrow-key navigation through children with role="menuitem" / "option". Default 'dialog'. */
  role?: PopoverRole;
  /** Dark background variant — panel background, border and divider colors invert. */
  onDarkBg?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Open state change handler (controlled or uncontrolled) */
  onOpenChange?: (open: boolean) => void;
  /** Default open state when uncontrolled. Default false. */
  defaultOpen?: boolean;
  /** Match panel width to trigger width. Default false. */
  matchTriggerWidth?: boolean;
  /** Explicit panel width (px or CSS length). Overrides matchTriggerWidth. */
  width?: number | string;
  /** Disable the focus trap inside the panel. Default false (trap is on). */
  disableFocusTrap?: boolean;
  /** Modal mode — clicks outside the panel are blocked from reaching the page until close. Default false. */
  modal?: boolean;
  /** Optional className applied to the panel */
  className?: string;
  /** Optional inline styles applied to the panel */
  style?: CSSProperties;
}

const isMenuRole = (role: PopoverRole) => role === 'menu' || role === 'listbox';

/**
 * Collect focusable list items from the panel for keyboard navigation
 * when the popover is in 'menu' or 'listbox' mode. Items are matched by
 * their ARIA role so consumers can author them naturally:
 *
 *   <button role="menuitem">…</button>
 *   <li role="option">…</li>
 */
const itemSelector = '[role="menuitem"], [role="option"]';

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  placement = 'bottom-start',
  offset = 8,
  role = 'dialog',
  onDarkBg = false,
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  matchTriggerWidth = false,
  width,
  disableFocusTrap = false,
  modal = false,
  className,
  style,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const panelId = useId();
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetMiddleware(offset),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        padding: 8,
        apply({ availableHeight, availableWidth, rects, elements }) {
          const cappedHeight = Math.max(160, Math.min(availableHeight, 480));
          Object.assign(elements.floating.style, {
            maxHeight: `${cappedHeight}px`,
            maxWidth: `${availableWidth}px`,
            overflowY: 'auto',
          });
          if (matchTriggerWidth || width !== undefined) {
            elements.floating.style.width =
              typeof width === 'number'
                ? `${width}px`
                : typeof width === 'string'
                  ? width
                  : `${rects.reference.width}px`;
          }
        },
      }),
    ],
  });

  const click = useClick(context, { event: 'click' });
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const roleHook = useRole(context, { role });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    enabled: isMenuRole(role),
    loop: true,
    virtual: false,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    roleHook,
    listNav,
  ]);

  // Refresh listRef when the panel opens / children change so list-nav targets
  // the freshly rendered items.
  const collectItems = (node: HTMLElement | null) => {
    if (!node) {
      listRef.current = [];
      return;
    }
    listRef.current = Array.from(node.querySelectorAll<HTMLElement>(itemSelector));
  };

  const triggerRef = useMergeRefs([
    refs.setReference,
    // Forward ref to the original trigger element if it accepts one.
    isValidElement(trigger) ? (trigger as ReactElement & { ref?: Ref<unknown> }).ref ?? null : null,
  ]);

  const triggerWithProps = useMemo(() => {
    if (!isValidElement(trigger)) return trigger;
    const referenceProps = getReferenceProps({
      'aria-expanded': open,
      'aria-haspopup': role,
      'aria-controls': open ? panelId : undefined,
    } as React.HTMLAttributes<HTMLElement>);
    return cloneElement(trigger as ReactElement, {
      ref: triggerRef,
      ...referenceProps,
    });
  }, [trigger, getReferenceProps, open, role, panelId, triggerRef]);

  const panelClass = [
    styles.panel,
    onDarkBg && styles['panel--dark'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {triggerWithProps}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={modal}
            disabled={disableFocusTrap}
            initialFocus={isMenuRole(role) ? -1 : 0}
            returnFocus
          >
            <div
              ref={(node) => {
                refs.setFloating(node);
                collectItems(node);
              }}
              id={panelId}
              className={panelClass}
              style={{ ...floatingStyles, visibility: isPositioned ? 'visible' : 'hidden', ...style }}
              {...getFloatingProps()}
            >
              <div className={styles['panel-inner']}>
                <PopoverItemContext.Provider value={{ getItemProps, isMenuRole: isMenuRole(role) }}>
                  {children}
                </PopoverItemContext.Provider>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
};

/**
 * Internal context — exposed only for advanced consumers that want to
 * forward Floating UI's interaction props onto custom item components.
 * Most consumers can just author plain elements with role="menuitem".
 */
interface PopoverItemContextValue {
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
  isMenuRole: boolean;
}

const PopoverItemContext = React.createContext<PopoverItemContextValue | null>(null);

export const usePopoverItemProps = () => {
  const ctx = React.useContext(PopoverItemContext);
  if (!ctx || !ctx.isMenuRole) return undefined;
  return ctx.getItemProps;
};

Popover.displayName = 'Popover';

export default Popover;
