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
  { stat: '10,000+', label: 'Brands' },
  { stat: '$2B+', label: 'GMV processed' },
  { stat: '50+', label: 'Countries' },
  { stat: '99.9%', label: 'Uptime' },
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
