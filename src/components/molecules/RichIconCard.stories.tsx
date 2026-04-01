import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { RichIconCard } from './RichIconCard';

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2L12.47 7.86L18.5 8.41L14 11.97L15.18 18.5L10 15.09L4.82 18.5L6 11.97L1.5 8.41L7.53 7.86L10 2Z" fill="#5c98f7" />
  </svg>
);

const meta: Meta<typeof RichIconCard> = {
  title: 'Molecules/RichIconCard',
  component: RichIconCard,
  argTypes: {
    iconSize: { control: 'select', options: ['icon-32', 'icon-48', 'logo-64', 'logo-80', 'logo-horizontal'] },
    showButton: { control: 'boolean' },
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RichIconCard>;

export const Default: Story = {
  args: {
    icon: <StarIcon />,
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
    icon: <StarIcon />,
    title: 'No button variant',
    subtext: 'This card has the button hidden via showButton={false}.',
    showButton: false,
  },
};

export const WithoutSubtext: Story = {
  args: {
    icon: <StarIcon />,
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
    <div style={{ background: '#101319', padding: 32 }}>
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
