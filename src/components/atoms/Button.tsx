import React, { CSSProperties, useState } from 'react';
import { buttonTokens } from '../../tokens';

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onDarkBg?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  onDarkBg = false,
  onClick,
  className,
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  const isSecondary = variant === 'secondary';

  const secondaryTokens = onDarkBg ? buttonTokens.secondaryLight : buttonTokens.secondary;
  const primaryTokens = onDarkBg ? buttonTokens.primaryLight : buttonTokens.primary;

  const borderValue = isSecondary
    ? `1px solid ${hovered ? secondaryTokens.borderHover : secondaryTokens.border}`
    : 'none';

  const bg = isSecondary
    ? (hovered ? secondaryTokens.bgHover : secondaryTokens.bg)
    : (hovered ? primaryTokens.bgHover : primaryTokens.bg);

  const color = isSecondary ? secondaryTokens.color : primaryTokens.color;

  const resolved: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    padding: `${buttonTokens.paddingY} ${buttonTokens.paddingX}`,
    fontFamily: buttonTokens.fontFamily,
    fontSize: buttonTokens.fontSize,
    fontWeight: buttonTokens.fontWeight,
    lineHeight: buttonTokens.lineHeight,
    letterSpacing: buttonTokens.letterSpacing,
    borderRadius: buttonTokens.borderRadius,
    border: borderValue,
    backgroundColor: bg,
    color,
    cursor: 'pointer',
    transition: buttonTokens.transition,
    whiteSpace: 'nowrap',
    ...style,
  };

  return (
    <button
      className={className}
      style={resolved}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-figma-id={variant === 'primary' ? '961:40865' : '961:40866'}
    >
      {label}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
