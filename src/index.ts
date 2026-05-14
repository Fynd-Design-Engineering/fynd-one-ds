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
export { MediaHolder } from './components/atoms/MediaHolder';
export type { MediaHolderProps, MediaHolderLayer, MediaHolderAspectRatio } from './components/atoms/MediaHolder';

export { TitleContentPair } from './components/atoms/TitleContentPair';
export type { TitleContentPairProps } from './components/atoms/TitleContentPair';

export { LogoStrip } from './components/atoms/LogoStrip';
export type { LogoStripProps, LogoItem } from './components/atoms/LogoStrip';
// Backwards-compatible alias — existing `LogoMarquee` imports keep working
export { LogoStrip as LogoMarquee } from './components/atoms/LogoStrip';
export type { LogoStripProps as LogoMarqueeProps } from './components/atoms/LogoStrip';

export { Accordion } from './components/atoms/Accordion';
export type { AccordionProps, AccordionItem } from './components/atoms/Accordion';

export { Pagination } from './components/atoms/Pagination';
export type { PaginationProps } from './components/atoms/Pagination';

export { FilterButton } from './components/atoms/FilterButton';
export type { FilterButtonProps } from './components/atoms/FilterButton';

export { FilterChip } from './components/atoms/FilterChip';
export type { FilterChipProps } from './components/atoms/FilterChip';

export { SearchBar } from './components/atoms/SearchBar';
export type { SearchBarProps } from './components/atoms/SearchBar';

export { TextField } from './components/atoms/TextField';
export type { TextFieldProps } from './components/atoms/TextField';

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

export { CustomerStoryCard } from './components/molecules/CustomerStoryCard';
export type { CustomerStoryCardProps, CustomerStoryMetric } from './components/molecules/CustomerStoryCard';

export { MetricCard } from './components/molecules/MetricCard';
export type { MetricCardProps } from './components/molecules/MetricCard';

export { CTABanner } from './components/molecules/CTABanner';
export type { CTABannerProps } from './components/molecules/CTABanner';

export { ContentCard } from './components/molecules/ContentCard';
export type { ContentCardProps } from './components/molecules/ContentCard';

export { HeroSplit } from './components/molecules/HeroSplit';
export type { HeroSplitProps, HeroSplitImage, HeroSplitVideo } from './components/molecules/HeroSplit';

export { VideoFrame } from './components/molecules/VideoFrame';
export type { VideoFrameProps } from './components/molecules/VideoFrame';

export { HeroFullBleed } from './components/molecules/HeroFullBleed';
export type { HeroFullBleedProps } from './components/molecules/HeroFullBleed';

export { VideoFullBleed } from './components/molecules/VideoFullBleed';
export type { VideoFullBleedProps } from './components/molecules/VideoFullBleed';

export { HeroListing } from './components/molecules/HeroListing';
export type { HeroListingProps } from './components/molecules/HeroListing';

export { StatsGrid } from './components/molecules/StatsGrid';
export type { StatsGridProps, StatItem } from './components/molecules/StatsGrid';

export { SiteBanner } from './components/molecules/SiteBanner';
export type { SiteBannerProps } from './components/molecules/SiteBanner';

export { InteractiveAccordion } from './components/molecules/InteractiveAccordion';
export type {
  InteractiveAccordionProps,
  InteractiveAccordionItem,
  InteractiveAccordionMedia,
} from './components/molecules/InteractiveAccordion';

export { AISummary } from './components/molecules/AISummary';
export type { AISummaryProps } from './components/molecules/AISummary';

export { Stepper } from './components/molecules/Stepper';
export type { StepperProps, StepperItem, StepperVariant } from './components/molecules/Stepper';

export { TestimonialTabs } from './components/molecules/TestimonialTabs';
export type { TestimonialTabsProps, TestimonialTabsItem } from './components/molecules/TestimonialTabs';

export { PricingCard } from './components/molecules/PricingCard';
export type { PricingCardProps, PricingFeature } from './components/molecules/PricingCard';

export { Navbar } from './components/molecules/Navbar';
export type {
  NavbarProps,
  NavItem,
  NavDirectItem,
  NavMegaDropdownItem,
  NavSimpleDropdownItem,
  NavCategory,
  NavDropdownLink,
} from './components/molecules/Navbar';

export { SubNav } from './components/molecules/SubNav';
export type { SubNavProps, SubNavItem } from './components/molecules/SubNav';

export { Pointers } from './components/molecules/Pointers';
export type { PointersProps, PointerItem } from './components/molecules/Pointers';

export { Footer } from './components/molecules/Footer';
export type {
  FooterProps,
  FooterLink,
  FooterLinkSection,
  FooterLinkGroup,
  FooterContentPair,
  FooterSocialLink,
  FooterSocialPlatform,
} from './components/molecules/Footer';

export { Popover, usePopoverItemProps } from './components/molecules/Popover';
export type {
  PopoverProps,
  PopoverPlacement,
  PopoverRole,
} from './components/molecules/Popover';

export { Modal } from './components/molecules/Modal';
export type { ModalProps } from './components/molecules/Modal';

export { ContactForm } from './components/molecules/ContactForm';
export type {
  ContactFormProps,
  ContactFormValues,
} from './components/molecules/ContactForm';

export { FilterPanel } from './components/molecules/FilterPanel';
export type {
  FilterPanelProps,
  FilterGroup,
  FilterOption,
} from './components/molecules/FilterPanel';

export { ContactCTASection } from './components/ContactCTASection';
export type { ContactCTASectionProps, Step } from './components/ContactCTASection';

export { CTABannerSection } from './components/CTABannerSection';
export type { CTABannerSectionProps, BannerButton } from './components/CTABannerSection';

// Layouts
export { Grid } from './components/layouts/Grid';
export type { GridProps } from './components/layouts/Grid';

export { BentoGrid } from './components/layouts/BentoGrid';
export type { BentoGridProps, BentoRatio } from './components/layouts/BentoGrid';

export { Rail } from './components/layouts/Rail';
export type { RailProps } from './components/layouts/Rail';

// Marketing presets — drop-in default content for fynd.com
export {
  fyndMarketingNavItems,
  fyndSolutionsItem,
  fyndResourcesItem,
  fyndCompanyItem,
  fyndCustomerStoriesItem,
} from './presets/fyndMarketingNav';

export {
  fyndMarketingFooterPreset,
  fyndFooterLinkSections,
  fyndFooterLinkGroups,
  fyndFooterContentPairs,
  fyndFooterLegalLinks,
  fyndFooterSocialLinks,
  FyndFooterLottieWordmark,
  FyndFooterTrailingBadges,
} from './presets/fyndMarketingFooter';

export {
  FyndMarketingNavActions,
  FyndMarketingNavMobileActions,
} from './presets/fyndMarketingNavActions';
export type {
  FyndMarketingNavActionsProps,
  FyndMarketingNavMobileActionsProps,
} from './presets/fyndMarketingNavActions';

export { fyndMarketingProductOptions } from './presets/fyndMarketingProductOptions';
