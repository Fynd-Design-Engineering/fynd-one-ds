import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ListingCard } from './ListingCard';

const meta: Meta<typeof ListingCard> = {
  title: 'Cards/ListingCard',
  component: ListingCard,
  argTypes: {
    imageAspectRatio: { control: 'select', options: ['5:4', '1:1', '16:9', 'portrait'] },
    breakpoint: { control: 'select', options: ['lg', 'sm'] },
    onDarkBg: { control: 'boolean' },
    showTags: { control: 'boolean' },
    showSubtext: { control: 'boolean' },
    showDate: { control: 'boolean' },
    showReadTime: { control: 'boolean' },
    showButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ListingCard>;

export const Default: Story = {
  args: {
    tags: ['Label text'],
    title: 'Title text goes here upto 2 lines, truncate it after that',
    subtext:
      'Loper ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
    date: '4 FEB, 2025',
    readTime: '5 min read',
    buttonLabel: 'Read story',
  },
};

export const Mobile: Story = {
  args: {
    ...Default.args,
    breakpoint: 'sm',
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    imageSrc: 'https://placehold.co/411x200/e3e3e3/5b5c5d?text=Blog+Cover',
    imageAlt: 'Blog cover',
  },
};

export const WithImageHover: Story = {
  name: 'With hover-swap image',
  args: {
    ...Default.args,
    imageSrc: 'https://placehold.co/411x200/a0a1a2/ffffff?text=Default',
    imageHoverSrc: 'https://placehold.co/411x200/3b82f6/ffffff?text=Hover',
    imageHoverAlt: 'Animated cover preview',
  },
};

export const MultipleTags: Story = {
  args: {
    ...Default.args,
    tags: ['Engineering', 'API', 'Platform'],
  },
};

export const Dark: Story = {
  args: {
    ...Default.args,
    onDarkBg: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#101319', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
};

export const TitleOnly: Story = {
  args: {
    title: 'Minimal card with just a title',
    showTags: false,
    showSubtext: false,
    showDate: false,
    showReadTime: false,
    showButton: false,
  },
};

export const MetaAligned: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1272 }}>
      <ListingCard
        title="Men's Polo Shirts — Autumn / Winter Category Intelligence Report"
        date="MAY 2026"
        showTags={false}
        showReadTime={false}
        showButton={false}
        bordered
        metaAtBottom
      />
      <ListingCard
        title="Women's Denim"
        date="MAY 2026"
        showTags={false}
        showReadTime={false}
        showButton={false}
        bordered
        metaAtBottom
      />
      <ListingCard
        title="Footwear Trends"
        date="MAY 2026"
        showTags={false}
        showReadTime={false}
        showButton={false}
        bordered
        metaAtBottom
      />
    </div>
  ),
};

export const BlogGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1272 }}>
      <ListingCard
        tags={['Engineering', 'API']}
        title="Building scalable commerce APIs with microservices"
        subtext="Learn how we designed our API layer to handle millions of requests per second."
        date="12 MAR, 2025"
        readTime="8 min read"
      />
      <ListingCard
        tags={['Product']}
        title="Introducing the new merchant dashboard"
        subtext="A complete redesign focused on speed, clarity, and actionable insights."
        date="5 MAR, 2025"
        readTime="4 min read"
      />
      <ListingCard
        tags={['Customer Story', 'Growth']}
        title="How Brand X scaled to 10M orders with Fynd"
        subtext="From a single store to nationwide presence in under 18 months."
        date="28 FEB, 2025"
        readTime="6 min read"
      />
    </div>
  ),
};
