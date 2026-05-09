import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ContentCard } from './ContentCard';
import { Pointers } from './Pointers';
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
    imageSrc: 'https://picsum.photos/seed/card1/626/400',
    imageAlt: 'Sample image',
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
    imageSrc: 'https://picsum.photos/seed/behind1/626/626',
    imageAlt: 'Background image',
  },
  decorators: [(Story) => <div style={{ width: 626, height: 500 }}><Story /></div>],
};

export const Dark: Story = {
  args: {
    title: 'Text goes here',
    subtext: 'Subtext goes here',
    buttonLabel: 'Button',
    imagePosition: 'below',
    imageSrc: 'https://picsum.photos/seed/dark1/626/400',
    imageAlt: 'Sample image',
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
    imageSrc: 'https://picsum.photos/seed/product1/300/300',
    imageAlt: 'Product image',
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
    imageSrc: 'https://picsum.photos/seed/click1/626/626',
    imageAlt: 'Background image',
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
    imageSrc: 'https://picsum.photos/seed/product2/300/300',
    imageHoverSrc: 'https://picsum.photos/seed/product2hover/300/300',
    imageAlt: 'Product image',
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
    imageSrc: 'https://picsum.photos/seed/d2c1/600/400',
    imageHoverSrc: 'https://picsum.photos/seed/d2c2/600/400',
    imageAlt: 'D2C website preview',
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
    imageSrc: 'https://picsum.photos/seed/d2c1/600/400',
    imageAlt: 'D2C website preview',
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
    imageSrc: 'https://picsum.photos/seed/world1/600/400',
    imageHoverSrc: 'https://picsum.photos/seed/world2/600/400',
    imageAlt: 'World map',
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
    imageSrc: 'https://picsum.photos/seed/tablet1/377/260',
    imageAlt: 'Sample image',
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
    imageSrc: 'https://picsum.photos/seed/mobile1/272/362',
    imageAlt: 'Background image',
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
          imageSrc="https://picsum.photos/seed/bp1/626/400"
          imageAlt="Desktop preview"
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
          imageSrc="https://picsum.photos/seed/bp2/377/260"
          imageAlt="Tablet preview"
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
          imageSrc="https://picsum.photos/seed/bp3/272/362"
          imageAlt="Mobile background"
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
        imageSrc="https://picsum.photos/seed/audience1/520/340"
        imageAlt="Emerging Business"
        showButton={false}
      />
      <ContentCard
        imagePosition="above"
        title="Mid-market & Enterprise"
        subtext="Tailored retail solutions for ambitious businesses ready to scale"
        imageSrc="https://picsum.photos/seed/audience2/520/340"
        imageAlt="Mid-market and Enterprise"
        showButton={false}
      />
      <ContentCard
        imagePosition="above"
        title="Partners"
        subtext="Offer your services and empower retailers around the world"
        imageSrc="https://picsum.photos/seed/audience3/520/340"
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
        imageSrc="https://picsum.photos/seed/without3d/520/340"
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
        imageSrc="https://picsum.photos/seed/with3d/520/340"
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
    imageSrc: 'https://picsum.photos/seed/chipbefore/520/340',
    imageAlt: 'Before state',
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
    imageSrc: 'https://picsum.photos/seed/aifeature/600/400',
    imageAlt: 'AI feature preview',
    showButton: false,
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};

export const DarkWithImages: Story = {
  name: 'Dark — all positions with images',
  render: () => (
    <div style={{ background: '#101319', padding: 40, display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ width: 380 }}>
        <ContentCard
          chipLabel="Below"
          title="Image below on dark"
          subtext="Full-width image below the text content."
          imagePosition="below"
          imageSrc="https://picsum.photos/seed/dark-below/380/260"
          imageAlt="Dark mode below image"
          buttonLabel="Learn more"
          onDarkBg
        />
      </div>
      <div style={{ width: 380, height: 420 }}>
        <ContentCard
          chipLabel="Behind"
          title="Image behind on dark"
          subtext="Background image with dark text overlay."
          imagePosition="behind"
          imageSrc="https://picsum.photos/seed/dark-behind/380/420"
          imageAlt="Dark mode behind image"
          buttonLabel="Explore"
          onDarkBg
        />
      </div>
      <div style={{ width: 380 }}>
        <ContentCard
          chipLabel="Bottom right"
          title="Product card on dark"
          subtext="Image anchored to the bottom-right corner."
          imagePosition="bottom-right"
          imageSrc="https://picsum.photos/seed/dark-product/240/240"
          imageAlt="Product on dark background"
          clickable
          alwaysShowArrow
          onDarkBg
        />
      </div>
    </div>
  ),
};

export const WithContentSlot: Story = {
  name: 'Content slot — injected Pointers',
  render: () => (
    <div style={{ width: 440 }}>
      <ContentCard
        imagePosition="above"
        chipLabel="With"
        chipPosition="floating"
        title="With 3D, AR, & VR Shopping"
        imageSrc="https://picsum.photos/seed/with3d/520/340"
        imageAlt="With 3D AR VR preview"
        imageBg="#e8f5e9"
        showButton={false}
        showSubtext={false}
      >
        <Pointers
          items={[
            { label: 'Shoppers buy with confidence knowing exactly what they get' },
            { label: 'Fewer returns thanks to accurate product visualisation' },
            { label: 'Higher session depth and conversion rates' },
          ]}
        />
      </ContentCard>
    </div>
  ),
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
    imageSrc: 'https://picsum.photos/seed/featured1/600/400',
    imageAlt: 'Featured content',
    showButton: false,
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};
