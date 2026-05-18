import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Tabs } from './Tabs';
import { RichIconCard } from '../molecules/RichIconCard';

const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#5c98f7" />
    <path d="M16 8L18.47 13.86L24.5 14.41L20 17.97L21.18 24.5L16 21.09L10.82 24.5L12 17.97L7.5 14.41L13.53 13.86L16 8Z" fill="white" />
  </svg>
);

const CardGrid = ({ items }: { items: { title: string; subtext: string }[] }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
    {items.map((item, i) => (
      <RichIconCard key={i} icon={<StarIcon />} title={item.title} subtext={item.subtext} buttonLabel="Learn more" />
    ))}
  </div>
);

const meta: Meta<typeof Tabs> = {
  title: 'Atoms/Tabs',
  component: Tabs,
  decorators: [(Story) => <div style={{ backgroundColor: '#f2f2f2', padding: 40 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      {
        label: 'Online commerce',
        content: (
          <CardGrid items={[
            { title: 'D2C website', subtext: 'Customized, high-performance websites with built-in SEO, order management, payments & logistics' },
            { title: 'B2B website', subtext: 'Digital wholesale selling with custom pricing, buyer workflows and order approvals' },
            { title: 'Quick commerce', subtext: 'Storefronts + OMS + Logistics optimized for 10–30 minute deliveries' },
            { title: 'Marketplace selling', subtext: 'Sell on Amazon, Flipkart, Myntra & more with real-time sync' },
            { title: 'AI cataloging', subtext: 'AI-powered bulk uploads, attribute content generation & tagging' },
          ]} />
        ),
      },
      {
        label: 'Supply chain & logistics',
        content: (
          <CardGrid items={[
            { title: 'Order management', subtext: 'End-to-end order orchestration across channels' },
            { title: 'Warehouse management', subtext: 'Inventory tracking, picking, packing, and shipping' },
            { title: 'Last mile delivery', subtext: 'Route optimization and real-time tracking' },
          ]} />
        ),
      },
      {
        label: 'In-store tech',
        content: (
          <CardGrid items={[
            { title: 'Point of sale', subtext: 'Modern POS with unified inventory and customer data' },
            { title: 'Endless aisle', subtext: 'Never lose a sale — access full catalog from any store' },
            { title: 'Clienteling', subtext: 'Personalized in-store experiences powered by customer data' },
          ]} />
        ),
      },
    ],
  },
};

export const TwoTabs: Story = {
  args: {
    tabs: [
      { label: 'Tab one', content: <p style={{ fontFamily: "'Inter', sans-serif", color: '#5b5c5d' }}>Content for tab one</p> },
      { label: 'Tab two', content: <p style={{ fontFamily: "'Inter', sans-serif", color: '#5b5c5d' }}>Content for tab two</p> },
    ],
  },
};

export const HorizontalScroll: Story = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#f2f2f2', padding: 40, maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    tabs: [
      { label: 'Online commerce', content: <p style={{ fontFamily: "'Inter', sans-serif", color: '#5b5c5d' }}>Online commerce content</p> },
      { label: 'Supply chain', content: <p style={{ fontFamily: "'Inter', sans-serif", color: '#5b5c5d' }}>Supply chain content</p> },
      { label: 'In-store tech', content: <p style={{ fontFamily: "'Inter', sans-serif", color: '#5b5c5d' }}>In-store content</p> },
      { label: 'Agentic AI', content: <p style={{ fontFamily: "'Inter', sans-serif", color: '#5b5c5d' }}>Agentic AI content</p> },
      { label: 'Marketplaces', content: <p style={{ fontFamily: "'Inter', sans-serif", color: '#5b5c5d' }}>Marketplaces content</p> },
      { label: 'Analytics', content: <p style={{ fontFamily: "'Inter', sans-serif", color: '#5b5c5d' }}>Analytics content</p> },
    ],
  },
};

/* ── Pill variant stories ─────────────────────────────────────────────────── */

const SimpleContent = ({ label }: { label: string }) => (
  <p style={{ fontFamily: "'Inter', sans-serif", color: '#5b5c5d', margin: 0 }}>{label} content</p>
);

export const Pill3Tabs: Story = {
  name: 'Pill — 3 tabs',
  decorators: [(Story) => <div style={{ backgroundColor: '#f8f8f9', padding: 40 }}><Story /></div>],
  args: {
    variant: 'pill',
    tabs: [
      { label: 'Online commerce', content: <SimpleContent label="Online commerce" /> },
      { label: 'Supply chain', content: <SimpleContent label="Supply chain" /> },
      { label: 'In-store tech', content: <SimpleContent label="In-store tech" /> },
    ],
  },
};

export const Pill5Tabs: Story = {
  name: 'Pill — 5 tabs',
  decorators: [(Story) => <div style={{ backgroundColor: '#f8f8f9', padding: 40 }}><Story /></div>],
  args: {
    variant: 'pill',
    tabs: [
      { label: 'Online commerce', content: <SimpleContent label="Online commerce" /> },
      { label: 'Supply chain', content: <SimpleContent label="Supply chain" /> },
      { label: 'In-store tech', content: <SimpleContent label="In-store tech" /> },
      { label: 'Agentic AI', content: <SimpleContent label="Agentic AI" /> },
      { label: 'Marketplaces', content: <SimpleContent label="Marketplaces" /> },
    ],
  },
};

export const Pill7Tabs: Story = {
  name: 'Pill — 7 tabs (horizontal scroll on mobile)',
  decorators: [(Story) => <div style={{ backgroundColor: '#f8f8f9', padding: 40 }}><Story /></div>],
  args: {
    variant: 'pill',
    tabs: [
      { label: 'Online commerce', content: <SimpleContent label="Online commerce" /> },
      { label: 'Supply chain', content: <SimpleContent label="Supply chain" /> },
      { label: 'In-store tech', content: <SimpleContent label="In-store tech" /> },
      { label: 'Agentic AI', content: <SimpleContent label="Agentic AI" /> },
      { label: 'Marketplaces', content: <SimpleContent label="Marketplaces" /> },
      { label: 'Analytics', content: <SimpleContent label="Analytics" /> },
      { label: 'Payments', content: <SimpleContent label="Payments" /> },
    ],
  },
};

/** Demo: override item width via CSS custom property for fixed-width segments. */
export const PillFixedWidth: Story = {
  name: 'Pill — fixed item width (CSS var override)',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#f8f8f9',
          padding: 40,
          /* Set --fds-tabs-pill-item-width on any ancestor */
          '--fds-tabs-pill-item-width': '13rem',
        } as React.CSSProperties}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'pill',
    tabs: [
      { label: 'Online commerce', content: <SimpleContent label="Online commerce" /> },
      { label: 'Supply chain', content: <SimpleContent label="Supply chain" /> },
      { label: 'In-store tech', content: <SimpleContent label="In-store tech" /> },
    ],
  },
};

/**
 * The pill variant uses a light-surface palette (#f2f2f2 track, white active pill).
 * It does not invert for dark backgrounds. If your section bg is dark, wrap the
 * Tabs in a light container or use the `card` / `underline` variant instead.
 */
export const PillOnDark: Story = {
  name: 'Pill — on dark bg (light container)',
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#101319', padding: 40 }}>
        {/* Pill sits in a centred light-surface container so the track is visible */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <Story />
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#5b5c5d', textAlign: 'center', margin: 0 }}>
          Note: pill variant assumes a light page surface. The tab bar floats on its own #f2f2f2 track — no extra wrapper needed if the section bg is neutral-10 or white.
        </p>
      </div>
    ),
  ],
  args: {
    variant: 'pill',
    tabs: [
      { label: 'Online commerce', content: <SimpleContent label="Online commerce" /> },
      { label: 'Supply chain', content: <SimpleContent label="Supply chain" /> },
      { label: 'In-store tech', content: <SimpleContent label="In-store tech" /> },
    ],
  },
};

export const PillVsDefault: Story = {
  name: 'Pill vs Default — side by side',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, backgroundColor: '#f8f8f9', padding: 40 }}>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#797a7c', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Default (card)</p>
        <Tabs
          variant="card"
          tabs={[
            { label: 'Online commerce', content: <SimpleContent label="Online commerce" /> },
            { label: 'Supply chain', content: <SimpleContent label="Supply chain" /> },
            { label: 'In-store tech', content: <SimpleContent label="In-store tech" /> },
          ]}
        />
      </div>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#797a7c', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pill</p>
        <Tabs
          variant="pill"
          tabs={[
            { label: 'Online commerce', content: <SimpleContent label="Online commerce" /> },
            { label: 'Supply chain', content: <SimpleContent label="Supply chain" /> },
            { label: 'In-store tech', content: <SimpleContent label="In-store tech" /> },
          ]}
        />
      </div>
    </div>
  ),
};

export const FullBleedPanel: Story = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#f2f2f2' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    fullBleedPanel: true,
    tabs: [
      {
        label: 'Online commerce',
        content: (
          <div style={{ background: '#101319', padding: '3rem 2rem' }}>
            <CardGrid items={[
              { title: 'D2C website', subtext: 'Customized, high-performance storefronts' },
              { title: 'B2B website', subtext: 'Digital wholesale selling with custom pricing' },
              { title: 'Quick commerce', subtext: 'Optimized for 10–30 minute deliveries' },
            ]} />
          </div>
        ),
      },
      {
        label: 'Supply chain',
        content: (
          <div style={{ background: '#101319', padding: '3rem 2rem' }}>
            <CardGrid items={[
              { title: 'Order management', subtext: 'End-to-end order orchestration' },
              { title: 'Warehouse management', subtext: 'Inventory tracking and shipping' },
            ]} />
          </div>
        ),
      },
    ],
  },
};
