'use client';

import React, { CSSProperties, useId } from 'react';
import styles from './TextField.module.css';

export interface TextFieldProps {
  /** Field label */
  label?: string;
  /** Show required asterisk */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /** Helper text below input */
  helperText?: string;
  /** Error message — shows error state when set */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Max character count */
  maxLength?: number;
  /** Show character count */
  showCharCount?: boolean;
  /** Left icon */
  icon?: React.ReactNode;
  /** Show help/info icon next to label */
  showHelpIcon?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  required = false,
  placeholder = 'Placeholder Text',
  value,
  onChange,
  type = 'text',
  helperText,
  error,
  disabled = false,
  maxLength,
  showCharCount = false,
  icon,
  showHelpIcon = false,
  className,
  style,
}) => {
  const id = useId();
  const hasError = !!error;
  const charCount = value?.length ?? 0;

  const rootCls = [
    styles.root,
    disabled ? styles['root--disabled'] : '',
    className,
  ].filter(Boolean).join(' ');

  const inputWrapperCls = [
    styles['input-wrapper'],
    hasError ? styles['input-wrapper--error'] : '',
    disabled ? styles['input-wrapper--disabled'] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls} style={style}>
      {(label || (showCharCount && maxLength)) && (
        <div className={styles.header}>
          {label && (
            <label htmlFor={id} className={styles.label}>
              {label}
              {required && <span className={styles.required}>*</span>}
              {showHelpIcon && (
                <span className={styles['help-icon']} title="More info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>
                  </svg>
                </span>
              )}
            </label>
          )}
          {showCharCount && maxLength && (
            <span className={styles['char-count']}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}
      <div className={inputWrapperCls}>
        {icon && <span className={styles['input-icon']}>{icon}</span>}
        <input
          id={id}
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        />
      </div>
      {(hasError || helperText) && (
        <span
          id={hasError ? `${id}-error` : `${id}-helper`}
          className={[styles.helper, hasError ? styles['helper--error'] : ''].filter(Boolean).join(' ')}
        >
          {hasError ? error : helperText}
        </span>
      )}
    </div>
  );
};

TextField.displayName = 'TextField';

export default TextField;
