'use client';

import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { Text } from '../Typography/Text';
import { Chip } from '../atoms/Chip';
import { Pointers, PointerItem } from './Pointers';
import styles from './HeroFullBleed.module.css';

export type { PointerItem };

export type RatingChipItem =
  | { platform: 'amazon'; rank: string; label: string }
  | { platform: 'g2'; stars: number; rating: string }
  | { icon: ReactNode; label: string };

export interface HeroFullBleedProps {
  chipLabel?: string;
  title: ReactNode;
  subtext?: ReactNode;
  pointers?: PointerItem[];
  actions?: ReactNode;
  /** Slot below actions — no DS opinion on contents (stats, logos, etc.) */
  extras?: ReactNode;
  ratingChips?: RatingChipItem[];
  video?: {
    src: string;
    /** Switched in via JS when viewport ≤ 767px. */
    mobileSrc?: string;
    poster?: string;
    /** Poster shown on mobile when mobileSrc is active. */
    mobilePoster?: string;
    objectFit?: 'cover' | 'contain';
  };
  /** Section background — hex, var(--token), or any CSS color. */
  bg?: string;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

/* ── Internal badge icons ────────────────────────────────────────────────── */

const AmazonBadgeIcon: React.FC = () => (
  <svg width="22" height="17" viewBox="0 0 22 17" fill="none" aria-hidden="true">
    {/* 'a' letterform */}
    <path
      d="M10 1.8C7.6 1.8 5.8 3.5 5.8 6C5.8 8.5 7.6 10.2 10 10.2C11.3 10.2 12.4 9.7 13.1 8.8V10.2H15.2V5.2C15.2 3.2 13.6 1.8 11.4 1.8H10Z"
      stroke="#FF9900" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
    />
    <path
      d="M13.1 5.5C12.4 4.5 11.3 3.8 10 3.8C8.2 3.8 7.5 4.8 7.5 6C7.5 7.2 8.2 8.2 10 8.2C11.3 8.2 12.4 7.5 13.1 6.5V5.5Z"
      stroke="#FF9900" strokeWidth="1.5" fill="none" strokeLinecap="round"
    />
    {/* smile arc + arrowhead */}
    <path d="M1.5 14C5.8 17.5 15.5 17.5 20 14" stroke="#FF9900" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M18.2 12.3L20.2 14L18.2 15.5" stroke="#FF9900" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const G2BadgeIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="9" fill="#FF492C"/>
    <text
      x="9" y="13" textAnchor="middle"
      fontFamily="Arial Black, Arial, sans-serif"
      fontSize="7.5" fontWeight="800" fill="white"
    >
      G2
    </text>
  </svg>
);

const StarIcon: React.FC = () => (
  <svg width="11" height="11" viewBox="0 0 10 10" fill="#FF8A3D" aria-hidden="true">
    <path d="M5 0.5L6.28 3.82H9.76L7.02 5.78L7.88 9.35L5 7.38L2.12 9.35L2.98 5.78L0.24 3.82H3.72L5 0.5Z"/>
  </svg>
);

const RatingChip: React.FC<{ item: RatingChipItem }> = ({ item }) => {
  if ('platform' in item && item.platform === 'amazon') {
    return (
      <span className={styles.ratingChip}>
        <AmazonBadgeIcon />
        <span className={styles.ratingChipRank}>{item.rank}</span>
        {item.label}
      </span>
    );
  }
  if ('platform' in item && item.platform === 'g2') {
    const fullStars = Math.round(item.stars);
    return (
      <span className={styles.ratingChip}>
        <G2BadgeIcon />
        <span className={styles.ratingChipStars}>
          {Array.from({ length: fullStars }, (_, i) => <StarIcon key={i} />)}
        </span>
        {item.rating}
      </span>
    );
  }
  return (
    <span className={styles.ratingChip}>
      {'icon' in item && item.icon}
      {item.label}
    </span>
  );
};

/* ── Component ────────────────────────────────────────────────────────────── */

const MOBILE_BP = 767;

export const HeroFullBleed: React.FC<HeroFullBleedProps> = ({
  chipLabel,
  title,
  subtext,
  pointers,
  actions,
  extras,
  ratingChips,
  video,
  bg,
  onDarkBg = false,
  className,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Tracks which mode is currently loaded so we only reload on breakpoint crossing.
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
    ...(bg ? { background: bg } : null),
    ...style,
  };

  return (
    <section className={rootCls} style={rootStyle}>
      {video && (
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          style={{ objectFit: video.objectFit ?? 'cover' }}
        />
      )}

      <div className={styles.inner}>
        <div className={styles.content}>
          {ratingChips && ratingChips.length > 0 && (
            <div className={styles.ratingChips}>
              {ratingChips.map((chip, i) => (
                <RatingChip key={i} item={chip} />
              ))}
            </div>
          )}

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
