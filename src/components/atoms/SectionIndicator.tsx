import React, { CSSProperties } from 'react';
import { brandColors, neutralScale } from '../../tokens';

export interface SectionIndicatorProps {
  color: 'blue' | 'green' | 'peach' | 'grey';
  className?: string;
  style?: CSSProperties;
}

const colorMap: Record<SectionIndicatorProps['color'], string> = {
  blue: brandColors.blue.primary,
  green: brandColors.green.primary,
  peach: brandColors.peach.primary,
  grey: neutralScale[60],
};

export const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  color,
  className,
  style,
}) => {
  const dot: CSSProperties = {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: colorMap[color],
    ...style,
  };

  return <span className={className} style={dot} data-figma-id="961:34518" />;
};

SectionIndicator.displayName = 'SectionIndicator';

export default SectionIndicator;
