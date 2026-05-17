import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { InteractiveAccordion } from './InteractiveAccordion';

const SAMPLE_MEDIA_IMG =
  'https://cdn.prod.website-files.com/67a9c8e5f2c74ac8c2c9b88b/694399f6e28097a33484d3f4_Website-builder.avif';
const SAMPLE_ITEMS = [
  {
    question: 'No-code website builder',
    answer:
      'Drag-and-drop your way to a polished storefront — no engineering required.',
    media: {
      type: 'image' as const,
      src: SAMPLE_MEDIA_IMG,
      alt: 'No-code website builder UI',
    },
  },
  {
    question: 'Payment gateway integration',
    answer:
      'Plug into 100+ payment gateways with one toggle. Reconcile automatically.',
    media: {
      type: 'image' as const,
      src: SAMPLE_MEDIA_IMG,
      alt: 'Payment integrations',
    },
  },
  {
    question: 'Logistics and shipping',
    answer:
      'Manage and fulfill orders effortlessly with Fynd’s integrated delivery partners.',
    media: {
      type: 'image' as const,
      src: SAMPLE_MEDIA_IMG,
      alt: 'Delivery partner network',
    },
  },
  {
    question: 'Easy integrations',
    answer: 'Connect to your CRM, ERP, ESP, and analytics in minutes.',
    media: {
      type: 'image' as const,
      src: SAMPLE_MEDIA_IMG,
      alt: 'Integrations directory',
    },
  },
  {
    question: 'Mobile-optimised design',
    answer: 'Every storefront ships responsive by default — pixel-perfect from 320px up.',
    media: {
      type: 'image' as const,
      src: SAMPLE_MEDIA_IMG,
      alt: 'Mobile storefront',
    },
  },
  {
    question: 'AI-powered section builder',
    answer:
      'Describe what you want; the AI lays out a section that matches your brand tokens.',
    media: {
      type: 'image' as const,
      src: SAMPLE_MEDIA_IMG,
      alt: 'AI section builder',
    },
  },
  {
    question: 'Manage returns and refunds',
    answer:
      'Customers self-serve returns; you approve, refund, and restock from one inbox.',
    media: {
      type: 'image' as const,
      src: SAMPLE_MEDIA_IMG,
      alt: 'Returns workflow',
    },
  },
];

const meta: Meta<typeof InteractiveAccordion> = {
  title: 'Content/InteractiveAccordion',
  component: InteractiveAccordion,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    mediaSide: { control: 'inline-radio', options: ['left', 'right'] },
    aspectRatio: { control: 'select', options: ['portrait', '5:4', '1:1', '16:9'] },
    onDarkBg: { control: 'boolean' },
    shadow: { control: 'boolean' },
    mediaBg: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof InteractiveAccordion>;

const Frame: React.FC<{ children: React.ReactNode; bg?: string }> = ({
  children,
  bg = '#ffffff',
}) => (
  <div style={{ background: bg, padding: '40px 24px' }}>{children}</div>
);

export const OnWhiteBg: Story = {
  name: 'White page bg (with shadow)',
  render: (args) => (
    <Frame bg="#ffffff">
      <InteractiveAccordion {...args} />
    </Frame>
  ),
  args: {
    items: SAMPLE_ITEMS,
    mediaBg: 'var(--fds-blue-20, #e7eefe)',
  },
};

export const OnGrayBg: Story = {
  name: 'Gray page bg (shadow off)',
  render: (args) => (
    <Frame bg="var(--fds-neutral-10, #f8f8f9)">
      <InteractiveAccordion {...args} />
    </Frame>
  ),
  args: {
    items: SAMPLE_ITEMS,
    mediaBg: 'var(--fds-blue-20, #e7eefe)',
    shadow: false,
  },
};

export const MediaOnLeft: Story = {
  render: (args) => (
    <Frame>
      <InteractiveAccordion {...args} />
    </Frame>
  ),
  args: {
    items: SAMPLE_ITEMS,
    mediaSide: 'left',
    mediaBg: 'var(--fds-peach-20, #fde7d8)',
  },
};

export const WithVideo: Story = {
  render: (args) => (
    <Frame>
      <InteractiveAccordion {...args} />
    </Frame>
  ),
  args: {
    items: SAMPLE_ITEMS.slice(0, 4).map((item) => ({
      ...item,
      media: {
        type: 'video' as const,
        src: 'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/Storefront_animations/1._no_code_builder.mp4',
      },
    })),
    mediaBg: 'var(--fds-grey-20, #f2f2f2)',
  },
};

export const OnDarkBackground: Story = {
  render: (args) => (
    <Frame bg="#101319">
      <InteractiveAccordion {...args} />
    </Frame>
  ),
  args: {
    items: SAMPLE_ITEMS,
    onDarkBg: true,
    mediaBg: '#1f2530',
  },
};

export const EdgeBleed: Story = {
  name: 'Edge bleed (media touches viewport)',
  render: (args) => (
    /* Simulates being inside a SectionWrapper — sets --fds-section-px so the
       negative-margin bleed has the right amount to negate. */
    <div
      style={{
        background: 'var(--fds-neutral-10, #f8f8f9)',
        padding: '4rem 2.5rem',
        '--fds-section-px': '2.5rem',
      } as React.CSSProperties}
    >
      <InteractiveAccordion {...args} />
    </div>
  ),
  args: {
    items: SAMPLE_ITEMS,
    mediaSide: 'right',
    mediaBg: 'var(--fds-blue-20, #e7eefe)',
    edgeBleed: true,
    shadow: false,
  },
};

export const EdgeBleedMediaLeft: Story = {
  name: 'Edge bleed — media left',
  render: (args) => (
    <div
      style={{
        background: 'var(--fds-neutral-10, #f8f8f9)',
        padding: '4rem 2.5rem',
        '--fds-section-px': '2.5rem',
      } as React.CSSProperties}
    >
      <InteractiveAccordion {...args} />
    </div>
  ),
  args: {
    items: SAMPLE_ITEMS,
    mediaSide: 'left',
    mediaBg: 'var(--fds-peach-20, #fde7d8)',
    edgeBleed: true,
    shadow: false,
  },
};
