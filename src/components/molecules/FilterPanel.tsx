'use client';

import React, { ReactNode } from 'react';
import { FilterChip } from '../atoms/FilterChip';
import styles from './FilterPanel.module.css';

export interface FilterOption {
  /** Stable identifier — what `selected` arrays contain. */
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface FilterGroup {
  /** Heading shown above the option chips. */
  heading: string;
  /** Stable group key — used to namespace selection in `selected`. */
  key: string;
  options: FilterOption[];
}

export interface FilterPanelProps {
  groups: FilterGroup[];
  /** Map of `groupKey → selected option values`. */
  selected: Record<string, string[]>;
  /** Fires with the next full selection map. */
  onChange: (next: Record<string, string[]>) => void;
  /** Optional footer (Clear / Apply etc.). Rendered above the panel border. */
  footer?: ReactNode;
  /** Hide the built-in "Clear all" button rendered next to the first group heading. */
  hideClearAll?: boolean;
  /** Label for the built-in clear button. Default "Clear all". */
  clearAllLabel?: string;
  className?: string;
}

const toggleValue = (list: string[] | undefined, value: string): string[] => {
  const set = new Set(list ?? []);
  if (set.has(value)) set.delete(value);
  else set.add(value);
  return Array.from(set);
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  groups,
  selected,
  onChange,
  footer,
  hideClearAll = false,
  clearAllLabel = 'Clear all',
  className,
}) => {
  const handleToggle = (groupKey: string, value: string) => {
    onChange({
      ...selected,
      [groupKey]: toggleValue(selected[groupKey], value),
    });
  };

  const totalSelected = Object.values(selected).reduce((n, arr) => n + arr.length, 0);
  const showClearAll = !hideClearAll && totalSelected > 0;
  const handleClearAll = () => onChange({});

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {showClearAll && (
        <button
          type="button"
          className={styles.clearAll}
          onClick={handleClearAll}
        >
          {clearAllLabel}
        </button>
      )}
      {groups.map((group) => {
        const checkedSet = new Set(selected[group.key] ?? []);
        return (
          <div key={group.key} className={styles.group}>
            <h4 className={styles.heading}>{group.heading}</h4>
            <div className={styles.options} role="group" aria-label={group.heading}>
              {group.options.map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  icon={opt.icon}
                  disabled={opt.disabled}
                  checked={checkedSet.has(opt.value)}
                  onChange={() => handleToggle(group.key, opt.value)}
                />
              ))}
            </div>
          </div>
        );
      })}
      {footer && <div className={styles.actions}>{footer}</div>}
    </div>
  );
};

FilterPanel.displayName = 'FilterPanel';

export default FilterPanel;
