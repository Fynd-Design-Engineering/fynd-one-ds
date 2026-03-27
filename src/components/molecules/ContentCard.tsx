import React, { CSSProperties, useState } from 'react';
import { neutrals, shadows } from '../../tokens';
import { Chip } from '../atoms/Chip';
import { Button } from '../atoms/Button';
import { IconArrowDiagonal } from '../../icons';
import '../../styles/gradient-blur.css';

const GradientBlur: React.FC = () => (
  <div className="gradient-blur">
    <div /><div /><div /><div /><div /><div />
  </div>
);

export interface ContentCardProps {
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'below' | 'behind';
  chipLabel?: string;
  showChip?: boolean;
  title: string;
  subtext?: string;
  showSubtext?: boolean;
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'secondary' | 'tertiary';
  showButton?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  breakpoint?: 'desktop' | 'tablet' | 'mobile';
  className?: string;
  style?: CSSProperties;
}

const breakpointConfig = {
  desktop: {
    borderRadius: 16,
    padding: 24,
    gap: 40,
    titleSize: 26,
    titleLineHeight: '34px',
    titleTracking: '-0.52px',
    subtextSize: 20,
    subtextLineHeight: 1.4,
    aspectRatio: '1 / 1',
  },
  tablet: {
    borderRadius: 12,
    padding: 20,
    gap: 20,
    titleSize: 16,
    titleLineHeight: '1.55',
    titleTracking: '0',
    subtextSize: 12,
    subtextLineHeight: 1.3,
    aspectRatio: '1 / 1',
  },
  mobile: {
    borderRadius: 8,
    padding: 16,
    gap: 12,
    titleSize: 14,
    titleLineHeight: '1.4',
    titleTracking: '0',
    subtextSize: 12,
    subtextLineHeight: 1.3,
    aspectRatio: '3 / 4',
  },
} as const;

export const ContentCard: React.FC<ContentCardProps> = ({
  imageSrc,
  imageAlt = '',
  imagePosition = 'below',
  chipLabel,
  showChip = true,
  title,
  subtext,
  showSubtext = true,
  buttonLabel = 'Button',
  buttonVariant = 'tertiary',
  showButton = true,
  clickable = false,
  onClick,
  breakpoint = 'desktop',
  className,
  style,
}) => {
  const [hovered, setHovered] = useState(false);
  const config = breakpointConfig[breakpoint];
  const isBehind = imagePosition === 'behind';

  const card: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    borderRadius: config.borderRadius,
    overflow: 'hidden',
    backgroundColor: neutrals[30],
    cursor: clickable || onClick ? 'pointer' : undefined,
    boxShadow: clickable && hovered ? shadows['card-high'] : 'none',
    transition: 'box-shadow 0.3s',
    ...style,
  };

  const imageStyle: CSSProperties = isBehind
    ? {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }
    : {
        width: '100%',
        flex: 1,
        objectFit: 'cover',
        display: 'block',
        minHeight: 0,
      };

  const textOverlay: CSSProperties = {
    position: isBehind ? 'absolute' : 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'flex-start',
    gap: config.gap,
    padding: config.padding,
  };

  const contentLeft: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: 0,
  };

  const titleStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: `${config.titleSize}px`,
    fontWeight: 500,
    lineHeight: config.titleLineHeight,
    letterSpacing: config.titleTracking,
    color: neutrals[100],
    margin: 0,
  };

  const subtextStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: `${config.subtextSize}px`,
    fontWeight: 400,
    lineHeight: config.subtextLineHeight,
    color: neutrals[60],
    margin: 0,
  };

  const actionButton: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    flexShrink: 0,
    opacity: hovered ? 1 : 0,
    transition: 'opacity 0.2s',
  };

  return (
    <div
      className={className}
      style={card}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-figma-id="3262:20928"
    >
      {isBehind && imageSrc && <img src={imageSrc} alt={imageAlt} style={imageStyle} />}

      {isBehind && <GradientBlur />}

      <div style={textOverlay}>
        <div style={contentLeft}>
          {showChip && chipLabel && (
            <div style={{ marginBottom: '4px' }}>
              <Chip label={chipLabel} variant="filled" showDot={false}
                style={{
                  backgroundColor: neutrals[0],
                  borderRadius: 1000,
                  padding: '4px 16px',
                }}
              />
            </div>
          )}
          <p style={titleStyle}>{title}</p>
          {showSubtext && subtext && <p style={subtextStyle}>{subtext}</p>}
        </div>

        {showButton && !clickable && (
          <div style={{ flexShrink: 0 }}>
            <Button label={buttonLabel} variant={buttonVariant}
              showChevron={buttonVariant === 'tertiary'}
            />
          </div>
        )}

        {clickable && (
          <button style={actionButton} tabIndex={-1} aria-hidden>
            <IconArrowDiagonal color={neutrals[100]} />
          </button>
        )}
      </div>

      {!isBehind && (
        <div style={{ flex: 1, minHeight: 0, backgroundColor: neutrals[30] }}>
          {imageSrc && <img src={imageSrc} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
        </div>
      )}
    </div>
  );
};

ContentCard.displayName = 'ContentCard';

export default ContentCard;
