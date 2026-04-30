'use client';

/**
 * Fynd Marketing Navbar action presets
 *
 * Drop-in right-side action group for the marketing Navbar:
 *   • desktop phone CTA + icon-only phone-circle on mobile
 *   • "Book a demo" → opens Modal with ContactForm
 *   • "Sign in" anchored to the consumer's auth route
 *
 * Consumer wires `onContactSubmit` (e.g. HubSpot Forms API) and the
 * Book-a-demo trigger handles the rest. All copy/URLs are overridable.
 *
 * Usage:
 *   import {
 *     Navbar,
 *     fyndMarketingNavItems,
 *     FyndMarketingNavActions,
 *     FyndMarketingNavMobileActions,
 *   } from '@fynd-design-engineering/fynd-one-ds';
 *
 *   <Navbar
 *     logo={<Logo />}
 *     navItems={fyndMarketingNavItems}
 *     actions={<FyndMarketingNavActions onContactSubmit={submit} />}
 *     mobileActions={<FyndMarketingNavMobileActions onContactSubmit={submit} />}
 *   />
 */

import { CSSProperties, ReactNode } from 'react';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/molecules/Modal';
import { ContactForm, ContactFormValues } from '../components/molecules/ContactForm';
import { IcCall } from '../assets/icons/communication';
import { fyndMarketingProductOptions } from './fyndMarketingProductOptions';

export interface FyndMarketingNavActionsProps {
  /** Visible phone number text on desktop. Default "+91 74001 56169". */
  phoneNumber?: string;
  /** Tel: href (icon-only circle on mobile, full button on desktop). */
  phoneHref?: string;
  /** Sign in destination. Default "/sign-in". */
  signInHref?: string;
  /** Sign in button label. Default "Sign in". */
  signInLabel?: string;
  /** Book a demo button label. Default "Book a demo". */
  bookDemoLabel?: string;
  /** Title rendered above the ContactForm in the modal. */
  contactFormTitle?: string;
  /** ContactForm submit handler. Wire HubSpot / CRM here. */
  onContactSubmit?: (values: ContactFormValues) => void | Promise<void>;
  /** ContactForm product-interested options. */
  productOptions?: string[];
}

const DEFAULT_PHONE_NUMBER = '+91 74001 56169';
const DEFAULT_PHONE_HREF = 'tel:+917400156169';
const DEFAULT_SIGN_IN_HREF = '/sign-in';

const phoneCircleStyle: CSSProperties = {
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: 999,
  border: '1px solid #0000001f',
  color: 'var(--fds-neutral-100, #101319)',
  textDecoration: 'none',
  flexShrink: 0,
};

const phoneTextStyle: CSSProperties = {
  fontFamily: "'Inter Display', sans-serif",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  letterSpacing: 0,
};

const ContactModal = ({
  trigger,
  formTitle,
  productOptions,
  onSubmit,
}: {
  trigger: ReactNode;
  formTitle?: string;
  productOptions?: string[];
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
}) => (
  <Modal trigger={trigger as React.ReactElement} width={550}>
    <ContactForm
      formTitle={formTitle}
      productOptions={productOptions}
      onSubmit={onSubmit}
    />
  </Modal>
);

export const FyndMarketingNavActions = ({
  phoneNumber = DEFAULT_PHONE_NUMBER,
  phoneHref = DEFAULT_PHONE_HREF,
  signInHref = DEFAULT_SIGN_IN_HREF,
  signInLabel = 'Sign in',
  bookDemoLabel = 'Book a demo',
  contactFormTitle,
  onContactSubmit,
  productOptions = [...fyndMarketingProductOptions],
}: FyndMarketingNavActionsProps) => {
  return (
    <>
      <Button
        className="fds-actions__desktop-only"
        label={phoneNumber}
        variant="tertiary"
        iconLeft={<IcCall />}
        showChevron={false}
        style={phoneTextStyle}
        onClick={() => {
          if (typeof window !== 'undefined') window.location.href = phoneHref;
        }}
      />
      <a
        className="fds-actions__phone-circle"
        href={phoneHref}
        aria-label={`Call ${phoneNumber}`}
        style={phoneCircleStyle}
      >
        <IcCall />
      </a>
      <ContactModal
        trigger={
          <Button
            className="fds-actions__desktop-only"
            label={bookDemoLabel}
            variant="secondary"
            style={{ borderColor: '#0000001f' }}
          />
        }
        formTitle={contactFormTitle}
        productOptions={productOptions}
        onSubmit={onContactSubmit}
      />
      <Button
        label={signInLabel}
        variant="primary"
        onClick={() => {
          if (typeof window !== 'undefined') window.location.href = signInHref;
        }}
      />
      <style>{`
        @media (max-width: 991px) {
          .fds-actions__phone-circle { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
};

export interface FyndMarketingNavMobileActionsProps {
  bookDemoLabel?: string;
  contactFormTitle?: string;
  onContactSubmit?: (values: ContactFormValues) => void | Promise<void>;
  productOptions?: string[];
}

export const FyndMarketingNavMobileActions = ({
  bookDemoLabel = 'Book a demo',
  contactFormTitle,
  onContactSubmit,
  productOptions = [...fyndMarketingProductOptions],
}: FyndMarketingNavMobileActionsProps) => (
  <ContactModal
    trigger={
      <Button
        label={bookDemoLabel}
        variant="primary"
        showChevron={false}
        style={{ marginTop: '1.5rem' }}
      />
    }
    formTitle={contactFormTitle}
    productOptions={productOptions}
    onSubmit={onContactSubmit}
  />
);
