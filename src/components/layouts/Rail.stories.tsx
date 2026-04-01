import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Rail } from './Rail';
import { ContentCard } from '../molecules/ContentCard';
import { PricingCard } from '../molecules/PricingCard';
import { RichIconCard } from '../molecules/RichIconCard';

const meta: Meta<typeof Rail> = {
  title: 'Layouts/Rail',
  component: Rail,
  argTypes: {
    gap: { control: { type: 'number', min: 0, max: 60, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof Rail>;

const sampleFeatures = [
  { text: 'Unlimited product listings' },
  { text: 'Custom domain support' },
  { text: 'Analytics dashboard' },
  { text: '24/7 customer support' },
];

export const WithPricingCards: Story = {
  args: { gap: 20 },
  render: (args) => (
    <Rail {...args}>
      {['Starter', 'Pro', 'Growth', 'Enterprise'].map((label, i) => (
        <div key={label} style={{ width: 380 }}>
          <PricingCard
            label={label}
            popularText={i === 1 ? 'Most popular' : undefined}
            title="Ideal for"
            titleBold="new businesses"
            amount={`${(i + 1) * 4999}`}
            period="/year + GST"
            buttonLabel="Get Started"
            features={sampleFeatures}
          />
        </div>
      ))}
    </Rail>
  ),
};

export const WithContentCards: Story = {
  args: { gap: 20 },
  render: (args) => (
    <Rail {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ width: 320 }}>
          <ContentCard
            title={`Feature ${i + 1}`}
            subtext="Description of this feature goes here"
            imagePosition="below"
            showButton
            buttonLabel="Learn more"
          />
        </div>
      ))}
    </Rail>
  ),
};

export const WithRichIconCards: Story = {
  args: { gap: 16 },
  render: (args) => (
    <Rail {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{ width: 280 }}>
          <RichIconCard
            title={`Service ${i + 1}`}
            subtext="Short description"
            buttonLabel="Explore"
          />
        </div>
      ))}
    </Rail>
  ),
};
