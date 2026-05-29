import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactCTASection } from './ContactCTASection';

const SAMPLE_BG =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=1000&fit=crop';

const meta: Meta<typeof ContactCTASection> = {
  title: 'Marketing/ContactCTASection',
  component: ContactCTASection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    bgColor: { control: 'color' },
    sectionBg: { control: 'color' },
    bgImage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ContactCTASection>;

export const Default: Story = {
  args: {
    title: "Discover how Fynd accelerates your business",
    steps: [
      {
        n: 1,
        title: 'Fill out the form',
        body: 'Share your contact information to get started',
      },
      {
        n: 2,
        title: 'Speak to an expert',
        body: 'A member of our sales team will get in touch with you',
      },
    ],
    bgImage: SAMPLE_BG,
    formTitle: 'Get in Touch',
  },
};

export const NoSteps: Story = {
  name: 'No steps',
  args: {
    title: "Ready to scale your commerce? Let's talk.",
    bgImage: SAMPLE_BG,
    formTitle: 'Get in Touch',
  },
};

export const CustomSectionBg: Story = {
  name: 'Custom section background',
  args: {
    title: "Discover how Fynd accelerates your business",
    steps: [
      {
        n: 1,
        title: 'Fill out the form',
        body: 'Share your contact information to get started',
      },
      {
        n: 2,
        title: 'Speak to an expert',
        body: 'A member of our sales team will get in touch with you',
      },
    ],
    bgImage: SAMPLE_BG,
    formTitle: 'Get in Touch',
    sectionBg: '#eef4ff',
  },
};

const PRODUCT_OPTIONS = [
  'Building a website',
  'Supply chain solutions',
  'Retail store solutions',
  'Sell on Marketplaces',
  'AI solutions',
  'Fashion manufacturing solution',
];

/** `initialValues.productInterested` is threaded through to the inner form — dropdown opens pre-selected. */
export const PreselectedProduct: Story = {
  name: 'initialValues — preselected productInterested',
  args: {
    title: "Discover how Fynd accelerates your business",
    steps: [
      { n: 1, title: 'Fill out the form', body: 'Share your contact information to get started' },
      { n: 2, title: 'Speak to an expert', body: 'A member of our sales team will get in touch with you' },
    ],
    bgImage: SAMPLE_BG,
    formTitle: 'Get in Touch',
    productOptions: PRODUCT_OPTIONS,
    initialValues: { productInterested: 'AI solutions' },
  },
};

export const WithChip: Story = {
  name: 'With eyebrow chip',
  args: {
    chipLabel: 'Contact us',
    title: "Built for businesses like yours. Let's connect",
    steps: [
      {
        n: 1,
        title: 'Fill out the form',
        body: 'Share your contact information to get started',
      },
      {
        n: 2,
        title: 'Speak to an expert',
        body: 'A member of our sales team will get in touch with you',
      },
    ],
    bgImage: SAMPLE_BG,
    formTitle: 'Get in Touch',
  },
};
