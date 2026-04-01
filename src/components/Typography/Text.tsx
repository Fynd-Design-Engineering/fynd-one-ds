import React, { CSSProperties } from 'react';
import styles from './Text.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type HeadingVariant =
  | 'heading-xxl' | 'heading-xl' | 'heading-l' | 'heading-m' | 'heading-s';

type BodyVariant =
  | 'body-xl' | 'body-l' | 'body-m' | 'body-s' | 'body-xs';

export type TextVariant = HeadingVariant | BodyVariant;
export type TextWeight = 'regular' | 'medium' | 'semibold';
export type Breakpoint = 'lg' | 'md' | 'sm';

export interface TextProps {
  /** Typography variant from the Fynd One type scale */
  variant: TextVariant;
  /** Font weight override. Headings XXL–M ignore this (always regular). */
  weight?: TextWeight;
  /** Explicit breakpoint. Defaults to 'lg'. */
  breakpoint?: Breakpoint;
  /** Whether to render uppercase (only meaningful for body-xs caps styles) */
  caps?: boolean;
  /** Text colour preset */
  color?: 'default' | 'muted' | 'subtle' | 'white';
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Resolve the CSS module class name for a given variant + weight + breakpoint + caps.
 */
function resolveClassName(
  variant: TextVariant,
  weight: TextWeight,
  breakpoint: Breakpoint,
  caps: boolean,
): string {
  const bp = breakpoint; // lg | md | sm
  const isHeadingTitle = ['heading-xxl', 'heading-xl', 'heading-l', 'heading-m'].includes(variant);

  if (isHeadingTitle) {
    return `${variant}-${bp}`;
  }

  if (variant === 'heading-s') {
    return `heading-s-${bp}`;
  }

  // Body XS has caps variants
  if (variant === 'body-xs') {
    if (caps && weight === 'semibold') {
      return `body-xs-${bp}-semibold-caps`;
    }
    const w = weight === 'semibold' ? 'semibold' : weight;
    return `body-xs-${bp}-${w}`;
  }

  // Body styles: body-xl, body-l, body-m, body-s
  return `${variant}-${bp}-${weight}`;
}

/**
 * Default HTML element per variant.
 */
function defaultElement(variant: TextVariant): keyof JSX.IntrinsicElements {
  switch (variant) {
    case 'heading-xxl': return 'h1';
    case 'heading-xl':  return 'h2';
    case 'heading-l':   return 'h3';
    case 'heading-m':   return 'h4';
    case 'heading-s':   return 'h5';
    case 'body-xl':     return 'p';
    case 'body-l':      return 'p';
    case 'body-m':      return 'p';
    case 'body-s':      return 'p';
    case 'body-xs':     return 'span';
    default:            return 'p';
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * `<Text>` — Fynd One typography primitive.
 *
 * @example
 * // Heading
 * <Text variant="heading-xl" breakpoint="lg">One Commerce Platform</Text>
 *
 * // Body copy
 * <Text variant="body-l" weight="regular" breakpoint="md">
 *   Streamline your entire commerce journey.
 * </Text>
 *
 * // Caps label
 * <Text variant="body-xs" weight="semibold" caps>New Feature</Text>
 */
export const Text: React.FC<TextProps> = ({
  variant,
  weight = 'regular',
  breakpoint = 'lg',
  caps = false,
  color,
  as,
  className,
  style,
  children,
}) => {
  const scaleClass = resolveClassName(variant, weight, breakpoint, caps);
  const Tag = (as ?? defaultElement(variant)) as React.ElementType;

  const classNames = [
    styles.root,
    styles[scaleClass],
    caps && !scaleClass.includes('caps') ? styles.caps : undefined,
    color && color !== 'default' ? styles[`color--${color}`] : undefined,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classNames} style={style}>
      {children}
    </Tag>
  );
};

Text.displayName = 'Text';

export default Text;
