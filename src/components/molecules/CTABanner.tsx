import React, { CSSProperties } from 'react';
import { neutrals } from '../../tokens';
import { Text } from '../Typography/Text';
import styles from './CTABanner.module.css';

export interface CTABannerProps {
  title: string;
  subtext?: string;
  /** Max-width of the subtext paragraph. Any CSS value, e.g. '42.75rem', '684px'. */
  subtextMaxWidth?: string;
  children?: React.ReactNode;
  align?: 'left' | 'center';
  onDarkBg?: boolean;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title,
  subtext,
  subtextMaxWidth,
  children,
  align = 'center',
  onDarkBg = true,
  id,
  className,
  style,
}) => {
  const wrapperClass = [
    styles.root,
    styles[align],
    className,
  ].filter(Boolean).join(' ');

  const subtextClass = [
    styles.subtext,
    onDarkBg && styles['subtext--dark'],
  ].filter(Boolean).join(' ');

  return (
    <div id={id} className={wrapperClass} style={style}>
      <Text
        variant="heading-m"
        as="h2"
        style={{ color: onDarkBg ? neutrals[0] : neutrals[100] }}
      >
        {title}
      </Text>
      {subtext && <p className={subtextClass} style={subtextMaxWidth ? { maxWidth: subtextMaxWidth } : undefined}>{subtext}</p>}
      {children && (
        <div className={styles.actions}>
          {children}
        </div>
      )}
    </div>
  );
};

CTABanner.displayName = 'CTABanner';

export default CTABanner;
