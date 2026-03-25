import React, { CSSProperties } from 'react';

export type SectionIndicatorColor =
  | 'blue' | 'green' | 'peach'
  | 'yellow' | 'lavender' | 'violet' | 'red' | 'gray' | 'teal';

export interface SectionIndicatorProps {
  color: SectionIndicatorColor;
  className?: string;
  style?: CSSProperties;
}

const colorMap: Record<SectionIndicatorColor, string> = {
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
