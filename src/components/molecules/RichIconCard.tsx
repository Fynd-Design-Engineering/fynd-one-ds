import React, { CSSProperties, useState } from 'react';
import { cardTokens, shadows } from '../../tokens';
import { Button } from '../atoms/Button';

export interface RichIconCardProps {
  icon: React.ReactNode;
  title: string;
  subtext?: string;
  buttonLabel?: string;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showButton?: boolean;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const RichIconCard: React.FC<RichIconCardProps> = ({
  icon,
  title,
  subtext,
  buttonLabel = 'Button',
  onButtonClick,
  showButton = true,
  onDarkBg = false,
  className,
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  const card: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    padding: '32px',
    borderRadius: cardTokens.borderRadius,
    border: `1px solid ${cardTokens.borderColor}`,
    backgroundColor: onDarkBg ? '#1a1a1a' : '#ffffff',
    overflow: 'hidden',
    boxShadow: hovered ? shadows['card-high'] : 'none',
    transition: 'box-shadow 0.3s',
    ...style,
  };

  const iconSlot: CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    flexShrink: 0,
  };

  const titleStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: 1.4,
    color: onDarkBg ? '#ffffff' : '#0e0e0e',
    margin: 0,
  };

  const subtextStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: onDarkBg ? '#a0a0a0' : '#5b5c5d',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  };

  return (
    <div
      className={className}
      style={card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-figma-id="879:3878"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={iconSlot}>{icon}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={titleStyle}>{title}</p>
          {subtext && <p style={subtextStyle}>{subtext}</p>}
        </div>
      </div>
      {showButton && (
        <Button
          label={buttonLabel}
          variant="tertiary"
          onClick={onButtonClick}
          onDarkBg={onDarkBg}
        />
      )}
    </div>
  );
};

RichIconCard.displayName = 'RichIconCard';

export default RichIconCard;
