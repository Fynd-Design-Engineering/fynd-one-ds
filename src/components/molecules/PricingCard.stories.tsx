import type { Meta, StoryObj } from '@storybook/react-vite';
import { PricingCard } from './PricingCard';

const sampleFeatures = [
  { text: 'Unlimited product listings' },
  { text: 'Custom domain support' },
  { text: 'Analytics dashboard' },
  { text: '24/7 customer support' },
  { text: 'Multi-channel selling' },
  { text: 'Payment gateway integration' },
];

const meta: Meta<typeof PricingCard> = {
  title: 'Molecules/PricingCard',
  component: PricingCard,
  argTypes: {
    onDarkBg: { control: 'boolean' },
    buttonVariant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
  },
};

export default meta;
type Story = StoryObj<typeof PricingCard>;

export const Light: Story = {
  args: {
    label: 'Starter',
    popularText: 'Most popular',
    title: 'Ideal for',
    titleBold: 'new businesses',
    amount: '11,111',
    period: '/year + GST',
    buttonLabel: 'Get Started',
    features: sampleFeatures,
    onDarkBg: false,
  },
};

export const Dark: Story = {
  args: {
    ...Light.args,
    onDarkBg: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#0e0e0e', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
};

export const NoPopularBadge: Story = {
  args: {
    label: 'Enterprise',
    title: 'Built for',
    titleBold: 'scale',
    amount: '49,999',
    period: '/year + GST',
    buttonLabel: 'Contact Sales',
    buttonVariant: 'secondary',
    features: sampleFeatures.slice(0, 4),
    onDarkBg: false,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ width: 411 }}>
        <PricingCard
          label="Starter"
          title="Ideal for"
          titleBold="new businesses"
          amount="4,999"
          period="/year + GST"
          buttonLabel="Get Started"
          buttonVariant="tertiary"
          features={sampleFeatures.slice(0, 3)}
        />
      </div>
      <div style={{ width: 411 }}>
        <PricingCard
          label="Pro"
          popularText="Most popular"
          title="Ideal for"
          titleBold="growing brands"
          amount="11,111"
          period="/year + GST"
          buttonLabel="Get Started"
          features={sampleFeatures}
        />
      </div>
      <div style={{ width: 411 }}>
        <PricingCard
          label="Enterprise"
          title="Built for"
          titleBold="scale"
          amount="49,999"
          period="/year + GST"
          buttonLabel="Contact Sales"
          buttonVariant="secondary"
          features={sampleFeatures.slice(0, 5)}
        />
      </div>
    </div>
  ),
};
