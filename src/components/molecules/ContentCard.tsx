import React, { CSSProperties } from 'react';
import { neutrals } from '../../tokens';
import { Chip } from '../atoms/Chip';
import { Button } from '../atoms/Button';
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
  imageAlt?: string;
  imagePosition?: 'below' | 'behind';
  chipLabel?: string;
  showChip?: boolean;
  title: string;
  subtext?: string;
  showSubtext?: boolean;
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'secondary' | 'tertiary';
  showButton?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  breakpoint?: 'lg' | 'md' | 'sm';
  className?: string;
  style?: CSSProperties;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  imageSrc,
  imageAlt = '',
  imagePosition = 'below',
  chipLabel,
  showChip = true,
  title,
  subtext,
  showSubtext = true,
  buttonLabel = 'Button',
  buttonVariant = 'tertiary',
  showButton = true,
  clickable = false,
  onClick,
  breakpoint = 'lg',
  className,
  style,
}) => {
  const isBehind = imagePosition === 'behind';

  const cardClass = [
    styles.root,
    styles[breakpoint],
    (clickable || onClick) && styles.clickable,
    className,
  ].filter(Boolean).join(' ');

  const textOverlayClass = [
    styles['text-overlay'],
    isBehind && styles['text-overlay--behind'],
    styles[`text-overlay--${breakpoint}`],
  ].filter(Boolean).join(' ');

  const titleClass = [
    styles.title,
    styles[`title--${breakpoint}`],
  ].filter(Boolean).join(' ');

  const subtextClass = [
    styles.subtext,
    styles[`subtext--${breakpoint}`],
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClass}
      style={style}
      onClick={onClick}
      data-figma-id="3262:20928"
    >
      {isBehind && imageSrc && (
        <img src={imageSrc} alt={imageAlt} className={styles['image--behind']} />
      )}

      {isBehind && <GradientBlur />}

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
          <p className={titleClass}>{title}</p>
          {showSubtext && subtext && <p className={subtextClass}>{subtext}</p>}
        </div>

        {showButton && !clickable && (
          <div className={styles['button-wrapper']}>
            <Button label={buttonLabel} variant={buttonVariant}
              showChevron={buttonVariant === 'tertiary'}
            />
          </div>
        )}

        {clickable && (
          <button className={styles['action-button']} tabIndex={-1} aria-hidden>
            <IconArrowDiagonal color={neutrals[100]} />
          </button>
        )}
      </div>

      {!isBehind && (
        <div className={styles['image-container']}>
          {imageSrc && <img src={imageSrc} alt={imageAlt} className={styles['image--below']} />}
        </div>
      )}
    </div>
  );
};

ContentCard.displayName = 'ContentCard';

export default ContentCard;
