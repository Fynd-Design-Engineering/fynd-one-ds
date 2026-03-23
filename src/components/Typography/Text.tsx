import React, { CSSProperties } from 'react';
import { typeScale, TypeScaleKey } from '../../tokens';

// ─── Types ────────────────────────────────────────────────────────────────────

type HeadingVariant =
  | 'heading-xxl' | 'heading-xl' | 'heading-l' | 'heading-m' | 'heading-s';

type BodyVariant =
  | 'body-xl' | 'body-l' | 'body-m' | 'body-s' | 'body-xs';

export type TextVariant = HeadingVariant | BodyVariant;
export type TextWeight = 'regular' | 'medium' | 'semibold';
export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export interface TextProps {
  /** Typography variant from the Fynd One type scale */
  variant: TextVariant;
  /** Font weight override. Headings XXL–M ignore this (always regular). */
  weight?: TextWeight;
  /** Explicit breakpoint. Defaults to 'desktop'. */
  breakpoint?: Breakpoint;
  /** Whether to render uppercase (only meaningful for body-xs caps styles) */
  caps?: boolean;
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Map a variant + weight + breakpoint + caps to a typeScale key.
 */
function resolveKey(
  variant: TextVariant,
  weight: TextWeight,
  breakpoint: Breakpoint,
  caps: boolean,
): TypeScaleKey {
  const isHeadingTitle = ['heading-xxl', 'heading-xl', 'heading-l', 'heading-m'].includes(variant);

  if (isHeadingTitle) {
    return `${variant}-${breakpoint}` as TypeScaleKey;
  }

  if (variant === 'heading-s') {
    return `heading-s-${breakpoint}` as TypeScaleKey;
  }

  // Body XS has caps variants
  if (variant === 'body-xs') {
    const w = weight === 'semibold' ? 'semibold' : weight;
    if (caps && weight === 'semibold') {
      return `body-xs-${breakpoint}-semibold-caps` as TypeScaleKey;
    }
    return `body-xs-${breakpoint}-${w}` as TypeScaleKey;
  }

  // Body styles: body-xl, body-l, body-m, body-s
  return `${variant}-${breakpoint}-${weight}` as TypeScaleKey;
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
 * <Text variant="heading-xl" breakpoint="desktop">One Commerce Platform</Text>
 *
 * // Body copy
 * <Text variant="body-l" weight="regular" breakpoint="tablet">
 *   Streamline your entire commerce journey.
 * </Text>
 *
 * // Caps label
 * <Text variant="body-xs" weight="semibold" caps>New Feature</Text>
 */
export const Text: React.FC<TextProps> = ({
  variant,
  weight = 'regular',
  breakpoint = 'desktop',
  caps = false,
  as,
  className,
  style,
  children,
}) => {
  const key = resolveKey(variant, weight, breakpoint, caps);
  const scale = typeScale[key] ?? typeScale['body-m-desktop-regular'];

  const Tag = (as ?? defaultElement(variant)) as React.ElementType;

  const resolved: CSSProperties = {
    fontFamily: scale.fontFamily,
    fontSize: scale.fontSize,
    fontWeight: scale.fontWeight,
    lineHeight: typeof scale.lineHeight === 'number' && scale.lineHeight > 4
      ? `${scale.lineHeight}px`   // fixed px value (e.g. 34px from heading-s)
      : scale.lineHeight,          // ratio (e.g. 1.1)
    letterSpacing: scale.letterSpacing !== '0em' ? scale.letterSpacing : undefined,
    textTransform: caps || ('textTransform' in scale && scale.textTransform === 'uppercase')
      ? 'uppercase'
      : undefined,
    margin: 0,
    ...style,
  };

  return (
    <Tag className={className} style={resolved}>
      {children}
    </Tag>
  );
};

Text.displayName = 'Text';

export default Text;
