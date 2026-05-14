import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { VideoFullBleed } from './VideoFullBleed';
import { Text } from '../Typography/Text';
import { Button } from '../atoms/Button';
import { Chip } from '../atoms/Chip';

const meta: Meta<typeof VideoFullBleed> = {
  title: 'Content/VideoFullBleed',
  component: VideoFullBleed,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onDarkBg: { control: 'boolean' },
    bg: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof VideoFullBleed>;

export const Default: Story = {
  args: {
    bg: '#101319',
    onDarkBg: true,
    video: {
      src: 'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/uk/hero_uk_full_desktop_fullscale.mp4',
      mobileSrc: 'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/uk/hero_uk_Mobile_optimised_crop.mp4',
      objectFit: 'cover',
    },
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Chip label="Platform" variant="anchor" onDarkBg />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Text variant="heading-l" as="h2" color="white">
            One platform for your entire retail operation
          </Text>
          <Text variant="body-l" as="p" color="white">
            Storefront, OMS, POS, and marketplace — all connected, all in sync.
          </Text>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button label="Book a demo" variant="primary" showChevron onDarkBg />
          <Button label="Learn more" variant="secondary" onDarkBg />
        </div>
      </div>
    ),
  },
};

export const LightBg: Story = {
  args: {
    bg: '#f2f2f2',
    onDarkBg: false,
    video: {
      src: 'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/uk/hero_uk_full_desktop_fullscale.mp4',
      objectFit: 'cover',
    },
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Text variant="heading-l" as="h2">
            Built for modern retail teams
          </Text>
          <Text variant="body-l" as="p" color="secondary">
            Everything you need to run, manage, and grow your business.
          </Text>
        </div>
        <Button label="Get started" variant="primary" showChevron />
      </div>
    ),
  },
};

export const NoVideo: Story = {
  args: {
    bg: '#1a1a2e',
    onDarkBg: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Text variant="heading-l" as="h2" color="white">
          No video — content only
        </Text>
        <Text variant="body-l" as="p" color="white">
          VideoFullBleed without a video prop renders as a plain colored section.
        </Text>
      </div>
    ),
  },
};
