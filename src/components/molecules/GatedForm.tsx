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
import styles from './GatedForm.module.css';

export interface GatedFormValues {
  firstName: string;
  lastName: string;
  email: string;
  /** Combined "+<dial> <number>", e.g. "+91 9876543210" */
  phone: string;
  /** ISO-2 of the country backing the phone field. */
  phoneCountry: string;
}

type FieldErrors = Partial<Record<keyof GatedFormValues, string>>;
type FieldTouched = Partial<Record<keyof GatedFormValues, boolean>>;

export interface GatedFormProps {
  submitLabel?: string;
  onSubmit?: (values: GatedFormValues) => void | Promise<void>;
  successContent?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const FIELD_DEFAULTS: GatedFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  phoneCountry: 'IN',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (
  values: GatedFormValues,
  phoneNumber: string,
  phoneCountry: string,
): FieldErrors => {
  const errors: FieldErrors = {};
  if (!values.firstName.trim()) errors.firstName = 'First name is required.';
  if (!values.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email.';

  if (!phoneNumber.trim()) {
    errors.phone = 'Phone number is required.';
  } else {
    const parsed = parsePhoneNumberFromString(phoneNumber, phoneCountry as CountryCode);
    if (!parsed || !parsed.isValid()) errors.phone = 'Enter a valid phone number.';
  }

  return errors;
};

export const GatedForm: React.FC<GatedFormProps> = ({
  submitLabel = 'Download',
  onSubmit,
  successContent,
  className,
  style,
}) => {
  const [values, setValues] = useState<GatedFormValues>(FIELD_DEFAULTS);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<FieldTouched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const iso2 = detectDefaultCountry('IN');
    setValues((prev) => ({ ...prev, phoneCountry: iso2 }));
  }, []);

  const country = useMemo(
    () => findCountry(values.phoneCountry) ?? findCountry('IN')!,
    [values.phoneCountry],
  );

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

  const setField = <K extends keyof GatedFormValues>(name: K, value: GatedFormValues[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (name: keyof GatedFormValues) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values, phoneNumber, values.phoneCountry));
  };

  const showError = (name: keyof GatedFormValues): string | undefined =>
    touched[name] ? errors[name] : undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const parsed = phoneNumber.trim()
      ? parsePhoneNumberFromString(phoneNumber, values.phoneCountry as CountryCode)
      : undefined;
    const composedPhone = parsed?.isValid()
      ? parsed.number
      : phoneNumber.trim()
        ? `+${country.dialCode} ${phoneNumber.trim()}`
        : '';
    const nextValues: GatedFormValues = { ...values, phone: composedPhone };
    const nextErrors = validate(nextValues, phoneNumber, values.phoneCountry);
    setErrors(nextErrors);
    setTouched({ firstName: true, lastName: true, email: true, phone: true });
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit?.(nextValues);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={style}
    >
      {submitted ? (
        successContent ?? (
          <div className={styles.success}>
            <Text variant="heading-m" as="p">Thank you!</Text>
            <Text variant="body-m" color="secondary" as="p">Your download is on its way.</Text>
          </div>
        )
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fields}>
            <div className={styles.fieldRow}>
              <Field
                id="gated-firstName"
                label="First name"
                required
                value={values.firstName}
                onChange={(v) => setField('firstName', v)}
                onBlur={handleBlur('firstName')}
                placeholder="First name"
                error={showError('firstName')}
              />
              <Field
                id="gated-lastName"
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
              id="gated-email"
              label="Email address"
              type="email"
              required
              value={values.email}
              onChange={(v) => setField('email', v)}
              onBlur={handleBlur('email')}
              placeholder="Email address"
              error={showError('email')}
            />

            <PhoneField
              id="gated-phone"
              label="Phone number"
              required
              countryIso2={values.phoneCountry}
              onCountryChange={(iso2) => setField('phoneCountry', iso2)}
              value={phoneNumber}
              onChange={handlePhoneChange}
              onBlur={handleBlur('phone')}
              error={showError('phone')}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? 'Please wait…' : submitLabel}
          </button>
        </form>
      )}
    </div>
  );
};

GatedForm.displayName = 'GatedForm';

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

export default GatedForm;
