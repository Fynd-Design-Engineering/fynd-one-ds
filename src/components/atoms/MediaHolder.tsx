import React, { CSSProperties } from 'react';
import styles from './MediaHolder.module.css';

export type MediaHolderAspectRatio = '5:4' | '1:1' | '16:9' | 'portrait' | '3:3.5' | (string & {});

export interface MediaHolderLayer {
  type: 'image' | 'video';
  src: string;
  /** Required when type === 'image'. */
  alt?: string;
  /** Optional poster frame for video. */
  poster?: string;
}

export interface MediaHolderProps {
  /** Locks the container to a known aspect ratio, eliminating layout shift. */
  aspectRatio: MediaHolderAspectRatio;
  /**
   * One or more media layers stacked in the same cell. Only `activeIndex` is
   * visible; others are opacity:0 and cross-fade when `activeIndex` changes.
   * Single-layer usage is fine — pass `layers={[item]}` and `activeIndex={0}`.
   */
  layers: MediaHolderLayer[];
  /** Index of the currently visible layer. Defaults to `0`. */
  activeIndex?: number;
  /**
   * Called for every video element that mounts, passing the element and its
   * layer index. Use to drive play / pause from the parent.
   */
  videoRef?: (el: HTMLVideoElement | null, index: number) => void;
  /** Background color shown behind / around the media. */
  background?: string;
  /** How the media fills its container. Default `'cover'`. */
  objectFit?: 'cover' | 'contain';
  /** Image loading priority. Defaults to "lazy" (browser-native lazy
   *  loading). Pass "eager" for above-the-fold instances. */
  imageLoading?: 'lazy' | 'eager';
  className?: string;
  style?: CSSProperties;
}

const PRESET_RATIOS: Record<string, string> = {
  '5:4': '5 / 4',
  '1:1': '1 / 1',
  '16:9': '16 / 9',
  portrait: '3 / 4',
  '3:3.5': '3 / 3.5',
};

/** Resolves a named preset or passes through a raw CSS aspect-ratio value. */
const resolveRatio = (r: MediaHolderAspectRatio): string =>
  PRESET_RATIOS[r] ?? r;

/** Appends `#t=0.001` so the browser seeks to the first frame as a poster. */
const firstFrame = (src: string): string =>
  src.includes('#') ? src : `${src}#t=0.001`;

export const MediaHolder: React.FC<MediaHolderProps> = ({
  aspectRatio,
  layers,
  activeIndex = 0,
  videoRef,
  background,
  objectFit = 'cover',
  imageLoading,
  className,
  style,
}) => {
  const rootStyle: CSSProperties = {
    aspectRatio: resolveRatio(aspectRatio),
    ...(background ? { backgroundColor: background } : {}),
    ...style,
  };

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={rootStyle}
    >
      {layers.map((layer, idx) => {
        const isActive = idx === activeIndex;
        const layerClass = [
          styles.layer,
          isActive && styles['layer--active'],
        ]
          .filter(Boolean)
          .join(' ');

        if (layer.type === 'video') {
          return (
            <div key={idx} className={layerClass}>
              <video
                ref={(el) => videoRef?.(el, idx)}
                src={firstFrame(layer.src)}
                poster={layer.poster}
                loop
                muted
                playsInline
                preload={isActive ? 'auto' : 'metadata'}
                aria-hidden="true"
                style={{ objectFit }}
              />
            </div>
          );
        }

        return (
          <div key={idx} className={layerClass}>
            <img
              src={layer.src}
              alt={layer.alt ?? ''}
              loading={imageLoading ?? (idx === 0 ? 'eager' : 'lazy')}
              decoding="async"
              aria-hidden={!isActive}
              style={{ objectFit }}
            />
          </div>
        );
      })}
    </div>
  );
};

MediaHolder.displayName = 'MediaHolder';
export default MediaHolder;
