import type { Meta, StoryObj } from '@storybook/react-vite';
import { CTABannerSection } from './CTABannerSection';

const SAMPLE_BG =
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=900&fit=crop';

const meta: Meta<typeof CTABannerSection> = {
  title: 'Molecules/CTABannerSection',
  component: CTABannerSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    align: { control: 'radio', options: ['center', 'left'] },
    bgColor: { control: 'color' },
    bgImage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CTABannerSection>;

export const Default: Story = {
  name: 'Center — two buttons',
  args: {
    chipLabel: 'Get started',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    align: 'center',
    primaryButton: { label: 'Get started' },
    secondaryButton: { label: 'Book a demo' },
  },
};

export const LeftAlign: Story = {
  name: 'Left — two buttons',
  args: {
    chipLabel: 'Get started',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    align: 'left',
    primaryButton: { label: 'Get started' },
    secondaryButton: { label: 'Book a demo' },
  },
};

export const OneButton: Story = {
  name: 'One button only',
  args: {
    chipLabel: 'Get started',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum has been the industry's standard dummy text.",
    align: 'center',
    primaryButton: { label: 'Get started' },
  },
};

export const NoButtons: Story = {
  name: 'No buttons',
  args: {
    chipLabel: 'Announcement',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum has been the industry's standard dummy text.",
    align: 'center',
  },
};

export const WithBgImage: Story = {
  name: 'With background image',
  args: {
    chipLabel: 'Get started',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum has been the industry's standard dummy text.",
    align: 'center',
    bgImage: SAMPLE_BG,
    bgColor: 'rgba(0,0,0,0.6)',
    primaryButton: { label: 'Get started' },
    secondaryButton: { label: 'Book a demo' },
  },
};

export const CustomBgColor: Story = {
  name: 'Custom bg color',
  args: {
    chipLabel: 'Commerce',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum has been the industry's standard dummy text.",
    align: 'center',
    bgColor: '#0a1f12',
    primaryButton: { label: 'Get started' },
    secondaryButton: { label: 'Book a demo' },
  },
};
