import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RichIconCard } from './RichIconCard';

const PlaceholderIcon = () => (
  <div style={{ width: 32, height: 32, backgroundColor: '#d9d9d9', borderRadius: 4 }} />
);

const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="4" fill="#5c98f7" />
    <path d="M16 8L18.47 13.86L24.5 14.41L20 17.97L21.18 24.5L16 21.09L10.82 24.5L12 17.97L7.5 14.41L13.53 13.86L16 8Z" fill="white" />
  </svg>
);

const meta: Meta<typeof RichIconCard> = {
  title: 'Molecules/RichIconCard',
  component: RichIconCard,
  argTypes: {
    showButton: { control: 'boolean' },
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RichIconCard>;

export const Default: Story = {
  args: {
    icon: <PlaceholderIcon />,
    title: 'Title text goes here',
    subtext:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.',
    buttonLabel: 'Button',
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: <StarIcon />,
    title: 'Feature highlight',
    subtext: 'A brief description of the feature and its benefits for the user.',
    buttonLabel: 'Learn more',
  },
};

export const WithoutButton: Story = {
  args: {
    icon: <PlaceholderIcon />,
    title: 'No button variant',
    subtext: 'This card has the button hidden via showButton={false}.',
    showButton: false,
  },
};

export const WithoutSubtext: Story = {
  args: {
    icon: <PlaceholderIcon />,
    title: 'Title only — no subtext',
    buttonLabel: 'Button',
  },
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1272 }}>
      <RichIconCard
        icon={<StarIcon />}
        title="Unified platform"
        subtext="Manage your entire commerce stack from a single dashboard."
        buttonLabel="Explore"
      />
      <RichIconCard
        icon={<StarIcon />}
        title="Scalable infrastructure"
        subtext="Built to handle millions of transactions without breaking a sweat."
        buttonLabel="Learn more"
      />
      <RichIconCard
        icon={<StarIcon />}
        title="Developer friendly"
        subtext="Comprehensive APIs, SDKs, and documentation for rapid integration."
        buttonLabel="Get started"
      />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#0e0e0e', padding: 32 }}>
      <RichIconCard
        icon={<StarIcon />}
        title="Dark mode card"
        subtext="Card adapts for dark surfaces with inverted colors."
        buttonLabel="Button"
        onDarkBg
      />
    </div>
  ),
};
