import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterButton } from './FilterButton';

const meta: Meta<typeof FilterButton> = {
  title: 'Atoms/FilterButton',
  component: FilterButton,
  argTypes: {
    filterCount: { control: { type: 'number', min: 0, max: 99 } },
  },
};

export default meta;
type Story = StoryObj<typeof FilterButton>;

export const Default: Story = {
  args: {
    label: 'Filter',
    filterCount: 0,
  },
};

export const WithCount: Story = {
  args: {
    label: 'Filter',
    filterCount: 3,
  },
};

export const HighCount: Story = {
  args: {
    label: 'Filter',
    filterCount: 12,
  },
};
