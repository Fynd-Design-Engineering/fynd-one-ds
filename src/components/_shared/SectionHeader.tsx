import React from 'react';
import { Text } from '../Typography/Text';
import { Chip, ChipDotColor } from '../atoms/Chip';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  chipLabel?: string;
  chipVariant?: 'anchor' | 'filled' | 'outlined';
  chipDotColor?: ChipDotColor;
  chipIcon?: React.ReactNode;
  showChip?: boolean;
  title: string;
  subtext?: string;
  titleSize?: 'xxl' | 'xl' | 'l' | 'm';
  onDarkBg?: boolean;
  align?: 'left' | 'center';
  /** Optional action buttons. Left-aligned: rendered to the right. Center-aligned: rendered below. */
  actions?: React.ReactNode;
  className?: string;
}

const titleVariantMap = {
  xxl: 'heading-xxl',
  xl: 'heading-xl',
  l: 'heading-l',
  m: 'heading-m',
} as const;

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  chipLabel,
  chipVariant = 'outlined',
  chipDotColor = 'blue',
  chipIcon,
  showChip = true,
  title,
  subtext,
  titleSize = 'xl',
  onDarkBg = false,
  align = 'left',
  actions,
  className,
}) => {
  const renderChip = showChip && chipLabel;
  const isCenter = align === 'center';

  const rootClass = [
    styles.root,
    isCenter ? styles['root--center'] : styles['root--left'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <div className={styles.content}>
        {renderChip && (
          <div className={styles.chip}>
            <Chip
              label={chipLabel}
              variant={chipVariant}
              dotColor={chipDotColor}
              icon={chipIcon}
              onDarkBg={onDarkBg}
            />
          </div>
        )}
        <div className={styles['text-stack']}>
          <Text
            variant={titleVariantMap[titleSize]}
            as="h2"
            color={onDarkBg ? 'white' : 'default'}
          >
            {title}
          </Text>
          {subtext && (
            <div className={styles.subtext}>
              <Text
                variant="body-l"
                color={onDarkBg ? 'muted' : 'secondary'}
              >
                {subtext}
              </Text>
            </div>
          )}
        </div>
        {isCenter && actions && (
          <div className={[styles.actions, styles['actions--center']].join(' ')}>
            {actions}
          </div>
        )}
      </div>
      {!isCenter && actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';
