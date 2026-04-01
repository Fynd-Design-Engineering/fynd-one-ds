import React, { CSSProperties } from 'react';
import styles from './VisualElement.module.css';

export type VisualElementSize = 'icon-32' | 'icon-48' | 'logo-64' | 'logo-80' | 'logo-horizontal';

export interface VisualElementProps {
  size?: VisualElementSize;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const VisualElement: React.FC<VisualElementProps> = ({
  size = 'icon-32',
  children,
  className,
  style,
}) => {
  const isHorizontal = size === 'logo-horizontal';

  const classes = [
    styles.root,
    styles[size as keyof typeof styles],
    !children && styles.empty,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} data-figma-id="3209:14987">
      {children && (
        <div className={isHorizontal ? undefined : styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};

VisualElement.displayName = 'VisualElement';

export default VisualElement;
