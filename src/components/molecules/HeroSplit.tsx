import React, { CSSProperties, ReactNode } from 'react';
import { SectionWrapper } from '../_shared/SectionWrapper';
import { Text } from '../Typography/Text';
import styles from './HeroSplit.module.css';

export interface HeroSplitImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeroSplitProps {
  title: ReactNode;
  description?: ReactNode;
  bullets?: string[];
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
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const HeroSplit: React.FC<HeroSplitProps> = ({
  title,
  description,
  bullets,
  actions,
  image,
  imagePriority = true,
  bg,
  visualBg,
  onDarkBg = false,
  className,
  style,
}) => {
  const rootClass = [styles.root, onDarkBg && styles.dark, className]
    .filter(Boolean)
    .join(' ');

  return (
    <SectionWrapper
      as="section"
      onDarkBg={onDarkBg}
      style={bg ? { background: bg } : undefined}
    >
      <div className={rootClass} style={style}>
        <div className={styles.content}>
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
            <ul className={styles.bullets}>
              {bullets.map((bullet, i) => (
                <li key={i} className={styles.bullet}>
                  <span className={styles.dot} aria-hidden="true" />
                  <Text
                    variant="body-l"
                    as="span"
                    color={onDarkBg ? 'white' : 'default'}
                  >
                    {bullet}
                  </Text>
                </li>
              ))}
            </ul>
          )}
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
