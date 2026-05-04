'use client';

import React, { ReactNode } from 'react';
import { Text } from '../Typography/Text';
import { Chip } from '../atoms/Chip';
import { ContactForm, type ContactFormValues } from '../molecules/ContactForm';
import styles from './ContactCTASection.module.css';

export type { ContactFormValues } from '../molecules/ContactForm';

export interface Step {
  n: number;
  title: string;
  body: string;
}

export interface ContactCTASectionProps {
  /** Heading shown inside the left glass card. Rendered as h2, variant heading-m. */
  title: ReactNode;
  /** Numbered steps shown below the heading. */
  steps?: Step[];
  /** Background image URL for the left panel. */
  bgImage: string;
  /** Solid color rendered behind the bg image (fallback + tint). */
  bgColor?: string;
  /** Optional eyebrow chip above the heading. */
  chipLabel?: string;
  className?: string;
  // ── ContactForm passthrough ──────────────────────────────────────────────
  formTitle?: string;
  productOptions?: string[];
  submitLabel?: string;
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
  agreement?: ReactNode;
  successContent?: ReactNode;
}

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({
  title,
  steps,
  bgImage,
  bgColor,
  chipLabel,
  className,
  formTitle = 'Get in Touch',
  productOptions,
  submitLabel,
  onSubmit,
  agreement,
  successContent,
}) => {
  const rootClass = [styles.root, className].filter(Boolean).join(' ');

  return (
    <section
      className={rootClass}
      style={
        {
          '--cta-bg-image': `url(${bgImage})`,
          '--cta-bg-color': bgColor ?? '#1a3a2a',
        } as React.CSSProperties
      }
    >
      <div className={styles.container}>
        {/* Left: background image + frosted glass card */}
        <div className={styles.left}>
          <div className={styles.bgLayer} />
          <div className={styles.card}>
            {chipLabel && (
              <Chip label={chipLabel} variant="anchor" showDot={false} />
            )}
            <Text variant="heading-m" as="h2">
              {title}
            </Text>
            {steps && steps.length > 0 && (
              <ol className={styles.steps}>
                {steps.map((step) => (
                  <li key={step.n} className={styles.step}>
                    <span className={styles.badge}>{step.n}</span>
                    <div className={styles.stepText}>
                      <Text variant="body-m" as="p" weight="medium">
                        {step.title}
                      </Text>
                      <Text variant="body-s" as="p" color="secondary">
                        {step.body}
                      </Text>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {/* Right: contact form */}
        <div className={styles.right}>
          <div className={styles.formWrap}>
            <ContactForm
              formTitle={formTitle}
              productOptions={productOptions}
              submitLabel={submitLabel}
              onSubmit={onSubmit}
              agreement={agreement}
              successContent={successContent}
              style={{ padding: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

ContactCTASection.displayName = 'ContactCTASection';

export default ContactCTASection;
