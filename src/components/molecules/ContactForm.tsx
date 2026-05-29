'use client';

import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { Text } from '../Typography/Text';
import { Button } from '../atoms/Button';
import {
  parsePhoneNumberFromString,
  AsYouType,
  type CountryCode,
} from 'libphonenumber-js/min';
import {
  COUNTRIES,
  detectDefaultCountry,
  findCountry,
  flagEmoji,
} from './_data/countries';
import styles from './ContactForm.module.css';

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  /** Combined "+<dial> <number>", e.g. "+91 9876543210" — what HubSpot expects. */
  phone: string;
  /** ISO-2 of the country backing the phone field. Useful for analytics / lead routing. */
  phoneCountry: string;
  company: string;
  productInterested: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;
type FieldTouched = Partial<Record<keyof ContactFormValues, boolean>>;

export interface ContactFormProps {
  formTitle?: string;
  productOptions?: string[];
  submitLabel?: string;
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
  agreement?: ReactNode;
  successContent?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Pre-fill fields at mount. Read once — not a controlled API. */
  initialValues?: Partial<ContactFormValues>;
  /** Extra attributes spread onto the underlying `<form>` element.
   *  Use for integration hooks like `data-hs-do-not-collect`. The
   *  component's own className/onSubmit always win. */
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
}

const FIELD_DEFAULTS: ContactFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  phoneCountry: 'IN',
  company: '',
  productInterested: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (
  values: ContactFormValues,
  phoneNumber: string,
  phoneCountry: string
): FieldErrors => {
  const errors: FieldErrors = {};
  if (!values.firstName.trim()) errors.firstName = 'First name is required.';
  if (!values.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!values.email.trim()) errors.email = 'Work email is required.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.';

  if (!phoneNumber.trim()) {
    errors.phone = 'Phone number is required.';
  } else {
    const parsed = parsePhoneNumberFromString(phoneNumber, phoneCountry as CountryCode);
    if (!parsed || !parsed.isValid()) {
      errors.phone = 'Enter a valid phone number.';
    }
  }

  if (!values.company.trim()) errors.company = 'Company name is required.';
  return errors;
};

export const ContactForm: React.FC<ContactFormProps> = ({
  formTitle = 'Fill out this form to get in touch',
  productOptions,
  submitLabel = 'Submit',
  onSubmit,
  agreement,
  successContent,
  className,
  style,
  initialValues,
  formProps,
}) => {
  const [values, setValues] = useState<ContactFormValues>({
    firstName: initialValues?.firstName ?? '',
    lastName: initialValues?.lastName ?? '',
    email: initialValues?.email ?? '',
    phone: initialValues?.phone ?? '',
    phoneCountry: initialValues?.phoneCountry ?? 'IN',
    company: initialValues?.company ?? '',
    productInterested: initialValues?.productInterested ?? '',
    message: initialValues?.message ?? '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<FieldTouched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Detect country from the visitor's timezone on mount (client-only).
  useEffect(() => {
    const iso2 = detectDefaultCountry('IN');
    setValues((prev) => ({ ...prev, phoneCountry: iso2 }));
  }, []);

  const country = useMemo(
    () => findCountry(values.phoneCountry) ?? findCountry('IN')!,
    [values.phoneCountry]
  );

  // Re-format the phone input as the user types, scoped to the active
  // country. e.g. "9876543210" → "98765 43210" for IN, "(415) 555-1234" for US.
  const handlePhoneChange = (raw: string) => {
    const formatted = new AsYouType(values.phoneCountry as CountryCode).input(raw);
    setPhoneNumber(formatted);
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const setField = <K extends keyof ContactFormValues>(name: K, value: ContactFormValues[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const markTouched = (name: keyof ContactFormValues) =>
    setTouched((prev) => ({ ...prev, [name]: true }));

  const runValidation = (next: ContactFormValues, nextPhone: string) => {
    const nextErrors = validate(next, nextPhone, next.phoneCountry);
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleBlur = (name: keyof ContactFormValues) => () => {
    markTouched(name);
    runValidation(values, phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    // Normalize to E.164 (e.g. "+919876543210") for downstream consumers.
    const parsed = phoneNumber.trim()
      ? parsePhoneNumberFromString(phoneNumber, values.phoneCountry as CountryCode)
      : undefined;
    const composedPhone = parsed?.isValid()
      ? parsed.number
      : phoneNumber.trim()
        ? `+${country.dialCode} ${phoneNumber.trim()}`
        : '';
    const nextValues: ContactFormValues = { ...values, phone: composedPhone };
    const nextErrors = runValidation(nextValues, phoneNumber);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      company: true,
    });
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit?.(nextValues);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const showError = (name: keyof ContactFormValues): string | undefined =>
    touched[name] ? errors[name] : undefined;

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={style}
    >
      {submitted ? (
        successContent ?? (
          <div className={styles.success}>
            <img
              className={styles.successIcon}
              src="https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ebooks/_slug_/_components/check-3d.avif"
              alt=""
              width={96}
              height={96}
              decoding="async"
            />
            <Text variant="heading-m" as="p">
              Thank you!
            </Text>
            <Text variant="body-m" color="secondary" as="p">
              We’ll get in touch soon.
            </Text>
          </div>
        )
      ) : (
        <form
          {...formProps}
          className={[styles.form, formProps?.className].filter(Boolean).join(' ')}
          onSubmit={handleSubmit}
          noValidate
        >
          {formTitle && (
            <Text variant="heading-s" as="h3">
              {formTitle}
            </Text>
          )}

          <div className={styles.fields}>
            <div className={styles.fieldRow}>
              <Field
                id="contact-firstName"
                label="First name"
                required
                value={values.firstName}
                onChange={(v) => setField('firstName', v)}
                onBlur={handleBlur('firstName')}
                placeholder="First name"
                error={showError('firstName')}
              />
              <Field
                id="contact-lastName"
                label="Last name"
                required
                value={values.lastName}
                onChange={(v) => setField('lastName', v)}
                onBlur={handleBlur('lastName')}
                placeholder="Last name"
                error={showError('lastName')}
              />
            </div>

            <Field
              id="contact-email"
              label="Work email"
              type="email"
              required
              value={values.email}
              onChange={(v) => setField('email', v)}
              onBlur={handleBlur('email')}
              placeholder="name@company.com"
              error={showError('email')}
            />

            <PhoneField
              id="contact-phone"
              label="Phone number"
              required
              countryIso2={values.phoneCountry}
              onCountryChange={(iso2) => setField('phoneCountry', iso2)}
              value={phoneNumber}
              onChange={handlePhoneChange}
              onBlur={handleBlur('phone')}
              error={showError('phone')}
            />

            <Field
              id="contact-company"
              label="Company name"
              required
              value={values.company}
              onChange={(v) => setField('company', v)}
              onBlur={handleBlur('company')}
              placeholder="Company name"
              error={showError('company')}
            />

            {productOptions && productOptions.length > 0 && (
              <div className={styles.field}>
                <label htmlFor="contact-product">
                  Product interested
                </label>
                <select
                  id="contact-product"
                  className={styles.select}
                  value={values.productInterested}
                  onChange={(e) => setField('productInterested', e.target.value)}
                >
                  <option value="">Select one…</option>
                  {productOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="contact-message">
                Tell us about your business or query (optional)
              </label>
              <textarea
                id="contact-message"
                className={styles.textarea}
                rows={4}
                value={values.message}
                onChange={(e) => setField('message', e.target.value)}
                placeholder="Describe your business and what kind of help you’re looking for."
                maxLength={5000}
              />
            </div>
          </div>

          <div className={styles.submitRow}>
            <Button
              label={submitting ? 'Please wait…' : submitLabel}
              variant="primary"
              showChevron={false}
              disabled={submitting}
              type="submit"
            />
            {agreement ?? (
              <Text variant="body-xs" color="muted" as="p" className={styles.agreement}>
                By submitting, you agree to our{' '}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.agreementLink}
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.agreementLink}
                >
                  Privacy Policy
                </a>
                .
              </Text>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

ContactForm.displayName = 'ContactForm';

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}

const Field: React.FC<FieldProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  required,
  error,
}) => (
  <div className={styles.field}>
    <div className={styles.fieldHeader}>
      <label htmlFor={id}>{label}</label>
      {error && (
        <span id={`${id}-error`} className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
    <input
      id={id}
      type={type}
      className={[styles.input, error ? styles.inputError : ''].filter(Boolean).join(' ')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      maxLength={256}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
    />
  </div>
);

interface PhoneFieldProps {
  id: string;
  label: string;
  required?: boolean;
  countryIso2: string;
  onCountryChange: (iso2: string) => void;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  id,
  label,
  required,
  countryIso2,
  onCountryChange,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selectedRef = useRef<HTMLLIElement>(null);

  const country = findCountry(countryIso2) ?? findCountry('IN')!;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        String(c.dialCode).includes(q) ||
        c.iso2.toLowerCase().startsWith(q),
    );
  }, [search]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setSearch('');
  };

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip({ padding: 8 }), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  // Scroll the already-selected country into view when the list opens.
  useEffect(() => {
    if (isOpen && selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen]);

  return (
    <div className={styles.field}>
      <div className={styles.fieldHeader}>
        <label htmlFor={id}>{label}</label>
        {error && (
          <span id={`${id}-error`} className={styles.errorText}>
            {error}
          </span>
        )}
      </div>
      <div
        className={[styles.phoneRow, error ? styles.phoneRowError : '']
          .filter(Boolean)
          .join(' ')}
      >
        <div className={styles.phoneCountryWrap}>
          <button
            type="button"
            ref={refs.setReference}
            className={[
              styles.phoneCountryTrigger,
              isOpen ? styles['phoneCountryTrigger--open'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={`Country: ${country.name} +${country.dialCode}`}
            {...getReferenceProps()}
          >
            <span className={styles.phoneFlag} aria-hidden="true">
              {flagEmoji(country.iso2)}
            </span>
            <span className={styles.phoneDial} aria-hidden="true">
              +{country.dialCode}
            </span>
            <svg
              className={[
                styles.phoneChevron,
                isOpen ? styles['phoneChevron--open'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="#797a7c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isOpen && (
            <FloatingFocusManager context={context} modal={false} initialFocus={0} returnFocus>
              <div
                ref={refs.setFloating}
                style={{
                  ...floatingStyles,
                  visibility: isPositioned ? 'visible' : 'hidden',
                }}
                className={styles.countryDropdown}
                {...getFloatingProps()}
              >
                <div className={styles.countrySearchWrap}>
                  <input
                    type="search"
                    placeholder="Search country or code…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.countrySearchInput}
                    aria-label="Search countries"
                  />
                </div>
                <ul className={styles.countryList} role="listbox" aria-label="Select country">
                  {filtered.map((c) => {
                    const isSelected = c.iso2 === countryIso2;
                    return (
                      <li
                        key={c.iso2}
                        ref={isSelected ? selectedRef : undefined}
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={0}
                        className={[
                          styles.countryOption,
                          isSelected ? styles['countryOption--selected'] : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => {
                          onCountryChange(c.iso2);
                          handleOpenChange(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onCountryChange(c.iso2);
                            handleOpenChange(false);
                          }
                        }}
                      >
                        <span className={styles.phoneFlag} aria-hidden="true">
                          {flagEmoji(c.iso2)}
                        </span>
                        <span className={styles.countryName}>{c.name}</span>
                        <span className={styles.countryDial}>+{c.dialCode}</span>
                      </li>
                    );
                  })}
                  {filtered.length === 0 && (
                    <li className={styles.countryNoResults} role="option" aria-selected={false}>
                      No results
                    </li>
                  )}
                </ul>
              </div>
            </FloatingFocusManager>
          )}
        </div>

        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          className={styles.phoneInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="98765 43210"
          required={required}
          maxLength={20}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
    </div>
  );
};

export default ContactForm;
