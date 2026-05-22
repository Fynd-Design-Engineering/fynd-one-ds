/**
 * Fynd Marketing Footer preset
 *
 * Drop-in default content for the Footer component covering the entire
 * fynd.com footer: 10 link sections grouped under three accordion banks
 * on mobile, 2 mission content pairs, 3 cert badges, 6 legal links,
 * 5 social icons, and the animated Lottie wordmark.
 *
 * Usage:
 *
 *   // 1. Spread the entire preset
 *   import { Footer, fyndMarketingFooterPreset } from '@fynd-design-engineering/fynd-one-ds';
 *   <Footer {...fyndMarketingFooterPreset} />
 *
 *   // 2. Override individual pieces
 *   <Footer {...fyndMarketingFooterPreset} legalLinks={[{ label: 'Privacy', href: '/privacy' }]} />
 *
 *   // 3. Use parts in your own composition
 *   import { fyndFooterLinkSections, FyndFooterLottieWordmark } from '@fynd-design-engineering/fynd-one-ds';
 */

import type {
  FooterContentPair,
  FooterLink,
  FooterLinkGroup,
  FooterLinkSection,
  FooterProps,
  FooterSocialLink,
} from '../components/molecules/Footer';
import FyndBrandmark from '../assets/brand-logos/fynd-brandmark-light.svg?react';
import { FyndFooterLottieWordmark } from './FyndFooterLottieWordmark';

// Re-export the Lottie wordmark so consumers can keep importing it
// from this barrel. The component lives in its own 'use client'
// module so this preset (plain data) stays RSC-server-importable.
export { FyndFooterLottieWordmark };
export type { FyndFooterLottieWordmarkProps } from './FyndFooterLottieWordmark';

// ── Trailing certification badges ──────────────────────────────────────

export const FyndFooterTrailingBadges = () => (
  <>
    <img
      src="https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/009c7f35fce44cf51691d436f8d5e365880aa097.png"
      alt="AICPA SOC"
      height={64}
      style={{ height: 64, width: 'auto', objectFit: 'contain' }}
    />
    <img
      src="https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/8fb14412db7cad359ce4c4a00c7c6d17-fb2b10a26add41e7add654b0317df382ef05a909.webp"
      alt="GDPR compliant"
      height={64}
      style={{ height: 64, width: 'auto', objectFit: 'contain' }}
    />
    <img
      src="https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/image.avif"
      alt="BSI ISO certification"
      height={64}
      style={{ height: 64, width: 'auto', objectFit: 'contain' }}
    />
  </>
);

// ── Data ───────────────────────────────────────────────────────────────

export const fyndFooterLinkSections: FooterLinkSection[] = [
  {
    title: 'Website builder',
    links: [
      { label: 'E-commerce website', href: '/solutions/storefront' },
      { label: 'B2B Platform', href: '/solutions/b2b-commerce' },
      { label: 'Quick commerce website', href: '/solutions/quick' },
    ],
  },
  {
    title: 'Marketplaces',
    links: [
      { label: 'Sell on marketplace', href: '/solutions/konnect' },
      { label: 'Integrations', href: '/solutions/integrations' },
      { label: 'AI product catalog management - AI PIM', href: '/solutions/ai-pim' },
    ],
  },
  {
    title: 'Fulfilment & supply chain',
    links: [
      { label: 'Order management system - OMS', href: '/solutions/order-management-system' },
      { label: 'Warehouse management system - WMS', href: '/solutions/warehouse-management-system' },
      { label: 'Transport management system - TMS', href: '/solutions/transport-management-system' },
      { label: '3rd party logistics - 3PL', href: '/solutions/logistics' },
    ],
  },
  {
    title: 'Retail solutions',
    links: [
      { label: 'Point of sale system - POS', href: '/solutions/pos' },
      { label: 'Endless Aisle', href: '/solutions/endless-aisle' },
      { label: 'Clienteling', href: '/solutions/clienteling' },
      { label: 'Mobile-checkout', href: '/solutions/self-checkout' },
      { label: 'Self-checkout', href: '/solutions/self-checkout' },
    ],
  },
  {
    title: 'AI for Business',
    links: [
      { label: 'AI agent builder - Kaily', href: '/solutions/ai-agent-builder' },
      { label: 'AI image editor - Pixelbin', href: '/solutions/ai-editing-for-commerce' },
      { label: 'AR & VR solutions - Glam AR', href: '/solutions/3d-ar-vr-try-ons' },
      { label: 'Workflow automation - Boltic', href: '/solutions/workflow-automation' },
      { label: 'AI photoshoot - Snap', href: '/solutions/snap' },
    ],
  },
  {
    title: 'AI for Developers',
    links: [
      { label: 'Coding assistant - Fynix', href: '/solutions/ai-coding-assistant' },
      { label: 'Commerce APIs', href: '/solutions/commerce-apis' },
      { label: 'Ai testing agent - Ratl', href: '/solutions/ai-software-testing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about-us' },
      { label: 'Security', href: '/security' },
      { label: 'Infrastructure', href: '/infrastructure' },
      { label: 'Newsroom', href: '/newsroom' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact-us' },
      { label: 'Investors', href: '/investors' },
    ],
  },
  {
    title: 'Brand Resources',
    links: [
      { label: 'Blogs', href: '/blog' },
      { label: 'Customer stories', href: '/customer-stories' },
      { label: 'Releases', href: '/releases' },
      { label: 'Seller documents', href: 'https://docs.fynd.com/' },
      { label: 'Partner List', href: '/partner-listing' },
      { label: 'Events', href: '/events' },
      { label: 'Podcast', href: '/podcast' },
    ],
  },
  {
    title: 'Manufacturing solutions',
    links: [
      { label: 'Fashion design and sourcing - Create', href: '/solutions/create' },
      { label: 'Forge', href: '/solutions/forge' },
    ],
  },
  {
    title: 'Business sizes',
    links: [
      { label: 'Commerce for SMBs', href: '/teams/fynd-for-smbs' },
      { label: 'Enterprise commerce', href: '/teams/enterprise' },
    ],
  },
];

export const fyndFooterContentPairs: FooterContentPair[] = [
  {
    title: 'Commit to Care',
    body: "We believe that commerce is fundamentally about human connections. When you truly care about your customers and your team, something magical happens—you create experiences that people remember, trust, and come back to. That's why care isn't just a value for us, it's the foundation of everything we build.",
  },
  {
    title: 'About Fynd',
    body: 'Founded in 2012, we have been building technology to help brands take better care of their customers. Today, we empower 2300+ brands with solutions that power everything—from online and in-store commerce, to seamless operations, smart logistics, AI innovations, and growth tools - helping businesses create unforgettable experiences for their customers.',
  },
];

export const fyndFooterLegalLinks: FooterLink[] = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-and-conditions' },
  { label: 'Status', href: 'https://status.fynd.com/', external: true },
  { label: 'Glossary', href: '/glossary/collection-lists' },
  { label: 'Cookies', href: '#' },
];

export const fyndFooterSocialLinks: FooterSocialLink[] = [
  { platform: 'linkedin', href: 'https://www.linkedin.com/company/fynd-shopsense/' },
  { platform: 'instagram', href: 'https://www.instagram.com/gofynd/' },
  { platform: 'twitter', href: 'https://x.com/fynd_official' },
  { platform: 'youtube', href: 'https://www.youtube.com/@FyndOfficial' },
];

// ── Convenience preset ─────────────────────────────────────────────────

/**
 * Spread this onto a `<Footer />` to render the full marketing footer.
 * Override any prop by passing it after the spread.
 */
/** Three accordion banks that match the live fynd.com footer structure.
 * Desktop renders each group's sections in a row; tablet/mobile renders
 * each group's title as an accordion trigger. */
export const fyndFooterLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Channels & Operations',
    sections: fyndFooterLinkSections.slice(0, 4), // Website builder, Marketplaces, Fulfilment, Retail
  },
  {
    title: 'Intelligence & Innovation',
    sections: fyndFooterLinkSections.slice(4, 8), // AI for Business, AI for Devs, Company, Brand Resources
  },
  {
    title: 'Company Resources',
    sections: fyndFooterLinkSections.slice(8, 10), // Manufacturing, Business sizes
  },
];

export const fyndMarketingFooterPreset: Partial<FooterProps> = {
  logo: <FyndBrandmark width={80} height={77} role="img" aria-label="Fynd" />,
  contentPairs: fyndFooterContentPairs,
  trailingContent: <FyndFooterTrailingBadges />,
  linkGroups: fyndFooterLinkGroups,
  legalLinks: fyndFooterLegalLinks,
  socialLinks: fyndFooterSocialLinks,
  wordmark: <FyndFooterLottieWordmark />,
  copyright: `© ${new Date().getFullYear()} Shopsense Retail Technologies | Invented in India`,
};
