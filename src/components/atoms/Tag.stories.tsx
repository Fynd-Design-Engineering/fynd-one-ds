import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  argTypes: {
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: { label: 'Text' },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag label="Commerce" />
      <Tag label="Platform" />
      <Tag label="Growth" />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#0e0e0e', padding: 32, display: 'flex', gap: 8 }}>
      <Tag label="Commerce" onDarkBg />
      <Tag label="Platform" onDarkBg />
      <Tag label="Growth" onDarkBg />
    </div>
  ),
};
