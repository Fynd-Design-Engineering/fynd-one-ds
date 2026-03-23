import React, { CSSProperties } from 'react';
import { gradients, GradientKey } from '../tokens';

export interface GradientSurfaceProps {
  /** Which named gradient to apply */
  gradient: GradientKey;
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

/**
 * `<GradientSurface>` — Renders a surface with one of the 5 named gradients.
 *
 * @example
 * <GradientSurface gradient="ai">AI-powered features</GradientSurface>
 * <GradientSurface gradient="blue">Informational card</GradientSurface>
 */
export const GradientSurface: React.FC<GradientSurfaceProps> = ({
  gradient,
  as: Component = 'div',
  className,
  style,
  children,
}) => {
  const Tag = Component as React.ElementType;

  const resolved: CSSProperties = {
    background: gradients[gradient],
    ...style,
  };

  return (
    <Tag className={className} style={resolved}>
      {children}
    </Tag>
  );
};

GradientSurface.displayName = 'GradientSurface';

export default GradientSurface;
