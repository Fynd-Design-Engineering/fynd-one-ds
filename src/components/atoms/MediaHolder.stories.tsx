import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { MediaHolder } from './MediaHolder';

const SAMPLE_IMAGE = 'https://placehold.co/600x800/d2d2d2/4a4b4c?text=Layer+1';
const SAMPLE_IMAGE_2 = 'https://placehold.co/600x800/a0c4ff/101319?text=Layer+2';
const SAMPLE_IMAGE_3 = 'https://placehold.co/600x800/ffd6a5/101319?text=Layer+3';

const meta: Meta<typeof MediaHolder> = {
  title: 'Content/InteractiveAccordion/MediaHolder',
  component: MediaHolder,
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['5:4', '1:1', '16:9', 'portrait'],
    },
    activeIndex: { control: 'number' },
    background: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof MediaHolder>;

export const SingleImage: Story = {
  name: 'Single image — portrait (3:4)',
  args: {
    aspectRatio: 'portrait',
    layers: [{ type: 'image', src: SAMPLE_IMAGE, alt: 'Sample image' }],
    activeIndex: 0,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const AllRatios: Story = {
  name: 'Aspect ratio presets',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {(['portrait', '1:1', '5:4', '16:9'] as const).map((r) => (
        <div key={r} style={{ width: 220 }}>
          <p style={{ fontFamily: 'monospace', fontSize: 12, marginBottom: 8 }}>{r}</p>
          <MediaHolder
            aspectRatio={r}
            layers={[{ type: 'image', src: `https://placehold.co/440x440/d2d2d2/4a4b4c?text=${encodeURIComponent(r)}`, alt: r }]}
          />
        </div>
      ))}
    </div>
  ),
};

export const CustomRatio: Story = {
  name: 'Custom ratio string (21 / 9)',
  args: {
    aspectRatio: '21 / 9',
    layers: [{ type: 'image', src: 'https://placehold.co/840x360/d2d2d2/4a4b4c?text=21%2F9', alt: 'Ultrawide' }],
  },
  decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};

export const MultipleLayers: Story = {
  name: 'Multiple layers — toggle activeIndex',
  args: {
    aspectRatio: 'portrait',
    activeIndex: 0,
    layers: [
      { type: 'image', src: SAMPLE_IMAGE, alt: 'Layer 1' },
      { type: 'image', src: SAMPLE_IMAGE_2, alt: 'Layer 2' },
      { type: 'image', src: SAMPLE_IMAGE_3, alt: 'Layer 3' },
    ],
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const WithBackground: Story = {
  name: 'Tinted background (transparent PNG simulation)',
  args: {
    aspectRatio: 'portrait',
    background: '#fce8ec',
    layers: [
      {
        type: 'image',
        src: 'https://placehold.co/400x400/fce8ec/c0546a?text=PNG+with+bg',
        alt: 'Image with tinted panel',
      },
    ],
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
