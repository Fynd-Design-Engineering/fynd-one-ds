import React, { CSSProperties } from 'react';
import { Button } from '../atoms/Button';
import { VisualElement, VisualElementSize } from '../atoms/VisualElement';
import styles from './RichIconCard.module.css';

export interface RichIconCardProps {
  icon?: React.ReactNode;
  iconSize?: VisualElementSize;
  title: string;
  subtext?: string;
  buttonLabel?: string;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showButton?: boolean;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const RichIconCard: React.FC<RichIconCardProps> = ({
  icon,
  iconSize = 'icon-32',
  title,
  subtext,
  buttonLabel = 'Button',
  onButtonClick,
  showButton = true,
  onDarkBg = false,
  className,
  style,
}) => {
  const cardClass = [
    styles.root,
    onDarkBg && styles.dark,
    className,
  ].filter(Boolean).join(' ');

  const titleClass = [
    styles.title,
    onDarkBg && styles['title--dark'],
  ].filter(Boolean).join(' ');

  const subtextClass = [
    styles.subtext,
    onDarkBg && styles['subtext--dark'],
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClass}
      style={style}
      data-figma-id="879:3878"
    >
      <div className={styles.content}>
        <VisualElement size={iconSize}>{icon}</VisualElement>
        <div className={styles['text-group']}>
          <p className={titleClass}>{title}</p>
          {subtext && <p className={subtextClass}>{subtext}</p>}
        </div>
      </div>
      {showButton && (
        <Button
          label={buttonLabel}
          variant="tertiary"
          onClick={onButtonClick}
          onDarkBg={onDarkBg}
        />
      )}
    </div>
  );
};

RichIconCard.displayName = 'RichIconCard';

export default RichIconCard;
