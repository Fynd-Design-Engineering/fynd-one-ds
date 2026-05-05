import React, { CSSProperties, ReactNode } from 'react';
import { SectionWrapper } from '../_shared/SectionWrapper';
import { Text } from '../Typography/Text';
import { Pointers, type PointerItem } from './Pointers';
import styles from './HeroSplit.module.css';

export type { PointerItem } from './Pointers';

export interface HeroSplitImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeroSplitProps {
  title: ReactNode;
  description?: ReactNode;
  bullets?: PointerItem[];
  actions?: ReactNode;
  image: HeroSplitImage;
  imagePriority?: boolean;
  /**
   * Section background color. Any CSS color string (token var, hex, rgb,
   * etc). Paints the entire hero region — both columns and the gutters
   * outside the inner content container.
   */
  bg?: string;
  /**
   * Visual cell background color (the rounded image container). Any CSS
   * color string. Useful when the image has transparency and you want a
   * different tint behind it than the surrounding section.
   */
  visualBg?: string;
  /**
   * Pulls the hero up under any sticky/fixed chrome above it (SiteBanner,
   * Navbar) by setting a negative top margin on the section, and pads the
   * inner content down by the same amount so the title sits below the
   * chrome rather than under it. The section's `bg` paints from y=0, so
   * the chrome's translucent / scroll-aware nav reads the hero color
   * underneath.
   *
   * - `'auto'` reads `--fds-banner-h` and `--fds-nav-h`, which DS
   *   `<SiteBanner>` and `<Navbar>` publish on `<body>` automatically
   *   when mounted. If neither is on the page, both vars fall back to
   *   `0px` and the offset is a no-op.
   * - A number (px) or CSS string (`'4rem'`, `'80px'`, `'calc(...)'`)
   *   sets a literal offset — useful when integrating with custom chrome.
   */
  topOffset?: 'auto' | string | number;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

const AUTO_OFFSET = 'calc(var(--fds-banner-h, 0px) + var(--fds-nav-h, 0px))';

export const HeroSplit: React.FC<HeroSplitProps> = ({
  title,
  description,
  bullets,
  actions,
  image,
  imagePriority = true,
  bg,
  visualBg,
  topOffset,
  onDarkBg = false,
  className,
  style,
}) => {
  const rootClass = [styles.root, onDarkBg && styles.dark, className]
    .filter(Boolean)
    .join(' ');

  const resolvedOffset =
    topOffset === 'auto'
      ? AUTO_OFFSET
      : typeof topOffset === 'number'
        ? `${topOffset}px`
        : topOffset;

  const sectionStyle: CSSProperties | undefined =
    bg || resolvedOffset
      ? {
          ...(bg ? { background: bg } : null),
          ...(resolvedOffset ? { marginTop: `calc(-1 * (${resolvedOffset}))` } : null),
        }
      : undefined;

  const innerStyle: CSSProperties | undefined = resolvedOffset
    ? { ...style, paddingTop: resolvedOffset }
    : style;

  return (
    <SectionWrapper as="header" onDarkBg={onDarkBg} style={sectionStyle}>
      <div className={rootClass} style={innerStyle}>
        <div className={styles.content}>
          <div className={styles.textGroup}>
            <Text variant="heading-xl" as="h1" color={onDarkBg ? 'white' : 'default'}>
              {title}
            </Text>
            {description && (
              <Text
                variant="body-l"
                as="p"
                color={onDarkBg ? 'white' : 'secondary'}
              >
                {description}
              </Text>
            )}
            {bullets && bullets.length > 0 && (
              <Pointers items={bullets} variant="body-l" onDarkBg={onDarkBg} />
            )}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        <div
          className={styles.visual}
          style={visualBg ? { background: visualBg } : undefined}
        >
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={styles.image}
            loading={imagePriority ? 'eager' : 'lazy'}
            decoding={imagePriority ? 'sync' : 'async'}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

HeroSplit.displayName = 'HeroSplit';

export default HeroSplit;
