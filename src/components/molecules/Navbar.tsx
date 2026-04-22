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
import { IcHamburger, IcArrowForward, IcArrowBack } from '../../assets/icons/navigation';
import { IcCloseRemove, IcArrowLineDiagonal } from '../../assets/icons/actions';
import styles from './Navbar.module.css';

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
  navItems = [],
  actions,
  mobileActions,
  onDarkBg = false,
  sticky = false,
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
  const [dropdownX, setDropdownX] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const closeTimerRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
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

  useEffect(() => () => clearCloseTimer(), []);

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
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const rootClasses = [
    styles.root,
    onDarkBg && styles['root--dark'],
    sticky && styles['root--sticky'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const activeItem = navItems.find(
    (item) => isDropdown(item) && item.label === activeDropdown
  ) as NavMegaDropdownItem | NavSimpleDropdownItem | undefined;

  const renderDropdownLink = (link: NavDropdownLink, withIcon = false) => {
    const arrow = (
      <span className={styles.dropdownLinkArrow} aria-hidden="true">
        {link.external ? <IcArrowLineDiagonal /> : <IcArrowForward />}
      </span>
    );
    const content = (
      <>
        {withIcon && link.icon && <span className={styles.dropdownLinkIcon}>{link.icon}</span>}
        <span className={styles.dropdownLinkText}>
          <span className={styles.dropdownLinkTitleRow}>
            <Text variant="body-m" weight="medium" color="default" as="span">
              {link.title}
            </Text>
            {!withIcon && arrow}
          </span>
          {link.description && (
            <Text variant="body-s" color="secondary" as="span">
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
                <Text variant="body-m" weight="medium" color="default" as="span">
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
    <nav className={rootClasses} style={style} ref={rootRef}>
      <div className={styles.container}>
        {logo && <div className={styles.logo}>{logo}</div>}

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
          {mobileOpen ? (
            <IcCloseRemove
              style={{ color: onDarkBg ? 'var(--fds-neutral-0)' : 'var(--fds-neutral-100)' }}
            />
          ) : (
            <IcHamburger
              style={{ color: onDarkBg ? 'var(--fds-neutral-0)' : 'var(--fds-neutral-100)' }}
            />
          )}
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
              className={[styles.dropdownPanel, onDarkBg && styles['dropdownPanel--dark']]
                .filter(Boolean)
                .join(' ')}
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

      {/* Mobile menu */}
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
            <div className={styles.mobilePanels}>
              {/* Level 0: primary nav */}
              <motion.div
                className={styles.mobilePanel}
                animate={{ x: mobileSubMenu ? '-100%' : '0%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ul className={styles.mobileNavLinks}>
                  {navItems.map((item) => {
                    if (!isDropdown(item)) {
                      return (
                        <li key={item.label}>
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
                              variant="heading-s"
                              color={onDarkBg ? 'white' : 'default'}
                              as="span"
                            >
                              {item.label}
                            </Text>
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          className={styles.mobileNavLinkButton}
                          onClick={() => setMobileSubMenu(item.label)}
                        >
                          <Text
                            variant="heading-s"
                            color={onDarkBg ? 'white' : 'default'}
                            as="span"
                          >
                            {item.label}
                          </Text>
                          <span className={styles.mobileChevron} aria-hidden="true">
                            <IcArrowForward />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {(mobileActions || actions) && (
                  <div className={styles.mobileActions}>{mobileActions || actions}</div>
                )}
              </motion.div>

              {/* Level 1: sub-menu */}
              <motion.div
                className={[styles.mobilePanel, styles['mobilePanel--sub']].join(' ')}
                animate={{ x: mobileSubMenu ? '0%' : '100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden={!mobileSubMenu}
              >
                <button
                  type="button"
                  className={styles.mobileBack}
                  onClick={() => setMobileSubMenu(null)}
                >
                  <IcArrowBack />
                  <Text
                    variant="body-m"
                    weight="medium"
                    color={onDarkBg ? 'white' : 'default'}
                    as="span"
                  >
                    {activeMobileItem?.label ?? 'Back'}
                  </Text>
                </button>
                <div className={styles.mobileSubContent}>
                  {activeMobileItem?.type === 'mega' &&
                    activeMobileItem.categories.map((cat) => (
                      <section key={cat.key} className={styles.mobileCategory}>
                        <div className={styles.mobileCategoryHeader}>
                          {cat.icon && (
                            <span className={styles.mobileCategoryIcon}>{cat.icon}</span>
                          )}
                          <Text
                            variant="body-s"
                            caps
                            weight="medium"
                            color={onDarkBg ? 'muted' : 'subtle'}
                            as="span"
                          >
                            {cat.label}
                          </Text>
                        </div>
                        <div className={styles.mobileCategoryLinks}>
                          {cat.links.map((link) => renderDropdownLink(link))}
                        </div>
                      </section>
                    ))}
                  {activeMobileItem?.type === 'simple' && (
                    <div className={styles.mobileCategoryLinks}>
                      {activeMobileItem.links.map((link) => renderDropdownLink(link, true))}
                    </div>
                  )}
                  {activeMobileItem?.type === 'mega' &&
                    activeMobileItem.bottomLinks &&
                    activeMobileItem.bottomLinks.length > 0 && (
                      <div className={styles.mobileBottomLinks}>
                        {activeMobileItem.bottomLinks.map((link) => renderDropdownLink(link))}
                      </div>
                    )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;
