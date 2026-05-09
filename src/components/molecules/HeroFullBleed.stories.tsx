import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { HeroFullBleed } from './HeroFullBleed';
import { Button } from '../atoms/Button';
import { Text } from '../Typography/Text';

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

const StatsGrid: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px' }}>
    {[
      { stat: '10,000+', label: 'Brands' },
      { stat: '$2B+', label: 'GMV processed' },
      { stat: '50+', label: 'Countries' },
      { stat: '99.9%', label: 'Uptime' },
    ].map(({ stat, label }) => (
      <div key={label}>
        <Text variant="heading-m" as="p" weight="medium">{stat}</Text>
        <Text variant="body-s" as="p" color="secondary">{label}</Text>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    ratingChips: [
      { platform: 'amazon', rank: '#1', label: 'in Commerce Platform' },
      { platform: 'g2', stars: 5, rating: '4.8 / 5' },
    ],
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
    extras: <StatsGrid />,
    video: {
      src: 'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/uk/hero_uk_full_desktop_fullscale.mp4',
      mobileSrc: 'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/uk/hero_uk_Mobile_optimised_crop.mp4',
      objectFit: 'cover',
    },
    bg: '#eeeeee',
  },
};
