import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ContentCard } from './ContentCard';
import { IcAiStar } from '../../icons';

const meta: Meta<typeof ContentCard> = {
  title: 'Cards/ContentCard',
  component: ContentCard,
  argTypes: {
    imagePosition: { control: 'select', options: ['above', 'below', 'behind', 'bottom-right'] },
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
    imageHoverSrc: 'https://placehold.co/300x300/797a7c/ffffff?text=Hover',
    clickable: true,
    alwaysShowArrow: true,
  },
  decorators: [(Story) => <div style={{ width: 626 }}><Story /></div>],
};

export const ImageBelowWithHover: Story = {
  name: 'Image Below — with hover swap',
  args: {
    chipLabel: 'Solutions',
    title: 'D2C website',
    subtext: 'Customized, high-performance websites for modern brands.',
    imagePosition: 'below',
    imageSrc: 'https://placehold.co/600x400/a0a1a2/ffffff?text=Default',
    imageHoverSrc: 'https://placehold.co/600x400/3b82f6/ffffff?text=Hover',
    imageHoverAlt: 'Animated preview of the D2C website',
  },
  decorators: [(Story) => <div style={{ width: 400, height: 500 }}><Story /></div>],
};

export const ImageBelowWithoutHover: Story = {
  name: 'Image Below — single image (control)',
  args: {
    chipLabel: 'Solutions',
    title: 'D2C website',
    subtext: 'Customized, high-performance websites for modern brands.',
    imagePosition: 'below',
    imageSrc: 'https://placehold.co/600x400/a0a1a2/ffffff?text=Default',
  },
  decorators: [(Story) => <div style={{ width: 400, height: 500 }}><Story /></div>],
};

export const ImageBehindWithHover: Story = {
  name: 'Image Behind — with hover swap',
  args: {
    chipLabel: 'Hero',
    title: 'Sold worldwide',
    subtext: 'Reach customers across 50+ countries.',
    imagePosition: 'behind',
    imageSrc: 'https://placehold.co/600x400/606060/ffffff?text=Default',
    imageHoverSrc: 'https://placehold.co/600x400/0e7490/ffffff?text=Hover',
  },
  decorators: [(Story) => <div style={{ width: 400, height: 320 }}><Story /></div>],
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

export const ImageAbove: Story = {
  name: 'Image above (audience cards)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1200 }}>
      <ContentCard
        imagePosition="above"
        title="Emerging Business"
        subtext="Launch your business and get a head start to success"
        imageSrc="https://placehold.co/520x340/d2d2d2/4a4b4c?text=Emerging+Business"
        imageAlt="Emerging Business"
        showButton={false}
      />
      <ContentCard
        imagePosition="above"
        title="Mid-market & Enterprise"
        subtext="Tailored retail solutions for ambitious businesses ready to scale"
        imageSrc="https://placehold.co/520x340/d2d2d2/4a4b4c?text=Mid-market+%26+Enterprise"
        imageAlt="Mid-market and Enterprise"
        showButton={false}
      />
      <ContentCard
        imagePosition="above"
        title="Partners"
        subtext="Offer your services and empower retailers around the world"
        imageSrc="https://placehold.co/520x340/d2d2d2/4a4b4c?text=Partners"
        imageAlt="Partners"
        showButton={false}
      />
    </div>
  ),
};

export const ImageAboveWithBullets: Story = {
  name: 'Image above — tinted panel + bullets',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 900 }}>
      <ContentCard
        imagePosition="above"
        chipLabel="Without"
        chipPosition="floating"
        title="Without 3D, AR, & VR Shopping"
        imageSrc="https://placehold.co/520x340/f9c8d0/c0546a?text=Preview"
        imageAlt="Without 3D AR VR preview"
        imageBg="#fce8ec"
        showButton={false}
        showSubtext={false}
        bullets={[
          { label: 'Customers hesitate to buy due to uncertainty' },
          { label: 'High return rates from incorrect product expectations' },
          { label: 'Limited engagement and lower session times' },
        ]}
      />
      <ContentCard
        imagePosition="above"
        chipLabel="With"
        chipPosition="floating"
        title="With 3D, AR, & VR Shopping"
        imageSrc="https://placehold.co/520x340/c8e6c9/2e7d32?text=Preview"
        imageAlt="With 3D AR VR preview"
        imageBg="#e8f5e9"
        showButton={false}
        showSubtext={false}
        bullets={[
          { label: 'Shoppers buy with confidence knowing exactly what they get' },
          { label: 'Fewer returns thanks to accurate product visualisation' },
          { label: 'Higher session depth and conversion rates' },
        ]}
      />
    </div>
  ),
};

export const LabelOnlyChip: Story = {
  name: 'Chip — label only, floating (comparison card)',
  args: {
    imagePosition: 'above',
    chipLabel: 'Before',
    chipPosition: 'floating',
    chipShowDot: false,
    imageBg: '#fce8ec',
    imageSrc: 'https://placehold.co/520x340/f9c8d0/c0546a?text=Before',
    title: 'Without the feature',
    subtext: 'No dot, no icon — clean label badge overlaying the image.',
    showButton: false,
  },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const IconChip: Story = {
  name: 'Chip — icon + label, inline',
  args: {
    chipLabel: 'New',
    chipPosition: 'inline',
    chipIcon: <IcAiStar />,
    chipShowDot: false,
    title: 'AI-powered feature',
    subtext: 'Icon renders to the left of the label inside the chip.',
    imagePosition: 'below',
    imageSrc: 'https://placehold.co/600x400/d2d2d2/4a4b4c?text=Feature',
    showButton: false,
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};

export const FilledChipVariant: Story = {
  name: 'Chip — filled variant',
  args: {
    chipLabel: 'Featured',
    chipVariant: 'filled',
    chipShowDot: false,
    title: 'Featured card',
    subtext: 'Chip rendered with the filled variant.',
    imagePosition: 'below',
    imageSrc: 'https://placehold.co/600x400/d2d2d2/4a4b4c?text=Featured',
    showButton: false,
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};
