'use client';

import React, { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react';
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
}) => {
  const [values, setValues] = useState<ContactFormValues>(FIELD_DEFAULTS);
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
            <Text variant="heading-m" as="p">
              Thank you!
            </Text>
            <Text variant="body-m" color="secondary" as="p">
              We’ll get in touch soon.
            </Text>
          </div>
        )
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
  const country = findCountry(countryIso2) ?? findCountry('IN')!;
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
          <span className={styles.phoneFlag} aria-hidden="true">
            {flagEmoji(country.iso2)}
          </span>
          <span className={styles.phoneDial} aria-hidden="true">
            +{country.dialCode}
          </span>
          <select
            aria-label="Country code"
            className={styles.phoneCountrySelect}
            value={countryIso2}
            onChange={(e) => onCountryChange(e.target.value)}
          >
            {COUNTRIES.map((c) => (
              <option key={c.iso2} value={c.iso2}>
                {flagEmoji(c.iso2)} {c.name} (+{c.dialCode})
              </option>
            ))}
          </select>
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
