import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Stepper>;

const steps = [
  { title: 'Create your account', subtext: 'Sign up with your work email and set a secure password.' },
  { title: 'Set up your store', subtext: 'Add your brand assets, configure payments, and choose a theme.' },
  { title: 'Launch and grow', subtext: 'Go live, connect marketing channels, and track performance.' },
  { title: 'Scale with confidence', subtext: 'Use analytics and automation to grow without limits.' },
];

const BoxIcon = ({ color = '#a0a1a2' }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4" fill={color} />
  </svg>
);

const nodeSteps = [
  { title: 'Create your account', subtext: 'Sign up with your work email and set a secure password.', icon: <BoxIcon color="#5c98f7" /> },
  { title: 'Set up your store', subtext: 'Add your brand assets, configure payments, and choose a theme.', icon: <BoxIcon color="#9F80F8" /> },
  { title: 'Launch and grow', subtext: 'Go live, connect marketing channels, and track performance.', icon: <BoxIcon color="#54b77e" /> },
  { title: 'Scale with confidence', subtext: 'Use analytics and automation to grow without limits.', icon: <BoxIcon color="#f4a84a" /> },
];

export const DotTrail: Story = {
  args: {
    items: steps,
    variant: 'DotTrail',
    activeIndex: 0,
  },
};

export const DotTrailActive: Story = {
  name: 'DotTrail — activeIndex 2',
  args: {
    items: steps,
    variant: 'DotTrail',
    activeIndex: 2,
  },
};

export const NodeLink: Story = {
  args: {
    items: nodeSteps,
    variant: 'NodeLink',
    activeIndex: 1,
  },
};

export const NodeSolo: Story = {
  args: {
    items: nodeSteps,
    variant: 'NodeSolo',
    activeIndex: 1,
  },
};

export const CountFlow: Story = {
  args: {
    items: steps,
    variant: 'CountFlow',
    activeIndex: 1,
  },
};

export const AnimatedDotTrail: Story = {
  name: 'Animated — DotTrail',
  args: {
    items: steps,
    variant: 'DotTrail',
    animated: true,
    stepDuration: 2500,
  },
};

export const AnimatedCountFlow: Story = {
  name: 'Animated — CountFlow',
  args: {
    items: steps,
    variant: 'CountFlow',
    animated: true,
    stepDuration: 2500,
  },
};

export const OnDarkBackground: Story = {
  args: {
    items: steps,
    variant: 'CountFlow',
    activeIndex: 1,
    onDarkBg: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#101319', padding: '40px', borderRadius: '16px' }}>
        <Story />
      </div>
    ),
  ],
};

export const OnDarkAnimated: Story = {
  name: 'Animated — DotTrail on dark',
  args: {
    items: steps,
    variant: 'DotTrail',
    animated: true,
    stepDuration: 2500,
    onDarkBg: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#101319', padding: '40px', borderRadius: '16px' }}>
        <Story />
      </div>
    ),
  ],
};
