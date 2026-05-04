import React, { ReactNode } from 'react';
import { Text } from '../Typography/Text';
import { Chip } from '../atoms/Chip';
import { Button } from '../atoms/Button';
import styles from './CTABannerSection.module.css';

export interface BannerButton {
  label: string;
  /** Internal route or absolute URL. Renders the button as an `<a href>`. */
  href?: string;
  /** When true, adds `target="_blank" rel="noopener noreferrer"`. Requires `href`. */
  external?: boolean;
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
  /** Color theme. `dark` (default) uses darkest neutral bg + white text; `light` uses neutral-10 bg + dark text. */
  variant?: 'dark' | 'light';
  /** Section background color. Any CSS color. Overrides the variant default. */
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
  variant = 'dark',
  bgColor,
  bgImage,
  primaryButton,
  secondaryButton,
  className,
}) => {
  const isCenter = align === 'center';
  const isDark = variant === 'dark';
  const hasButtons = primaryButton || secondaryButton;

  const defaultBg = isDark ? '#101319' : 'var(--fds-neutral-10, #f8f8f9)';

  const rootClass = [styles.root, isCenter ? styles.center : styles.left, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={rootClass}
      style={
        {
          '--cta-bg': bgColor ?? defaultBg,
          ...(bgImage ? { '--cta-image': `url(${bgImage})` } : {}),
        } as React.CSSProperties
      }
    >
      {bgImage && <div className={styles.bgLayer} />}

      <div className={styles.inner}>
        {chipLabel && (
          <Chip label={chipLabel} variant="anchor" onDarkBg={isDark} dotColor="blue" />
        )}

        <div className={styles.textBlock}>
          <Text variant="heading-xl" as="h2" color={isDark ? 'white' : 'default'}>
            {title}
          </Text>
          {subtext && (
            <Text
              variant="body-l"
              as="p"
              style={{
                color: isDark
                  ? 'var(--fds-neutral-40, #a0a1a2)'
                  : 'var(--fds-neutral-60, #5b5c5d)',
              }}
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
                onDarkBg={isDark}
                href={primaryButton.href}
                external={primaryButton.external}
                onClick={primaryButton.onClick}
              />
            )}
            {secondaryButton && (
              <Button
                label={secondaryButton.label}
                variant="secondary"
                onDarkBg={isDark}
                href={secondaryButton.href}
                external={secondaryButton.external}
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
