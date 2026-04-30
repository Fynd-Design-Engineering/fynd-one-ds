import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './FilterChip.module.css';

export interface FilterChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  label: string;
  /** Selected state. Toggle externally via `onChange`. */
  checked?: boolean;
  /** Fires with the next selected state. */
  onChange?: (checked: boolean) => void;
  /** Optional leading icon (rendered before label). */
  icon?: React.ReactNode;
}

export const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ label, checked = false, onChange, icon, className, onClick, ...rest }, ref) => {
    const cls = [styles.root, checked && styles.checked, className]
      .filter(Boolean)
      .join(' ');
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        className={cls}
        onClick={(e) => {
          onClick?.(e);
          onChange?.(!checked);
        }}
        {...rest}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {label}
      </button>
    );
  }
);

FilterChip.displayName = 'FilterChip';

export default FilterChip;
