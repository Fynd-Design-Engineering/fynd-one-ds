import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ListingCard } from './ListingCard';

const meta: Meta<typeof ListingCard> = {
  title: 'Molecules/ListingCard',
  component: ListingCard,
  argTypes: {
    imageAspectRatio: { control: 'select', options: ['5:4', '1:1', '16:9', 'portrait'] },
    breakpoint: { control: 'select', options: ['desktop', 'mobile'] },
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
    breakpoint: 'mobile',
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    imageSrc: 'https://placehold.co/411x200/e3e3e3/5b5c5d?text=Blog+Cover',
    imageAlt: 'Blog cover',
  },
};

export const MultipleTags: Story = {
  args: {
    ...Default.args,
    tags: ['Engineering', 'API', 'Platform'],
  },
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
