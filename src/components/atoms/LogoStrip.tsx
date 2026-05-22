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
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/being.jpg', alt: 'Being Human' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/image-3.avif', alt: 'Brand' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/brands-logo.avif', alt: 'Brand Logo' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/mask-group.avif', alt: 'Brand' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/west-elm.avif', alt: 'West Elm' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/low-cost-glasses.avif', alt: 'Low Cost Glasses' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/kalyan-silks.avif', alt: 'Kalyan Silks' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/jiomart.avif', alt: 'JioMart' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/mi-arcus.avif', alt: 'Mi Arcus' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/asos.avif', alt: 'ASOS' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/superdry.jpg', alt: 'Superdry' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/the-pant-project-g5eshn.jpg', alt: 'The Pant Project' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/image-342787.avif', alt: 'Brand' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/the-sleep-company.avif', alt: 'The Sleep Company' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/puma.avif', alt: 'Puma' },
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
