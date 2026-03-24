import React, { CSSProperties } from 'react';
import { layout, backgroundColors } from '../../tokens';

export interface SectionWrapperProps {
  children: React.ReactNode;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Override default section element */
  as?: 'section' | 'div' | 'footer' | 'nav';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  onDarkBg = false,
  className,
  style,
  as: Tag = 'section',
}) => {
  const outer: CSSProperties = {
    padding: `${layout.sectionPaddingY} ${layout.pagePaddingX}`,
    backgroundColor: onDarkBg ? backgroundColors.darkest : undefined,
    ...style,
  };

  const inner: CSSProperties = {
    maxWidth: layout.contentWidth,
    margin: '0 auto',
  };

  return (
    <Tag className={className} style={outer}>
      <div style={inner}>{children}</div>
    </Tag>
  );
};

SectionWrapper.displayName = 'SectionWrapper';
