import type { Meta, StoryObj } from '@storybook/react-vite';
import { CTABannerSection } from './CTABannerSection';

const SAMPLE_BG =
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=900&fit=crop';

const meta: Meta<typeof CTABannerSection> = {
  title: 'Marketing/CTABannerSection',
  component: CTABannerSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    align: { control: 'radio', options: ['center', 'left'] },
    variant: { control: 'radio', options: ['dark', 'light'] },
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

export const LightCenter: Story = {
  name: 'Light — center',
  args: {
    variant: 'light',
    chipLabel: 'Get started',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    align: 'center',
    primaryButton: { label: 'Get started' },
    secondaryButton: { label: 'Book a demo' },
  },
};

export const LightLeft: Story = {
  name: 'Light — left',
  args: {
    variant: 'light',
    chipLabel: 'Get started',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    align: 'left',
    primaryButton: { label: 'Get started' },
    secondaryButton: { label: 'Book a demo' },
  },
};

export const LightWithBgImage: Story = {
  name: 'Light — with background image',
  args: {
    variant: 'light',
    chipLabel: 'Get started',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum has been the industry's standard dummy text.",
    align: 'center',
    bgImage: SAMPLE_BG,
    bgColor: 'rgba(245,245,245,0.85)',
    primaryButton: { label: 'Get started' },
    secondaryButton: { label: 'Book a demo' },
  },
};

export const WithCoverImage: Story = {
  name: 'BgSize — cover (default hero)',
  args: {
    chipLabel: 'Get started',
    title: 'Full-bleed hero with cover background',
    subtext: 'No bgSize prop needed — cover is the default.',
    align: 'center',
    bgImage: SAMPLE_BG,
    bgColor: 'rgba(0,0,0,0.55)',
    primaryButton: { label: 'Get started' },
    secondaryButton: { label: 'Book a demo' },
  },
};

export const WithPatternTile: Story = {
  name: 'BgSize — auto + repeat (pattern tile)',
  args: {
    chipLabel: 'Pattern',
    title: 'Repeating SVG tile background',
    subtext: 'Pass bgSize="auto" and bgRepeat="repeat" for small pattern tiles.',
    align: 'center',
    bgColor: '#101319',
    bgImage:
      "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%23ffffff' fill-opacity='0.08'/%3E%3C/svg%3E",
    bgSize: 'auto',
    bgRepeat: 'repeat',
    primaryButton: { label: 'Get started' },
    secondaryButton: { label: 'Book a demo' },
  },
};

export const WithContainedLogo: Story = {
  name: 'BgSize — contain + top right (watermark)',
  args: {
    chipLabel: 'Watermark',
    title: 'Contained logo in the top-right corner',
    subtext: 'Pass bgSize="contain" and bgPosition="top right" for a corner watermark.',
    align: 'left',
    bgColor: '#0d1117',
    bgImage: SAMPLE_BG,
    bgSize: 'contain',
    bgPosition: 'top right',
    primaryButton: { label: 'Get started' },
  },
};

export const WithLinks: Story = {
  name: 'Link buttons (href)',
  args: {
    chipLabel: 'Get started',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    subtext:
      "Lorem Ipsum has been the industry's standard dummy text.",
    align: 'center',
    primaryButton: { label: 'Get started', href: 'https://fynd.com', external: true },
    secondaryButton: { label: 'Book a demo', href: '/contact' },
  },
};
