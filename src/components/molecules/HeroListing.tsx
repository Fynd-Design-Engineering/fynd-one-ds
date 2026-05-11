import React, { CSSProperties, ReactNode } from 'react';
import { IcPodcasts } from '../../assets/icons/media';
import { Chip, type ChipDotColor } from '../atoms/Chip';
import { Text } from '../Typography/Text';
import styles from './HeroListing.module.css';

type HeroListingTag = 'header' | 'section' | 'div';

const DEFAULT_CHIP_ICON = <IcPodcasts width={20} height={20} />;

export interface HeroListingProps {
  chipLabel?: string;
  /** Icon rendered inside the chip. Defaults to the podcast icon. */
  chipIcon?: ReactNode;
  showChip?: boolean;
  chipDotColor?: ChipDotColor;
  /** Toggled/active state of the chip. */
  chipSelected?: boolean;
  /** Makes the chip interactive and fires on click. */
  onChipClick?: () => void;
  title: string;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subtext?: string;
  showSubtext?: boolean;
  onDarkBg?: boolean;
  as?: HeroListingTag;
  className?: string;
  style?: CSSProperties;
}

export const HeroListing: React.FC<HeroListingProps> = ({
  chipLabel,
  chipIcon = DEFAULT_CHIP_ICON,
  showChip = true,
  chipDotColor,
  chipSelected = false,
  onChipClick,
  title,
  titleAs = 'h1',
  subtext,
  showSubtext = true,
  onDarkBg = false,
  as: Tag = 'header',
  className,
  style,
}) => {
  const rootClass = [
    styles.root,
    onDarkBg && styles['root--dark'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={rootClass} style={style}>
      <div className={styles.inner}>
        {showChip && chipLabel && (
          <Chip
            label={chipLabel}
            variant="outlined"
            icon={chipIcon}
            showDot={!chipIcon}
            dotColor={chipDotColor}
            selected={chipSelected}
            onClick={onChipClick}
            onDarkBg={onDarkBg}
          />
        )}
        <div className={styles['text-group']}>
          <Text variant="heading-xl" as={titleAs} color={onDarkBg ? 'white' : 'default'}>
            {title}
          </Text>
          {showSubtext && subtext && (
            <Text variant="body-l" as="p" color={onDarkBg ? 'white' : 'secondary'}>
              {subtext}
            </Text>
          )}
        </div>
      </div>
    </Tag>
  );
};

HeroListing.displayName = 'HeroListing';

export default HeroListing;
