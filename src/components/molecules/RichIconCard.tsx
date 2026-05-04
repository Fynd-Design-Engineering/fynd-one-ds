import React, { CSSProperties, ReactNode } from 'react';
import { Button } from '../atoms/Button';
import { VisualElement, VisualElementSize } from '../atoms/VisualElement';
import styles from './RichIconCard.module.css';

export interface RichIconCardProps {
  icon?: React.ReactNode;
  iconSize?: VisualElementSize;
  /**
   * Show the 1px hairline border on the icon chip. When omitted, defaults
   * by size: `true` for `icon-32` / `icon-48` (where the bezel reads as
   * the chip itself), `false` for logo / custom sizes (where the border
   * adds nothing around an illustration).
   */
  iconBordered?: boolean;
  title: string;
  subtext?: string;
  /**
   * Actions slot — drop one or more `<Button>` elements here for the
   * card footer. When provided, takes precedence over the legacy
   * `buttonLabel` / `showButton` / `onButtonClick` props.
   */
  actions?: ReactNode;
  buttonLabel?: string;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showButton?: boolean;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

const defaultBorderedFor = (size: VisualElementSize): boolean =>
  typeof size === 'string' && (size === 'icon-32' || size === 'icon-48');

export const RichIconCard: React.FC<RichIconCardProps> = ({
  icon,
  iconSize = 'icon-32',
  iconBordered,
  title,
  subtext,
  actions,
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
        {icon && (
          <VisualElement
            size={iconSize}
            bordered={iconBordered ?? defaultBorderedFor(iconSize)}
          >
            {icon}
          </VisualElement>
        )}
        <div className={styles['text-group']}>
          <p className={titleClass}>{title}</p>
          {subtext && <p className={subtextClass}>{subtext}</p>}
        </div>
      </div>
      {actions ? (
        <div className={styles.actions}>{actions}</div>
      ) : (
        showButton && (
          <Button
            label={buttonLabel}
            variant="tertiary"
            onClick={onButtonClick}
            onDarkBg={onDarkBg}
          />
        )
      )}
    </div>
  );
};

RichIconCard.displayName = 'RichIconCard';

export default RichIconCard;
