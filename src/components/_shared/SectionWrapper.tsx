import React, { CSSProperties } from 'react';
import styles from './SectionWrapper.module.css';

export interface SectionWrapperProps {
  children: React.ReactNode;
  /** Content rendered outside the inner container (full-width) */
  outerChildren?: React.ReactNode;
  /** Background colour preset */
  bg?: 'default' | 'muted' | 'subtle' | 'dark';
  /** @deprecated Use `bg="dark"` instead. Kept as alias. */
  onDarkBg?: boolean;
  /** Remove bottom padding from the section */
  noPaddingBottom?: boolean;
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
    <Tag className={outerClass} style={style}>
      <div className={styles.inner}>
        {children}
      </div>
      {outerChildren}
    </Tag>
  );
};

SectionWrapper.displayName = 'SectionWrapper';
