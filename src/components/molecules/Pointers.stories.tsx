import type { Meta, StoryObj } from '@storybook/react';
import { Pointers, PointersProps } from './Pointers';

const meta: Meta<PointersProps> = {
  title: 'Molecules/Pointers',
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
  decorators: [
    (Story) => (
      <div style={{ width: 480, padding: 24, background: '#cbd9f6', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

export const OnDark: Story = {
  args: { items: ITEMS, onDarkBg: true },
  decorators: [
    (Story) => (
      <div style={{ width: 480, padding: 24, background: '#101319', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

export const LargerLabels: Story = {
  args: { items: ITEMS, variant: 'body-l', weight: 'medium' },
  decorators: [
    (Story) => (
      <div style={{ width: 540, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};
