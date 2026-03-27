import React, { CSSProperties } from 'react';
import { neutrals } from '../../tokens';
import { ImageHolder, ImageHolderProps } from '../atoms/ImageHolder';
import { Tag } from '../atoms/Tag';
import { Button } from '../atoms/Button';

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
  breakpoint?: 'desktop' | 'mobile';
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
  breakpoint = 'desktop',
  onClick,
  className,
  style,
}) => {
  const isMobile = breakpoint === 'mobile';

  const card: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '1px 2px 15px 0px rgba(0, 0, 0, 0.02)',
    backgroundColor: neutrals[0],
    cursor: onClick ? 'pointer' : undefined,
    ...style,
  };

  const content: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    padding: isMobile ? '16px' : '20px 24px',
  };

  const contentPair: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const titleStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: isMobile ? '16px' : '20px',
    fontWeight: 500,
    lineHeight: isMobile ? 1.55 : 1.4,
    color: neutrals[100],
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  };

  const subtextStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: isMobile ? '12px' : '16px',
    fontWeight: 400,
    lineHeight: isMobile ? 1.3 : 1.5,
    color: neutrals[60],
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  };

  const metaRow: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const metaText: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: neutrals[60],
    margin: 0,
  };

  const hasMeta = (showDate && date) || (showReadTime && readTime);

  return (
    <div className={className} style={card} onClick={onClick} data-figma-id="3204:14895">
      <ImageHolder
        aspectRatio={imageAspectRatio}
        src={imageSrc}
        alt={imageAlt}
        style={{ borderRadius: 0 }}
      />
      <div style={content}>
        <div style={contentPair}>
          {showTags && tags && tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          )}
          <p style={titleStyle}>{title}</p>
          {showSubtext && subtext && <p style={subtextStyle}>{subtext}</p>}
        </div>
        {hasMeta && (
          <div style={metaRow}>
            {showDate && date && <p style={metaText}>{date}</p>}
            {showReadTime && readTime && <p style={{ ...metaText, textAlign: 'right' }}>{readTime}</p>}
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
