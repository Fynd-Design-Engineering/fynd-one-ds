import React, { CSSProperties, ReactNode } from 'react';
import styles from './SiteBanner.module.css';

export interface SiteBannerProps {
  /**
   * Banner content. Anything goes — text, links, buttons, icons.
   * Children render inside a flex row, centered horizontally and
   * vertically, with a 12px gap between siblings.
   *
   * Children render on a dark background; if you use `<Text>` or
   * `<Button>` inside, pass `color="white"` / `onDarkBg` accordingly.
   */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const SiteBanner: React.FC<SiteBannerProps> = ({
  children,
  className,
  style,
}) => {
  const rootClass = [styles.root, className].filter(Boolean).join(' ');
  return (
    <div
      className={rootClass}
      style={style}
      role="region"
      aria-label="Site notice"
      data-fds-component="site-banner"
    >
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

SiteBanner.displayName = 'SiteBanner';

export default SiteBanner;
