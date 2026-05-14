import React, { CSSProperties, ReactNode } from 'react';
import { Text } from '../Typography/Text';
import { Button } from '../atoms/Button';
import styles from './CustomerStoryCard.module.css';

export interface CustomerStoryMetric {
  value: string;
  label: string;
}

export interface CustomerStoryCardProps {
  title: string;
  /** Heading level for the title. Defaults to `'h3'`. */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Injectable left-column slot — pass an image, logo overlay, or any ReactNode.
   * When omitted the card renders as a single-column layout.
   */
  imageSlot?: ReactNode;
  /** Wraps imageSlot in an `<a>` pointing to this URL. */
  href?: string;
  /** Metric stat rows shown between the title and the CTA button. */
  metrics?: CustomerStoryMetric[];
  buttonLabel?: string;
  showButton?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const CustomerStoryCard: React.FC<CustomerStoryCardProps> = ({
  title,
  titleAs: TitleTag = 'h3',
  imageSlot,
  href,
  metrics,
  buttonLabel = 'Read case study',
  showButton = true,
  onClick,
  className,
  style,
}) => {
  const rootCls = [
    styles.root,
    !imageSlot && styles['root--no-image'],
    imageSlot && !metrics?.length && styles['root--compact'],
    className,
  ].filter(Boolean).join(' ');

  const imageNode = imageSlot ? (
    href ? (
      <a href={href} className={styles['image-wrap']} tabIndex={-1} aria-hidden="true">
        {imageSlot}
      </a>
    ) : (
      <div className={styles['image-wrap']}>{imageSlot}</div>
    )
  ) : null;

  const titleNode = href ? (
    <a href={href} className={styles['title-link']}>
      <Text variant="heading-s" as={TitleTag} weight="semibold" className={styles.title}>
        {title}
      </Text>
    </a>
  ) : (
    <Text variant="heading-s" as={TitleTag} weight="semibold" className={styles.title}>
      {title}
    </Text>
  );

  return (
    <div className={rootCls} style={style}>
      {imageNode}
      <div className={styles.content}>
        <div className={styles['content-top']}>
          {titleNode}
          {metrics && metrics.length > 0 && (
            <div className={styles['metrics-row']}>
              {metrics.map((m, i) => (
                <div key={i} className={styles.metric}>
                  <Text variant="heading-m" as="p" className={styles['metric-value']}>
                    {m.value}
                  </Text>
                  <Text variant="body-s" as="p" color="secondary">
                    {m.label}
                  </Text>
                </div>
              ))}
            </div>
          )}
        </div>
        {showButton && (
          <div className={styles['button-wrap']}>
            <Button
              label={buttonLabel}
              variant="secondary"
              onClick={onClick ?? (href ? () => { window.location.href = href; } : undefined)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

CustomerStoryCard.displayName = 'CustomerStoryCard';
export default CustomerStoryCard;
