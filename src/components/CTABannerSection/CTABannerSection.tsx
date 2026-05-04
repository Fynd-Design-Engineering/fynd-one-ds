import React, { ReactNode } from 'react';
import { Text } from '../Typography/Text';
import { Chip } from '../atoms/Chip';
import { Button } from '../atoms/Button';
import styles from './CTABannerSection.module.css';

export interface BannerButton {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface CTABannerSectionProps {
  /** Main heading. Rendered as h2, variant heading-xl. */
  title: ReactNode;
  /** Supporting body text below the title. */
  subtext?: ReactNode;
  /** Eyebrow chip above the title. */
  chipLabel?: string;
  /** Content alignment. Defaults to center. */
  align?: 'center' | 'left';
  /** Section background color. Any CSS color. Defaults to darkest neutral. */
  bgColor?: string;
  /** Optional background image URL — layered on top of bgColor. */
  bgImage?: string;
  /** Primary CTA button. Omit to hide. */
  primaryButton?: BannerButton;
  /** Secondary CTA button. Omit to hide. */
  secondaryButton?: BannerButton;
  className?: string;
}

export const CTABannerSection: React.FC<CTABannerSectionProps> = ({
  title,
  subtext,
  chipLabel,
  align = 'center',
  bgColor,
  bgImage,
  primaryButton,
  secondaryButton,
  className,
}) => {
  const isCenter = align === 'center';
  const hasButtons = primaryButton || secondaryButton;

  const rootClass = [styles.root, isCenter ? styles.center : styles.left, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={rootClass}
      style={
        {
          '--cta-bg': bgColor ?? 'var(--fds-neutral-100, #101319)',
          ...(bgImage ? { '--cta-image': `url(${bgImage})` } : {}),
        } as React.CSSProperties
      }
    >
      {bgImage && <div className={styles.bgLayer} />}

      <div className={styles.inner}>
        {chipLabel && (
          <Chip label={chipLabel} variant="anchor" onDarkBg dotColor="blue" />
        )}

        <div className={styles.textBlock}>
          <Text variant="heading-xl" as="h2" color="white">
            {title}
          </Text>
          {subtext && (
            <Text
              variant="body-l"
              as="p"
              style={{ color: 'var(--fds-neutral-40, #a0a1a2)' }}
            >
              {subtext}
            </Text>
          )}
        </div>

        {hasButtons && (
          <div className={styles.actions}>
            {primaryButton && (
              <Button
                label={primaryButton.label}
                variant="primary"
                onDarkBg
                onClick={primaryButton.onClick}
              />
            )}
            {secondaryButton && (
              <Button
                label={secondaryButton.label}
                variant="secondary"
                onDarkBg
                onClick={secondaryButton.onClick}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

CTABannerSection.displayName = 'CTABannerSection';

export default CTABannerSection;
