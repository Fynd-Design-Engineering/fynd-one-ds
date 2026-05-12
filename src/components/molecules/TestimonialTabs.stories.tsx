import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TestimonialTabs } from './TestimonialTabs';
import { Section } from '../_shared/Section';

const meta: Meta<typeof TestimonialTabs> = {
  title: 'Molecules/TestimonialTabs',
  component: TestimonialTabs,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof TestimonialTabs>;

// Inline SVG logos — no external deps, always render correctly
const logo = (text: string, color = '#101319') =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 36"><text y="28" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="${color}">${text}</text></svg>`,
  )}`;

const twoItems = [
  {
    brand: 'Buildco',
    logoSrc: logo('Buildco'),
    quote:
      '"Switching to this platform cut our deployment time from three weeks to under a day. Our entire team felt the difference immediately."',
    author: 'Sarah Chen, CTO at Buildco',
  },
  {
    brand: 'Nexova',
    logoSrc: logo('Nexova'),
    quote:
      '"The composable architecture gave us the flexibility we had been chasing for years. We finally own our commerce stack end to end."',
    author: 'Marcus Oliveira, Head of Engineering at Nexova',
  },
];

const fourItems = [
  {
    brand: 'Buildco',
    logoSrc: logo('Buildco'),
    quote:
      '"Switching to this platform cut our deployment time from three weeks to under a day. Our entire team felt the difference immediately."',
    author: 'Sarah Chen, CTO at Buildco',
  },
  {
    brand: 'Nexova',
    logoSrc: logo('Nexova'),
    quote:
      '"The composable architecture gave us the flexibility we had been chasing for years. We finally own our commerce stack end to end."',
    author: 'Marcus Oliveira, Head of Engineering at Nexova',
  },
  {
    brand: 'Cartly',
    logoSrc: logo('Cartly'),
    quote:
      '"Our conversion rate jumped 28% within the first month of going live. The performance improvements alone justified the migration."',
    author: 'Priya Nair, VP Growth at Cartly',
  },
  {
    brand: 'Lumio',
    logoSrc: logo('Lumio'),
    quote:
      '"Onboarding was seamless and the support team was outstanding. We were live in production faster than any platform we have used before."',
    author: 'James Whitfield, CEO at Lumio',
  },
];

export const Default: Story = {
  args: {
    items: twoItems,
    interval: 6000,
  },
};

export const FourItems: Story = {
  name: 'Four items',
  render: () => (
    <Section title="What our customers say" subtext="Thousands of brands trust us to power their commerce operations.">
      <TestimonialTabs items={fourItems} interval={5000} />
    </Section>
  ),
};

export const ManualOnly: Story = {
  name: 'Manual only (no auto-advance)',
  args: {
    items: fourItems,
    interval: 0,
  },
};

export const OnDarkBg: Story = {
  name: 'Dark background',
  render: () => (
    <div style={{ background: '#101319', padding: '3rem', borderRadius: '1rem' }}>
      <TestimonialTabs
        items={fourItems}
        interval={6000}
        onDarkBg
      />
    </div>
  ),
};
