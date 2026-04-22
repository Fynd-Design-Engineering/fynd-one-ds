import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import { Footer, FooterProps, FooterLinkSection } from './Footer';
import fyndBrandmark from '../../assets/brand-logos/fynd-brandmark-light.svg';

const FYND_LOTTIE_URL =
  'https://cdn.prod.website-files.com/679bafa26833d70c32fc1199/67ac285f22ce0e236bb2084d_Fynd%20Logo%20Bottom.json';

function LottieWordmark({ src }: { src: string }) {
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
}

const linkSections: FooterLinkSection[] = [
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

const meta: Meta<FooterProps> = {
  title: 'Molecules/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<FooterProps>;

export const Default: Story = {
  args: {
    logo: <img src={fyndBrandmark} alt="Fynd" width={80} height={77} />,
    contentPairs: [
      {
        title: 'Commit to Care',
        body: 'We believe that commerce is fundamentally about human connections. When you truly care about your customers and your team, something magical happens—you create experiences that people remember, trust, and come back to. That\'s why care isn\'t just a value for us, it\'s the foundation of everything we build.',
      },
      {
        title: 'About Fynd',
        body: 'Founded in 2012, we have been building technology to help brands take better care of their customers. Today, we empower 2300+ brands with solutions that power everything—from online and in-store commerce, to seamless operations, smart logistics, AI innovations, and growth tools - helping businesses create unforgettable experiences for their customers.',
      },
    ],
    trailingContent: (
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
    ),
    linkSections,
    legalLinks: [
      { label: 'Help', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Glossary', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
    socialLinks: [
      { platform: 'linkedin', href: 'https://linkedin.com' },
      { platform: 'instagram', href: 'https://instagram.com' },
      { platform: 'twitter', href: 'https://twitter.com' },
      { platform: 'youtube', href: 'https://youtube.com' },
      { platform: 'pinterest', href: 'https://pinterest.com' },
    ],
    wordmark: <LottieWordmark src={FYND_LOTTIE_URL} />,
    copyright: '© 2024 Shopsense Retail Technologies | #MadeInIndia',
  },
};

export const Minimal: Story = {
  args: {
    linkSections: linkSections.slice(0, 4),
    legalLinks: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
    copyright: '© 2024 Shopsense Retail Technologies',
  },
};
