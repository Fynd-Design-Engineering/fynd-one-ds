import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Atoms/Pagination',
  component: Pagination,
  argTypes: {
    onDarkBg: { control: 'boolean' },
    totalPages: { control: { type: 'number', min: 1, max: 50 } },
    currentPage: { control: { type: 'number', min: 1, max: 50 } },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
};

export const MiddlePage: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
  },
};

export const Dark: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
    onDarkBg: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#101319', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
};

export const FewPages: Story = {
  args: {
    totalPages: 4,
    currentPage: 2,
  },
};

const InteractiveTemplate = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination totalPages={10} currentPage={page} onPageChange={setPage} />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};
