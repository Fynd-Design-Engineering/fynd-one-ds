'use client';

import React, { CSSProperties } from 'react';
import { IconChevronRight } from '../../icons';
import styles from './Pagination.module.css';

export interface PaginationProps {
  /** Total number of pages */
  totalPages: number;
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Called when a page is selected */
  onPageChange?: (page: number) => void;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

function getPageNumbers(current: number, total: number, maxVisible: number): (number | 'ellipsis')[] {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];
  const sideCount = Math.floor((maxVisible - 3) / 2); // pages on each side of current (excluding first, last, ellipsis)

  if (current <= sideCount + 2) {
    // Near the start
    for (let i = 1; i <= maxVisible - 2; i++) pages.push(i);
    pages.push('ellipsis');
    pages.push(total);
  } else if (current >= total - sideCount - 1) {
    // Near the end
    pages.push(1);
    pages.push('ellipsis');
    for (let i = total - (maxVisible - 3); i <= total; i++) pages.push(i);
  } else {
    // Middle
    pages.push(1);
    pages.push('ellipsis');
    for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    pages.push('ellipsis');
    pages.push(total);
  }

  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  onDarkBg = false,
  className,
  style,
}) => {
  const rootCls = [styles.root, className].filter(Boolean).join(' ');

  const handlePage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const pageItemCls = (page: number) =>
    [
      styles.page,
      page === currentPage
        ? onDarkBg ? styles['page--selected-dark'] : styles['page--selected']
        : onDarkBg ? styles['page--default-dark'] : styles['page--default'],
    ].join(' ');

  const arrowCls = (disabled: boolean) =>
    [
      styles.arrow,
      onDarkBg ? styles['arrow--dark'] : styles['arrow--light'],
      disabled ? styles['arrow--disabled'] : '',
    ].filter(Boolean).join(' ');

  // Desktop: 7 visible, Tablet: 7, Mobile: 4 — handled via CSS hiding
  const desktopPages = getPageNumbers(currentPage, totalPages, 7);
  const mobilePages = getPageNumbers(currentPage, totalPages, 4);

  return (
    <nav className={rootCls} style={style} aria-label="Pagination">
      {/* Previous */}
      <button
        className={arrowCls(currentPage <= 1)}
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <span className={styles['arrow-icon-left']}>
          <IconChevronRight color={onDarkBg ? '#ffffff' : '#101319'} />
        </span>
      </button>

      {/* Desktop/Tablet pages */}
      <div className={styles['pages-desktop']}>
        {desktopPages.map((page, i) =>
          page === 'ellipsis' ? (
            <span key={`e-${i}`} className={[styles.ellipsis, onDarkBg ? styles['ellipsis--dark'] : ''].filter(Boolean).join(' ')}>
              •••
            </span>
          ) : (
            <button
              key={page}
              className={pageItemCls(page)}
              onClick={() => handlePage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Mobile pages */}
      <div className={styles['pages-mobile']}>
        {mobilePages.map((page, i) =>
          page === 'ellipsis' ? (
            <span key={`em-${i}`} className={[styles.ellipsis, onDarkBg ? styles['ellipsis--dark'] : ''].filter(Boolean).join(' ')}>
              •••
            </span>
          ) : (
            <button
              key={page}
              className={pageItemCls(page)}
              onClick={() => handlePage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        className={arrowCls(currentPage >= totalPages)}
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <IconChevronRight color={onDarkBg ? '#ffffff' : '#101319'} />
      </button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
