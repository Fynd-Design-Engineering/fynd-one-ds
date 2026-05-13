import React, { CSSProperties } from 'react';
import styles from './ImageHolder.module.css';

export interface ImageHolderProps {
  aspectRatio: '5:4' | '1:1' | '16:9' | 'portrait';
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

const ratioClassMap: Record<ImageHolderProps['aspectRatio'], string> = {
  '5:4': 'ratio-5x4',
  '1:1': 'ratio-1x1',
  '16:9': 'ratio-16x9',
  portrait: 'ratio-portrait',
};

export const ImageHolder: React.FC<ImageHolderProps> = ({
  aspectRatio,
  src,
  alt = '',
  className,
  style,
}) => {
  const classes = [
    styles.root,
    styles[ratioClassMap[aspectRatio] as keyof typeof styles],
    className,
  ].filter(Boolean).join(' ');

  if (src) {
    return (
      <div className={classes} style={style}>
        <img
          src={src}
          alt={alt}
          className={styles.img}
        />
      </div>
    );
  }

  return (
    <div className={classes} style={style}>
      <div className={styles.placeholder}>{aspectRatio}</div>
    </div>
  );
};

ImageHolder.displayName = 'ImageHolder';

export default ImageHolder;
