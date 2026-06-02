import React, { CSSProperties } from 'react';
import styles from './LogoMarquee.module.css';

export interface LogoItem {
  src: string;
  alt?: string;
  /** Intrinsic width hint on the rendered `<img>` (reserves space to
   *  avoid CLS). Default 150. CSS still owns the displayed size. */
  width?: number;
  /** Intrinsic height hint on the rendered `<img>`. Defaults to the
   *  component's `logoHeight` (50). */
  height?: number;
}

export interface LogoMarqueeProps {
  /** Array of logo images. Falls back to default Fynd client logos. */
  logos?: LogoItem[];
  /** Animation duration in seconds (default 25). */
  duration?: number;
  /** Number of times the list is duplicated for seamless loop (default 4). */
  repeat?: number;
  /** Logo height in pixels (default 50). Width scales proportionally. */
  logoHeight?: number;
  /** Show grayscale-to-color hover effect on logos (default true). */
  hoverEffect?: boolean;
  /** Image loading priority. Defaults to "lazy" (browser-native lazy
   *  loading). Pass "eager" for above-the-fold instances. */
  imageLoading?: 'lazy' | 'eager';
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

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  logos = DEFAULT_LOGOS,
  duration = 45,
  repeat = 4,
  logoHeight = 50,
  hoverEffect = true,
  imageLoading,
  className,
  style,
}) => {
  const repeatedLogos = Array.from({ length: repeat }, () => logos).flat();

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ '--marquee-duration': `${duration}s`, '--marquee-logo-height': `${logoHeight}px`, ...style } as CSSProperties}
    >
      <div className={styles.track} role="list">
        {repeatedLogos.map((logo, i) => (
          <div key={i} className={styles.item} role="listitem">
            <img
              src={logo.src}
              alt={logo.alt || ''}
              width={logo.width ?? 150}
              height={logo.height ?? logoHeight}
              loading={imageLoading ?? 'lazy'}
              className={[styles.logo, hoverEffect && styles['logo--hover']].filter(Boolean).join(' ')}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

LogoMarquee.displayName = 'LogoMarquee';

export default LogoMarquee;
