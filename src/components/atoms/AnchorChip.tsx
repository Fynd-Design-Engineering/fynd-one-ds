import React, { CSSProperties } from 'react';
import { brandColors, neutralScale, badgeTokens, borderRadius } from '../../tokens';

export interface AnchorChipProps {
  label: string;
  color: 'blue' | 'green' | 'peach';
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

const dotColorMap = {
  blue: brandColors.blue.primary,
  green: brandColors.green.primary,
  peach: brandColors.peach.primary,
} as const;

export const AnchorChip: React.FC<AnchorChipProps> = ({
  label,
  color,
  onDarkBg = false,
  className,
  style,
}) => {
  const chip: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: `${badgeTokens.paddingY} ${badgeTokens.paddingX}`,
    borderRadius: borderRadius.tag,
    backgroundColor: onDarkBg ? 'rgba(255, 255, 255, 0.1)' : neutralScale[20],
    ...style,
  };

  const dot: CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: dotColorMap[color],
    flexShrink: 0,
  };

  const text: CSSProperties = {
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: badgeTokens.fontSize,
    fontWeight: 500,
    lineHeight: '16px',
    color: onDarkBg ? '#ffffff' : neutralScale[100],
    margin: 0,
  };

  return (
    <span className={className} style={chip} data-figma-id="961:34535">
      <span style={dot} />
      <span style={text}>{label}</span>
    </span>
  );
};

AnchorChip.displayName = 'AnchorChip';

export default AnchorChip;
