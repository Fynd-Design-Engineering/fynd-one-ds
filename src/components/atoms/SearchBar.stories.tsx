import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Form/SearchBar',
  component: SearchBar,
  argTypes: {
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search',
  },
};

export const Dark: Story = {
  args: {
    placeholder: 'Search',
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

const InteractiveTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ maxWidth: 411 }}>
      <SearchBar
        placeholder="Search products, brands..."
        value={value}
        onChange={setValue}
        onSubmit={(v) => alert(`Searched: ${v}`)}
      />
      {value && <p style={{ marginTop: 8, color: '#5b5c5d', fontSize: 14 }}>Typing: {value}</p>}
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};
