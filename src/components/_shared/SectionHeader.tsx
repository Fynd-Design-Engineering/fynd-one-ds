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
  /**
   * Where to render `actions` relative to the title block.
   * - `'inline'` — to the right of the title (default for `align="left"`).
   * - `'below'` — on a new row beneath the subtext (default for `align="center"`).
   * Use to render `actions` below the subtext while keeping the title
   * left-aligned, e.g. inside a narrow column of a split layout.
   */
  actionsPlacement?: 'inline' | 'below';
  /** Remove the max-width cap from the header content block. Default: false. */
  wideContent?: boolean;
  /** Constrain the header content block to 508px. Default: false. */
  compactContent?: boolean;
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
  actionsPlacement,
  wideContent = false,
  compactContent = false,
  className,
}) => {
  const renderChip = showChip && chipLabel;
  const isCenter = align === 'center';
  const effectivePlacement = actionsPlacement ?? (isCenter ? 'below' : 'inline');

  const rootClass = [
    styles.root,
    isCenter ? styles['root--center'] : styles['root--left'],
    isCenter && effectivePlacement === 'inline' && styles['root--center-inline'],
    className,
  ].filter(Boolean).join(' ');

  const contentClass = [
    styles.content,
    wideContent && styles['content--wide'],
    compactContent && styles['content--compact'],
  ].filter(Boolean).join(' ');

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
        {effectivePlacement === 'below' && actions && (
          <div className={[styles.actions, isCenter && styles['actions--center']].filter(Boolean).join(' ')}>
            {actions}
          </div>
        )}
      </div>
      {effectivePlacement === 'inline' && actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';
