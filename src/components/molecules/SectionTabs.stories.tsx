import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SectionTabs } from './SectionTabs';
import { Section } from '../_shared/Section';
import { Grid } from '../layouts/Grid';
import { ContentCard } from './ContentCard';
import { StatsGrid } from './StatsGrid';

const meta: Meta<typeof SectionTabs> = {
  title: 'Molecules/SectionTabs',
  component: SectionTabs,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SectionTabs>;

const platformItems = [
  {
    label: 'D2C Commerce',
    content: (
      <Section title="Sell directly to your customers" subtext="Build high-converting storefronts with full control over brand, checkout, and customer data.">
        <Grid columns={3}>
          <ContentCard title="Storefront builder" subtext="Drag-and-drop tools for pixel-perfect pages without engineering effort." imagePosition="bottom-right" />
          <ContentCard title="Smart checkout" subtext="Reduce drop-off with a one-page checkout optimised for conversion." imagePosition="bottom-right" />
          <ContentCard title="Customer data platform" subtext="Unify purchase, browsing, and support data in a single profile." imagePosition="bottom-right" />
        </Grid>
      </Section>
    ),
  },
  {
    label: 'B2B Commerce',
    content: (
      <Section title="Power complex B2B buying journeys" subtext="Custom catalogues, tiered pricing, and approval workflows built for enterprise buyers.">
        <Grid columns={3}>
          <ContentCard title="Catalogue management" subtext="Segment products and pricing by customer group or geography." imagePosition="bottom-right" />
          <ContentCard title="Approval workflows" subtext="Route large orders through multi-level approval chains automatically." imagePosition="bottom-right" />
          <ContentCard title="Net terms & invoicing" subtext="Offer net-30/60 credit and automated invoice generation." imagePosition="bottom-right" />
        </Grid>
      </Section>
    ),
  },
  {
    label: 'Marketplace',
    content: (
      <Section title="Launch a multi-vendor marketplace" subtext="Onboard sellers, manage catalogues, and settle payouts — all from one platform.">
        <Grid columns={3}>
          <ContentCard title="Seller onboarding" subtext="Self-serve portal for sellers to list products and manage orders." imagePosition="bottom-right" />
          <ContentCard title="Commission engine" subtext="Flexible rules for flat fees, percentages, and category splits." imagePosition="bottom-right" />
          <ContentCard title="Payout automation" subtext="Automated settlement with configurable hold periods and dispute handling." imagePosition="bottom-right" />
        </Grid>
      </Section>
    ),
  },
  {
    label: 'Omnichannel',
    content: (
      <Section title="Unify online and offline retail" subtext="Connect your stores, warehouses, and digital channels into a single commerce layer.">
        <Grid columns={3}>
          <ContentCard title="Unified inventory" subtext="Real-time stock visibility across every location and channel." imagePosition="bottom-right" />
          <ContentCard title="Ship from store" subtext="Turn any retail location into a fulfilment node to reduce delivery times." imagePosition="bottom-right" />
          <ContentCard title="Endless aisle" subtext="Let in-store staff sell products not physically stocked at their location." imagePosition="bottom-right" />
        </Grid>
      </Section>
    ),
  },
];

export const Default: Story = {
  args: {
    items: platformItems,
    tablistLabel: 'Platform capabilities',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div>
        <SectionTabs {...args} activeIndex={activeIndex} onActiveIndexChange={setActiveIndex} />
        <p style={{ textAlign: 'center', padding: '1rem', color: 'var(--fds-neutral-50)' }}>
          Active tab index: {activeIndex}
        </p>
      </div>
    );
  },
  args: {
    items: platformItems,
    tablistLabel: 'Platform capabilities',
  },
};

export const Sticky: Story = {
  parameters: {
    docs: { description: { story: 'Tab bar pins to the top (below any sticky navbar) as the user scrolls through long sections.' } },
  },
  args: {
    sticky: true,
    items: platformItems.map((item) => ({
      ...item,
      content: (
        <Section
          title={(item.content as React.ReactElement).props.title}
          subtext={(item.content as React.ReactElement).props.subtext}
        >
          <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fds-neutral-40)' }}>
            Section content — scroll to see the sticky tab bar
          </div>
        </Section>
      ),
    })),
    tablistLabel: 'Platform capabilities',
  },
};

export const TwoTabs: Story = {
  args: {
    items: [
      {
        label: 'Overview',
        content: (
          <Section title="Platform overview" subtext="Everything you need to run modern commerce.">
            <StatsGrid items={[
              { stat: '500+', label: 'Brands powered' },
              { stat: '2B+', label: 'Orders processed' },
              { stat: '99.99%', label: 'Platform uptime' },
            ]} />
          </Section>
        ),
      },
      {
        label: 'Integrations',
        content: (
          <Section title="Connect your stack" subtext="Pre-built connectors to the tools your team already uses.">
            <Grid columns={3}>
              <ContentCard title="Payment gateways" subtext="Razorpay, Stripe, PayPal, and 40+ more out of the box." />
              <ContentCard title="Logistics" subtext="Shiprocket, Delhivery, FedEx and region-specific carriers." />
              <ContentCard title="Analytics" subtext="Google Analytics, Mixpanel, Amplitude — plug in and go." />
            </Grid>
          </Section>
        ),
      },
    ],
    tablistLabel: 'Product sections',
  },
};

export const OnDarkBg: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: (args) => (
    <div style={{ background: 'var(--fds-neutral-100, #101319)' }}>
      <SectionTabs {...args} />
    </div>
  ),
  args: {
    onDarkBg: true,
    items: platformItems,
    tablistLabel: 'Platform capabilities',
  },
};
