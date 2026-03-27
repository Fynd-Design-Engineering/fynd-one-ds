import React, { CSSProperties, useState } from 'react';
import { buttonTokens, buttonColors } from '../../tokens';
import { IconChevronRight } from '../../icons';

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
    textDecoration: isTertiary && hovered ? 'underline' : 'none',
    textUnderlineOffset: '3px',
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
      {showChevronResolved && <IconChevronRight color={color} />}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
