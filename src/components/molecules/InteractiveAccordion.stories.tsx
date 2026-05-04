import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { InteractiveAccordion } from './InteractiveAccordion';
import { Section } from '../_shared/Section';

const IMAGE_BASE = 'https://images.unsplash.com/';
const SAMPLE_ITEMS = [
  {
    question: 'No-code website builder',
    answer:
      'Drag-and-drop your way to a polished storefront — no engineering required.',
    media: {
      type: 'image' as const,
      src: `${IMAGE_BASE}photo-1581291518857-4e27b48ff24e?w=1000&h=1000&fit=crop`,
      alt: 'No-code website builder UI',
    },
  },
  {
    question: 'Payment gateway integration',
    answer:
      'Plug into 100+ payment gateways with one toggle. Reconcile automatically.',
    media: {
      type: 'image' as const,
      src: `${IMAGE_BASE}photo-1556741533-411cf82e4e2d?w=1000&h=1000&fit=crop`,
      alt: 'Payment integrations',
    },
  },
  {
    question: 'Logistics and shipping',
    answer:
      'Manage and fulfill orders effortlessly with Fynd’s integrated delivery partners.',
    media: {
      type: 'image' as const,
      src: `${IMAGE_BASE}photo-1586528116311-ad8dd3c8310d?w=1000&h=1000&fit=crop`,
      alt: 'Delivery partner network',
    },
  },
  {
    question: 'Easy integrations',
    answer: 'Connect to your CRM, ERP, ESP, and analytics in minutes.',
    media: {
      type: 'image' as const,
      src: `${IMAGE_BASE}photo-1551434678-e076c223a692?w=1000&h=1000&fit=crop`,
      alt: 'Integrations directory',
    },
  },
  {
    question: 'Mobile-optimised design',
    answer: 'Every storefront ships responsive by default — pixel-perfect from 320px up.',
    media: {
      type: 'image' as const,
      src: `${IMAGE_BASE}photo-1512486130939-2c4f79935e4f?w=1000&h=1000&fit=crop`,
      alt: 'Mobile storefront',
    },
  },
  {
    question: 'AI-powered section builder',
    answer:
      'Describe what you want; the AI lays out a section that matches your brand tokens.',
    media: {
      type: 'image' as const,
      src: `${IMAGE_BASE}photo-1677442136019-21780ecad995?w=1000&h=1000&fit=crop`,
      alt: 'AI section builder',
    },
  },
  {
    question: 'Manage returns and refunds',
    answer:
      'Customers self-serve returns; you approve, refund, and restock from one inbox.',
    media: {
      type: 'image' as const,
      src: `${IMAGE_BASE}photo-1556742111-a301076d9d18?w=1000&h=1000&fit=crop`,
      alt: 'Returns workflow',
    },
  },
];

const meta: Meta<typeof InteractiveAccordion> = {
  title: 'Molecules/InteractiveAccordion',
  component: InteractiveAccordion,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    mediaSide: { control: 'inline-radio', options: ['left', 'right'] },
    onDarkBg: { control: 'boolean' },
    mediaBg: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof InteractiveAccordion>;

export const Default: Story = {
  render: (args) => (
    <Section title="Everything you need to build a storefront" chipLabel="Storefront">
      <InteractiveAccordion {...args} />
    </Section>
  ),
  args: {
    items: SAMPLE_ITEMS,
    mediaBg: 'var(--fds-blue-20, #e7eefe)',
  },
};

export const MediaOnLeft: Story = {
  render: (args) => (
    <Section title="Manage everything in one place" chipLabel="Operations">
      <InteractiveAccordion {...args} />
    </Section>
  ),
  args: {
    items: SAMPLE_ITEMS,
    mediaSide: 'left',
    mediaBg: 'var(--fds-peach-20, #fde7d8)',
  },
};

export const WithVideo: Story = {
  render: (args) => (
    <Section title="See it in action" chipLabel="Storefront">
      <InteractiveAccordion {...args} />
    </Section>
  ),
  args: {
    items: SAMPLE_ITEMS.slice(0, 4).map((item) => ({
      ...item,
      media: {
        type: 'video' as const,
        src: 'https://www.w3schools.com/html/mov_bbb.mp4',
        poster: item.media.src,
      },
    })),
    mediaBg: 'var(--fds-grey-20, #f2f2f2)',
  },
};

export const OnDarkBackground: Story = {
  render: (args) => (
    <Section bg="dark" title="Built for scale" chipLabel="Platform" onDarkBg>
      <InteractiveAccordion {...args} />
    </Section>
  ),
  args: {
    items: SAMPLE_ITEMS,
    onDarkBg: true,
    mediaBg: '#1f2530',
  },
};
