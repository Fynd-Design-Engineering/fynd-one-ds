import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { LogoMarquee } from './LogoMarquee';

const meta: Meta<typeof LogoMarquee> = {
  title: 'Content/LogoMarquee',
  component: LogoMarquee,
  argTypes: {
    duration: { control: { type: 'range', min: 5, max: 60, step: 1 } },
    repeat: { control: { type: 'range', min: 2, max: 8, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof LogoMarquee>;

export const Default: Story = {
  args: {},
};

export const Slow: Story = {
  args: {
    duration: 45,
  },
};

export const Fast: Story = {
  args: {
    duration: 10,
  },
};

export const CustomLogos: Story = {
  args: {
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
