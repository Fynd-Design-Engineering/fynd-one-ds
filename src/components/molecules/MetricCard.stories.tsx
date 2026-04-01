import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { MetricCard } from './MetricCard';

const PlaceholderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#5c98f7" />
    <path d="M24 12L27.5 20.86L37 21.41L30 25.97L31.8 35.5L24 31.09L16.2 35.5L18 25.97L11 21.41L20.5 20.86L24 12Z" fill="white" />
  </svg>
);

const meta: Meta<typeof MetricCard> = {
  title: 'Molecules/MetricCard',
  component: MetricCard,
  argTypes: {
    variant: { control: 'select', options: ['icon', 'number'] },
    breakpoint: { control: 'select', options: ['lg', 'md', 'sm'] },
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const IconVariant: Story = {
  args: {
    variant: 'icon',
    icon: <PlaceholderIcon />,
    title: 'Title text goes here',
  },
};

export const NumberVariant: Story = {
  args: {
    variant: 'number',
    stat: '99+',
    title: 'Text goes here',
  },
};

export const IconGrid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <MetricCard variant="icon" icon={<PlaceholderIcon />} title="Platform" />
      <MetricCard variant="icon" icon={<PlaceholderIcon />} title="Commerce" />
      <MetricCard variant="icon" icon={<PlaceholderIcon />} title="Integrations" />
      <MetricCard variant="icon" icon={<PlaceholderIcon />} title="Analytics" />
    </div>
  ),
};

export const NumberGrid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <MetricCard variant="number" stat="2M+" title="Orders processed" />
      <MetricCard variant="number" stat="99.9%" title="Uptime SLA" />
      <MetricCard variant="number" stat="150+" title="Integrations" />
      <MetricCard variant="number" stat="50ms" title="Avg response time" />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#101319', padding: 32, display: 'flex', gap: 24 }}>
      <MetricCard variant="icon" icon={<PlaceholderIcon />} title="Platform" onDarkBg />
      <MetricCard variant="number" stat="2M+" title="Orders processed" onDarkBg />
    </div>
  ),
};

export const MobileVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <MetricCard variant="icon" icon={<PlaceholderIcon />} title="Platform" breakpoint="sm" />
      <MetricCard variant="number" stat="2M+" title="Orders" breakpoint="sm" />
    </div>
  ),
};
