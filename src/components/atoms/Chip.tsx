import React, { CSSProperties } from 'react';
import { backgroundColors } from '../../tokens';
import { IconStar } from '../../icons';

export type ChipDotColor =
  | 'blue' | 'green' | 'peach'
  | 'yellow' | 'lavender' | 'violet' | 'red' | 'gray' | 'teal';

export interface ChipProps {
  label: string;
  variant?: 'anchor' | 'filled' | 'outlined';
  showDot?: boolean;
  dotColor?: ChipDotColor;
  icon?: React.ReactNode;
  breakpoint?: 'desktop' | 'tablet' | 'mobile';
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}


const dotColorMap: Record<ChipDotColor, string> = {
  blue: '#5c98f7',
  green: '#80d99f',
  peach: '#eeb384',
  yellow: '#fdf6db',
  lavender: '#e382ff',
  violet: '#8d61f6',
  red: '#fddbdb',
  gray: '#f8f8f9',
  teal: '#89d0e0',
};

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'anchor',
  showDot = true,
  dotColor = 'blue',
  icon,
  breakpoint = 'desktop',
  onDarkBg = false,
  className,
  style,
}) => {
  const isCompact = breakpoint === 'tablet' || breakpoint === 'mobile';
  const isAnchor = variant === 'anchor';
  const isOutlined = variant === 'outlined';

  const chipStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: isOutlined ? 'center' : 'flex-start',
    gap: isAnchor ? '10px' : '8px',
    whiteSpace: 'nowrap',
    ...(isAnchor
      ? {
          padding: isCompact ? '4px 12px' : '8px 24px',
          borderRadius: '10000px',
          backgroundColor: onDarkBg ? '#5b5c5d' : backgroundColors.medium,
          border: 'none',
        }
      : isOutlined
        ? {
            padding: '8px 16px',
            borderRadius: '24px',
            backgroundColor: 'transparent',
            border: onDarkBg ? '1px solid rgba(255,255,255,0.3)' : '1px solid #d2d2d2',
          }
        : {
            padding: '4px 16px',
            borderRadius: '24px',
            backgroundColor: '#f8f8f9cc',
            border: '1px solid transparent',
          }),
    ...style,
  };

  const textColor = onDarkBg
    ? '#ffffff'
    : isAnchor
      ? '#0e0e0e'
      : isOutlined
        ? '#0e0e0e'
        : '#5b5c5d';

  // Set color on chipStyle so icon inherits via currentColor
  chipStyle.color = textColor;

  const textStyle: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: isAnchor ? '12px' : '14px',
    fontWeight: isOutlined ? 500 : isAnchor ? 500 : 400,
    lineHeight: isAnchor ? 1.3 : 1.4,
    color: textColor,
    textAlign: isOutlined ? 'center' : undefined,
  };

  const dotStyle: CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '1000px',
    backgroundColor: dotColorMap[dotColor],
    flexShrink: 0,
  };

  const resolvedIcon = icon ?? (!isAnchor ? <IconStar size={16} /> : null);

  return (
    <span className={className} style={chipStyle} data-figma-id="961:34535">
      {resolvedIcon}
      {!resolvedIcon && showDot && <span style={dotStyle} />}
      <span style={textStyle}>{label}</span>
    </span>
  );
};

Chip.displayName = 'Chip';

export default Chip;
