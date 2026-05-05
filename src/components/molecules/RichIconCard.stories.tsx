import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { RichIconCard } from './RichIconCard';
import { Button } from '../atoms/Button';

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

export const ClickableLink: Story = {
  name: 'Clickable — link overlay (href)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1272 }}>
      <RichIconCard
        icon={<StarIcon />}
        title="Unified platform"
        subtext="Manage your entire commerce stack from a single dashboard."
        buttonLabel="Explore"
        href="/solutions/platform"
      />
      <RichIconCard
        icon={<StarIcon />}
        title="Scalable infrastructure"
        subtext="Built to handle millions of transactions without breaking a sweat."
        buttonLabel="Learn more"
        href="/solutions/infrastructure"
      />
      <RichIconCard
        icon={<StarIcon />}
        title="Developer friendly"
        subtext="Comprehensive APIs, SDKs, and documentation for rapid integration."
        showButton={false}
        href="/solutions/developers"
      />
    </div>
  ),
};

export const ClickableButton: Story = {
  name: 'Clickable — button overlay (onClick)',
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <RichIconCard
        icon={<StarIcon />}
        title="Open modal on click"
        subtext="The entire card surface is a button. The footer button below is independently clickable."
        buttonLabel="Learn more"
        onClick={() => alert('Card clicked')}
        onButtonClick={(e) => { e.stopPropagation(); alert('Footer button clicked'); }}
      />
    </div>
  ),
};

export const Link: Story = {
  name: 'Link — hover-reveal corner arrow',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1272 }}>
      <RichIconCard
        icon={<StarIcon />}
        href="/solutions/b2b-commerce"
        title="B2B platforms"
        subtext="Manage bulk orders, pricing tiers and vendor relationships with ease."
        showButton={false}
        showArrow
      />
      <RichIconCard
        icon={<StarIcon />}
        href="/solutions/storefronts"
        title="Storefronts"
        subtext="Build high-performance storefronts with full design freedom."
        showButton={false}
        showArrow
      />
      <RichIconCard
        icon={<StarIcon />}
        href="/solutions/marketplace"
        title="Marketplace"
        subtext="Launch and scale a multi-vendor marketplace in weeks."
        showButton={false}
        showArrow
      />
    </div>
  ),
};

export const LinkAlwaysArrow: Story = {
  name: 'Link — always-visible corner arrow',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1272 }}>
      <RichIconCard
        icon={<StarIcon />}
        href="/solutions/b2b-commerce"
        title="B2B platforms"
        subtext="Manage bulk orders, pricing tiers and vendor relationships with ease."
        showButton={false}
        alwaysShowArrow
      />
      <RichIconCard
        icon={<StarIcon />}
        href="/solutions/storefronts"
        title="Storefronts"
        subtext="Build high-performance storefronts with full design freedom."
        showButton={false}
        alwaysShowArrow
      />
      <RichIconCard
        icon={<StarIcon />}
        href="/solutions/marketplace"
        title="Marketplace"
        subtext="Launch and scale a multi-vendor marketplace in weeks."
        showButton={false}
        alwaysShowArrow
      />
    </div>
  ),
};

export const LinkOnDark: Story = {
  name: 'Link — corner arrow on dark surface',
  render: () => (
    <div style={{ background: '#101319', padding: 32 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1272 }}>
        <RichIconCard
          icon={<StarIcon />}
          href="/solutions/b2b-commerce"
          title="B2B platforms"
          subtext="Manage bulk orders, pricing tiers and vendor relationships with ease."
          showButton={false}
          showArrow
          onDarkBg
        />
        <RichIconCard
          icon={<StarIcon />}
          href="/solutions/storefronts"
          title="Storefronts"
          subtext="Build high-performance storefronts with full design freedom."
          showButton={false}
          alwaysShowArrow
          onDarkBg
        />
        <RichIconCard
          icon={<StarIcon />}
          href="/solutions/marketplace"
          title="Marketplace"
          subtext="Launch and scale a multi-vendor marketplace in weeks."
          showButton={false}
          alwaysShowArrow
          onDarkBg
        />
      </div>
    </div>
  ),
};

export const NoIconWithActions: Story = {
  name: 'No icon + actions slot (two buttons)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1200 }}>
      <RichIconCard
        title="Store OS"
        subtext="The ultimate retail store management platform"
        actions={
          <>
            <Button label="Button" variant="secondary" />
            <Button label="Learn more" variant="primary" />
          </>
        }
      />
      <RichIconCard
        title="Commerce APIs"
        subtext="Fully headless and composable API suite for seamless integrations"
        actions={
          <>
            <Button label="Button" variant="secondary" />
            <Button label="Learn more" variant="primary" />
          </>
        }
      />
      <RichIconCard
        title="Storefronts"
        subtext="Build your own digital storefronts"
        actions={
          <>
            <Button label="Button" variant="secondary" />
            <Button label="Learn more" variant="primary" />
          </>
        }
      />
    </div>
  ),
};
