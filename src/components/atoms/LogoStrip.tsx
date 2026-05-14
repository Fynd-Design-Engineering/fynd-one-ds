import React, { CSSProperties } from 'react';
import styles from './LogoStrip.module.css';

export interface LogoItem {
  src: string;
  alt?: string;
}

export interface LogoStripProps {
  /** Array of logo images. Falls back to default Fynd client logos. */
  logos?: LogoItem[];
  /**
   * `'marquee'` — continuously scrolling strip (default).
   * `'static'`  — centered wrapping row, no animation.
   */
  variant?: 'marquee' | 'static';
  /** Animation duration in seconds (marquee only, default 45). */
  duration?: number;
  /** Number of times the list is duplicated for seamless loop (marquee only, default 4). */
  repeat?: number;
  /** Logo height in pixels (default 50). Width scales proportionally. */
  logoHeight?: number;
  /** Show grayscale-to-color hover effect on logos (default true). */
  hoverEffect?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_LOGOS: LogoItem[] = [
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/69ba84bb9c80b8ed8aa4cffb_being.jpg', alt: 'Being Human' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/693fd2d55979edbc335f69a0_image%203.avif', alt: 'Brand' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/693fd282133db7a2e7d38377_Brands-Logo.avif', alt: 'Brand Logo' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/6901b43ab68ed5013aa17f64_Mask%20group.avif', alt: 'Brand' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/68c3c2e8edbbfc8af8d41592_West%20elm.avif', alt: 'West Elm' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/68c3c2b68929ecf61d530ce7_Low%20Cost%20Glasses.avif', alt: 'Low Cost Glasses' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/68c3c2a06b5ed9574b52fe43_Kalyan%20Silks.avif', alt: 'Kalyan Silks' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/68c3bb321a90eb555fd1bc1b_JioMart.avif', alt: 'JioMart' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/68c3bb3da81f0b7c275a6cb5_mi%20arcus.avif', alt: 'Mi Arcus' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/68c3c15fb702c6b3f8c49548_asos.avif', alt: 'ASOS' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/69ba87beb1140a9a1d25fd3f_superdry.jpg', alt: 'Superdry' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/69ba8e2d4926924b220b5a3e_the_pant_project_g5eshn.jpg', alt: 'The Pant Project' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/686bab00405fd774ebb3aa55_image%20342787.avif', alt: 'Brand' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/686b9dcf7e881278bf78241a_The%20sleep%20company.avif', alt: 'The Sleep Company' },
  { src: 'https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/68c3c25900c333acb1b15a08_Puma.avif', alt: 'Puma' },
];

export const LogoStrip: React.FC<LogoStripProps> = ({
  logos = DEFAULT_LOGOS,
  variant = 'marquee',
  duration = 45,
  repeat = 4,
  logoHeight = 50,
  hoverEffect = true,
  className,
  style,
}) => {
  const isStatic = variant === 'static';
  const displayLogos = isStatic ? logos : Array.from({ length: repeat }, () => logos).flat();

  const rootCls = [
    styles.root,
    isStatic ? styles['root--static'] : styles['root--marquee'],
    className,
  ].filter(Boolean).join(' ');

  const trackCls = [
    styles.track,
    isStatic ? styles['track--static'] : styles['track--marquee'],
  ].filter(Boolean).join(' ');

  return (
    <div
      className={rootCls}
      style={{ '--marquee-duration': `${duration}s`, '--marquee-logo-height': `${logoHeight}px`, ...style } as CSSProperties}
    >
      <div className={trackCls} role="list">
        {displayLogos.map((logo, i) => (
          <div key={i} className={styles.item} role="listitem">
            <img
              src={logo.src}
              alt={logo.alt || ''}
              loading="lazy"
              className={[styles.logo, hoverEffect && styles['logo--hover']].filter(Boolean).join(' ')}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

LogoStrip.displayName = 'LogoStrip';

export default LogoStrip;
