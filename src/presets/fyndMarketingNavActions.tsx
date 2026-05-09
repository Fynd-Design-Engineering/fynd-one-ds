'use client';

/**
 * Fynd Marketing Navbar action presets
 *
 * Drop-in right-side action group for the marketing Navbar:
 *   • desktop: phone number + chevron → opens contact dropdown (WhatsApp QR + phone)
 *   • mobile: icon-only circle → same dropdown
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

import React, { CSSProperties, ReactNode, forwardRef, useRef, useState } from 'react';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/molecules/Modal';
import { Popover } from '../components/molecules/Popover';
import { ContactForm, ContactFormValues } from '../components/molecules/ContactForm';
import { IcCall } from '../assets/icons/communication';
import { IcChevronDown } from '../assets/icons/navigation';
import { fyndMarketingProductOptions } from './fyndMarketingProductOptions';

// ── WhatsApp inline icon ──────────────────────────────────────────────────────

const IcWhatsApp = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
  </svg>
);

// ── Styles ────────────────────────────────────────────────────────────────────

const triggerBaseStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  color: 'var(--fds-neutral-100, #101319)',
};

const triggerCircleStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const panelStyle: CSSProperties = {
  padding: '8px 0',
};

const waHeaderStyle: CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'flex-start',
  padding: '10px 16px 14px',
};

const waHeaderTitleStyle: CSSProperties = {
  fontFamily: "'Inter Display', sans-serif",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.4,
  color: 'var(--fds-neutral-100, #101319)',
  margin: 0,
};

const waHeaderSubStyle: CSSProperties = {
  fontFamily: "'Inter Display', sans-serif",
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.4,
  color: 'var(--fds-neutral-60, #5b5c5d)',
  margin: '2px 0 0',
};

const qrCardStyle: CSSProperties = {
  margin: '0 12px',
  border: '1px solid var(--fds-neutral-30, #e3e3e3)',
  borderRadius: 12,
  overflow: 'hidden',
};

const qrImageBlockStyle: CSSProperties = {
  background: 'var(--fds-neutral-10, #f8f8f9)',
  display: 'flex',
  justifyContent: 'center',
  padding: 24,
};

const qrCopyStyle: CSSProperties = {
  textAlign: 'center',
  padding: '16px 16px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
};

const qrTitleStyle: CSSProperties = {
  fontFamily: "'Inter Display', sans-serif",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.4,
  color: 'var(--fds-neutral-100, #101319)',
  margin: 0,
};

const qrOrStyle: CSSProperties = {
  fontFamily: "'Inter Display', sans-serif",
  fontSize: 14,
  fontWeight: 400,
  color: 'var(--fds-neutral-60, #5b5c5d)',
  margin: 0,
};

const dividerStyle: CSSProperties = {
  height: 1,
  background: 'var(--fds-neutral-30, #e3e3e3)',
  margin: '8px 12px',
};

const phoneButtonWrapStyle: CSSProperties = {
  padding: '8px 12px',
};

// ── ContactDropdownTrigger ────────────────────────────────────────────────────

const ContactDropdownTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ style, ...props }, ref) => (
  <button ref={ref} {...props} style={{ ...triggerBaseStyle, gap: 6, ...style }}>
    <span style={triggerCircleStyle}>
      <IcCall />
    </span>
    <span style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
      <IcChevronDown />
    </span>
  </button>
));
ContactDropdownTrigger.displayName = 'ContactDropdownTrigger';

// ── ContactDropdownPanel ──────────────────────────────────────────────────────

const ContactDropdownPanel = ({
  whatsappHref,
  whatsappQrSrc,
  phoneNumber,
  phoneHref,
}: {
  whatsappHref: string;
  whatsappQrSrc: string;
  phoneNumber: string;
  phoneHref: string;
}) => (
  <div style={panelStyle}>
    <div style={waHeaderStyle}>
      <span style={{ color: 'var(--fds-neutral-60, #5b5c5d)', display: 'flex', flexShrink: 0, marginTop: 1 }}>
        <IcWhatsApp />
      </span>
      <div>
        <p style={waHeaderTitleStyle}>Chat on Whatsapp</p>
        <p style={waHeaderSubStyle}>Message us for quick assistance</p>
      </div>
    </div>

    <div style={qrCardStyle}>
      <div style={qrImageBlockStyle}>
        <img
          src={whatsappQrSrc}
          alt="WhatsApp QR code — scan to chat"
          width={160}
          height={160}
          style={{ display: 'block' }}
        />
      </div>
      <div style={qrCopyStyle}>
        <p style={qrTitleStyle}>Scan the QR code to chat</p>
        <p style={qrOrStyle}>or</p>
        <Button
          label="Open Whatsapp"
          variant="secondary"
          size="md"
          showChevron
          style={{ borderColor: '#0000001f' }}
          onClick={() => {
            if (typeof window !== 'undefined') window.open(whatsappHref, '_blank', 'noopener,noreferrer');
          }}
        />
      </div>
    </div>

    <div style={phoneButtonWrapStyle}>
      <Button
        label={phoneNumber}
        variant="secondary"
        size="md"
        iconLeft={<IcCall />}
        href={phoneHref}
        style={{ width: '100%', borderColor: '#0000001f' }}
      />
    </div>
  </div>
);

// ── ContactModal ──────────────────────────────────────────────────────────────

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

// ── Constants ─────────────────────────────────────────────────────────────────

const DEFAULT_PHONE_NUMBER = '+91 74001 56169';
const DEFAULT_PHONE_HREF = 'tel:+917400156169';
const DEFAULT_WHATSAPP_HREF = 'https://api.whatsapp.com/send/?phone=917400156169&text&type=phone_number&app_absent=0';
const DEFAULT_WHATSAPP_QR_SRC = 'https://cdn.prod.website-files.com/67a9c8e5f2c74ac8c2c9b88b/69fc6027963847a4f0b71672_whatsapp-qr%20(1).svg';
const DEFAULT_SIGN_IN_HREF = '/sign-in';

// ── Props ─────────────────────────────────────────────────────────────────────

export interface FyndMarketingNavActionsProps {
  /** Visible phone number text on desktop. Default "+91 74001 56169". */
  phoneNumber?: string;
  /** Tel: href used in the phone link inside the dropdown. */
  phoneHref?: string;
  /** WhatsApp deep-link for "Open Whatsapp" button + mobile QR. Default: Fynd's WhatsApp API link. */
  whatsappHref?: string;
  /** QR code image URL shown in the dropdown. Default: Fynd's hosted WhatsApp QR. */
  whatsappQrSrc?: string;
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

// ── FyndMarketingNavActions ───────────────────────────────────────────────────

export const FyndMarketingNavActions = ({
  phoneNumber = DEFAULT_PHONE_NUMBER,
  phoneHref = DEFAULT_PHONE_HREF,
  whatsappHref = DEFAULT_WHATSAPP_HREF,
  whatsappQrSrc = DEFAULT_WHATSAPP_QR_SRC,
  signInHref = DEFAULT_SIGN_IN_HREF,
  signInLabel = 'Sign in',
  bookDemoLabel = 'Book a demo',
  contactFormTitle,
  onContactSubmit,
  productOptions = [...fyndMarketingProductOptions],
}: FyndMarketingNavActionsProps) => {
  const [contactOpen, setContactOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openContact = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setContactOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setContactOpen(false), 120);
  };

  return (
  <>
    <Popover
      open={contactOpen}
      onOpenChange={setContactOpen}
      trigger={
        <ContactDropdownTrigger
          onMouseEnter={openContact}
          onMouseLeave={scheduleClose}
        />
      }
      placement="bottom-end"
      width={360}
    >
      <div onMouseEnter={openContact} onMouseLeave={scheduleClose}>
        <ContactDropdownPanel
          whatsappHref={whatsappHref}
          whatsappQrSrc={whatsappQrSrc}
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
        />
      </div>
    </Popover>

    <ContactModal
      trigger={
        <Button
          className="fds-actions__desktop-only"
          label={bookDemoLabel}
          variant="secondary"
          size="md"
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
      size="md"
      onClick={() => {
        if (typeof window !== 'undefined') window.location.href = signInHref;
      }}
    />

  </>
  );
};

// ── FyndMarketingNavMobileActions ─────────────────────────────────────────────

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
