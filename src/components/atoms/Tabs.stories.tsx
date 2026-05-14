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
