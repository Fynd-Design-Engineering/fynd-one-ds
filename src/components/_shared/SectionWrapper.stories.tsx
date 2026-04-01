import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';

const meta: Meta<typeof SectionWrapper> = {
  title: 'Shared/SectionWrapper',
  component: SectionWrapper,
  argTypes: {
    as: { control: 'select', options: ['section', 'div', 'footer', 'nav'] },
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SectionWrapper>;

const Placeholder = ({ text }: { text: string }) => (
  <div
    style={{
      padding: 32,
      border: '1px dashed #ccc',
      borderRadius: 8,
      textAlign: 'center',
      color: '#888',
    }}
  >
    {text}
  </div>
);

export const Default: Story = {
  args: {
    children: <Placeholder text="Section content goes here" />,
  },
};

export const OnDarkBackground: Story = {
  args: {
    onDarkBg: true,
    children: (
      <div
        style={{
          padding: 32,
          border: '1px dashed #555',
          borderRadius: 8,
          textAlign: 'center',
          color: '#ccc',
        }}
      >
        Content on dark background
      </div>
    ),
  },
};

export const AsFooter: Story = {
  args: {
    as: 'footer',
    children: <Placeholder text="Footer content (renders as <footer>)" />,
  },
};

export const AsNav: Story = {
  args: {
    as: 'nav',
    children: <Placeholder text="Navigation content (renders as <nav>)" />,
  },
};
