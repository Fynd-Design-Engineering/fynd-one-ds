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

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import type {
  FooterContentPair,
  FooterLink,
  FooterLinkSection,
  FooterProps,
  FooterSocialLink,
} from '../components/molecules/Footer';
import fyndBrandmark from '../assets/brand-logos/fynd-brandmark-light.svg';

// ── Lottie wordmark ────────────────────────────────────────────────────

const FYND_LOTTIE_URL =
  'https://cdn.prod.website-files.com/679bafa26833d70c32fc1199/67ac285f22ce0e236bb2084d_Fynd%20Logo%20Bottom.json';

interface LottieWordmarkProps {
  /** Override the Lottie JSON source. Defaults to the Fynd marketing wordmark. */
  src?: string;
}

export const FyndFooterLottieWordmark = ({ src = FYND_LOTTIE_URL }: LottieWordmarkProps) => {
  const [data, setData] = useState<object | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!data) return null;
  return (
    <Lottie
      animationData={data}
      loop
      autoplay
      style={{ width: '100%', maxWidth: 1272, height: 'auto' }}
    />
  );
};

// ── Trailing certification badges ──────────────────────────────────────

export const FyndFooterTrailingBadges = () => (
  <>
    <img
      src="https://cdn.prod.website-files.com/67a9c8e5f2c74ac8c2c9b88b/6825ec9415021b2716434ab9_009c7f35fce44cf51691d436f8d5e365880aa097.png"
      alt="AICPA SOC"
      height={64}
      style={{ height: 64, width: 'auto', objectFit: 'contain' }}
    />
    <img
      src="https://cdn.prod.website-files.com/67a9c8e5f2c74ac8c2c9b88b/6823275f8cde687f82022461_8fb14412db7cad359ce4c4a00c7c6d17_fb2b10a26add41e7add654b0317df382ef05a909.webp"
      alt="GDPR compliant"
      height={64}
      style={{ height: 64, width: 'auto', objectFit: 'contain' }}
    />
    <img
      src="https://cdn.prod.website-files.com/67a9c8e5f2c74ac8c2c9b88b/6998315730ac5419f5f66fce_image.avif"
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
      { label: 'Seller documents', href: 'https://docs.fynd.com/', external: true },
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
  { label: 'Help', href: '/help' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Status', href: 'https://status.fynd.com/', external: true },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Cookies', href: '/cookies' },
];

export const fyndFooterSocialLinks: FooterSocialLink[] = [
  { platform: 'linkedin', href: 'https://www.linkedin.com/company/fynd' },
  { platform: 'instagram', href: 'https://www.instagram.com/fyndofficial' },
  { platform: 'twitter', href: 'https://x.com/fyndofficial' },
  { platform: 'youtube', href: 'https://www.youtube.com/@fyndofficial' },
  { platform: 'pinterest', href: 'https://in.pinterest.com/fyndofficial/' },
];

// ── Convenience preset ─────────────────────────────────────────────────

/**
 * Spread this onto a `<Footer />` to render the full marketing footer.
 * Override any prop by passing it after the spread.
 */
export const fyndMarketingFooterPreset: Partial<FooterProps> = {
  logo: <img src={fyndBrandmark} alt="Fynd" width={80} height={77} />,
  contentPairs: fyndFooterContentPairs,
  trailingContent: <FyndFooterTrailingBadges />,
  linkSections: fyndFooterLinkSections,
  legalLinks: fyndFooterLegalLinks,
  socialLinks: fyndFooterSocialLinks,
  wordmark: <FyndFooterLottieWordmark />,
  copyright: '© 2024 Shopsense Retail Technologies | #MadeInIndia',
};
