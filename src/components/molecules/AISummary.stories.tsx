import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { AISummary } from './AISummary';

const meta: Meta<typeof AISummary> = {
  title: 'Content/AISummary',
  component: AISummary,
  argTypes: {
    label: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AISummary>;

const sampleText =
  'Fynd Storefront enables businesses to create and launch an online store without coding. It uses AI to generate website sections, product descriptions, and basic text from simple cues. As a result, brands can go live faster, manage items, and begin selling without requiring technical expertise.';

export const Default: Story = {
  args: {
    label: 'AI summary',
    children: sampleText,
  },
  render: (args) => (
    <div style={{ maxWidth: 640, padding: 32 }}>
      <AISummary {...args} />
    </div>
  ),
};

export const CustomLabel: Story = {
  args: {
    label: 'AI insights',
    children: sampleText,
  },
  render: (args) => (
    <div style={{ maxWidth: 640, padding: 32 }}>
      <AISummary {...args} />
    </div>
  ),
};

export const NarrowContainer: Story = {
  render: () => (
    <div style={{ maxWidth: 320, padding: 32 }}>
      <AISummary>
        {sampleText}
      </AISummary>
    </div>
  ),
};

export const InGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 32 }}>
      <AISummary label="AI summary">
        Fynd Commerce OS unifies your storefronts, inventory, and fulfilment in one platform.
      </AISummary>
      <AISummary label="AI summary">
        Built for scale — handle millions of SKUs and orders without custom engineering.
      </AISummary>
    </div>
  ),
};
