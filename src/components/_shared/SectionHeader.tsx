import React, { CSSProperties } from 'react';
import { layout } from '../../tokens';
import { Chip, ChipDotColor } from '../atoms/Chip';
import { TitleContentPair } from '../atoms/TitleContentPair';

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
}

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
}) => {
  const wrapper: CSSProperties = {
    maxWidth: layout.sectionHeaderMax,
    marginBottom: layout.middlePadding,
    textAlign: align,
    ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
  };

  const renderChip = showChip && chipLabel;

  return (
    <div style={wrapper}>
      {renderChip && (
        <div style={{ marginBottom: '16px' }}>
          <Chip
            label={chipLabel}
            variant={chipVariant}
            dotColor={chipDotColor}
            icon={chipIcon}
            onDarkBg={onDarkBg}
          />
        </div>
      )}
      <TitleContentPair
        title={title}
        subtext={subtext}
        titleSize={titleSize}
        onDarkBg={onDarkBg}
      />
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';
