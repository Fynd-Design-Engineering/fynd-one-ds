import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TitleContentPair } from './TitleContentPair';

const meta: Meta<typeof TitleContentPair> = {
  title: 'Atoms/TitleContentPair',
  component: TitleContentPair,
  argTypes: {
    titleSize: { control: 'select', options: ['xxl', 'xl', 'l', 'm'] },
    onDarkBg: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleContentPair>;

export const Default: Story = {
  args: {
    title: 'One Commerce Platform',
    subtext: 'Streamline your entire commerce journey from discovery to delivery.',
    titleSize: 'xl',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <TitleContentPair
        title="Heading XXL"
        subtext="With supporting body text"
        titleSize="xxl"
      />
      <TitleContentPair
        title="Heading XL"
        subtext="With supporting body text"
        titleSize="xl"
      />
      <TitleContentPair
        title="Heading L"
        subtext="With supporting body text"
        titleSize="l"
      />
      <TitleContentPair
        title="Heading M"
        subtext="With supporting body text"
        titleSize="m"
      />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#0e0e0e', padding: 40 }}>
      <TitleContentPair
        title="Dark mode heading"
        subtext="Inverted color scheme for dark backgrounds"
        titleSize="xl"
        onDarkBg
      />
    </div>
  ),
};
