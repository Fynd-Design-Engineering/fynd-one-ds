import React, { CSSProperties } from 'react';
import { neutrals } from '../../tokens';
import { Text } from '../Typography/Text';

export interface CTABannerProps {
  title: string;
  subtext?: string;
  children?: React.ReactNode;
  align?: 'left' | 'center';
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title,
  subtext,
  children,
  align = 'center',
  onDarkBg = true,
  className,
  style,
}) => {
  const wrapper: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: align === 'center' ? 'center' : 'flex-start',
    textAlign: align,
    gap: '24px',
    padding: '40px 0',
    ...style,
  };

  const subtextStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: '18px',
    lineHeight: 1.5,
    color: onDarkBg ? neutrals[40] : neutrals[60],
    maxWidth: '480px',
    margin: 0,
  };

  return (
    <div className={className} style={wrapper}>
      <Text
        variant="heading-m"
        breakpoint="desktop"
        style={{ color: onDarkBg ? neutrals[0] : neutrals[100] }}
      >
        {title}
      </Text>
      {subtext && <p style={subtextStyle}>{subtext}</p>}
      {children && (
        <div style={{ display: 'flex', gap: '16px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

CTABanner.displayName = 'CTABanner';

export default CTABanner;
