import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ContentCard } from './ContentCard';

const meta: Meta<typeof ContentCard> = {
  title: 'Molecules/ContentCard',
  component: ContentCard,
  argTypes: {
    imagePosition: { control: 'select', options: ['below', 'behind'] },
    breakpoint: { control: 'select', options: ['lg', 'md', 'sm'] },
    showChip: { control: 'boolean' },
    showSubtext: { control: 'boolean' },
    showButton: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ContentCard>;

export const ImageBelow: Story = {
  args: {
    chipLabel: 'Label Text',
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    buttonLabel: 'Button',
    imagePosition: 'below',
  },
  decorators: [(Story) => <div style={{ width: 626 }}><Story /></div>],
};

export const ImageBehind: Story = {
  args: {
    chipLabel: 'Label Text',
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    buttonLabel: 'Button',
    imagePosition: 'behind',
    imageSrc: 'https://placehold.co/626x626/a0a1a2/ffffff?text=Background',
  },
  decorators: [(Story) => <div style={{ width: 626 }}><Story /></div>],
};

export const Clickable: Story = {
  args: {
    chipLabel: 'Label Text',
    title: 'Hover to see arrow',
    subtext: 'This card is clickable with a diagonal arrow on hover',
    imagePosition: 'behind',
    imageSrc: 'https://placehold.co/626x626/a0a1a2/ffffff?text=Background',
    clickable: true,
    showButton: false,
  },
  decorators: [(Story) => <div style={{ width: 626 }}><Story /></div>],
};

export const Tablet: Story = {
  args: {
    chipLabel: 'Label Text',
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    buttonLabel: 'Button',
    breakpoint: 'md',
    imagePosition: 'below',
  },
  decorators: [(Story) => <div style={{ width: 377 }}><Story /></div>],
};

export const Mobile: Story = {
  args: {
    chipLabel: 'Label Text',
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    breakpoint: 'sm',
    imagePosition: 'behind',
    clickable: true,
    imageSrc: 'https://placehold.co/272x362/a0a1a2/ffffff?text=BG',
  },
  decorators: [(Story) => <div style={{ width: 272 }}><Story /></div>],
};

export const AllBreakpoints: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ width: 626 }}>
        <ContentCard
          chipLabel="Desktop"
          title="Text goes here"
          subtext="Subtext goes here"
          buttonLabel="Button"
          imagePosition="below"
        />
      </div>
      <div style={{ width: 377 }}>
        <ContentCard
          chipLabel="Tablet"
          title="Text goes here"
          subtext="Subtext goes here"
          buttonLabel="Button"
          breakpoint="md"
          imagePosition="below"
        />
      </div>
      <div style={{ width: 272 }}>
        <ContentCard
          chipLabel="Mobile"
          title="Text goes here"
          subtext="Subtext goes here"
          breakpoint="sm"
          imagePosition="behind"
          clickable
          imageSrc="https://placehold.co/272x362/a0a1a2/ffffff?text=BG"
        />
      </div>
    </div>
  ),
};
