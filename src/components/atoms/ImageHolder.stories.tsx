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

/**
 * 20 stacked images. With the default `loading="lazy"`, only the images near
 * the viewport request immediately — scroll and watch the rest load in the
 * Network panel. Pass `imageLoading="eager"` to opt an instance out.
 */
export const LazyGrid: Story = {
  name: 'Lazy-loaded grid of 20 items',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, maxWidth: 600 }}>
      {Array.from({ length: 20 }, (_, i) => (
        <ImageHolder
          key={i}
          aspectRatio="16:9"
          src={`https://picsum.photos/seed/fds-lazy-${i}/800/450`}
          alt={`Lazy image ${i + 1}`}
        />
      ))}
    </div>
  ),
};
