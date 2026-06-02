'use client';

/**
 * Fynd Marketing Navbar action presets
 *
 * Drop-in right-side action group for the marketing Navbar:
 *   • desktop: phone icon + chevron → opens contact dropdown (WhatsApp QR + phone)
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

import React, { ReactNode, forwardRef, useRef, useState } from 'react';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/molecules/Modal';
import { Popover } from '../components/molecules/Popover';
import { ContactForm, ContactFormValues } from '../components/molecules/ContactForm';
import { IcCall } from '../assets/icons/communication';
import { IcChevronDown } from '../assets/icons/navigation';
import { fyndMarketingProductOptions } from './fyndMarketingProductOptions';
import styles from './fyndMarketingNavActions.module.css';

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

// ── ContactDropdownTrigger ────────────────────────────────────────────────────

const ContactDropdownTrigger = forwardRef<
  HTMLButtonElement,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> & { dark?: boolean }
>(({ className, dark, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    className={[styles.trigger, dark && styles['trigger--dark'], className].filter(Boolean).join(' ')}
  >
    <span className={styles.triggerIcon}>
      <IcCall />
    </span>
    <span className={styles.triggerChevron}>
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
  <div className={styles.panel}>
    <div className={styles.waHeader}>
      <span className={styles.waIcon}>
        <IcWhatsApp />
      </span>
      <div>
        <p className={styles.waTitle}>Chat on Whatsapp</p>
        <p className={styles.waSub}>Message us for quick assistance</p>
      </div>
    </div>

    <div className={styles.qrCard}>
      <div className={styles.qrImage}>
        <img
          src={whatsappQrSrc}
          alt="WhatsApp QR code — scan to chat"
          width={160}
          height={160}
        />
      </div>
      <div className={styles.qrCopy}>
        <p className={styles.qrTitle}>Scan the QR code to chat</p>
        <p className={styles.qrOr}>or</p>
        <Button
          label="Open Whatsapp"
          variant="secondary"
          showChevron
          className={styles.panelBtn}
          onClick={() => {
            if (typeof window !== 'undefined') window.open(whatsappHref, '_blank', 'noopener,noreferrer');
          }}
        />
      </div>
    </div>

    <div className={styles.phoneWrap}>
      <Button
        label={phoneNumber}
        variant="secondary"
        iconLeft={<IcCall />}
        href={phoneHref}
        className={`${styles.panelBtn} ${styles.callBtn}`}
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
  formProps,
}: {
  trigger: ReactNode;
  formTitle?: string;
  productOptions?: string[];
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
}) => (
  <Modal trigger={trigger as React.ReactElement} width={550}>
    <ContactForm
      formTitle={formTitle}
      productOptions={productOptions}
      onSubmit={onSubmit}
      formProps={formProps}
    />
  </Modal>
);

// ── Constants ─────────────────────────────────────────────────────────────────

const DEFAULT_PHONE_NUMBER = '+91 74001 56169';
const DEFAULT_PHONE_HREF = 'tel:+917400156169';
const DEFAULT_WHATSAPP_HREF = 'https://api.whatsapp.com/send/?phone=917400156169&text&type=phone_number&app_absent=0';
const DEFAULT_WHATSAPP_QR_SRC = 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/whatsapp-qr-1.svg';
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
  /** Extra attributes spread onto the contact form's underlying `<form>`.
   *  Forwarded verbatim to `ContactForm` — use for integration hooks like
   *  `data-hs-do-not-collect`. */
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
  /**
   * Optional signed-in-user data. When present (and `firstName` is set),
   * the preset swaps the Sign-in button for an avatar+name pill that
   * still links to `signedInHref` (defaults to `signInHref`).
   * `null`/undefined → render the standard Sign-in button.
   */
  signedInUser?: {
    firstName: string;
    profilePicUrl?: string | null;
  } | null;
  /**
   * Where the signed-in pill links to. Defaults to `signInHref` (so
   * clicking the avatar takes the user to their console session).
   */
  signedInHref?: string;
  /** Aria-label for the signed-in pill. Default "Open Fynd Console". */
  signedInAriaLabel?: string;
  /** Accessible name for the icon-only contact dropdown trigger.
   *  Default "Open menu". Powers `aria-label` on the trigger button
   *  (flips to "Close menu" while open). */
  triggerAriaLabel?: string;
  /** Pass true when inside a dark-background Navbar — flips trigger icon and buttons to light-mode colours. */
  onDarkBg?: boolean;
}

// ── SignedInAvatar ────────────────────────────────────────────────────────────

const SignedInAvatar = ({
  firstName,
  profilePicUrl,
}: {
  firstName: string;
  profilePicUrl?: string | null;
}) => (
  <span className={styles.signedInAvatar}>
    {profilePicUrl ? (
      <img
        className={styles.signedInAvatarImg}
        src={profilePicUrl}
        alt=""
        width={24}
        height={24}
      />
    ) : (
      <span className={styles.signedInAvatarInitial} aria-hidden="true">
        {firstName.charAt(0).toUpperCase()}
      </span>
    )}
  </span>
);

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
  formProps,
  signedInUser,
  signedInHref,
  signedInAriaLabel = 'Open Fynd Console',
  triggerAriaLabel,
  onDarkBg = false,
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
            dark={onDarkBg}
            aria-label={contactOpen ? 'Close menu' : (triggerAriaLabel ?? 'Open menu')}
            onMouseEnter={openContact}
            onMouseLeave={scheduleClose}
          />
        }
        placement="bottom-end"
        width={360}
        disableFocusTrap
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
            className={`fds-actions__desktop-only ${styles.bookDemoBtn}`}
            label={bookDemoLabel}
            variant="secondary"
            size="md"
            onDarkBg={onDarkBg}
          />
        }
        formTitle={contactFormTitle}
        productOptions={productOptions}
        onSubmit={onContactSubmit}
        formProps={formProps}
      />

      {signedInUser?.firstName ? (
        <Button
          href={signedInHref ?? signInHref}
          variant="primary"
          size="md"
          onDarkBg={onDarkBg}
          aria-label={signedInAriaLabel}
          className={styles.signedInPill}
          iconLeft={
            <SignedInAvatar
              firstName={signedInUser.firstName}
              profilePicUrl={signedInUser.profilePicUrl}
            />
          }
          label={signedInUser.firstName}
        />
      ) : (
        <Button
          label={signInLabel}
          variant="primary"
          size="md"
          onDarkBg={onDarkBg}
          onClick={() => {
            if (typeof window !== 'undefined') window.location.href = signInHref;
          }}
        />
      )}
    </>
  );
};

// ── FyndMarketingNavMobileActions ─────────────────────────────────────────────

export interface FyndMarketingNavMobileActionsProps {
  bookDemoLabel?: string;
  contactFormTitle?: string;
  onContactSubmit?: (values: ContactFormValues) => void | Promise<void>;
  productOptions?: string[];
  /** Extra attributes spread onto the contact form's underlying `<form>`.
   *  Forwarded verbatim to `ContactForm` — use for integration hooks like
   *  `data-hs-do-not-collect`. */
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
  /** Pass true when inside a dark-background Navbar — flips button to light-mode colours. */
  onDarkBg?: boolean;
}

export const FyndMarketingNavMobileActions = ({
  bookDemoLabel = 'Book a demo',
  contactFormTitle,
  onContactSubmit,
  productOptions = [...fyndMarketingProductOptions],
  formProps,
  onDarkBg = false,
}: FyndMarketingNavMobileActionsProps) => (
  <ContactModal
    trigger={
      <Button
        label={bookDemoLabel}
        variant="primary"
        showChevron={false}
        className={styles.mobileBookDemoBtn}
        onDarkBg={onDarkBg}
      />
    }
    formTitle={contactFormTitle}
    productOptions={productOptions}
    onSubmit={onContactSubmit}
    formProps={formProps}
  />
);
