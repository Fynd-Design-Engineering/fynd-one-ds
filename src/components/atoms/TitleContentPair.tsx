import React, { CSSProperties } from 'react';
import { textColors, spacing } from '../../tokens';
import { Text, TextVariant } from '../Typography/Text';

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
  const wrapper: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[12],
    ...style,
  };

  return (
    <div className={className} style={wrapper} data-figma-id="3364:32550">
      <Text
        variant={sizeToVariant[titleSize]}
        style={{ color: onDarkBg ? textColors.titleInverse : textColors.title }}
      >
        {title}
      </Text>
      {subtext && (
        <Text
          variant="body-l"
          style={{ color: onDarkBg ? textColors.subtextInverse : textColors.subtext }}
        >
          {subtext}
        </Text>
      )}
    </div>
  );
};

TitleContentPair.displayName = 'TitleContentPair';

export default TitleContentPair;
