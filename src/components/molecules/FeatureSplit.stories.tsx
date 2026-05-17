import type { Meta, StoryObj } from '@storybook/react';
import { FeatureSplit, FeatureSplitProps } from './FeatureSplit';

const meta: Meta<FeatureSplitProps> = {
  title: 'Marketing/FeatureSplit',
  component: FeatureSplit,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<FeatureSplitProps>;

const ITEMS = [
  {
    title: 'Showcase in-store inventory online for free',
    description:
      'Set up your Google Merchant Center (GMC) and Google My Business (GMB) accounts.',
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
  {
    title: 'Increased brand discoverability',
    description:
      "A product page with in-store availability enhances visibility and drives organic web traffic by linking directly to your brand's website.",
  },
];

export const ImageLeft: Story = {
  args: {
    imageSide: 'left',
    image: {
      src: 'https://placehold.co/800x600/e8eaf6/a0a1a2?text=Feature+Image',
      alt: 'Feature preview',
    },
    items: ITEMS,
    bg: 'var(--fds-neutral-10, #f8f8f9)',
  },
};

export const ImageRight: Story = {
  args: {
    imageSide: 'right',
    image: {
      src: 'https://placehold.co/800x600/e8eaf6/a0a1a2?text=Feature+Image',
      alt: 'Feature preview',
    },
    items: ITEMS,
    bg: 'var(--fds-neutral-10, #f8f8f9)',
  },
};
