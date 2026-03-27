import React from 'react';
import { IconProps } from './types';

export const IconArrowDiagonal: React.FC<IconProps> = ({
  size = 16,
  color = 'currentColor',
  className,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M3.33 12.67L12.67 3.33M12.67 3.33H5.33M12.67 3.33V10.67" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

IconArrowDiagonal.displayName = 'IconArrowDiagonal';
