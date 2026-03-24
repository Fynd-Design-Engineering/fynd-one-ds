import React, { CSSProperties } from 'react';
import { neutralScale, borderRadius } from '../../tokens';

export interface ImageHolderProps {
  aspectRatio: '5:4' | '1:1' | '16:9' | 'portrait';
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

const ratioMap: Record<ImageHolderProps['aspectRatio'], number> = {
  '5:4': 5 / 4,
  '1:1': 1,
  '16:9': 16 / 9,
  portrait: 3 / 4,
};

export const ImageHolder: React.FC<ImageHolderProps> = ({
  aspectRatio,
  src,
  alt = '',
  className,
  style,
}) => {
  const ratio = ratioMap[aspectRatio];

  const container: CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: String(ratio),
    borderRadius: borderRadius[16],
    overflow: 'hidden',
    backgroundColor: neutralScale[30],
    ...style,
  };

  if (src) {
    return (
      <div className={className} style={container} data-figma-id="3364:34221">
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    );
  }

  const placeholder: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    color: neutralScale[60],
  };

  return (
    <div className={className} style={container} data-figma-id="3364:34221">
      <div style={placeholder}>{aspectRatio}</div>
    </div>
  );
};

ImageHolder.displayName = 'ImageHolder';

export default ImageHolder;
