import type { Meta, StoryObj } from '@storybook/react';
import { Pointers, PointersProps } from './Pointers';

const meta: Meta<PointersProps> = {
  title: 'Content/Pointers',
  component: Pointers,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<PointersProps>;

const ITEMS = [
  { label: 'Build an attractive website' },
  { label: 'Automate order management' },
  { label: 'Assign and track delivery riders' },
  { label: "Deliver at customer's doorstep" },
];

export const Default: Story = {
  args: { items: ITEMS },
};

export const OnDark: Story = {
  args: { items: ITEMS, onDarkBg: true },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const LargerLabels: Story = {
  args: { items: ITEMS, variant: 'body-l', weight: 'medium' },
};
