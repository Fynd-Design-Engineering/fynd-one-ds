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

// Icons
export * from './icons';

// Components
export { Text } from './components/Typography/Text';
export type { TextProps, TextVariant, TextWeight } from './components/Typography/Text';

export { GradientSurface } from './components/GradientSurface';
export type { GradientSurfaceProps } from './components/GradientSurface';

// Atoms
export { Button } from './components/atoms/Button';
export type { ButtonProps } from './components/atoms/Button';

export { Chip } from './components/atoms/Chip';
export type { ChipProps, ChipDotColor } from './components/atoms/Chip';

export { Tag } from './components/atoms/Tag';
export type { TagProps } from './components/atoms/Tag';

export { VisualElement } from './components/atoms/VisualElement';
export type { VisualElementProps, VisualElementSize } from './components/atoms/VisualElement';

export { Tabs } from './components/atoms/Tabs';
export type { TabsProps, TabItem } from './components/atoms/Tabs';

export { SectionIndicator } from './components/atoms/SectionIndicator';
export type { SectionIndicatorProps } from './components/atoms/SectionIndicator';

export { ImageHolder } from './components/atoms/ImageHolder';
export type { ImageHolderProps } from './components/atoms/ImageHolder';

export { TitleContentPair } from './components/atoms/TitleContentPair';
export type { TitleContentPairProps } from './components/atoms/TitleContentPair';

export { LogoMarquee } from './components/atoms/LogoMarquee';
export type { LogoMarqueeProps, LogoItem } from './components/atoms/LogoMarquee';

// Shared helpers
export { SectionWrapper } from './components/_shared/SectionWrapper';
export type { SectionWrapperProps } from './components/_shared/SectionWrapper';

export { SectionHeader } from './components/_shared/SectionHeader';
export type { SectionHeaderProps } from './components/_shared/SectionHeader';

export { Section } from './components/_shared/Section';
export type { SectionProps } from './components/_shared/Section';

// Molecules
export { RichIconCard } from './components/molecules/RichIconCard';
export type { RichIconCardProps } from './components/molecules/RichIconCard';

export { ListingCard } from './components/molecules/ListingCard';
export type { ListingCardProps } from './components/molecules/ListingCard';

export { MetricCard } from './components/molecules/MetricCard';
export type { MetricCardProps } from './components/molecules/MetricCard';

export { CTABanner } from './components/molecules/CTABanner';
export type { CTABannerProps } from './components/molecules/CTABanner';

export { ContentCard } from './components/molecules/ContentCard';
export type { ContentCardProps } from './components/molecules/ContentCard';

// Layouts
export { Grid } from './components/layouts/Grid';
export type { GridProps } from './components/layouts/Grid';

export { BentoGrid } from './components/layouts/BentoGrid';
export type { BentoGridProps, BentoRatio } from './components/layouts/BentoGrid';
