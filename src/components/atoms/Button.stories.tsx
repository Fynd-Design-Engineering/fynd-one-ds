import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    onDarkBg: { control: 'boolean' },
    showChevron: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Get started',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Learn more',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Button',
    variant: 'tertiary',
  },
};

export const WithChevron: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button label="Get started" variant="primary" showChevron />
      <Button label="Learn more" variant="secondary" showChevron />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#0e0e0e', padding: 32, display: 'flex', gap: 16 }}>
      <Button label="Get started" variant="primary" onDarkBg />
      <Button label="Learn more" variant="secondary" onDarkBg />
    </div>
  ),
};

export const OnDarkWithChevron: Story = {
  render: () => (
    <div style={{ background: '#0e0e0e', padding: 32, display: 'flex', gap: 16 }}>
      <Button label="Get started" variant="primary" onDarkBg showChevron />
      <Button label="Learn more" variant="secondary" onDarkBg showChevron />
    </div>
  ),
};
