import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ImageHolder } from './ImageHolder';

const meta: Meta<typeof ImageHolder> = {
  title: 'Atoms/ImageHolder',
  component: ImageHolder,
  argTypes: {
    aspectRatio: { control: 'select', options: ['5:4', '1:1', '16:9', 'portrait'] },
  },
};

export default meta;
type Story = StoryObj<typeof ImageHolder>;

export const Placeholder: Story = {
  args: {
    aspectRatio: '5:4',
  },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};

export const AllRatios: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <ImageHolder aspectRatio="5:4" />
      <ImageHolder aspectRatio="1:1" />
      <ImageHolder aspectRatio="16:9" />
      <ImageHolder aspectRatio="portrait" />
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    aspectRatio: '16:9',
    src: 'https://placehold.co/800x450/e3e3e3/5b5c5d?text=16:9',
    alt: 'Sample image',
  },
  decorators: [(Story) => <div style={{ maxWidth: 600 }}><Story /></div>],
};
