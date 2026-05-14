import React, { CSSProperties } from 'react';
import styles from './SectionWrapper.module.css';

export interface SectionWrapperProps {
  children: React.ReactNode;
  /** Content rendered outside the inner container (full-width, still within page padding) */
  outerChildren?: React.ReactNode;
  /** Background colour preset */
  bg?: 'default' | 'muted' | 'subtle' | 'dark';
  /** @deprecated Use `bg="dark"` instead. Kept as alias. */
  onDarkBg?: boolean;
  /** Remove bottom padding from the section */
  noPaddingBottom?: boolean;
  /**
   * Make outerChildren span the full viewport width (edge-to-edge), bypassing
   * horizontal page padding. Uses negative margin-inline equal to --fds-section-px
   * so it tracks responsively with no vw math and no scrollbar risk.
   *
   * Use for tab strips, marquees, rails, full-bleed media bands inside a Section
   * that still needs a bg color or vertical spacing.
   */
  fullBleedContent?: boolean;
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** Override default section element */
  as?: 'section' | 'div' | 'footer' | 'nav' | 'header' | 'main' | 'aside' | 'article';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  outerChildren,
  bg = 'default',
  onDarkBg = false,
  noPaddingBottom = false,
  fullBleedContent = false,
  id,
  className,
  style,
  as: Tag = 'section',
}) => {
  const resolvedBg = onDarkBg ? 'dark' : bg;

  const outerClass = [
    styles.root,
    resolvedBg !== 'default' && styles[resolvedBg],
    noPaddingBottom && styles['no-padding-bottom'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag id={id} className={outerClass} style={style}>
      <div className={styles.inner}>
        {children}
      </div>
      {outerChildren && (
        fullBleedContent
          ? <div className={styles.bleed}>{outerChildren}</div>
          : outerChildren
      )}
    </Tag>
  );
};

SectionWrapper.displayName = 'SectionWrapper';
