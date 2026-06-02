import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { LogoStrip } from './LogoStrip';

const meta: Meta<typeof LogoStrip> = {
  title: 'Atoms/LogoStrip',
  component: LogoStrip,
  argTypes: {
    variant: { control: 'radio', options: ['marquee', 'static'] },
    duration: { control: { type: 'range', min: 5, max: 60, step: 1 } },
    repeat: { control: { type: 'range', min: 2, max: 8, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof LogoStrip>;

export const Marquee: Story = {
  args: {
    variant: 'marquee',
  },
};

export const Static: Story = {
  args: {
    variant: 'static',
  },
};

export const MarqueeSlow: Story = {
  args: {
    variant: 'marquee',
    duration: 60,
  },
};

export const MarqueeFast: Story = {
  args: {
    variant: 'marquee',
    duration: 10,
  },
};

export const CustomLogos: Story = {
  args: {
    variant: 'marquee',
    logos: [
      { src: 'https://placehold.co/120x40/e3e3e3/5b5c5d?text=Brand+A', alt: 'Brand A' },
      { src: 'https://placehold.co/120x40/e3e3e3/5b5c5d?text=Brand+B', alt: 'Brand B' },
      { src: 'https://placehold.co/120x40/e3e3e3/5b5c5d?text=Brand+C', alt: 'Brand C' },
      { src: 'https://placehold.co/120x40/e3e3e3/5b5c5d?text=Brand+D', alt: 'Brand D' },
      { src: 'https://placehold.co/120x40/e3e3e3/5b5c5d?text=Brand+E', alt: 'Brand E' },
    ],
    duration: 15,
  },
};

/** Per-item intrinsic `width`/`height` hints reserve space and prevent CLS.
 *  Default 150 × 50 when omitted. */
export const WithIntrinsicDimensions: Story = {
  args: {
    variant: 'static',
    logos: [
      { src: 'https://placehold.co/200x60/e3e3e3/5b5c5d?text=Wide', alt: 'Wide brand', width: 200, height: 60 },
      { src: 'https://placehold.co/100x50/e3e3e3/5b5c5d?text=Square', alt: 'Square brand', width: 100, height: 50 },
      { src: 'https://placehold.co/150x50/e3e3e3/5b5c5d?text=Default', alt: 'Default brand' },
    ],
  },
};
