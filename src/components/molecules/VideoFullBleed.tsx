'use client';

import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import styles from './VideoFullBleed.module.css';

export interface VideoFullBleedProps {
  /** Content rendered in the left column on desktop, above the video on mobile. */
  children?: ReactNode;
  video?: {
    src: string;
    /** Switched in via JS when viewport ≤ 991px. */
    mobileSrc?: string;
    poster?: string;
    /** Poster shown on mobile when mobileSrc is active. */
    mobilePoster?: string;
    objectFit?: 'cover' | 'contain';
  };
  /**
   * Aspect ratio for the video on desktop — controls section height.
   * Pass as a CSS ratio string, e.g. `'16 / 9'`. Defaults to `'2184 / 948'`.
   */
  videoAspectRatio?: string;
  /**
   * Aspect ratio for the video container on tablet and mobile.
   * Defaults to `'1508 / 1024'`.
   */
  mobileVideoAspectRatio?: string;
  /** Section background — hex, var(--token), or any CSS color. */
  bg?: string;
  onDarkBg?: boolean;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

const MOBILE_BP = 991;

export const VideoFullBleed: React.FC<VideoFullBleedProps> = ({
  children,
  video,
  videoAspectRatio = '2184 / 948',
  mobileVideoAspectRatio = '1508 / 1024',
  bg,
  onDarkBg: _onDarkBg = false,
  id,
  className,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modeRef = useRef<'desktop' | 'mobile' | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;

    const apply = () => {
      const isMobileVP = window.innerWidth <= MOBILE_BP;
      const mode: 'desktop' | 'mobile' =
        isMobileVP && video.mobileSrc ? 'mobile' : 'desktop';
      if (mode === modeRef.current) return;
      modeRef.current = mode;

      el.src = mode === 'mobile' ? video.mobileSrc! : video.src;
      const poster =
        mode === 'mobile' && video.mobilePoster
          ? video.mobilePoster
          : video.poster ?? '';
      if (poster) el.poster = poster;
      el.load();
      el.play().catch(() => {});
    };

    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [video]);

  const rootCls = [styles.root, className].filter(Boolean).join(' ');

  const rootStyle: CSSProperties = {
    '--fds-vfb-ratio': videoAspectRatio,
    '--fds-vfb-ratio-mobile': mobileVideoAspectRatio,
    ...(bg ? { background: bg, '--fds-vfb-bg': bg } as CSSProperties : null),
    ...style,
  } as CSSProperties;

  return (
    <section id={id} className={rootCls} style={rootStyle}>
      {video && (
        <div className={styles.videoWrap} aria-hidden="true">
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            style={{ objectFit: video.objectFit ?? 'cover' }}
          />
        </div>
      )}

      <div className={styles.inner}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </section>
  );
};

VideoFullBleed.displayName = 'VideoFullBleed';
export default VideoFullBleed;
