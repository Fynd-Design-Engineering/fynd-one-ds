/**
 * Fynd Marketing Navbar preset
 *
 * Drop-in default navItems array that mirrors the live fynd.com top nav:
 * Solutions (mega) → Resources (simple) → Company (simple) → Customer stories.
 *
 * Usage:
 *
 *   // 1. Use as-is
 *   import { Navbar, fyndMarketingNavItems } from '@fynd-design-engineering/fynd-one-ds';
 *   <Navbar logo={...} navItems={fyndMarketingNavItems} actions={...} />
 *
 *   // 2. Trim/replace items
 *   import { fyndSolutionsItem, fyndCompanyItem } from '@fynd-design-engineering/fynd-one-ds';
 *   <Navbar navItems={[fyndSolutionsItem, fyndCompanyItem]} />
 *
 *   // 3. Edit one category
 *   const customSolutions = {
 *     ...fyndSolutionsItem,
 *     categories: fyndSolutionsItem.categories.filter(c => c.key !== 'fsp'),
 *   };
 *   <Navbar navItems={[customSolutions, fyndResourcesItem]} />
 */

import type { NavItem, NavMegaDropdownItem, NavSimpleDropdownItem, NavDirectItem } from '../components/molecules/Navbar';
import { IcCall } from '../assets/icons/communication';
import { IcEditPen, IcTextbook, IcPlaylistSuccessful } from '../assets/icons/actions';
import { IcGroup } from '../assets/icons/user';
import {
  IcLaptopMobile,
  IcKeyboard,
  IcCodeDocument,
  IcNetworkDish,
  IcServer,
  IcCareer,
} from '../assets/icons/hardware';
import { IcKiranaStore } from '../assets/icons/location';
import { IcTruckDelivery, IcDesignTools, IcDevelopment, IcRocket } from '../assets/icons/features';
import { IcSecured } from '../assets/icons/device';
import { IcPodcasts } from '../assets/icons/media';
import { IcHome } from '../assets/icons/navigation';
import FaDark from '../assets/brand-icons/fa-dark.svg?react';

export const fyndSolutionsItem: NavMegaDropdownItem = {
  label: 'Solutions',
  type: 'mega',
  categories: [
    {
      key: 'build',
      label: 'Build your website',
      icon: <IcLaptopMobile />,
      links: [
        {
          title: 'Create e-commerce website',
          description: 'Create your online D2C website',
          href: '/solutions/storefront',
        },
        {
          title: 'Create B2B website',
          description: 'Create a wholesale business website',
          href: '/solutions/b2b-commerce',
        },
        {
          title: 'Create quick commerce website',
          description: 'Build a hyperlocal website',
          href: '/solutions/quick',
        },
        {
          title: 'Mall Commerce',
          description: 'Take your mall online',
          href: '/solutions/mall-commerce',
        },
      ],
    },
    {
      key: 'sell',
      label: 'Sell on marketplaces',
      icon: <IcKiranaStore />,
      links: [
        {
          title: 'Connect to marketplaces - Konnect',
          description: 'Sell on Amazon and other marketplaces',
          href: '/solutions/konnect',
        },
        {
          title: 'Marketplace catalog builder - AI PIM',
          description: 'Create enriched listings for marketplaces',
          href: '/solutions/ai-pim',
        },
      ],
    },
    {
      key: 'supply',
      label: 'Supply chain',
      icon: <IcTruckDelivery />,
      links: [
        {
          title: 'Order management system - OMS',
          description: 'Centralize orders from all sales channel',
          href: '/solutions/order-management-system',
        },
        {
          title: 'Warehouse management system - WMS',
          description: 'Streamline warehouse operations from receiving to dispatch',
          href: '/solutions/warehouse-management-system',
        },
        {
          title: 'Transport management system - TMS',
          description: 'Automate first to last mile deliveries',
          href: '/solutions/transport-management-system',
        },
        {
          title: 'Logistics & delivery partners',
          description: 'Integrate with carriers or use our managed service',
          href: '/solutions/logistics',
        },
      ],
    },
    {
      key: 'retail',
      label: 'Retail store solutions',
      icon: <IcKeyboard />,
      links: [
        {
          title: 'Point of sale system - POS',
          description: 'Process transactions on mobile and terminal POS',
          href: '/solutions/pos',
        },
        {
          title: 'Self-checkout kiosks - Kio',
          description: 'Reduce wait times with automated checkout stations',
          href: '/solutions/self-checkout-kiosk',
        },
        {
          title: 'Customer loyalty program - Engage',
          description: 'Reward customers with points, referrals and gamification',
          href: '/solutions/engage',
        },
        {
          title: 'Autonomous Store Audits - Onshelf',
          description: 'Detect OOS, pricing gaps, and planogram issues',
          href: '/solutions/onshelf',
        },
        {
          title: 'Mobile self-checkout - Scan & go',
          description: 'Allow customers to scan and checkout on their phones',
          href: '/solutions/self-checkout',
        },
        {
          title: 'Endless aisle',
          description: 'Get complete visibility of inventory',
          href: '/solutions/endless-aisle',
        },
        {
          title: 'Clienteling',
          description: 'Offer personalized shopping experience',
          href: '/solutions/clienteling',
        },
      ],
    },
    {
      key: 'fsp',
      label: 'Manufacturing solutions',
      icon: <IcPlaylistSuccessful />,
      links: [
        {
          title: 'Fashion design service - Create',
          description: 'AI-powered design to manufacturing service',
          href: '/solutions/create',
        },
        {
          title: 'Manufacturing OS - Forge',
          description: 'Manufacture faster using AI',
          href: '/solutions/forge',
        },
      ],
    },
    {
      key: 'ai',
      label: 'AI for business',
      icon: <IcDesignTools />,
      links: [
        {
          title: 'AI product catalog management - AI PIM',
          description: 'Auto-generate product titles, descriptions and tags',
          href: '/solutions/ai-pim',
        },
        {
          title: 'AI product photography - AI Snap',
          description: 'Generate studio-quality product photos with AI models',
          href: '/solutions/snap',
        },
        {
          title: 'AI image transformation - Pixelbin',
          description: 'Edit, optimize, compress and deliver images at scale',
          href: '/solutions/ai-editing-for-commerce',
        },
        {
          title: 'Marketing for e-commerce - AI Studio',
          description: 'Generate ads, photoshoots, and videos using AI',
          href: 'https://www.fynd.com/aistudio/',
          external: true,
        },
        {
          title: 'Data workflow automation - Boltic',
          description: 'Connect tools and automate data operations',
          href: '/solutions/workflow-automation',
        },
        {
          title: 'AR & VR shopping experiences - GlamAR',
          description: 'Enable virtual try-ons and 3D product views',
          href: '/solutions/3d-ar-vr-try-ons',
        },
        {
          title: 'AI agent automation - Kaily',
          description: 'Automate sales, support and workflows with AI',
          href: '/solutions/ai-agent-builder',
        },
      ],
    },
    {
      key: 'dev',
      label: 'For developers',
      icon: <IcDevelopment />,
      links: [
        {
          title: 'Build with APIs',
          description: 'Build custom solutions with Fynd APIs',
          href: '/solutions/commerce-apis',
        },
        {
          title: 'Partner program',
          description: 'Build extensions and earn revenue share',
          href: 'https://partners.fynd.com/',
          external: true,
        },
        {
          title: 'Automate software testing - Ratl',
          description: 'Automated API testing, web testing and quality assurance',
          href: '/solutions/ai-software-testing',
        },
      ],
    },
  ],
  bottomLinks: [
    {
      title: 'Extensions store',
      description: 'Add powerful apps to your commerce business',
      href: 'https://extensions.fynd.com/extensions/',
      external: true,
    },
    {
      title: 'Hands-on support',
      description: 'Get hands-on support from our commerce experts',
      href: '/contact-us',
    },
    {
      title: 'Partners',
      description: 'Explore global partners to scale your business',
      href: '/partner-listing',
    },
    {
      title: 'Fynd academy',
      description: 'Empower talent and organizations with AI upskilling',
      href: 'https://www.fynd.academy/',
      external: true,
    },
  ],
};

export const fyndResourcesItem: NavSimpleDropdownItem = {
  label: 'Resources',
  type: 'simple',
  links: [
    { title: 'Blogs', icon: <IcEditPen />, href: '/blog' },
    { title: 'Seller documentation', icon: <IcCodeDocument />, href: 'https://docs.fynd.com/' },
    { title: 'Partners', icon: <IcGroup />, href: '/partners' },
    { title: 'Releases', icon: <IcRocket />, href: '/releases' },
    { title: 'Academy', icon: <FaDark width={24} height={24} />, href: '/academy' },
    { title: 'Knowledge centre', icon: <IcTextbook />, href: '/knowledge-centre' },
  ],
};

export const fyndCompanyItem: NavSimpleDropdownItem = {
  label: 'Company',
  type: 'simple',
  width: 450,
  links: [
    { title: 'About us', icon: <IcHome />, href: '/about-us' },
    { title: 'Security', icon: <IcSecured />, href: '/security' },
    { title: 'Infrastructure', icon: <IcServer />, href: '/infrastructure' },
    { title: 'Newsroom', icon: <IcNetworkDish />, href: '/newsroom' },
    { title: 'Careers', icon: <IcCareer />, href: '/careers' },
    { title: 'Contact us', icon: <IcCall />, href: '/contact-us' },
    { title: 'Podcast', icon: <IcPodcasts />, href: '/podcast' },
  ],
};

export const fyndCustomerStoriesItem: NavDirectItem = {
  label: 'Customer stories',
  href: '/customer-stories',
};

export const fyndMarketingNavItems: NavItem[] = [
  fyndSolutionsItem,
  fyndResourcesItem,
  fyndCompanyItem,
  fyndCustomerStoriesItem,
];
