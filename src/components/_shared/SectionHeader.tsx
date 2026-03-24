import React, { CSSProperties } from 'react';
import { layout } from '../../tokens';
import { AnchorChip } from '../atoms/AnchorChip';
import { TitleContentPair } from '../atoms/TitleContentPair';

export interface SectionHeaderProps {
  anchorLabel?: string;
  anchorColor?: 'blue' | 'green' | 'peach';
  title: string;
  subtext?: string;
  titleSize?: 'xxl' | 'xl' | 'l' | 'm';
  onDarkBg?: boolean;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  anchorLabel,
  anchorColor = 'blue',
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

  return (
    <div style={wrapper}>
      {anchorLabel && (
        <div style={{ marginBottom: '16px' }}>
          <AnchorChip label={anchorLabel} color={anchorColor} onDarkBg={onDarkBg} />
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
