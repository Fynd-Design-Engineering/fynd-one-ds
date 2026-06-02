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
  /** Preload strategy for the hero `<video>`. Defaults to "auto" since
   *  this is a hero. Pass "metadata" or "none" if the consumer is using
   *  HeroFullBleed below the fold (rare). */
  videoPreload?: 'auto' | 'metadata' | 'none';
  /** Browser scheduler priority for the hero `<video>`. Defaults to
   *  "high" since HeroFullBleed is above-the-fold by definition. */
  videoFetchPriority?: 'high' | 'low' | 'auto';
  /**
   * Static image hero — same responsive layout as `video` but renders an `<img>`.
   * Pass `video` OR `image`, not both; if both are set, `video` wins.
   */
  image?: {
    src: string;
    alt?: string;
    /** Swapped in below the tablet breakpoint (≤991px). Falls back to `src`. */
    mobileSrc?: string;
    /** Alt for the mobile image. Falls back to `alt` if omitted. */
    mobileAlt?: string;
    objectFit?: 'cover' | 'contain';
  };
  /** Image loading priority for the static `image` hero. Defaults to
   *  "eager" (above-the-fold hero). Pass "lazy" if rendering below the fold. */
  imageLoading?: 'lazy' | 'eager';
  /** Browser scheduler priority for the hero `<img>` (image-only mode
   *  and the video poster). Defaults to "high". */
  imageFetchPriority?: 'high' | 'low' | 'auto';
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
  videoPreload,
  videoFetchPriority,
  image,
  imageLoading,
  imageFetchPriority,
  bg,
  topOffset,
  onDarkBg = false,
  id,
  className,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const modeRef = useRef<'desktop' | 'mobile' | null>(null);

  const activeMedia = video ?? image;

  if (process.env.NODE_ENV !== 'production' && video && image) {
    console.warn('[HeroFullBleed] Both `video` and `image` props are set — `video` wins. Remove one.');
  }

  useEffect(() => {
    if (!activeMedia) return;
    const el = video ? videoRef.current : imgRef.current;
    if (!el) return;

    const apply = () => {
      const isMobileVP = window.innerWidth <= MOBILE_BP;
      const mode: 'desktop' | 'mobile' =
        isMobileVP && activeMedia.mobileSrc ? 'mobile' : 'desktop';
      if (mode === modeRef.current) return;
      modeRef.current = mode;

      if (video) {
        const videoEl = el as HTMLVideoElement;
        videoEl.src = mode === 'mobile' ? video.mobileSrc! : video.src;
        const poster =
          mode === 'mobile' && video.mobilePoster
            ? video.mobilePoster
            : video.poster ?? '';
        if (poster) videoEl.poster = poster;
        videoEl.load();
        videoEl.play().catch(() => {});
      } else if (image) {
        const imgEl = el as HTMLImageElement;
        imgEl.src = mode === 'mobile' && image.mobileSrc ? image.mobileSrc : image.src;
        imgEl.alt = (mode === 'mobile' && image.mobileAlt ? image.mobileAlt : image.alt) ?? '';
      }
    };

    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [video, image]);

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

  // `fetchpriority` isn't in React's VideoHTMLAttributes types yet; spread a
  // named object (non-fresh, so no excess-property error) so the lowercase
  // attribute lands on the rendered <video>. <img> uses the typed prop below.
  const videoFetchPriorityAttr = { fetchpriority: videoFetchPriority ?? 'high' };

  return (
    <section id={id} className={rootCls} style={rootStyle}>
      {(video || image) && (
        <div className={styles.videoWrap} aria-hidden={!image || !image.alt ? 'true' : undefined}>
          {video ? (
            <video
              ref={videoRef}
              className={styles.video}
              autoPlay
              muted
              loop
              playsInline
              preload={videoPreload ?? 'auto'}
              {...videoFetchPriorityAttr}
              style={{ objectFit: video.objectFit ?? 'cover' }}
            />
          ) : (
            <img
              ref={imgRef}
              className={styles.video}
              src={image!.src}
              alt={image!.alt ?? ''}
              loading={imageLoading ?? 'eager'}
              fetchPriority={imageFetchPriority ?? 'high'}
              style={{ objectFit: image!.objectFit ?? 'cover' }}
            />
          )}
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
