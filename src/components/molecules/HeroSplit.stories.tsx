import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { HeroSplit } from './HeroSplit';
import { Button } from '../atoms/Button';

const SAMPLE_IMAGE = {
  src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/solutions/storefront/fynd-storefront.avif',
  alt: 'Fynd Storefront',
};

const meta: Meta<typeof HeroSplit> = {
  title: 'Content/HeroSplit',
  component: HeroSplit,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onDarkBg: { control: 'boolean' },
    imagePriority: { control: 'boolean' },
    bg: { control: 'color' },
    visualBg: { control: 'color' },
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
      { label: 'Build an attractive website' },
      { label: 'Automate order management' },
      { label: 'Run promotions across channels' },
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
      { label: 'Build an attractive website' },
      { label: 'Automate order management' },
      { label: 'Run promotions across channels' },
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

export const WithVisualBg: Story = {
  name: 'visualBg only (tinted visual cell, default section bg)',
  args: {
    title: 'Compose your storefront with reusable building blocks',
    description:
      'Drag, drop, and ship — every component pre-wired to your catalog.',
    bullets: [
      { label: 'Theming engine' },
      { label: 'Headless commerce APIs' },
      { label: 'Edge-rendered pages' },
    ],
    actions: (
      <>
        <Button label="Get started" variant="primary" showChevron />
        <Button label="Book a demo" variant="secondary" />
      </>
    ),
    image: SAMPLE_IMAGE,
    visualBg: 'var(--fds-lavender-20, #ece6fa)',
  },
};

export const WithBothBgs: Story = {
  name: 'bg + visualBg (section tint with contrasting visual cell)',
  args: {
    title: 'A unified commerce stack for every channel',
    description: 'Storefront, OMS, POS — one platform, everywhere you sell.',
    bullets: [
      { label: 'Real-time inventory' },
      { label: 'Built-in analytics' },
      { label: 'Composable APIs' },
    ],
    actions: (
      <>
        <Button label="Get started" variant="primary" showChevron />
        <Button label="Book a demo" variant="secondary" />
      </>
    ),
    image: SAMPLE_IMAGE,
    bg: 'var(--fds-blue-20, #e7eefe)',
    visualBg: 'var(--fds-neutral-0, #ffffff)',
  },
};

export const OnDarkBackground: Story = {
  args: {
    title: 'Build your commerce on a unified platform',
    description: 'Storefront, OMS, and POS — one stack, everywhere you sell.',
    bullets: [
      { label: 'Composable architecture' },
      { label: 'Real-time inventory' },
      { label: 'Built-in analytics' },
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

export const WithVideo: Story = {
  name: 'Video in visual cell',
  args: {
    title: 'Build powerful developer experiences with Konnect',
    description: 'APIs, webhooks, and SDKs — everything you need to integrate at scale.',
    bullets: [
      { label: 'Unified API gateway' },
      { label: 'Real-time webhooks' },
      { label: 'OpenAPI-first design' },
    ],
    actions: (
      <>
        <Button label="Explore APIs" variant="primary" showChevron />
        <Button label="Read the docs" variant="secondary" />
      </>
    ),
    video: {
      src: 'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/konnect_dev_portal/_Hero-section-hevc-safari.mp4',
    },
    bg: 'var(--fds-blue-20, #e7eefe)',
  },
};

export const RichBullets: Story = {
  name: 'Bullets with rich content (node field)',
  args: {
    title: 'Composable commerce, with the integrations you already use',
    description:
      'Plug into your existing stack — no rip-and-replace required.',
    bullets: [
      { label: 'Build an attractive website' },
      {
        label: 'Connect to Shopify, Magento, or BigCommerce',
        node: (
          <>
            Connect to <strong>Shopify</strong>, <strong>Magento</strong>, or{' '}
            <strong>BigCommerce</strong>
          </>
        ),
      },
      {
        label: 'Read the integration docs',
        node: (
          <>
            Read the{' '}
            <a
              href="#"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              integration docs
            </a>{' '}
            to get started
          </>
        ),
      },
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
