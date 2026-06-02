import React, { CSSProperties } from 'react';
import { ImageHolder, ImageHolderProps } from '../atoms/ImageHolder';
import { Chip } from '../atoms/Chip';
import { Button } from '../atoms/Button';
import styles from './ListingCard.module.css';

export interface ListingCardProps {
  imageSrc?: string;
  /** Image shown on hover/focus-within. Cross-fades from imageSrc. */
  imageHoverSrc?: string;
  /** Alt text for the hover image. Falls back to imageAlt. */
  imageHoverAlt?: string;
  imageAlt?: string;
  /** Image loading priority. Defaults to "lazy" (browser-native lazy
   *  loading). Pass "eager" for above-the-fold instances. */
  imageLoading?: 'lazy' | 'eager';
  imageAspectRatio?: ImageHolderProps['aspectRatio'];
  tags?: string[];
  showTags?: boolean;
  title: string;
  /** Semantic heading level for the card title. Defaults to `'h3'`. */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subtext?: string;
  showSubtext?: boolean;
  date?: string;
  showDate?: boolean;
  readTime?: string;
  showReadTime?: boolean;
  buttonLabel?: string;
  showButton?: boolean;
  breakpoint?: 'lg' | 'sm';
  onDarkBg?: boolean;
  /** Adds a 1px #e3e3e3 border around the card. Default `false`. */
  bordered?: boolean;
  /** Cross-fade to imageHoverSrc on hover. Default `false`. */
  hoverImageSwap?: boolean;
  /** Elevating box-shadow on hover. Default `true`. */
  hoverShadow?: boolean;
  /** Optional overlay rendered on top of the image (absolute, full inset, z-index 2). */
  imageSlot?: React.ReactNode;
  /**
   * Pins the meta row (date / readTime / dot) to the bottom of the card's
   * content area so dates align across cards in a grid row, even when one
   * card's title wraps to more lines than its siblings. Requires the card
   * to stretch to its parent height (typical in a CSS grid row with
   * `align-items: stretch`). Default `false`.
   */
  metaAtBottom?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  imageSrc,
  imageHoverSrc,
  imageHoverAlt,
  imageAlt = '',
  imageLoading,
  imageAspectRatio = '16:9',
  tags,
  showTags = true,
  title,
  titleAs: TitleTag = 'h3',
  subtext,
  showSubtext = true,
  date,
  showDate = true,
  readTime,
  showReadTime = true,
  buttonLabel = 'Read story',
  showButton = true,
  breakpoint = 'lg',
  onDarkBg = false,
  bordered = false,
  hoverImageSwap = false,
  hoverShadow = true,
  imageSlot,
  metaAtBottom = false,
  onClick,
  className,
  style,
}) => {
  const isMobile = breakpoint === 'sm';

  const cardClass = [
    styles.root,
    onClick && styles.clickable,
    onDarkBg && styles['root--dark'],
    bordered && styles['root--bordered'],
    hoverImageSwap && imageHoverSrc && styles['root--image-swap'],
    hoverShadow && styles['root--hover-shadow'],
    metaAtBottom && styles['root--meta-bottom'],
    className,
  ].filter(Boolean).join(' ');

  const contentClass = [
    styles.content,
    isMobile && styles['content--sm'],
  ].filter(Boolean).join(' ');

  const titleClass = [
    styles.title,
    isMobile && styles['title--sm'],
  ].filter(Boolean).join(' ');

  const subtextClass = [
    styles.subtext,
    isMobile && styles['subtext--sm'],
  ].filter(Boolean).join(' ');

  const hasMeta = (showDate && date) || (showReadTime && readTime);

  return (
    <div className={cardClass} style={style} onClick={onClick}>
      <div className={styles['image-wrap']}>
        <ImageHolder
          aspectRatio={imageAspectRatio}
          src={imageSrc}
          alt={imageAlt}
          imageLoading={imageLoading}
          style={{ borderRadius: 0 }}
          className={styles['image-default']}
        />
        {hoverImageSwap && imageSrc && imageHoverSrc && (
          <img
            src={imageHoverSrc}
            alt={imageHoverAlt ?? imageAlt}
            aria-hidden="true"
            loading={imageLoading ?? 'lazy'}
            className={styles['image-hover']}
          />
        )}
        {imageSlot && (
          <div className={styles['image-slot']}>{imageSlot}</div>
        )}
      </div>
      <div className={contentClass}>
        <div className={styles['content-pair']}>
          {showTags && tags && tags.length > 0 && (
            <div className={styles['tags-row']}>
              {tags.map((t) => (
                <Chip key={t} variant="filled" label={t} showIcon={false} showDot={false} onDarkBg={onDarkBg} className={styles['tag-chip']} />
              ))}
            </div>
          )}
          <TitleTag className={[titleClass, onDarkBg ? styles['title--dark'] : ''].filter(Boolean).join(' ')}>{title}</TitleTag>
          {showSubtext && subtext && <p className={[subtextClass, onDarkBg ? styles['subtext--dark'] : ''].filter(Boolean).join(' ')}>{subtext}</p>}
        </div>
        {hasMeta && (
          <div className={styles['meta-row']}>
            {showDate && date && <p className={[styles['meta-text'], onDarkBg ? styles['meta-text--dark'] : ''].filter(Boolean).join(' ')}>{date}</p>}
            {showDate && date && showReadTime && readTime && (
              <span aria-hidden="true" className={[styles['meta-dot'], onDarkBg ? styles['meta-text--dark'] : ''].filter(Boolean).join(' ')}>·</span>
            )}
            {showReadTime && readTime && (
              <p className={[styles['meta-text'], onDarkBg ? styles['meta-text--dark'] : ''].filter(Boolean).join(' ')}>{readTime}</p>
            )}
          </div>
        )}
        {showButton && (
          <div className={styles['button-wrap']}>
            <Button label={buttonLabel} variant="tertiary" onDarkBg={onDarkBg} />
          </div>
        )}
      </div>
    </div>
  );
};

ListingCard.displayName = 'ListingCard';

export default ListingCard;
