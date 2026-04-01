import React, { CSSProperties } from 'react';
import { ImageHolder, ImageHolderProps } from '../atoms/ImageHolder';
import { Tag } from '../atoms/Tag';
import { Button } from '../atoms/Button';
import styles from './ListingCard.module.css';

export interface ListingCardProps {
  imageSrc?: string;
  imageAlt?: string;
  imageAspectRatio?: ImageHolderProps['aspectRatio'];
  tags?: string[];
  showTags?: boolean;
  title: string;
  subtext?: string;
  showSubtext?: boolean;
  date?: string;
  showDate?: boolean;
  readTime?: string;
  showReadTime?: boolean;
  buttonLabel?: string;
  showButton?: boolean;
  breakpoint?: 'lg' | 'sm';
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  imageSrc,
  imageAlt = '',
  imageAspectRatio = '16:9',
  tags,
  showTags = true,
  title,
  subtext,
  showSubtext = true,
  date,
  showDate = true,
  readTime,
  showReadTime = true,
  buttonLabel = 'Read story',
  showButton = true,
  breakpoint = 'lg',
  onClick,
  className,
  style,
}) => {
  const isMobile = breakpoint === 'sm';

  const cardClass = [
    styles.root,
    onClick && styles.clickable,
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
    <div className={cardClass} style={style} onClick={onClick} data-figma-id="3204:14895">
      <ImageHolder
        aspectRatio={imageAspectRatio}
        src={imageSrc}
        alt={imageAlt}
        style={{ borderRadius: 0 }}
      />
      <div className={contentClass}>
        <div className={styles['content-pair']}>
          {showTags && tags && tags.length > 0 && (
            <div className={styles['tags-row']}>
              {tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          )}
          <p className={titleClass}>{title}</p>
          {showSubtext && subtext && <p className={subtextClass}>{subtext}</p>}
        </div>
        {hasMeta && (
          <div className={styles['meta-row']}>
            {showDate && date && <p className={styles['meta-text']}>{date}</p>}
            {showReadTime && readTime && (
              <p className={[styles['meta-text'], styles['meta-text--right']].join(' ')}>{readTime}</p>
            )}
          </div>
        )}
        {showButton && (
          <Button label={buttonLabel} variant="tertiary" />
        )}
      </div>
    </div>
  );
};

ListingCard.displayName = 'ListingCard';

export default ListingCard;
