import React, { CSSProperties } from 'react';
import { neutrals } from '../../tokens';
import { VisualElement } from '../atoms/VisualElement';

export interface MetricCardProps {
  variant?: 'icon' | 'number';
  icon?: React.ReactNode;
  stat?: string;
  title: string;
  breakpoint?: 'desktop' | 'tablet' | 'mobile';
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

const shadow = '0px 1px 2px 0px rgba(48,48,48,0.03), 0px 3px 3px 0px rgba(48,48,48,0.02), 0px 7px 4px 0px rgba(48,48,48,0.01)';

const sizeMap = {
  desktop: 238,
  tablet: 246,
  mobile: 148,
} as const;

const heightMap = {
  desktop: 238,
  tablet: 148,
  mobile: 148,
} as const;

export const MetricCard: React.FC<MetricCardProps> = ({
  variant = 'icon',
  icon,
  stat = '00',
  title,
  breakpoint = 'desktop',
  onDarkBg = false,
  className,
  style,
}) => {
  const isMobile = breakpoint === 'mobile';
  const isNumber = variant === 'number';

  const card: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: sizeMap[breakpoint],
    height: heightMap[breakpoint],
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: onDarkBg ? neutrals[100] : neutrals[0],
    boxShadow: onDarkBg ? 'none' : shadow,
    ...style,
  };

  const heroFlex = (isMobile && !isNumber) ? '0 0 60%' : '0 0 50%';
  const titleFlex = (isMobile && !isNumber) ? '0 0 40%' : '0 0 50%';

  const heroArea: CSSProperties = {
    flex: heroFlex,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '4px',
  };

  const statStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: isMobile ? '28px' : '40px',
    fontWeight: 500,
    lineHeight: 1.1,
    letterSpacing: '-1.2px',
    color: onDarkBg ? neutrals[0] : neutrals[100],
    whiteSpace: 'nowrap',
    margin: 0,
  };

  const titleArea: CSSProperties = {
    flex: titleFlex,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: isMobile ? '4px 12px 16px' : '4px 20px 16px',
    boxSizing: 'border-box',
    width: '100%',
  };

  const titleStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: isMobile ? '12px' : '16px',
    fontWeight: 500,
    lineHeight: 1.55,
    color: isNumber
      ? (onDarkBg ? neutrals[40] : neutrals[60])
      : (onDarkBg ? neutrals[0] : neutrals[100]),
    textAlign: 'center',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    width: '100%',
  };

  return (
    <div className={className} style={card} data-figma-id="1257:28959">
      <div style={heroArea}>
        {isNumber ? (
          <p style={statStyle}>{stat}</p>
        ) : (
          <VisualElement size={isMobile ? 'logo-64' : 'logo-80'} style={{ border: 'none' }}>
            {icon}
          </VisualElement>
        )}
      </div>
      <div style={titleArea}>
        <p style={titleStyle}>{title}</p>
      </div>
    </div>
  );
};

MetricCard.displayName = 'MetricCard';

export default MetricCard;
