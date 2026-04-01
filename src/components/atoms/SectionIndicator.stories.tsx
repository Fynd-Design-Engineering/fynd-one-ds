import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SectionIndicator } from './SectionIndicator';

const meta: Meta<typeof SectionIndicator> = {
  title: 'Atoms/SectionIndicator',
  component: SectionIndicator,
  argTypes: {
    color: { control: 'select', options: ['blue', 'green', 'peach', 'yellow', 'lavender', 'violet', 'red', 'gray', 'teal'] },
  },
};

export default meta;
type Story = StoryObj<typeof SectionIndicator>;

export const Blue: Story = {
  args: { color: 'blue' },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <SectionIndicator color="blue" />
      <SectionIndicator color="green" />
      <SectionIndicator color="peach" />
      <SectionIndicator color="yellow" />
      <SectionIndicator color="lavender" />
      <SectionIndicator color="violet" />
      <SectionIndicator color="red" />
      <SectionIndicator color="gray" />
      <SectionIndicator color="teal" />
    </div>
  ),
};
