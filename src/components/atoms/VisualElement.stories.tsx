import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { VisualElement } from './VisualElement';

const meta: Meta<typeof VisualElement> = {
  title: 'Atoms/VisualElement',
  component: VisualElement,
  argTypes: {
    size: { control: 'select', options: ['icon-32', 'icon-48', 'logo-64', 'logo-80', 'logo-horizontal'] },
  },
};

export default meta;
type Story = StoryObj<typeof VisualElement>;

export const Default: Story = {
  args: { size: 'icon-32' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <VisualElement size="icon-32" />
      <VisualElement size="icon-48" />
      <VisualElement size="logo-64" />
      <VisualElement size="logo-80" />
      <VisualElement size="logo-horizontal" />
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <VisualElement size="icon-32">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#5c98f7" /></svg>
      </VisualElement>
      <VisualElement size="icon-48">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="12" fill="#80d99f" /></svg>
      </VisualElement>
      <VisualElement size="logo-64">
        <img src="https://placehold.co/64x64/eeb384/ffffff?text=Logo" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </VisualElement>
      <VisualElement size="logo-80">
        <img src="https://placehold.co/80x80/8d61f6/ffffff?text=Logo" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </VisualElement>
      <VisualElement size="logo-horizontal">
        <img src="https://placehold.co/240x80/084bb8/ffffff?text=Brand" alt="Brand" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </VisualElement>
    </div>
  ),
};
