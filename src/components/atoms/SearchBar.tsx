'use client';

import React, { CSSProperties } from 'react';
import styles from './SearchBar.module.css';

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
  </svg>
);

export interface SearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Submit handler (Enter key) */
  onSubmit?: (value: string) => void;
  onDarkBg?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search',
  value,
  onChange,
  onSubmit,
  onDarkBg = false,
  className,
  style,
}) => {
  const rootCls = [
    styles.root,
    onDarkBg ? styles['root--dark'] : styles['root--light'],
    className,
  ].filter(Boolean).join(' ');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div className={rootCls} style={style}>
      <input
        className={[styles.input, onDarkBg ? styles['input--dark'] : styles['input--light']].join(' ')}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon className={[styles.icon, onDarkBg ? styles['icon--dark'] : styles['icon--light']].join(' ')} />
    </div>
  );
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
