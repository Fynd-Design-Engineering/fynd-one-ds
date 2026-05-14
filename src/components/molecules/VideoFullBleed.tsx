'use client';

import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import '../../styles/gradient-blur.css';
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
    ...(bg ? { background: bg, '--fds-vfb-bg': bg } as CSSProperties : null),
    ...style,
  };

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
          {bg && (
            <div className={`gradient-blur ${styles.videoGradient}`}>
              <div/><div/><div/><div/><div/><div/>
            </div>
          )}
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
