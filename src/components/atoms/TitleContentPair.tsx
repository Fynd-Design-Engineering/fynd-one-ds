import React, { CSSProperties } from 'react';
import { Text, TextVariant } from '../Typography/Text';
import styles from './TitleContentPair.module.css';

export interface TitleContentPairProps {
  title: string;
  subtext?: string;
  titleSize?: 'xxl' | 'xl' | 'l' | 'm';
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

const sizeToVariant: Record<NonNullable<TitleContentPairProps['titleSize']>, TextVariant> = {
  xxl: 'heading-xxl',
  xl: 'heading-xl',
  l: 'heading-l',
  m: 'heading-m',
};

export const TitleContentPair: React.FC<TitleContentPairProps> = ({
  title,
  subtext,
  titleSize = 'xl',
  onDarkBg = false,
  className,
  style,
}) => {
  const classes = [
    styles.root,
    onDarkBg && styles.dark,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <Text
        variant={sizeToVariant[titleSize]}
        className={styles.title}
      >
        {title}
      </Text>
      {subtext && (
        <Text
          variant="body-l"
          className={styles.subtext}
        >
          {subtext}
        </Text>
      )}
    </div>
  );
};

TitleContentPair.displayName = 'TitleContentPair';

export default TitleContentPair;
