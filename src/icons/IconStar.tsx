import React from 'react';
import { IconProps } from './types';

export const IconStar: React.FC<IconProps> = ({
  size = 16,
  color = 'currentColor',
  className,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M8 1.5L9.79 5.86L14.5 6.41L11 9.47L11.94 14.5L8 12.09L4.06 14.5L5 9.47L1.5 6.41L6.21 5.86L8 1.5Z" fill={color} />
  </svg>
);

IconStar.displayName = 'IconStar';
