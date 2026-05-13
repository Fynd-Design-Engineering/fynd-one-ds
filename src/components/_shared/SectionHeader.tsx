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
  /** Constrains the subtext to ~584px (36.5rem). Off by default — subtext fills available width. */
  narrowSubtext?: boolean;
  titleSize?: 'xxl' | 'xl' | 'l' | 'm';
  onDarkBg?: boolean;
  align?: 'left' | 'center';
  /** Optional action buttons. Left-aligned: rendered to the right. Center-aligned: rendered below. */
  actions?: React.ReactNode;
  /** Remove the max-width cap from the header content block. Default: false. */
  wideContent?: boolean;
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
  narrowSubtext = false,
  titleSize = 'xl',
  onDarkBg = false,
  align = 'left',
  actions,
  wideContent = false,
  className,
}) => {
  const renderChip = showChip && chipLabel;
  const isCenter = align === 'center';

  const rootClass = [
    styles.root,
    isCenter ? styles['root--center'] : styles['root--left'],
    className,
  ].filter(Boolean).join(' ');

  const contentClass = [styles.content, wideContent && styles['content--wide']].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <div className={contentClass}>
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
            <div className={[styles.subtext, narrowSubtext && styles['subtext--narrow']].filter(Boolean).join(' ')}>
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
