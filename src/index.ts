/**
 * Fynd One Design System
 *
 * Usage:
 *   import { Text, GradientSurface, typeScale, gradients } from '@fynd-one/ds';
 *   import '@fynd-one/ds/styles/tokens.css';
 */

// Global CSS (side-effect import — consumers can also import directly)
import './styles/tokens.css';

// Tokens
export * from './tokens';

// Components
export { Text } from './components/Typography/Text';
export type { TextProps, TextVariant, TextWeight, Breakpoint } from './components/Typography/Text';

export { GradientSurface } from './components/GradientSurface';
export type { GradientSurfaceProps } from './components/GradientSurface';
