import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { GradientSurface } from './GradientSurface';
import type { GradientKey } from '../tokens';

const meta: Meta<typeof GradientSurface> = {
  title: 'Atoms/GradientSurface',
  component: GradientSurface,
  argTypes: {
    gradient: {
      control: 'select',
      options: ['blue', 'peach', 'green', 'grey', 'ai'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GradientSurface>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    gradient: 'ai',
    children: 'AI-powered features',
    style: { padding: 32, borderRadius: 12, color: '#fff', fontSize: 18 },
  },
};

// ── All Gradients ─────────────────────────────────────────────────────────────

const allGradients: GradientKey[] = ['blue', 'peach', 'green', 'grey', 'ai'];

export const AllGradients: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
      {allGradients.map((g) => (
        <GradientSurface
          key={g}
          gradient={g}
          style={{
            padding: 24,
            borderRadius: 12,
            color: g === 'ai' ? '#fff' : '#222',
            fontSize: 14,
            fontWeight: 500,
            minHeight: 120,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          --gradient-{g}
        </GradientSurface>
      ))}
    </div>
  ),
};
