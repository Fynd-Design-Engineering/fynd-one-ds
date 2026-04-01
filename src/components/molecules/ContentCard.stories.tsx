import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ContentCard } from './ContentCard';

const meta: Meta<typeof ContentCard> = {
  title: 'Molecules/ContentCard',
  component: ContentCard,
  argTypes: {
    imagePosition: { control: 'select', options: ['below', 'behind', 'bottom-right'] },
    size: { control: 'select', options: ['lg', 'md', 'sm'] },
    onDarkBg: { control: 'boolean' },
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
  decorators: [(Story) => <div style={{ width: 626, height: 500 }}><Story /></div>],
};

export const Dark: Story = {
  args: {
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    buttonLabel: 'Button',
    imagePosition: 'below',
    onDarkBg: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#101319', padding: 40, width: 626 }}>
        <Story />
      </div>
    ),
  ],
};

export const DarkBottomRight: Story = {
  args: {
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    imagePosition: 'bottom-right',
    imageSrc: 'https://placehold.co/300x300/a0a1a2/ffffff?text=Product',
    clickable: true,
    alwaysShowArrow: true,
    onDarkBg: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#101319', padding: 40, width: 626 }}>
        <Story />
      </div>
    ),
  ],
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
  decorators: [(Story) => <div style={{ width: 626, height: 500 }}><Story /></div>],
};

export const ImageBottomRight: Story = {
  args: {
    chipLabel: 'Label Text',
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    imagePosition: 'bottom-right',
    imageSrc: 'https://placehold.co/300x300/a0a1a2/ffffff?text=Product',
    hoverImageSrc: 'https://placehold.co/300x300/797a7c/ffffff?text=Hover',
    clickable: true,
    alwaysShowArrow: true,
  },
  decorators: [(Story) => <div style={{ width: 626 }}><Story /></div>],
};

export const Tablet: Story = {
  args: {
    chipLabel: 'Label Text',
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    buttonLabel: 'Button',
    size: 'md',
    imagePosition: 'below',
  },
  decorators: [(Story) => <div style={{ width: 377 }}><Story /></div>],
};

export const Mobile: Story = {
  args: {
    chipLabel: 'Label Text',
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    size: 'sm',
    imagePosition: 'behind',
    clickable: true,
    imageSrc: 'https://placehold.co/272x362/a0a1a2/ffffff?text=BG',
  },
  decorators: [(Story) => <div style={{ width: 272, height: 362 }}><Story /></div>],
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
          size="md"
          imagePosition="below"
        />
      </div>
      <div style={{ width: 272, height: 362 }}>
        <ContentCard
          chipLabel="Mobile"
          title="Text goes here"
          subtext="Subtext goes here"
          size="sm"
          imagePosition="behind"
          clickable
          imageSrc="https://placehold.co/272x362/a0a1a2/ffffff?text=BG"
        />
      </div>
    </div>
  ),
};
