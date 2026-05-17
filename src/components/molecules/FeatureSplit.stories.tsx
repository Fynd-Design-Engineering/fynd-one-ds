import type { Meta, StoryObj } from '@storybook/react';
import { FeatureSplit, FeatureSplitProps } from './FeatureSplit';

const meta: Meta<FeatureSplitProps> = {
  title: 'Marketing/FeatureSplit',
  component: FeatureSplit,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<FeatureSplitProps>;

const PLACEHOLDER = 'https://placehold.co/800x600/e8eaf6/a0a1a2?text=Feature+Image';

const ITEMS_A = [
  {
    title: 'Showcase in-store inventory online for free',
    description: 'Set up your Google Merchant Center (GMC) and Google My Business (GMB) accounts.',
  },
  {
    title: 'Hyperlocal targeting',
    description:
      'Reach customers near your stores through local product listings on Google Search and Google Maps, catering to all search types.',
  },
  {
    title: 'More store visits',
    description:
      'Local product listings guide online shoppers searching for nearby products directly to your physical stores, increasing foot traffic.',
  },
];

const ITEMS_B = [
  {
    title: 'Increased brand discoverability',
    description:
      "A product page with in-store availability enhances visibility and drives organic web traffic by linking directly to your brand's website.",
  },
  {
    title: 'Display important store badges to shoppers',
    description:
      'Enhance your local product listings with badges highlighting same-day delivery, sales, pick-up options, and various other annotations.',
  },
];

export const SingleRow: Story = {
  args: {
    rows: [
      {
        image: { src: PLACEHOLDER, alt: 'Feature preview' },
        imageSide: 'left',
        items: ITEMS_A,
      },
    ],
    bg: 'var(--fds-neutral-10, #f8f8f9)',
  },
};

export const WithHeader: Story = {
  args: {
    title: 'Sell everywhere your customers shop',
    chipLabel: 'Integrations',
    subtext: 'Connect your store to every major channel — search, social, and in-store.',
    rows: [
      {
        image: { src: PLACEHOLDER, alt: 'Feature preview' },
        imageSide: 'left',
        items: ITEMS_A,
      },
    ],
    bg: 'var(--fds-neutral-10, #f8f8f9)',
  },
};

export const MultipleRows: Story = {
  args: {
    title: 'Sell everywhere your customers shop',
    chipLabel: 'Integrations',
    subtext: 'Connect your store to every major channel — search, social, and in-store.',
    rows: [
      {
        image: { src: PLACEHOLDER, alt: 'Feature A' },
        imageSide: 'left',
        items: ITEMS_A,
      },
      {
        image: { src: PLACEHOLDER, alt: 'Feature B' },
        imageSide: 'right',
        items: ITEMS_B,
      },
    ],
    bg: 'var(--fds-neutral-10, #f8f8f9)',
  },
};
