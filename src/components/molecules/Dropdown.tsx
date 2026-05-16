'use client';

import React, { forwardRef, useState } from 'react';
import { Popover, usePopoverItemProps } from './Popover';
import { IcChevronDown } from '../../assets/icons/navigation';
import styles from './Dropdown.module.css';

export type DropdownOption = {
  label: string;
  value: string;
  /** Not selectable; dimmed visually. */
  disabled?: boolean;
};

export interface DropdownProps {
  /** Static label shown when no value is selected. */
  label: string;
  /** Currently selected value (controlled). Pass empty string for no selection. */
  value: string;
  /** Called with the new value on selection; pass '' to represent "all / clear". */
  onChange: (value: string) => void;
  options: DropdownOption[];
  /** Prepends an "All …" option that maps to value=''. */
  allLabel?: string;
  /** Panel placement. Default 'bottom-start'. */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Expand panel to trigger width. Default true. */
  matchTriggerWidth?: boolean;
  /** Minimum width of the trigger pill. Default '12rem'. */
  triggerMinWidth?: number | string;
  /** Dark background variant. */
  onDarkBg?: boolean;
  /** Makes the trigger non-interactive and dimmed. */
  disabled?: boolean;
  /** Accessible label for the trigger (defaults to `label`). */
  ariaLabel?: string;
  className?: string;
}

// ── Trigger ───────────────────────────────────────────────────────────────

const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isOpen?: boolean;
    hasValue?: boolean;
    onDarkBg?: boolean;
    minWidth?: string;
  }
>(({ isOpen, hasValue, onDarkBg, minWidth, children, className, ...rest }, ref) => (
  <button
    ref={ref}
    type="button"
    className={[
      styles.trigger,
      isOpen && styles['trigger--open'],
      hasValue && styles['trigger--has-value'],
      onDarkBg && styles['trigger--dark'],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    style={minWidth ? { minWidth } : undefined}
    {...rest}
  >
    <span className={styles.triggerLabel}>{children}</span>
    <span className={styles.triggerChevron} aria-hidden="true">
      <IcChevronDown />
    </span>
  </button>
));
DropdownTrigger.displayName = 'DropdownTrigger';

// ── OptionList ─────────────────────────────────────────────────────────────
// Rendered inside <Popover> so usePopoverItemProps has access to context.

interface OptionListProps {
  allLabel?: string;
  options: DropdownOption[];
  value: string;
  onSelect: (value: string) => void;
  onDarkBg?: boolean;
}

const OptionList: React.FC<OptionListProps> = ({
  allLabel,
  options,
  value,
  onSelect,
  onDarkBg,
}) => {
  const getItemProps = usePopoverItemProps();

  const items: DropdownOption[] = allLabel
    ? [{ label: allLabel, value: '' }, ...options]
    : options;

  return (
    <ul className={styles.list} role="presentation">
      {items.map((opt) => {
        const isSelected = opt.value === value;
        const userClick = opt.disabled ? undefined : () => onSelect(opt.value);
        const itemProps = getItemProps ? getItemProps({ onClick: userClick }) : { onClick: userClick };

        return (
          <li
            key={opt.value === '' ? '__all__' : opt.value}
            role="option"
            aria-selected={isSelected}
            {...(opt.disabled ? { 'aria-disabled': true } : {})}
            tabIndex={-1}
            className={[
              styles.option,
              isSelected && styles['option--selected'],
              opt.disabled && styles['option--disabled'],
              onDarkBg && styles['option--dark'],
            ]
              .filter(Boolean)
              .join(' ')}
            {...itemProps}
          >
            {opt.label}
          </li>
        );
      })}
    </ul>
  );
};

// ── Dropdown ──────────────────────────────────────────────────────────────

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  allLabel,
  placement = 'bottom-start',
  matchTriggerWidth = true,
  triggerMinWidth,
  onDarkBg = false,
  disabled = false,
  ariaLabel,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    value === '' && allLabel
      ? allLabel
      : options.find((o) => o.value === value)?.label ?? label;

  const minWidth =
    typeof triggerMinWidth === 'number'
      ? `${triggerMinWidth}px`
      : (triggerMinWidth ?? '12rem');

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      role="listbox"
      placement={placement}
      matchTriggerWidth={matchTriggerWidth}
      onDarkBg={onDarkBg}
      trigger={
        <DropdownTrigger
          isOpen={open}
          hasValue={value !== ''}
          onDarkBg={onDarkBg}
          minWidth={minWidth}
          disabled={disabled}
          aria-label={ariaLabel ?? label}
          className={className}
        >
          {selectedLabel}
        </DropdownTrigger>
      }
    >
      <OptionList
        allLabel={allLabel}
        options={options}
        value={value}
        onSelect={handleSelect}
        onDarkBg={onDarkBg}
      />
    </Popover>
  );
};

Dropdown.displayName = 'Dropdown';
export default Dropdown;
