import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { HeroFullBleed } from './HeroFullBleed';
import { Button } from '../atoms/Button';
import { StatsGrid } from './StatsGrid';

const meta: Meta<typeof HeroFullBleed> = {
  title: 'Content/HeroFullBleed',
  component: HeroFullBleed,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onDarkBg: { control: 'boolean' },
    bg: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof HeroFullBleed>;

const FYND_STATS = [
  { stat: '300M+', label: 'customers served' },
  { stat: '$2.5B', label: 'GMV enabled' },
  { stat: '20K+', label: 'stores served' },
  { stat: '30', label: 'countries served' },
];

export const Default: Story = {
  args: {
    title: (
      <>
        Run your entire retail
        <br />
        business from one platform
      </>
    ),
    subtext:
      'Storefront, OMS, POS, and marketplace — all connected, all in sync.',
    actions: <Button label="Book a demo" variant="primary" showChevron />,
    extras: <StatsGrid items={FYND_STATS} />,
    video: {
      src: 'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/uk/hero_uk_full_desktop_fullscale.mp4',
      mobileSrc: 'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/uk/hero_uk_Mobile_optimised_crop.mp4',
      objectFit: 'cover',
    },
    bg: '#eeeeee',
  },
};
