import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { BentoGrid } from './BentoGrid';
import { ContentCard } from '../molecules/ContentCard';

const Placeholder = ({ label }: { label: string }) => (
  <div style={{
    width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#e3e3e3', fontFamily: "'Inter', sans-serif",
    fontSize: 14, color: '#5b5c5d', fontWeight: 500,
  }}>
    {label}
  </div>
);

const meta: Meta<typeof BentoGrid> = {
  title: 'Layout/BentoGrid',
  component: BentoGrid,
  argTypes: {
    gap: { control: 'number' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1272 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof BentoGrid>;

export const TwoCards: Story = {
  args: {
    ratios: ['5:4', '3:2'],
    children: [
      <Placeholder key="1" label="5:4" />,
      <Placeholder key="2" label="3:2" />,
    ],
  },
};

export const FourCardsAlternating: Story = {
  args: {
    ratios: ['5:4', '3:2', '3:2', '5:4'],
    children: [
      <Placeholder key="1" label="5:4" />,
      <Placeholder key="2" label="3:2" />,
      <Placeholder key="3" label="3:2" />,
      <Placeholder key="4" label="5:4" />,
    ],
  },
};

export const WithTallCards: Story = {
  args: {
    ratios: ['3:4', '5:4', '5:4', '3:4'],
    children: [
      <Placeholder key="1" label="3:4 (tall)" />,
      <Placeholder key="2" label="5:4" />,
      <Placeholder key="3" label="5:4" />,
      <Placeholder key="4" label="3:4 (tall)" />,
    ],
  },
};

export const FiveWithWide: Story = {
  args: {
    ratios: ['5:4', '3:2', '3:2', '5:4', 'wide'],
    children: [
      <Placeholder key="1" label="5:4" />,
      <Placeholder key="2" label="3:2" />,
      <Placeholder key="3" label="3:2" />,
      <Placeholder key="4" label="5:4" />,
      <Placeholder key="5" label="Wide" />,
    ],
  },
};

export const MixedRatios: Story = {
  args: {
    ratios: ['3:4', '3:2', '5:4', '3:4', 'wide', 'wide'],
    children: [
      <Placeholder key="1" label="3:4" />,
      <Placeholder key="2" label="3:2" />,
      <Placeholder key="3" label="5:4" />,
      <Placeholder key="4" label="3:4" />,
      <Placeholder key="5" label="Wide 1" />,
      <Placeholder key="6" label="Wide 2" />,
    ],
  },
};

export const WithContentCards: Story = {
  render: () => (
    <BentoGrid ratios={['5:4', '3:2', '3:2', '5:4']}>
      <ContentCard
        chipLabel="Platform"
        title="Unified commerce"
        subtext="Everything in one place"
        imagePosition="behind"
        imageSrc="https://placehold.co/626x500/a0a1a2/ffffff?text=5:4"
        clickable
      />
      <ContentCard
        chipLabel="Growth"
        title="Scale fast"
        imagePosition="behind"
        imageSrc="https://placehold.co/626x417/5c98f7/ffffff?text=3:2"
        clickable
      />
      <ContentCard
        chipLabel="Analytics"
        title="Data driven"
        imagePosition="behind"
        imageSrc="https://placehold.co/626x417/80d99f/ffffff?text=3:2"
        clickable
      />
      <ContentCard
        chipLabel="Integrations"
        title="Connect everything"
        imagePosition="behind"
        imageSrc="https://placehold.co/626x500/eeb384/ffffff?text=5:4"
        clickable
      />
    </BentoGrid>
  ),
};
