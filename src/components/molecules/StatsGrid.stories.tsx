import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { StatsGrid } from './StatsGrid';

const meta: Meta<typeof StatsGrid> = {
  title: 'Content/StatsGrid',
  component: StatsGrid,
  argTypes: {
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof StatsGrid>;

const FYND_STATS = [
  { stat: '300M+', label: 'customers served' },
  { stat: '$2.5B', label: 'GMV enabled' },
  { stat: '20K+', label: 'stores served' },
  { stat: '30', label: 'countries served' },
];

export const Default: Story = {
  args: { items: FYND_STATS },
  decorators: [(Story) => <div style={{ padding: 40 }}><Story /></div>],
};

export const Dark: Story = {
  args: { items: FYND_STATS, onDarkBg: true },
  decorators: [
    (Story) => (
      <div style={{ background: '#101319', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
};
