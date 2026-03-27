import React, { CSSProperties } from 'react';
import { neutrals } from '../../tokens';

export type VisualElementSize = 'icon-32' | 'icon-48' | 'logo-64' | 'logo-80' | 'logo-horizontal';

export interface VisualElementProps {
  size?: VisualElementSize;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const sizeMap: Record<VisualElementSize, { width: number; height: number; borderRadius: number }> = {
  'icon-32':         { width: 32,  height: 32, borderRadius: 4 },
  'icon-48':         { width: 48,  height: 48, borderRadius: 6 },
  'logo-64':         { width: 64,  height: 64, borderRadius: 8 },
  'logo-80':         { width: 80,  height: 80, borderRadius: 12 },
  'logo-horizontal': { width: 240, height: 80, borderRadius: 12 },
};

export const VisualElement: React.FC<VisualElementProps> = ({
  size = 'icon-32',
  children,
  className,
  style,
}) => {
  const { width, height, borderRadius } = sizeMap[size];

  const container: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
    borderRadius,
    border: `1px solid ${neutrals[30]}`,
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: children ? undefined : '#d9d9d9',
    ...style,
  };

  const isHorizontal = size === 'logo-horizontal';

  const contentStyle: CSSProperties = isHorizontal
    ? {}
    : { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' };

  return (
    <div className={className} style={container} data-figma-id="3209:14987">
      {children && <div style={contentStyle}>{children}</div>}
    </div>
  );
};

VisualElement.displayName = 'VisualElement';

export default VisualElement;
