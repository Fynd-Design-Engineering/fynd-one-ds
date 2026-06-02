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

export const ImageHero: Story = {
  args: {
    title: (
      <>
        Mall commerce,
        <br />
        reimagined for India
      </>
    ),
    subtext: 'Unified inventory, in-store POS, and endless aisle — all on one platform.',
    actions: <Button label="Book a demo" variant="primary" showChevron />,
    image: {
      src: 'https://cdn.prod.website-files.com/67a9c8e5f2c74ac8c2c9b88b/69f0875898f3908738e09f17_Hero%20copy.avif',
      mobileSrc: 'https://cdn.prod.website-files.com/67a9c8e5f2c74ac8c2c9b88b/69f087af1bf1ddf0b683f818_Center%20copy.png',
      alt: 'Mall commerce — Fynd platform',
      objectFit: 'cover',
    },
    bg: '#eeeeee',
    onDarkBg: false,
  },
};

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

/**
 * HeroFullBleed defaults its image to `loading="eager"` (it's above the fold).
 * For the rare below-fold placement, pass `imageLoading="lazy"`. This stacks
 * 20 image heroes with the lazy override so only those near the viewport
 * request immediately — scroll and watch the rest load in the Network panel.
 */
export const LazyGrid: Story = {
  name: 'Lazy-loaded grid of 20 items',
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {Array.from({ length: 20 }, (_, i) => (
        <HeroFullBleed
          key={i}
          title={<>Lazy hero {i + 1}</>}
          subtext="Rendered below the fold with the lazy image override."
          imageLoading="lazy"
          image={{
            src: `https://picsum.photos/seed/fds-hero-${i}/1200/600`,
            alt: `Lazy hero ${i + 1}`,
            objectFit: 'cover',
          }}
          bg="#eeeeee"
        />
      ))}
    </div>
  ),
};
