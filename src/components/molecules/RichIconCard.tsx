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
  /**
   * Makes the entire card a link. Renders a transparent `<a>` overlay
   * covering the card. Any footer buttons remain independently clickable
   * above the overlay.
   */
  href?: string;
  /**
   * Makes the entire card a clickable button overlay. Use `href` for
   * navigation; use `onClick` for in-page actions.
   */
  onClick?: (e: React.MouseEvent) => void;
  /** Accessible label for the card overlay. Defaults to `title`. */
  overlayLabel?: string;
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
  href,
  onClick,
  overlayLabel,
  className,
  style,
}) => {
  const isClickable = !!(href || onClick);

  const cardClass = [
    styles.root,
    onDarkBg && styles.dark,
    isClickable && styles.clickable,
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

  const footerContent = actions ? (
    <div className={styles.actions}>{actions}</div>
  ) : showButton ? (
    <Button
      label={buttonLabel}
      variant="tertiary"
      onClick={onButtonClick}
      onDarkBg={onDarkBg}
    />
  ) : null;

  return (
    <div
      className={cardClass}
      style={style}
      data-figma-id="879:3878"
    >
      {isClickable && (
        href ? (
          <a
            href={href}
            onClick={onClick}
            className={styles.overlay}
            aria-label={overlayLabel ?? title}
          />
        ) : (
          <button
            type="button"
            onClick={onClick}
            className={styles.overlay}
            aria-label={overlayLabel ?? title}
          />
        )
      )}
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
      {footerContent && (
        <div className={styles.footer}>{footerContent}</div>
      )}
    </div>
  );
};

RichIconCard.displayName = 'RichIconCard';

export default RichIconCard;
