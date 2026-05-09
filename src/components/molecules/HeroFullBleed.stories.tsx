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
    actions: (
      <>
        <Button label="Book a demo" variant="primary" showChevron />
        <Button label="Explore features" variant="secondary" />
      </>
    ),
    extras: <StatsGrid />,
    video: {
      src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/home/fynd-homepage-hero-desktop.mp4',
      poster: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/solutions/storefront/fynd-storefront.avif',
      objectFit: 'cover',
    },
    bg: '#eeeeee',
  },
};
