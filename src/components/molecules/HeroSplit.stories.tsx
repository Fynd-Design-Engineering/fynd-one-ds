import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { HeroSplit } from './HeroSplit';
import { Button } from '../atoms/Button';

const SAMPLE_IMAGE = {
  src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=900&fit=crop',
  alt: 'Hyperlocal commerce illustration',
  width: 1200,
  height: 900,
};

const meta: Meta<typeof HeroSplit> = {
  title: 'Molecules/HeroSplit',
  component: HeroSplit,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onDarkBg: { control: 'boolean' },
    imagePriority: { control: 'boolean' },
    bg: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSplit>;

export const Default: Story = {
  args: {
    title: (
      <>
        Launch a hyperlocal website in 30 minutes &amp; grow your local presence
      </>
    ),
    description: 'Delight your customers with same-day deliveries.',
    bullets: [
      'Build an attractive website',
      'Automate order management',
      'Run promotions across channels',
    ],
    actions: (
      <>
        <Button label="Get started" variant="primary" showChevron />
        <Button label="Book a demo" variant="secondary" />
      </>
    ),
    image: SAMPLE_IMAGE,
    bg: 'var(--fds-blue-20, #e7eefe)',
  },
};

export const WithoutBullets: Story = {
  args: {
    title: 'Launch a hyperlocal website in 30 minutes',
    description:
      'Delight your customers with same-day deliveries and a unified storefront.',
    actions: (
      <>
        <Button label="Get started" variant="primary" showChevron />
        <Button label="Book a demo" variant="secondary" />
      </>
    ),
    image: SAMPLE_IMAGE,
    bg: 'var(--fds-peach-20, #fde7d8)',
  },
};

export const WithoutActions: Story = {
  args: {
    title: 'Launch a hyperlocal website in 30 minutes',
    description: 'Delight your customers with same-day deliveries.',
    bullets: [
      'Build an attractive website',
      'Automate order management',
      'Run promotions across channels',
    ],
    image: SAMPLE_IMAGE,
    bg: 'var(--fds-green-20, #d8f1de)',
  },
};

export const TitleOnly: Story = {
  name: 'Title + image only',
  args: {
    title: 'AI-driven commerce for modern businesses',
    image: SAMPLE_IMAGE,
    bg: 'var(--fds-grey-20, #f2f2f2)',
  },
};

export const OnDarkBackground: Story = {
  args: {
    title: 'Build your commerce on a unified platform',
    description: 'Storefront, OMS, and POS — one stack, everywhere you sell.',
    bullets: [
      'Composable architecture',
      'Real-time inventory',
      'Built-in analytics',
    ],
    actions: (
      <>
        <Button label="Get started" variant="primary" showChevron onDarkBg />
        <Button label="Book a demo" variant="secondary" onDarkBg />
      </>
    ),
    image: SAMPLE_IMAGE,
    onDarkBg: true,
    bg: '#1f2530',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#101319', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};
