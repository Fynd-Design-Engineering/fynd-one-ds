import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from './Text';
import type { TextVariant, Breakpoint, TextWeight } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'heading-xxl', 'heading-xl', 'heading-l', 'heading-m', 'heading-s',
        'body-xl', 'body-l', 'body-m', 'body-s', 'body-xs',
      ],
    },
    breakpoint: {
      control: 'select',
      options: ['desktop', 'tablet', 'mobile'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold'],
    },
    caps: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: 'heading-xl',
    breakpoint: 'desktop',
    weight: 'regular',
    caps: false,
    children: 'One Commerce Platform',
  },
};

// ── Type Scale Reference ──────────────────────────────────────────────────────

const headingVariants: TextVariant[] = [
  'heading-xxl', 'heading-xl', 'heading-l', 'heading-m', 'heading-s',
];

const bodyVariants: TextVariant[] = [
  'body-xl', 'body-l', 'body-m', 'body-s', 'body-xs',
];

const breakpoints: Breakpoint[] = ['desktop', 'tablet', 'mobile'];

export const TypeScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <section>
        <h6 style={{ color: '#888', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
          Headings — Desktop
        </h6>
        {headingVariants.map((v) => (
          <div key={v} style={{ marginBottom: 12 }}>
            <Text variant={v} breakpoint="desktop">
              {v}
            </Text>
            <span style={{ fontSize: 11, color: '#999', marginLeft: 12 }}>{v}</span>
          </div>
        ))}
      </section>

      <section>
        <h6 style={{ color: '#888', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
          Body — Desktop
        </h6>
        {bodyVariants.map((v) => (
          <div key={v} style={{ marginBottom: 8 }}>
            <Text variant={v} weight="regular" breakpoint="desktop">
              {v} — Regular
            </Text>
            <br />
            <Text variant={v} weight="medium" breakpoint="desktop">
              {v} — Medium
            </Text>
          </div>
        ))}
      </section>

      <section>
        <h6 style={{ color: '#888', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
          Body XS — Caps
        </h6>
        <Text variant="body-xs" weight="semibold" caps breakpoint="desktop">
          Caps label desktop
        </Text>
        <br />
        <Text variant="body-xs" weight="semibold" caps breakpoint="mobile">
          Caps label mobile
        </Text>
      </section>
    </div>
  ),
};

// ── Responsive Comparison ─────────────────────────────────────────────────────

export const ResponsiveComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h6 style={{ color: '#888', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        heading-xxl across breakpoints
      </h6>
      {breakpoints.map((bp) => (
        <div key={bp}>
          <Text variant="heading-xxl" breakpoint={bp}>
            {bp}: One Commerce
          </Text>
        </div>
      ))}
    </div>
  ),
};
