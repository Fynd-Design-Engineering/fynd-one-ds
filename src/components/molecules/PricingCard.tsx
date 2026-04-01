import React, { CSSProperties } from 'react';
import { Text } from '../Typography/Text';
import { Button } from '../atoms/Button';
import { IcConfirm } from '../../assets/icons/actions';
import PopularGradientBg from '../../assets/icons/misc/ic_popular_gradient.svg?react';
import styles from './PricingCard.module.css';

export interface PricingFeature {
  text: string;
}

export interface PricingCardProps {
  /** Label shown in the tag (e.g., "Starter", "Pro") */
  label: string;
  /** Text for the popular indicator pill. If omitted, pill is hidden. */
  popularText?: string;
  /** Title with optional bold segment. Use `titleBold` for the emphasized part. */
  title: string;
  /** Bold portion of the title (rendered after the regular portion) */
  titleBold?: string;
  /** Currency symbol */
  currency?: string;
  /** Price amount */
  amount: string;
  /** Billing period text (e.g., "/year + GST") */
  period?: string;
  /** CTA button label */
  buttonLabel?: string;
  /** CTA button variant */
  buttonVariant?: 'primary' | 'secondary' | 'tertiary';
  /** Feature list items */
  features?: PricingFeature[];
  /** Dark background variant */
  onDarkBg?: boolean;
  /** Click handler for the CTA button */
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  label,
  popularText,
  title,
  titleBold,
  currency = '₹',
  amount,
  period = '/year + GST',
  buttonLabel = 'Get Started',
  buttonVariant = 'primary',
  features = [],
  onDarkBg = false,
  onButtonClick,
  className,
  style,
}) => {
  const rootCls = [
    styles.root,
    onDarkBg ? styles['root--dark'] : styles['root--light'],
    className,
  ].filter(Boolean).join(' ');

  const amountCls = [
    styles['amount-section'],
    onDarkBg ? styles['amount-section--dark'] : styles['amount-section--light'],
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls} style={style}>
      {/* Pricing amount section */}
      <div className={amountCls}>
        <div className={styles['amount-content']}>
          {/* Tags row */}
          <div className={styles['tags-row']}>
            <div className={onDarkBg ? styles['label--dark'] : styles['label--light']}>
              <Text variant="body-s" weight="medium" color={onDarkBg ? 'white' : 'default'}>
                {label}
              </Text>
            </div>
            {popularText && (
              <div className={styles['popular-pill']}>
                <PopularGradientBg className={styles['popular-bg']} />
                <span className={styles['popular-text']}>{popularText}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <div className={styles['title-row']}>
            <Text variant="heading-s" as="p" color={onDarkBg ? 'muted' : 'muted'}>
              {title}{' '}
              {titleBold && (
                <span className={onDarkBg ? styles['title-bold--dark'] : styles['title-bold--light']}>
                  {titleBold}
                </span>
              )}
            </Text>
          </div>
        </div>

        {/* Price + Button */}
        <div className={styles['price-action']}>
          <div className={styles['price-row']}>
            <div className={onDarkBg ? styles['price--dark'] : styles['price--light']}>
              <span className={styles['currency']}>{currency}</span>
              <span className={styles['price-amount']}>{amount}</span>
            </div>
            <Text variant="body-s" color={onDarkBg ? 'muted' : 'secondary'} as="span">
              {period}
            </Text>
          </div>
          <Button
            label={buttonLabel}
            variant={buttonVariant}
            showChevron
            onDarkBg={onDarkBg}
            onClick={onButtonClick}
          />
        </div>
      </div>

      {/* Features list */}
      {features.length > 0 && (
        <div className={styles['features']}>
          {features.map((feature, i) => (
            <div key={i} className={styles['feature-row']}>
              <IcConfirm className={styles['feature-icon']} />
              <Text variant="body-s" color={onDarkBg ? 'muted' : 'secondary'}>
                {feature.text}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

PricingCard.displayName = 'PricingCard';

export default PricingCard;
