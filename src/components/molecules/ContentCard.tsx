import React, { CSSProperties } from 'react';
import { neutrals } from '../../tokens';
import { Chip } from '../atoms/Chip';
import { Button } from '../atoms/Button';
import { Text, TextVariant } from '../Typography/Text';
import { IconArrowDiagonal } from '../../icons';
import '../../styles/gradient-blur.css';
import styles from './ContentCard.module.css';

const GradientBlur: React.FC = () => (
  <div className="gradient-blur">
    <div /><div /><div /><div /><div /><div />
  </div>
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
  imagePosition?: 'below' | 'behind' | 'bottom-right';
  chipLabel?: string;
  showChip?: boolean;
  title: string;
  titleVariant?: TextVariant;
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
  title,
  titleVariant = 'body-xl',
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
  className,
  style,
}) => {
  const isBehind = imagePosition === 'behind';
  const isBottomRight = imagePosition === 'bottom-right';
  const sizeClass = size;
  const resolvedHoverSrc = imageHoverSrc ?? hoverImageSrc;
  const resolvedHoverAlt = imageHoverAlt ?? imageAlt;

  const cardClass = [
    styles.root,
    styles[sizeClass],
    (clickable || onClick) && styles.clickable,
    isBehind && styles['root--behind'],
    isBottomRight && styles['root--bottom-right'],
    onDarkBg && styles['root--dark'],
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
      data-figma-id="3262:20928"
    >
      {isBehind && imageSrc && (
        <>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={[styles['image--behind'], styles['image-default']]
              .filter(Boolean)
              .join(' ')}
          />
          {resolvedHoverSrc && (
            <img
              src={resolvedHoverSrc}
              alt={resolvedHoverAlt}
              aria-hidden="true"
              className={[styles['image--behind'], styles['image-hover']]
                .filter(Boolean)
                .join(' ')}
            />
          )}
        </>
      )}

      {isBehind && <GradientBlur />}

      {isBottomRight && imageSrc && (
        <div className={styles['image--bottom-right']}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={[styles['image--bottom-right-default'], styles['image-default']]
              .filter(Boolean)
              .join(' ')}
          />
          {resolvedHoverSrc && (
            <img
              src={resolvedHoverSrc}
              alt={resolvedHoverAlt}
              aria-hidden="true"
              className={[styles['image--bottom-right-hover'], styles['image-hover']]
                .filter(Boolean)
                .join(' ')}
            />
          )}
        </div>
      )}

      <div className={textOverlayClass}>
        <div className={styles['content-left']}>
          {showChip && chipLabel && (
            <div className={styles['chip-wrapper']}>
              <Chip label={chipLabel} variant="filled" showDot={false}
                style={{
                  backgroundColor: neutrals[0],
                  borderRadius: 1000,
                  padding: '4px 16px',
                }}
              />
            </div>
          )}
          <Text variant={titleVariant} weight="medium" color={onDarkBg ? 'white' : 'default'}>{title}</Text>
          {showSubtext && subtext && <Text variant={subtextVariant} weight="regular" color={onDarkBg ? 'muted' : 'secondary'}>{subtext}</Text>}
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
        <div className={styles['image-container']}>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt}
              className={[styles['image--below'], styles['image-default']]
                .filter(Boolean)
                .join(' ')}
            />
          )}
          {imageSrc && resolvedHoverSrc && (
            <img
              src={resolvedHoverSrc}
              alt={resolvedHoverAlt}
              aria-hidden="true"
              className={[styles['image--below'], styles['image-hover']]
                .filter(Boolean)
                .join(' ')}
            />
          )}
        </div>
      )}
    </div>
  );
};

ContentCard.displayName = 'ContentCard';

export default ContentCard;
