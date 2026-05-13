import React, { CSSProperties } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { SectionHeader, SectionHeaderProps } from './SectionHeader';
import styles from './Section.module.css';

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
  /**
   * Trailing CTA slot — rendered below section content with 4rem top margin
   * (2rem on mobile). Use for a Button or link that follows the main body.
   * Distinct from the header-level `actions` prop.
   */
  trailingActions?: React.ReactNode;
  id?: string;
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
  trailingActions,
  id,
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
  narrowSubtext,
  titleSize,
  onDarkBg,
  align,
  actions,
  wideContent,
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
      narrowSubtext={narrowSubtext}
      titleSize={titleSize}
      onDarkBg={resolvedDark}
      align={align}
      actions={actions}
      wideContent={wideContent}
    />
  ) : null;

  return (
    <SectionWrapper
      bg={bg}
      noPaddingBottom={noPaddingBottom}
      onDarkBg={resolvedDark}
      as={as}
      id={id}
      className={className}
      style={style}
      outerChildren={fullWidthContent ? children : undefined}
    >
      {header}
      {!fullWidthContent && children}
      {trailingActions && (
        <div className={styles.trailingActions}>{trailingActions}</div>
      )}
    </SectionWrapper>
  );
};

Section.displayName = 'Section';
