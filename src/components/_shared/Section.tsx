import React, { CSSProperties } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { SectionHeader, SectionHeaderProps } from './SectionHeader';

export interface SectionProps extends SectionHeaderProps {
  children: React.ReactNode;
  /** Background colour preset */
  bg?: 'default' | 'muted' | 'subtle' | 'dark';
  /** Remove bottom padding from the section */
  noPaddingBottom?: boolean;
  /** Override default section element */
  as?: 'section' | 'div' | 'footer' | 'nav';
  /** Hide the section header entirely */
  hideHeader?: boolean;
  /** Render children outside the inner container (full-width) */
  fullWidthContent?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Section: React.FC<SectionProps> = ({
  children,
  bg = 'default',
  noPaddingBottom = false,
  as,
  hideHeader = false,
  fullWidthContent = false,
  className,
  style,
  // SectionHeader props
  chipLabel,
  chipVariant,
  chipDotColor,
  chipIcon,
  showChip,
  title,
  subtext,
  titleSize,
  onDarkBg,
  align,
  actions,
}) => {
  const resolvedDark = bg === 'dark' || onDarkBg;

  const header = !hideHeader && title ? (
    <SectionHeader
      chipLabel={chipLabel}
      chipVariant={chipVariant}
      chipDotColor={chipDotColor}
      chipIcon={chipIcon}
      showChip={showChip}
      title={title}
      subtext={subtext}
      titleSize={titleSize}
      onDarkBg={resolvedDark}
      align={align}
      actions={actions}
    />
  ) : null;

  return (
    <SectionWrapper
      bg={bg}
      noPaddingBottom={noPaddingBottom}
      onDarkBg={resolvedDark}
      as={as}
      className={className}
      style={style}
      outerChildren={fullWidthContent ? children : undefined}
    >
      {header}
      {!fullWidthContent && children}
    </SectionWrapper>
  );
};

Section.displayName = 'Section';
