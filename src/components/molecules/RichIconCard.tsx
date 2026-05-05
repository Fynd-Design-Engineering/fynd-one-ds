import React, { CSSProperties, ReactNode } from 'react';
import { neutrals } from '../../tokens';
import { IconArrowDiagonal } from '../../icons';
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
  /** Adds a 1px #e3e3e3 border around the card. Default `true` (matches the existing visual). */
  bordered?: boolean;
  /** Semantic heading level for the card title. Defaults to `'h3'`. */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Show the corner arrow affordance. Only renders when `href` or `onClick`
   *  is set. Hidden at rest, visible on card hover / focus-within. */
  showArrow?: boolean;
  /** Keep the corner arrow permanently visible (still requires `href` or
   *  `onClick`). Hover adds a small directional shift. */
  alwaysShowArrow?: boolean;
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
  bordered = true,
  href,
  onClick,
  overlayLabel,
  titleAs: TitleTag = 'h3',
  showArrow = false,
  alwaysShowArrow = false,
  className,
  style,
}) => {
  const isClickable = !!(href || onClick);
  const showCornerArrow = isClickable && (showArrow || alwaysShowArrow);

  const arrowClass = [
    styles['corner-arrow'],
    alwaysShowArrow && styles['corner-arrow--always'],
  ].filter(Boolean).join(' ');

  const cardClass = [
    styles.root,
    onDarkBg && styles.dark,
    isClickable && styles.clickable,
    bordered && styles.bordered,
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
      {showCornerArrow && (
        <span className={arrowClass} aria-hidden="true">
          <IconArrowDiagonal
            size={20}
            color={onDarkBg ? neutrals[0] : neutrals[100]}
          />
        </span>
      )}
      <div className={styles.content}>
        {icon && (
          <VisualElement
            size={iconSize}
            bordered={iconBordered ?? defaultBorderedFor(iconSize)}
            style={onDarkBg ? { borderColor: 'var(--fds-neutral-80, #4a4b4c)' } : undefined}
          >
            {icon}
          </VisualElement>
        )}
        <div className={styles['text-group']}>
          <TitleTag className={titleClass}>{title}</TitleTag>
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
