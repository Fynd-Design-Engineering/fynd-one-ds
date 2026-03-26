import React, { CSSProperties } from 'react';
import { neutrals } from '../../tokens';

export interface TagProps {
  label: string;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Tag: React.FC<TagProps> = ({
  label,
  onDarkBg = false,
  className,
  style,
}) => {
  const tag: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '2000px',
    backgroundColor: onDarkBg ? '#262626' : neutrals[10],
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: onDarkBg ? neutrals[40] : neutrals[60],
    whiteSpace: 'nowrap',
    ...style,
  };

  return (
    <span className={className} style={tag} data-figma-id="3523:44654">
      {label}
    </span>
  );
};

Tag.displayName = 'Tag';

export default Tag;
