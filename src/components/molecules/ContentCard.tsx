import React, { CSSProperties, ReactNode } from 'react';
import { neutrals } from '../../tokens';
import { Chip, ChipDotColor } from '../atoms/Chip';
import { Button } from '../atoms/Button';
import { Text, TextVariant } from '../Typography/Text';
import { IconArrowDiagonal } from '../../icons';
import { Pointers, PointerItem } from './Pointers';
import '../../styles/gradient-blur.css';
import styles from './ContentCard.module.css';

export type { PointerItem };

const GradientBlur: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div className={['gradient-blur', dark && 'gradient-blur--dark'].filter(Boolean).join(' ')}>
    <div /><div /><div /><div /><div /><div />
  </div>
);

const VideoEl: React.FC<{
  src: string;
  mobileSrc?: string;
  poster?: string;
  objectFit?: 'cover' | 'contain';
  className?: string;
  ariaHidden?: boolean;
}> = ({ src, mobileSrc, poster, objectFit = 'cover', className, ariaHidden }) => (
  <video
    autoPlay
    muted
    loop
    playsInline
    poster={poster}
    className={className}
    aria-hidden={ariaHidden ? 'true' : undefined}
    style={{ objectFit }}
  >
    {mobileSrc ? (
      <>
        <source media="(min-width: 768px)" type="video/mp4" src={src} />
        <source media="(max-width: 767px)" type="video/mp4" src={mobileSrc} />
      </>
    ) : (
      <source type="video/mp4" src={src} />
    )}
  </video>
);

export interface ContentCardProps {
  imageSrc?: string;
  /** Image shown on hover/focus-within. Cross-fades from imageSrc. */
  imageHoverSrc?: string;
  /** Alt text for the hover image. Falls back to imageAlt. */
  imageHoverAlt?: string;
  /** @deprecated Use imageHoverSrc instead. */
  hoverImageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'above' | 'below' | 'behind' | 'bottom-right';
  /** Video source — renders a `<video>` in the image slot instead of an `<img>`. */
  videoSrc?: string;
  /** Mobile video shown below 768px. Falls back to `videoSrc` if omitted. */
  videoMobileSrc?: string;
  /** Poster image shown while `videoSrc` loads. */
  videoPoster?: string;
  /**
   * On-hover video — `imageSrc` is shown by default; this video cross-fades
   * in on hover (autoplay, muted, loop). Use instead of `imageHoverSrc` when
   * the hover state should be animated.
   */
  videoHoverSrc?: string;
  /** Mobile hover video shown below 768px. Falls back to `videoHoverSrc` if omitted. */
  videoHoverMobileSrc?: string;
  /** Object-fit for video. Defaults to `'cover'`. */
  videoObjectFit?: 'cover' | 'contain';
  /**
   * CSS `aspect-ratio` for the media container (below/above positions).
   * E.g. `'16/9'`, `'4/3'`, `'1/1'`. Useful to enforce a consistent height
   * when using `videoSrc` or images without intrinsic dimensions.
   */
  mediaAspectRatio?: string;
  chipLabel?: string;
  showChip?: boolean;
  /**
   * `'inline'` (default) — chip sits in the normal content flow above the title.
   * `'floating'` — chip is absolutely positioned 24px from the top-left corner
   * of the card, overlaying the image panel. Useful with `imagePosition="above"`.
   */
  chipPosition?: 'inline' | 'floating';
  /** Show the dot indicator. Defaults to `false` (ContentCard default). */
  chipShowDot?: boolean;
  /** Dot color. Forwarded to `Chip.dotColor`. */
  chipDotColor?: ChipDotColor;
  /** Optional leading icon. Forwarded to `Chip.icon`. */
  chipIcon?: ReactNode;
  /** Chip variant. Defaults to `'filled'` (ContentCard default). */
  chipVariant?: 'anchor' | 'filled' | 'outlined';
  /** Chip breakpoint size lock. Forwarded to `Chip.breakpoint`. */
  chipBreakpoint?: 'lg' | 'md' | 'sm';
  /** Pass `true` to flip the chip to its dark variant. Independent from `onDarkBg`. */
  chipOnDarkBg?: boolean;
  /**
   * Custom background color for the chip when `chipVariant="filled"`.
   * Accepts any CSS color value (token, hex, rgb). Forwarded to `Chip.bg`.
   */
  chipBg?: string;
  /**
   * Hide the leading icon on the chip entirely (overrides the default
   * star icon on non-anchor variants). Forwarded to `Chip.showIcon`.
   */
  chipShowIcon?: boolean;
  title: string;
  titleVariant?: TextVariant;
  /** Semantic heading level for the card title. Defaults to `'h3'`. */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subtext?: string;
  subtextVariant?: TextVariant;
  showSubtext?: boolean;
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'secondary' | 'tertiary';
  showButton?: boolean;
  clickable?: boolean;
  alwaysShowArrow?: boolean;
  onClick?: () => void;
  /** Card size variant — controls border radius and padding. */
  size?: 'lg' | 'md' | 'sm';
  /** Dark background variant */
  onDarkBg?: boolean;
  /** Adds a 1px #e3e3e3 border around the card. Default `false`. */
  bordered?: boolean;
  /**
   * Bullet point list rendered below the title/subtext. Uses `<Pointers>`.
   * Pairs naturally with `imagePosition="above"`.
   */
  bullets?: PointerItem[];
  /**
   * Background color for the image panel. Applied as a CSS color — any valid
   * value (hex, CSS variable, etc.). Most useful with `imagePosition="above"`
   * to tint the visual panel independently from the card background.
   */
  imageBg?: string;
  /**
   * Arbitrary content slot rendered below the title/subtext/bullets.
   * Use to inject `<Pointers>`, metric rows, or any other DS component.
   */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  imageSrc,
  imageHoverSrc,
  imageHoverAlt,
  hoverImageSrc,
  imageAlt = '',
  imagePosition = 'below',
  chipLabel,
  showChip = true,
  chipPosition = 'inline',
  title,
  titleVariant = 'body-xl',
  titleAs = 'h3',
  subtext,
  subtextVariant = 'body-m',
  showSubtext = true,
  buttonLabel = 'Button',
  buttonVariant = 'tertiary',
  showButton = true,
  clickable = false,
  alwaysShowArrow = false,
  onClick,
  size = 'lg',
  onDarkBg = false,
  chipShowDot = false,
  chipDotColor,
  chipIcon,
  chipVariant = 'filled',
  bordered = false,
  bullets,
  children,
  imageBg,
  chipBreakpoint,
  chipOnDarkBg = false,
  chipBg,
  chipShowIcon,
  videoSrc,
  videoMobileSrc,
  videoPoster,
  videoHoverSrc,
  videoHoverMobileSrc,
  videoObjectFit = 'cover',
  mediaAspectRatio,
  className,
  style,
}) => {
  const isBehind = imagePosition === 'behind';
  const isBottomRight = imagePosition === 'bottom-right';
  const isAbove = imagePosition === 'above';
  const sizeClass = size;
  const resolvedHoverSrc = imageHoverSrc ?? hoverImageSrc;
  const resolvedHoverAlt = imageHoverAlt ?? imageAlt;
  const hasHover = Boolean(imageSrc) && (Boolean(resolvedHoverSrc) || Boolean(videoHoverSrc));

  const cardClass = [
    styles.root,
    styles[sizeClass],
    (clickable || onClick) && styles.clickable,
    isBehind && styles['root--behind'],
    isBottomRight && styles['root--bottom-right'],
    isAbove && styles['root--above'],
    onDarkBg && styles['root--dark'],
    bordered && styles['root--bordered'],
    hasHover && styles.hoverable,
    className,
  ].filter(Boolean).join(' ');

  const textOverlayClass = [
    styles['text-overlay'],
    isBehind && styles['text-overlay--behind'],
    isBottomRight && styles['text-overlay--bottom-right'],
    styles[`text-overlay--${sizeClass}`],
  ].filter(Boolean).join(' ');

  const arrowClass = [
    styles['action-button'],
    alwaysShowArrow && styles['action-button--visible'],
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClass}
      style={style}
      onClick={onClick}
    >
      {isBehind && (videoSrc || imageSrc) && (
        <>
          {videoSrc ? (
            <VideoEl src={videoSrc} mobileSrc={videoMobileSrc} poster={videoPoster} objectFit={videoObjectFit} className={styles['image--behind']} />
          ) : (
            <img src={imageSrc} alt={imageAlt} className={[styles['image--behind'], styles['image-default']].join(' ')} />
          )}
          {!videoSrc && videoHoverSrc && (
            <VideoEl src={videoHoverSrc} mobileSrc={videoHoverMobileSrc} objectFit={videoObjectFit} className={[styles['image--behind'], styles['image-hover']].join(' ')} ariaHidden />
          )}
          {!videoSrc && !videoHoverSrc && resolvedHoverSrc && (
            <img src={resolvedHoverSrc} alt={resolvedHoverAlt} aria-hidden="true" className={[styles['image--behind'], styles['image-hover']].join(' ')} />
          )}
        </>
      )}

      {isBottomRight && (videoSrc || imageSrc) && (
        <div className={styles['image--bottom-right']}>
          {videoSrc ? (
            <VideoEl src={videoSrc} mobileSrc={videoMobileSrc} poster={videoPoster} objectFit={videoObjectFit} className={styles['image--bottom-right-default']} />
          ) : (
            <img src={imageSrc} alt={imageAlt} className={[styles['image--bottom-right-default'], styles['image-default']].join(' ')} />
          )}
          {!videoSrc && videoHoverSrc && (
            <VideoEl src={videoHoverSrc} mobileSrc={videoHoverMobileSrc} objectFit={videoObjectFit} className={[styles['image--bottom-right-hover'], styles['image-hover']].join(' ')} ariaHidden />
          )}
          {!videoSrc && !videoHoverSrc && resolvedHoverSrc && (
            <img src={resolvedHoverSrc} alt={resolvedHoverAlt} aria-hidden="true" className={[styles['image--bottom-right-hover'], styles['image-hover']].join(' ')} />
          )}
        </div>
      )}

      {showChip && chipLabel && chipPosition === 'floating' && (
        <div className={styles['chip--floating']}>
          <Chip
            label={chipLabel}
            variant={chipVariant}
            showDot={chipShowDot}
            dotColor={chipDotColor}
            icon={chipIcon}
            breakpoint={chipBreakpoint}
            onDarkBg={chipOnDarkBg}
            bg={chipBg ?? neutrals[0]}
            showIcon={chipShowIcon}
            style={{
              borderRadius: 1000,
              padding: '4px 16px',
            }}
          />
        </div>
      )}

      <div className={textOverlayClass}>
        {isBehind && <GradientBlur dark={onDarkBg} />}
        <div className={styles['content-left']}>
          {showChip && chipLabel && chipPosition === 'inline' && (
            <div className={styles['chip-wrapper']}>
              <Chip
                label={chipLabel}
                variant={chipVariant}
                showDot={chipShowDot}
                dotColor={chipDotColor}
                icon={chipIcon}
                breakpoint={chipBreakpoint}
                onDarkBg={chipOnDarkBg}
                bg={chipBg ?? neutrals[0]}
                showIcon={chipShowIcon}
                style={{
                  borderRadius: 1000,
                  padding: '4px 16px',
                }}
              />
            </div>
          )}
          <Text variant={titleVariant} as={titleAs} weight="medium" color={onDarkBg ? 'white' : 'default'}>{title}</Text>
          {showSubtext && subtext && <Text variant={subtextVariant} weight="regular" color={onDarkBg ? 'muted' : 'secondary'}>{subtext}</Text>}
          {bullets && bullets.length > 0 && (
            <Pointers items={bullets} onDarkBg={onDarkBg} />
          )}
          {children}
        </div>

        {showButton && !clickable && (
          <div className={styles['button-wrapper']}>
            <Button label={buttonLabel} variant={buttonVariant}
              showChevron={buttonVariant === 'tertiary'}
              onDarkBg={onDarkBg}
            />
          </div>
        )}

        {clickable && (
          <button className={arrowClass} tabIndex={-1} aria-hidden>
            <IconArrowDiagonal color={onDarkBg ? neutrals[0] : neutrals[100]} />
          </button>
        )}
      </div>

      {!isBehind && !isBottomRight && (
        <div
          className={[
            styles['image-container'],
            isAbove && styles['image-container--above'],
          ].filter(Boolean).join(' ')}
          style={{
            ...(imageBg ? { backgroundColor: imageBg } : null),
            ...(mediaAspectRatio ? { '--fds-cc-media-ratio': mediaAspectRatio } as CSSProperties : null),
          }}
        >
          {videoSrc ? (
            <VideoEl src={videoSrc} mobileSrc={videoMobileSrc} poster={videoPoster} objectFit={videoObjectFit} className={styles['image--below']} />
          ) : imageSrc ? (
            <img src={imageSrc} alt={imageAlt} className={[styles['image--below'], styles['image-default']].join(' ')} />
          ) : null}
          {!videoSrc && imageSrc && videoHoverSrc && (
            <VideoEl src={videoHoverSrc} mobileSrc={videoHoverMobileSrc} objectFit={videoObjectFit} className={[styles['image--below'], styles['image-hover']].join(' ')} ariaHidden />
          )}
          {!videoSrc && imageSrc && !videoHoverSrc && resolvedHoverSrc && (
            <img src={resolvedHoverSrc} alt={resolvedHoverAlt} aria-hidden="true" className={[styles['image--below'], styles['image-hover']].join(' ')} />
          )}
        </div>
      )}
    </div>
  );
};

ContentCard.displayName = 'ContentCard';

export default ContentCard;
