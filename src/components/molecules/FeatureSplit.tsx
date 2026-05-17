import React, { CSSProperties } from 'react';
import { Text } from '../Typography/Text';
import styles from './FeatureSplit.module.css';

export interface FeatureSplitItem {
  title: string;
  description: string;
}

export interface FeatureSplitProps {
  items: FeatureSplitItem[];
  image: { src: string; alt?: string };
  /** Which side the image bleeds from. Default: 'left'. */
  imageSide?: 'left' | 'right';
  /** CSS color for the full section background. */
  bg?: string;
  /** CSS color for the image cell background (useful for transparent images). */
  visualBg?: string;
  onDarkBg?: boolean;
  as?: 'section' | 'div' | 'article';
  id?: string;
  className?: string;
  style?: CSSProperties;
}

export const FeatureSplit: React.FC<FeatureSplitProps> = ({
  items,
  image,
  imageSide = 'left',
  bg,
  visualBg,
  onDarkBg = false,
  as: Tag = 'section',
  id,
  className,
  style,
}) => {
  const rootClass = [
    styles.root,
    imageSide === 'right' && styles['root--imageRight'],
    onDarkBg && styles['root--dark'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle: CSSProperties = {
    ...(bg ? { background: bg } : undefined),
    ...style,
  };

  return (
    <Tag id={id} className={rootClass} style={rootStyle}>
      <div
        className={styles.visual}
        style={visualBg ? ({ '--fds-featuresplit-visual-bg': visualBg } as CSSProperties) : undefined}
      >
        <img
          src={image.src}
          alt={image.alt ?? ''}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.content}>
        <ul className={styles.items}>
          {items.map((item, i) => (
            <li key={i} className={styles.item}>
              <Text
                variant="heading-s"
                as="h3"
                color={onDarkBg ? 'white' : 'default'}
              >
                {item.title}
              </Text>
              <Text
                variant="body-m"
                as="p"
                color={onDarkBg ? 'white' : 'secondary'}
              >
                {item.description}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </Tag>
  );
};

FeatureSplit.displayName = 'FeatureSplit';

export default FeatureSplit;
