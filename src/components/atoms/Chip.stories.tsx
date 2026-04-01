import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Chip } from './Chip';

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.5L9.79 5.86L14.5 6.41L11 9.47L11.94 14.5L8 12.09L4.06 14.5L5 9.47L1.5 6.41L6.21 5.86L8 1.5Z" fill="currentColor" />
  </svg>
);

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  argTypes: {
    variant: { control: 'select', options: ['anchor', 'filled', 'outlined'] },
    dotColor: { control: 'select', options: ['blue', 'green', 'peach', 'yellow', 'lavender', 'violet', 'red', 'gray', 'teal'] },
    breakpoint: { control: 'select', options: ['lg', 'md', 'sm'] },
    showDot: { control: 'boolean' },
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Anchor: Story = {
  args: { label: 'Anchor Text', variant: 'anchor', dotColor: 'blue' },
};

export const Filled: Story = {
  args: { label: 'Badge label', variant: 'filled', showDot: false },
};

export const Outlined: Story = {
  args: { label: 'Badge label', variant: 'outlined', showDot: false },
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Chip label="Filled with icon" variant="filled" icon={<StarIcon />} />
      <Chip label="Outlined with icon" variant="outlined" icon={<StarIcon />} />
    </div>
  ),
};

export const AllDotColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip label="Blue" dotColor="blue" />
      <Chip label="Green" dotColor="green" />
      <Chip label="Peach" dotColor="peach" />
      <Chip label="Yellow" dotColor="yellow" />
      <Chip label="Lavender" dotColor="lavender" />
      <Chip label="Violet" dotColor="violet" />
      <Chip label="Red" dotColor="red" />
      <Chip label="Gray" dotColor="gray" />
      <Chip label="Teal" dotColor="teal" />
    </div>
  ),
};

export const AnchorWithoutDot: Story = {
  args: { label: 'No dot', variant: 'anchor', showDot: false },
};

export const Breakpoints: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Chip label="Desktop" breakpoint="lg" />
      <Chip label="Tablet" breakpoint="md" />
      <Chip label="Mobile" breakpoint="sm" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Chip label="Anchor with dot" variant="anchor" dotColor="blue" />
      <Chip label="Anchor without dot" variant="anchor" showDot={false} />
      <Chip label="Filled" variant="filled" showDot={false} />
      <Chip label="Filled with icon" variant="filled" icon={<StarIcon />} />
      <Chip label="Outlined" variant="outlined" showDot={false} />
      <Chip label="Outlined with icon" variant="outlined" icon={<StarIcon />} />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#0e0e0e', padding: 32, display: 'flex', gap: 12 }}>
      <Chip label="Blue" dotColor="blue" onDarkBg />
      <Chip label="Green" dotColor="green" onDarkBg />
      <Chip label="No dot" showDot={false} onDarkBg />
    </div>
  ),
};
