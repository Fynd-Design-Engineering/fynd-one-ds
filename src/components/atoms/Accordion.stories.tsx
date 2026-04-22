import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const sampleItems = [
  { question: 'What is Fynd Commerce?', answer: 'Fynd Commerce is an AI-driven commerce platform that helps businesses build, manage, and scale their online and offline retail operations.' },
  { question: 'How does pricing work?', answer: 'We offer flexible pricing plans starting from ₹4,999/year. Each plan includes different features and transaction fee structures to match your business needs.' },
  { question: 'Can I migrate from my existing platform?', answer: 'Yes, we provide a dedicated migration team and automated tools to help you move your catalog, orders, and customer data from any existing platform.' },
  { question: 'What support options are available?', answer: 'All plans include email support. Pro and Enterprise plans include 24/7 priority support, dedicated account managers, and onboarding assistance.' },
  { question: 'Is there a free trial?', answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started.' },
];

const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  argTypes: {
    onDarkBg: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Light: Story = {
  args: {
    items: sampleItems,
    onDarkBg: false,
  },
};

export const Dark: Story = {
  args: {
    items: sampleItems,
    onDarkBg: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#101319', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
};

export const MultipleOpen: Story = {
  args: {
    items: sampleItems,
    multiple: true,
    onDarkBg: false,
  },
};
