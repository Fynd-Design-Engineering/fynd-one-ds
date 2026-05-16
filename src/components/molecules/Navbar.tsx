'use client';

import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Text } from '../Typography/Text';
import { IcArrowForward, IcChevronLeft, IcChevronRight, IcChevronDown } from '../../assets/icons/navigation';
import fyndHorizontalDark from '../../assets/brand-logos/fynd-horizontal-dark.svg';
import styles from './Navbar.module.css';

const NavFootLogo: React.FC = () => (
  <img src={fyndHorizontalDark} alt="" />
);

// Local 32×32 menu / close icons drawn inside a circle ring (Fynd marketing
// site mobile-nav style). Inline so they don't pollute the icons barrel.
const NavMenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path
      d="M31.3333 16C31.3333 7.5317 24.4683 0.6667 16 0.6667 7.5316 0.6667 0.6667 7.5317 0.6667 16 0.6667 24.4684 7.5316 31.3333 16 31.3333 24.4683 31.3333 31.3333 24.4684 31.3333 16Z"
      stroke="currentColor"
      strokeWidth="1.33333"
    />
    <path
      d="M10.5017 22.8028C10.0934 22.8028 9.7439 22.6573 9.4531 22.3665 9.1624 22.0757 9.017 21.7263 9.017 21.318 9.017 20.9097 9.1624 20.5601 9.4531 20.2693 9.7439 19.9787 10.0934 19.8332 10.5017 19.8332 10.91 19.8332 11.2595 19.9787 11.5503 20.2693 11.8411 20.5601 11.9865 20.9097 11.9865 21.318 11.9865 21.7263 11.8411 22.0757 11.5503 22.3665 11.2595 22.6573 10.91 22.8028 10.5017 22.8028ZM16.017 22.8028C15.6087 22.8028 15.2591 22.6573 14.9684 22.3665 14.6776 22.0757 14.5322 21.7263 14.5322 21.318 14.5322 20.9097 14.6776 20.5601 14.9684 20.2693 15.2591 19.9787 15.6087 19.8332 16.017 19.8332 16.4252 19.8332 16.7748 19.9787 17.0655 20.2693 17.3563 20.5601 17.5018 20.9097 17.5018 21.318 17.5018 21.7263 17.3563 22.0757 17.0655 22.3665 16.7748 22.6573 16.4252 22.8028 16.017 22.8028ZM21.5322 22.8028C21.1239 22.8028 20.7744 22.6573 20.4836 22.3665 20.1928 22.0757 20.0475 21.7263 20.0475 21.318 20.0475 20.9097 20.1928 20.5601 20.4836 20.2693 20.7744 19.9787 21.1239 19.8332 21.5322 19.8332 21.9404 19.8332 22.29 19.9787 22.5808 20.2693 22.8716 20.5601 23.017 20.9097 23.017 21.318 23.017 21.7263 22.8716 22.0757 22.5808 22.3665 22.29 22.6573 21.9404 22.8028 21.5322 22.8028ZM10.5017 17.2875C10.0934 17.2875 9.7439 17.1421 9.4531 16.8513 9.1624 16.5605 9.017 16.2111 9.017 15.8028 9.017 15.3944 9.1624 15.0449 9.4531 14.7541 9.7439 14.4633 10.0934 14.318 10.5017 14.318 10.91 14.318 11.2595 14.4633 11.5503 14.7541 11.8411 15.0449 11.9865 15.3944 11.9865 15.8028 11.9865 16.2111 11.8411 16.5605 11.5503 16.8513 11.2595 17.1421 10.91 17.2875 10.5017 17.2875ZM16.017 17.2875C15.6087 17.2875 15.2591 17.1421 14.9684 16.8513 14.6776 16.5605 14.5322 16.2111 14.5322 15.8028 14.5322 15.3944 14.6776 15.0449 14.9684 14.7541 15.2591 14.4633 15.6087 14.318 16.017 14.318 16.4252 14.318 16.7748 14.4633 17.0655 14.7541 17.3563 15.0449 17.5018 15.3944 17.5018 15.8028 17.5018 16.2111 17.3563 16.5605 17.0655 16.8513 16.7748 17.1421 16.4252 17.2875 16.017 17.2875ZM21.5322 17.2875C21.1239 17.2875 20.7744 17.1421 20.4836 16.8513 20.1928 16.5605 20.0475 16.2111 20.0475 15.8028 20.0475 15.3944 20.1928 15.0449 20.4836 14.7541 20.7744 14.4633 21.1239 14.318 21.5322 14.318 21.9404 14.318 22.29 14.4633 22.5808 14.7541 22.8716 15.0449 23.017 15.3944 23.017 15.8028 23.017 16.2111 22.8716 16.5605 22.5808 16.8513 22.29 17.1421 21.9404 17.2875 21.5322 17.2875ZM10.5017 11.7722C10.0934 11.7722 9.7439 11.6269 9.4531 11.3361 9.1624 11.0453 9.017 10.6958 9.017 10.2875 9.017 9.8792 9.1624 9.5297 9.4531 9.2389 9.7439 8.9481 10.0934 8.8027 10.5017 8.8027 10.91 8.8027 11.2595 8.9481 11.5503 9.2389 11.8411 9.5297 11.9865 9.8792 11.9865 10.2875 11.9865 10.6958 11.8411 11.0453 11.5503 11.3361 11.2595 11.6269 10.91 11.7722 10.5017 11.7722ZM16.017 11.7722C15.6087 11.7722 15.2591 11.6269 14.9684 11.3361 14.6776 11.0453 14.5322 10.6958 14.5322 10.2875 14.5322 9.8792 14.6776 9.5297 14.9684 9.2389 15.2591 8.9481 15.6087 8.8027 16.017 8.8027 16.4252 8.8027 16.7748 8.9481 17.0655 9.2389 17.3563 9.5297 17.5018 9.8792 17.5018 10.2875 17.5018 10.6958 17.3563 11.0453 17.0655 11.3361 16.7748 11.6269 16.4252 11.7722 16.017 11.7722ZM21.5322 11.7722C21.1239 11.7722 20.7744 11.6269 20.4836 11.3361 20.1928 11.0453 20.0475 10.6958 20.0475 10.2875 20.0475 9.8792 20.1928 9.5297 20.4836 9.2389 20.7744 8.9481 21.1239 8.8027 21.5322 8.8027 21.9404 8.8027 22.29 8.9481 22.5808 9.2389 22.8716 9.5297 23.017 9.8792 23.017 10.2875 23.017 10.6958 22.8716 11.0453 22.5808 11.3361 22.29 11.6269 21.9404 11.7722 21.5322 11.7722Z"
      fill="currentColor"
    />
  </svg>
);

const NavCloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path
      d="M31.3333 16C31.3333 7.5317 24.4683 0.6667 16 0.6667 7.5316 0.6667 0.6667 7.5317 0.6667 16 0.6667 24.4684 7.5316 31.3333 16 31.3333 24.4683 31.3333 31.3333 24.4684 31.3333 16Z"
      stroke="currentColor"
      strokeWidth="1.33333"
    />
    <path
      d="M16 17.0535L10.927 22.1268C10.7885 22.2651 10.6144 22.3359 10.4048 22.3393 10.1953 22.3424 10.018 22.2716 9.873 22.1268 9.7282 21.9818 9.6558 21.8061 9.6558 21.5998 9.6558 21.3934 9.7282 21.2178 9.873 21.0728L14.9463 15.9998 9.873 10.9268C9.7347 10.7883 9.6638 10.6142 9.6605 10.4045 9.6574 10.195 9.7282 10.0178 9.873 9.8728 10.018 9.7279 10.1937 9.6555 10.4 9.6555 10.6063 9.6555 10.782 9.7279 10.927 9.8728L16 14.946 21.073 9.8728C21.2115 9.7344 21.3856 9.6636 21.5953 9.6603 21.8048 9.6571 21.982 9.7279 22.127 9.8728 22.2718 10.0178 22.3443 10.1934 22.3443 10.3998 22.3443 10.6061 22.2718 10.7818 22.127 10.9268L17.0538 15.9998 22.127 21.0728C22.2653 21.2113 22.3362 21.3854 22.3395 21.595 22.3427 21.8045 22.2718 21.9818 22.127 22.1268 21.982 22.2716 21.8063 22.344 21.6 22.344 21.3937 22.344 21.218 22.2716 21.073 22.1268L16 17.0535Z"
      fill="currentColor"
    />
  </svg>
);

export interface NavDropdownLink {
  title: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

export interface NavCategory {
  key: string;
  label: string;
  icon?: ReactNode;
  links: NavDropdownLink[];
}

export interface NavDirectItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavMegaDropdownItem {
  label: string;
  type: 'mega';
  categories: NavCategory[];
  bottomLinks?: NavDropdownLink[];
  /** Panel width in px. Defaults to 1026. */
  width?: number;
}

export interface NavSimpleDropdownItem {
  label: string;
  type: 'simple';
  links: NavDropdownLink[];
  /** Panel width in px. Defaults to 490. */
  width?: number;
}

export type NavItem = NavDirectItem | NavMegaDropdownItem | NavSimpleDropdownItem;

export interface NavbarProps {
  /** Logo element — typically an <img> of the brand logo */
  logo?: ReactNode;
  /** When set, the logo is wrapped in an anchor pointing to this URL. */
  logoHref?: string;
  /** Navigation items — direct links, simple dropdowns, or mega dropdowns */
  navItems?: NavItem[];
  /** Right-side action elements (buttons, icons, etc.) */
  actions?: ReactNode;
  /** Right-side action elements shown only in mobile menu */
  mobileActions?: ReactNode;
  /** Dark background variant */
  onDarkBg?: boolean;
  /** Sticky positioning at top of viewport */
  sticky?: boolean;
  /**
   * Default `false`. By default the nav renders transparent (no blur,
   * no fill) while the page is at the top of its scroll, then fades
   * to the solid background once the user scrolls past
   * `scrollThreshold` pixels. Set to `true` to disable the
   * transparency behavior and always render with the solid bg.
   *
   * Pair the default scroll-aware behavior with `onDarkBg` if the
   * hero behind the nav is dark, so link colors stay readable.
   */
  alwaysSolidBg?: boolean;
  /** Pixels of scroll past which the nav fades to its solid bg. Default 8. */
  scrollThreshold?: number;
  /** Open this dropdown by default (label match). Useful for previews / Storybook. */
  defaultOpenDropdown?: string;
  className?: string;
  style?: CSSProperties;
}

const HOVER_CLOSE_DELAY = 120;

const isDropdown = (
  item: NavItem
): item is NavMegaDropdownItem | NavSimpleDropdownItem =>
  'type' in item && (item.type === 'mega' || item.type === 'simple');

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoHref,
  navItems = [],
  actions,
  mobileActions,
  onDarkBg = false,
  sticky = false,
  alwaysSolidBg = false,
  scrollThreshold = 8,
  defaultOpenDropdown,
  className,
  style,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(
    defaultOpenDropdown ?? null
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [dropdownX, setDropdownX] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const closeTimerRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  // Dark navbar: track hover + focus-within to drive Framer bg animation
  // and the .root--light-active CSS class (toggled with matching 400ms delay).
  const [isHovering, setIsHovering] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const [isLightActive, setIsLightActive] = useState(onDarkBg && !!defaultOpenDropdown);
  const lightTimerRef = useRef<number | null>(null);
  const isNavActive = isHovering || hasFocusWithin;
  const prevNavActiveRef = useRef(false);
  const navItemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const contentRef = useRef<HTMLDivElement | null>(null);

  const setNavItemRef = useCallback(
    (label: string) => (el: HTMLLIElement | null) => {
      if (el) navItemRefs.current.set(label, el);
      else navItemRefs.current.delete(label);
    },
    []
  );

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDropdown = useCallback((item: NavItem) => {
    if (!isDropdown(item)) return;
    clearCloseTimer();
    setActiveDropdown(item.label);
    if (item.type === 'mega' && item.categories.length > 0) {
      setActiveCategory((prev) => prev ?? item.categories[0].key);
    }
  }, []);

  const isPinned = !!defaultOpenDropdown;

  const scheduleClose = useCallback(() => {
    if (isPinned) return;
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
      setActiveCategory(null);
    }, HOVER_CLOSE_DELAY);
  }, [isPinned]);

  const closeDropdownNow = () => {
    if (isPinned) return;
    clearCloseTimer();
    setActiveDropdown(null);
    setActiveCategory(null);
  };

  useEffect(() => () => {
    clearCloseTimer();
    if (lightTimerRef.current !== null) window.clearTimeout(lightTimerRef.current);
  }, []);

  // Scroll-aware transparent variant. Hoisted above the light-active effect
  // so pastTopThreshold is in scope when that effect reads it.
  const scrollAware = !alwaysSolidBg;
  const [pastTopThreshold, setPastTopThreshold] = useState(false);
  useEffect(() => {
    if (!scrollAware || typeof window === 'undefined') return;
    const update = () => setPastTopThreshold(window.scrollY > scrollThreshold);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [scrollAware, scrollThreshold]);

  // Sync .root--light-active class with isNavActive + pastTopThreshold, but
  // delay removal by 400ms (120ms JS close timer + 280ms Framer exit) so child
  // element CSS transitions finish before the Framer bar animation darkens.
  useEffect(() => {
    if (!onDarkBg) return;
    const active = isNavActive || pastTopThreshold;
    const wasActive = prevNavActiveRef.current;
    prevNavActiveRef.current = active;
    if (active && !wasActive) {
      if (lightTimerRef.current !== null) { window.clearTimeout(lightTimerRef.current); lightTimerRef.current = null; }
      setIsLightActive(true);
    } else if (!active && wasActive) {
      lightTimerRef.current = window.setTimeout(() => {
        setIsLightActive(false);
        lightTimerRef.current = null;
      }, 250);
    }
  }, [isNavActive, pastTopThreshold, onDarkBg]);

  const handleNavMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleNavMouseLeave = useCallback(() => setIsHovering(false), []);
  const handleNavFocus = useCallback(() => setHasFocusWithin(true), []);
  const handleNavBlur = useCallback((e: React.FocusEvent) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node)) setHasFocusWithin(false);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      closeDropdownNow();
      setMobileOpen(false);
      setMobileSubMenu(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!activeDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) closeDropdownNow();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activeDropdown]);

  // Measure active trigger position so the panel aligns under it
  useLayoutEffect(() => {
    if (!activeDropdown || !rootRef.current) return;
    const trigger = navItemRefs.current.get(activeDropdown);
    if (!trigger) return;
    const tRect = trigger.getBoundingClientRect();
    const rRect = rootRef.current.getBoundingClientRect();
    setDropdownX(tRect.left - rRect.left);
  }, [activeDropdown]);

  // Measure content height so the panel animates from 0 → measured
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setContentHeight(el.offsetHeight);
    const obs = new ResizeObserver((entries) => {
      setContentHeight(entries[0].contentRect.height);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [activeDropdown, activeCategory]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setMobileSubMenu(null);
      setExpandedMobileCategory(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isTransparent = scrollAware && !pastTopThreshold && !activeDropdown;
  // On dark navbar, scrolling past threshold flips to light mode just like hover.
  const isDarkBarActive = isNavActive || pastTopThreshold;

  const rootClasses = [
    styles.root,
    onDarkBg && styles['root--dark'],
    onDarkBg && isLightActive && styles['root--light-active'],
    sticky && styles['root--sticky'],
    isTransparent && styles['root--transparent'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const darkTargetBg = isDarkBarActive
    ? '#ffffff'
    : isTransparent
      ? 'transparent'
      : '#101319';

  const activeItem = navItems.find(
    (item) => isDropdown(item) && item.label === activeDropdown
  ) as NavMegaDropdownItem | NavSimpleDropdownItem | undefined;

  const renderDropdownLink = (link: NavDropdownLink, withIcon = false) => {
    const arrow = (
      <span className={styles.dropdownLinkArrow} aria-hidden="true">
        <IcArrowForward />
      </span>
    );
    const content = (
      <>
        {withIcon && link.icon && <span className={styles.dropdownLinkIcon}>{link.icon}</span>}
        <span className={styles.dropdownLinkText}>
          <span className={styles.dropdownLinkTitleRow}>
            <Text variant="body-m" weight={withIcon ? 'regular' : 'medium'} color="default" as="span">
              {link.title}
            </Text>
            {!withIcon && arrow}
          </span>
          {link.description && (
            <Text variant="body-xs" color="secondary" as="span">
              {link.description}
            </Text>
          )}
        </span>
        {withIcon && (
          <span className={styles.dropdownLinkArrowSlot} aria-hidden="true">
            {arrow}
          </span>
        )}
      </>
    );

    const handleClick = () => {
      link.onClick?.();
      closeDropdownNow();
      setMobileOpen(false);
    };

    const className = [
      styles.dropdownLink,
      withIcon ? styles['dropdownLink--simple'] : styles['dropdownLink--mega'],
    ].join(' ');

    if (link.href) {
      return (
        <a
          key={link.title}
          className={className}
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          onClick={handleClick}
        >
          {content}
        </a>
      );
    }
    return (
      <button
        key={link.title}
        type="button"
        className={className}
        onClick={handleClick}
      >
        {content}
      </button>
    );
  };

  const renderMegaContent = (item: NavMegaDropdownItem) => {
    const active = item.categories.find((c) => c.key === activeCategory) ?? item.categories[0];
    return (
      <div className={styles.megaWrapper}>
        <div className={styles.megaInner}>
          <div className={styles.megaCategories} role="tablist">
            {item.categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={cat.key === active?.key}
                className={[
                  styles.megaCategory,
                  cat.key === active?.key && styles['megaCategory--active'],
                ]
                  .filter(Boolean)
                  .join(' ')}
                onMouseEnter={() => setActiveCategory(cat.key)}
                onFocus={() => setActiveCategory(cat.key)}
              >
                {cat.icon && <span className={styles.megaCategoryIcon}>{cat.icon}</span>}
                <Text variant="body-m" weight="regular" color="default" as="span">
                  {cat.label}
                </Text>
              </button>
            ))}
          </div>
          <div className={styles.megaContent}>
            <div className={styles.megaLinkGrid}>
              {active?.links.map((link) => renderDropdownLink(link))}
            </div>
          </div>
        </div>
        {/* megaBottom removed in current design — re-enable by uncommenting if the section returns */}
        {/* {item.bottomLinks && item.bottomLinks.length > 0 && (
          <div className={styles.megaBottom}>
            {item.bottomLinks.map((link) => renderDropdownLink(link))}
          </div>
        )} */}
      </div>
    );
  };

  const renderSimpleContent = (item: NavSimpleDropdownItem) => (
    <div className={styles.simpleWrapper}>
      <div className={styles.simpleList}>
        {item.links.map((link) => renderDropdownLink(link, true))}
      </div>
    </div>
  );

  const desktopNavItem = (item: NavItem) => {
    if (!isDropdown(item)) {
      const handleClick = (e: React.MouseEvent) => {
        if (!item.href) {
          e.preventDefault();
          item.onClick?.();
        } else if (item.onClick) {
          item.onClick();
        }
      };
      return (
        <li key={item.label} ref={setNavItemRef(item.label)}>
          <a
            className={styles.navLink}
            href={item.href ?? '#'}
            onClick={handleClick}
          >
            <Text variant="body-m" color={onDarkBg ? 'white' : 'secondary'} as="span">
              {item.label}
            </Text>
          </a>
        </li>
      );
    }
    const isActive = activeDropdown === item.label;
    return (
      <li
        key={item.label}
        ref={setNavItemRef(item.label)}
        className={styles.navItemWrapper}
        onMouseEnter={() => openDropdown(item)}
        onMouseLeave={scheduleClose}
      >
        <button
          type="button"
          className={[styles.navLink, isActive && styles['navLink--active']]
            .filter(Boolean)
            .join(' ')}
          aria-expanded={isActive}
          aria-haspopup="true"
          onClick={() => (isActive ? closeDropdownNow() : openDropdown(item))}
        >
          <Text variant="body-m" color={onDarkBg ? 'white' : 'secondary'} as="span">
            {item.label}
          </Text>
        </button>
      </li>
    );
  };

  const activeMobileItem = navItems.find(
    (item) => isDropdown(item) && item.label === mobileSubMenu
  ) as NavMegaDropdownItem | NavSimpleDropdownItem | undefined;

  return (
    <>
    <motion.nav
      className={rootClasses}
      style={style}
      ref={rootRef}
      data-fds-component="navbar"
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
      onFocus={handleNavFocus}
      onBlur={handleNavBlur}
      animate={onDarkBg ? { backgroundColor: darkTargetBg, backdropFilter: 'none' } : undefined}
      transition={onDarkBg ? { duration: isDarkBarActive ? 0.25 : 0.15, delay: isDarkBarActive ? 0 : 0.1, ease: 'easeInOut' } : undefined}
    >
      <div className={styles.container}>
        {logo && (
          <div className={styles.logo}>
            {logoHref ? (
              <a href={logoHref} className={styles.logoLink} aria-label="Home">
                {logo}
              </a>
            ) : (
              logo
            )}
          </div>
        )}

        {navItems.length > 0 && (
          <ul className={styles.navLinks}>{navItems.map(desktopNavItem)}</ul>
        )}

        {actions && <div className={styles.actions}>{actions}</div>}

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen((v) => !v)}
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span
            className={[styles['menu-icon'], !mobileOpen && styles['menu-icon--visible']]
              .filter(Boolean)
              .join(' ')}
          >
            <NavMenuIcon />
          </span>
          <span
            className={[styles['menu-icon'], mobileOpen && styles['menu-icon--visible']]
              .filter(Boolean)
              .join(' ')}
          >
            <NavCloseIcon />
          </span>
        </button>
      </div>

      {/* SEO: all dropdown links rendered in DOM for crawlers (visually hidden, hidden from screen readers since visible nav already exposes them) */}
      <div className={styles.seoLinks} aria-hidden="true">
        {navItems.map((item) => {
          if (!isDropdown(item)) return null;
          const links: NavDropdownLink[] =
            item.type === 'mega'
              ? [...item.categories.flatMap((c) => c.links), ...(item.bottomLinks ?? [])]
              : item.links;
          return (
            <div key={item.label}>
              {links.map((link) =>
                link.href ? (
                  <a
                    key={link.title}
                    href={link.href}
                    tabIndex={-1}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {link.title}
                  </a>
                ) : null
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop dropdown panel — single persistent container anchored under the active trigger */}
      <AnimatePresence>
        {activeItem && (() => {
          const targetWidth =
            activeItem.width ?? (activeItem.type === 'mega' ? 1026 : 490);
          return (
            <motion.div
              key="dropdown-panel"
              className={styles.dropdownPanel}
              initial={{ opacity: 0, height: 0, width: targetWidth, x: dropdownX }}
              animate={{
                opacity: 1,
                width: targetWidth,
                height: contentHeight || 'auto',
                x: dropdownX,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
            >
              <div ref={contentRef} className={styles.dropdownContent}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {activeItem.type === 'mega'
                      ? renderMegaContent(activeItem)
                      : renderSimpleContent(activeItem)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </motion.nav>

      {/* Mobile menu — rendered as a sibling of <nav> so its
          position:fixed escapes the navbar root's containing block
          (backdrop-filter on .root creates one). */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={[styles.mobileOverlay, onDarkBg && styles['mobileOverlay--dark']]
              .filter(Boolean)
              .join(' ')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.mobileHeader}>
              {mobileSubMenu ? (
                <button
                  type="button"
                  className={styles.mobileBack}
                  onClick={() => setMobileSubMenu(null)}
                >
                  <IcChevronLeft />
                  <Text
                    variant="body-l"
                    weight="medium"
                    color={onDarkBg ? 'white' : 'default'}
                    as="span"
                  >
                    Go back
                  </Text>
                </button>
              ) : (
                <>
                  {logo && (
          <div className={styles.logo}>
            {logoHref ? (
              <a href={logoHref} className={styles.logoLink} aria-label="Home">
                {logo}
              </a>
            ) : (
              logo
            )}
          </div>
        )}
                  <button
                    type="button"
                    className={styles.mobileClose}
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <NavCloseIcon />
                  </button>
                </>
              )}
            </div>
            <div className={styles.mobileFoot} aria-hidden="true">
              <span className={styles.mobileFootLogo}>
                <NavFootLogo />
              </span>
              <span className={styles.mobileFootVersion}>v1.0</span>
            </div>
            <div className={styles.mobilePanels}>
              {/* Level 0: primary nav */}
              <motion.div
                className={styles.mobilePanel}
                animate={{ x: mobileSubMenu ? '-100%' : '0%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ul className={styles.mobileNavLinks}>
                  {navItems.map((item, idx) => {
                    // Index-based delay replaces motion's `staggerChildren`
                    // variant inheritance, which doesn't propagate reliably
                    // through nested motion parents — left items invisible.
                    const itemTransition = {
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1] as const,
                      delay: 0.1 + idx * 0.045,
                    };
                    if (!isDropdown(item)) {
                      return (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={itemTransition}
                        >
                          <a
                            className={styles.mobileNavLink}
                            href={item.href ?? '#'}
                            onClick={(e) => {
                              if (!item.href) {
                                e.preventDefault();
                                item.onClick?.();
                              }
                              setMobileOpen(false);
                            }}
                          >
                            <Text
                              variant="body-l"
                              weight="medium"
                              color={onDarkBg ? 'white' : 'default'}
                              as="span"
                            >
                              {item.label}
                            </Text>
                          </a>
                        </motion.li>
                      );
                    }
                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={itemTransition}
                      >
                        <button
                          type="button"
                          className={styles.mobileNavLinkButton}
                          onClick={() => setMobileSubMenu(item.label)}
                        >
                          <Text
                            variant="body-l"
                            weight="medium"
                            color={onDarkBg ? 'white' : 'default'}
                            as="span"
                          >
                            {item.label}
                          </Text>
                          <span className={styles.mobileChevron} aria-hidden="true">
                            <IcChevronRight />
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
                {(mobileActions || actions) && (
                  <motion.div
                    className={styles.mobileActions}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1 + navItems.length * 0.045,
                    }}
                  >
                    {mobileActions || actions}
                  </motion.div>
                )}
              </motion.div>

              {/* Level 1: sub-menu */}
              <motion.div
                className={[styles.mobilePanel, styles['mobilePanel--sub']].join(' ')}
                animate={{ x: mobileSubMenu ? '0%' : '100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden={!mobileSubMenu}
              >
                <div className={styles.mobileSubContent}>
                  {activeMobileItem?.type === 'mega' &&
                    activeMobileItem.categories.map((cat) => {
                      const open = expandedMobileCategory === cat.key;
                      return (
                        <section
                          key={cat.key}
                          className={[
                            styles.mobileCategory,
                            open && styles['mobileCategory--open'],
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          <button
                            type="button"
                            className={styles.mobileCategoryHeader}
                            aria-expanded={open}
                            onClick={() =>
                              setExpandedMobileCategory((prev) => (prev === cat.key ? null : cat.key))
                            }
                          >
                            {cat.icon && (
                              <span className={styles.mobileCategoryIcon}>{cat.icon}</span>
                            )}
                            <Text
                              variant="body-l"
                              weight="regular"
                              color={onDarkBg ? 'white' : 'default'}
                              as="span"
                            >
                              {cat.label}
                            </Text>
                            <span className={styles.mobileCategoryChevron} aria-hidden="true">
                              <IcChevronDown />
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {open && (
                              <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div className={styles.mobileCategoryLinks}>
                                  {cat.links.map((link) => renderDropdownLink(link))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </section>
                      );
                    })}
                  {activeMobileItem?.type === 'simple' && (
                    <div className={styles.mobileCategoryLinks}>
                      {activeMobileItem.links.map((link) => renderDropdownLink(link, true))}
                    </div>
                  )}
                  {/* mobileBottomLinks hidden — mirrors desktop where megaBottom
                      was removed in the current design. Re-enable by
                      uncommenting the block if the section returns. */}
                  {/* {activeMobileItem?.type === 'mega' &&
                    activeMobileItem.bottomLinks &&
                    activeMobileItem.bottomLinks.length > 0 && (
                      <div className={styles.mobileBottomLinks}>
                        {activeMobileItem.bottomLinks.map((link) => renderDropdownLink(link))}
                      </div>
                    )} */}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;
