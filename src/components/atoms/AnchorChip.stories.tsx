import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AnchorChip } from './AnchorChip';

const meta: Meta<typeof AnchorChip> = {
  title: 'Atoms/AnchorChip',
  component: AnchorChip,
  argTypes: {
    color: { control: 'select', options: ['blue', 'green', 'peach'] },
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AnchorChip>;

export const Blue: Story = {
  args: { label: 'Platform', color: 'blue' },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <AnchorChip label="Platform" color="blue" />
      <AnchorChip label="Commerce" color="green" />
      <AnchorChip label="Marketing" color="peach" />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#0e0e0e', padding: 32, display: 'flex', gap: 12 }}>
      <AnchorChip label="Platform" color="blue" onDarkBg />
      <AnchorChip label="Commerce" color="green" onDarkBg />
    </div>
  ),
};
