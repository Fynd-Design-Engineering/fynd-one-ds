import React, { CSSProperties, useState } from 'react';
import { buttonTokens, buttonColors } from '../../tokens';

const ChevronIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.11811 8.00206L5.55972 4.44389C5.43888 4.3229 5.377 4.17082 5.37408 3.98765C5.37132 3.80464 5.4332 3.64979 5.55972 3.52312C5.6864 3.39659 5.83986 3.33333 6.02011 3.33333C6.20036 3.33333 6.35383 3.39659 6.4805 3.52312L10.4067 7.44929C10.4884 7.53112 10.546 7.61739 10.5796 7.7081C10.6133 7.79881 10.6301 7.89679 10.6301 8.00206C10.6301 8.10733 10.6133 8.20532 10.5796 8.29603C10.546 8.38674 10.4884 8.47301 10.4067 8.55483L6.4805 12.481C6.3595 12.6019 6.20742 12.6637 6.02426 12.6666C5.84124 12.6694 5.6864 12.6075 5.55972 12.481C5.4332 12.3543 5.36993 12.2009 5.36993 12.0206C5.36993 11.8404 5.4332 11.6869 5.55972 11.5602L9.11811 8.00206Z" fill={color} />
  </svg>
);

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onDarkBg?: boolean;
  showChevron?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  onDarkBg = false,
  showChevron = false,
  onClick,
  className,
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  const isTertiary = variant === 'tertiary';
  const isSecondary = variant === 'secondary';

  const secondaryColors = onDarkBg ? buttonColors.secondaryLight : buttonColors.secondary;
  const primaryColors = onDarkBg ? buttonColors.primaryLight : buttonColors.primary;

  let borderValue: string;
  let bg: string;
  let color: string;

  if (isTertiary) {
    borderValue = 'none';
    bg = 'transparent';
    color = onDarkBg ? buttonColors.tertiary.textLight : buttonColors.tertiary.text;
  } else if (isSecondary) {
    borderValue = `1px solid ${hovered ? secondaryColors.borderHover : secondaryColors.border}`;
    bg = hovered ? secondaryColors.bgHover : secondaryColors.bg;
    color = hovered ? secondaryColors.textHover : secondaryColors.text;
  } else {
    borderValue = '1px solid transparent';
    bg = hovered ? primaryColors.bgHover : primaryColors.bg;
    color = primaryColors.text;
  }

  const resolved: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: isTertiary ? 'flex-start' : 'center',
    gap: '8px',
    height: isTertiary ? 'auto' : '40px',
    padding: isTertiary ? '0' : `0px ${buttonTokens.paddingX}`,
    fontFamily: buttonTokens.fontFamily,
    fontSize: isTertiary ? '14px' : buttonTokens.fontSize,
    fontWeight: buttonTokens.fontWeight,
    lineHeight: buttonTokens.lineHeight,
    letterSpacing: buttonTokens.letterSpacing,
    borderRadius: isTertiary ? '0' : buttonTokens.borderRadius,
    border: borderValue,
    backgroundColor: bg,
    color,
    cursor: 'pointer',
    transition: buttonTokens.transition,
    whiteSpace: 'nowrap',
    ...style,
  };

  const showChevronResolved = isTertiary || showChevron;

  return (
    <button
      className={className}
      style={resolved}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {showChevronResolved && <ChevronIcon color={color} />}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
