import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CustomerStoryCard } from './CustomerStoryCard';

const meta: Meta<typeof CustomerStoryCard> = {
  title: 'Molecules/CustomerStoryCard',
  component: CustomerStoryCard,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CustomerStoryCard>;

const AsosImage = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <img
      src="https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/682ee254869d6b31b72591eb_Asosheader.avif"
      alt="ASOS"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
    <div style={{
      position: 'absolute', bottom: '1.25rem', left: '1.25rem',
      background: 'rgba(0,0,0,0.15)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem',
    }}>
      <img
        src="https://cdn.prod.website-files.com/67c68c93736617d0ce4e4f7b/6901bf5f1892efb09c5fc8ab_688b385b787c0f456c91c391_asos%201.svg"
        alt="ASOS logo"
        style={{ height: '2rem', display: 'block' }}
      />
    </div>
  </div>
);

const BrooksBrothersImage = () => (
  <img
    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800"
    alt="Brooks Brothers store"
    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
  />
);

export const Large: Story = {
  args: {
    title: 'ASOS slashes photoshoot expenses by 80% - while delivering studio-quality results with Fynd AI Photoshoot',
    href: '/customer-stories/asos-ai-photoshoot',
    metrics: [
      { value: '2 days', label: 'turnaround for professional-quality catalog' },
      { value: '30 SKUs', label: 'transformed from flatlays to catalog-ready in a day' },
      { value: '86%', label: 'reduction in total photoshoot time' },
    ],
    imageSlot: <AsosImage />,
    buttonLabel: 'Read case study',
  },
};

export const Compact: Story = {
  args: {
    title: 'Making sky-high sales at airport stores: How Brooks Brothers conquered this niche market',
    href: '/customer-stories/brooks-brothers',
    imageSlot: <BrooksBrothersImage />,
    buttonLabel: 'Read case study',
  },
};

export const NoImage: Story = {
  args: {
    title: 'How White Cut Diamonds brought clarity to high-value jewellery purchases with AR try-ons',
    href: '/customer-stories/white-cut-diamonds',
    buttonLabel: 'Read case study',
  },
};
