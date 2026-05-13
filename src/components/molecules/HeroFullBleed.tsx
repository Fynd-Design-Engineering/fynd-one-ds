'use client';

import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { Text } from '../Typography/Text';
import { Chip } from '../atoms/Chip';
import { Pointers, PointerItem } from './Pointers';
import '../../styles/gradient-blur.css';
import styles from './HeroFullBleed.module.css';

export type { PointerItem };

export interface HeroFullBleedProps {
  /** Slot above the chip/title — pass any badge, rating, or label content. */
  badges?: ReactNode;
  chipLabel?: string;
  title: ReactNode;
  subtext?: ReactNode;
  pointers?: PointerItem[];
  actions?: ReactNode;
  /** Slot below actions — no DS opinion on contents (stats, logos, etc.) */
  extras?: ReactNode;
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
  /** Adds top padding to the inner content equal to the sticky chrome height.
   *  'auto' reads --fds-nav-h + --fds-banner-h set by <Navbar> / <SiteBanner>. */
  topOffset?: 'auto' | string | number;
  onDarkBg?: boolean;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

/* ── Component ────────────────────────────────────────────────────────────── */

const MOBILE_BP = 991;

export const HeroFullBleed: React.FC<HeroFullBleedProps> = ({
  badges,
  chipLabel,
  title,
  subtext,
  pointers,
  actions,
  extras,
  video,
  bg,
  topOffset,
  onDarkBg = false,
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

  const topOffsetVal =
    topOffset === 'auto'
      ? 'calc(var(--fds-nav-h, 0px) + var(--fds-banner-h, 0px))'
      : typeof topOffset === 'number'
      ? `${topOffset}px`
      : topOffset;

  const pullVal =
    topOffset === 'auto'
      ? 'calc(-1 * (var(--fds-nav-h, 4rem) + var(--fds-banner-h, 0px)))'
      : topOffsetVal
      ? `calc(-1 * ${topOffsetVal})`
      : undefined;

  const rootStyle: CSSProperties = {
    ...(bg ? { background: bg, '--fds-herofullbleed-bg': bg } as CSSProperties : null),
    ...(topOffsetVal ? { '--fds-hfb-top': topOffsetVal } as CSSProperties : null),
    ...(pullVal ? { '--fds-hfb-pull': pullVal } as CSSProperties : null),
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
          {badges && <div className={styles.badges}>{badges}</div>}

          {chipLabel && (
            <div className={styles.chipWrapper}>
              <Chip label={chipLabel} variant="anchor" onDarkBg={onDarkBg} />
            </div>
          )}

          <div className={styles.textGroup}>
            <Text variant="heading-xl" as="h1" color={onDarkBg ? 'white' : 'default'}>
              {title}
            </Text>
            {subtext && (
              <Text variant="body-l" as="p" color={onDarkBg ? 'white' : 'secondary'}>
                {subtext}
              </Text>
            )}
            {pointers && pointers.length > 0 && (
              <Pointers items={pointers} variant="body-l" onDarkBg={onDarkBg} />
            )}
          </div>

          {actions && <div className={styles.actions}>{actions}</div>}
          {extras && <div className={styles.extras}>{extras}</div>}
        </div>
      </div>
    </section>
  );
};

HeroFullBleed.displayName = 'HeroFullBleed';
export default HeroFullBleed;
