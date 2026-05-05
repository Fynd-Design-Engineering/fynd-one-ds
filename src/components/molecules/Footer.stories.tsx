import type { Meta, StoryObj } from '@storybook/react';
import { Footer, FooterProps } from './Footer';
import {
  fyndMarketingFooterPreset,
  fyndFooterLinkSections,
} from '../../presets/fyndMarketingFooter';

const meta: Meta<FooterProps> = {
  title: 'Marketing/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<FooterProps>;

export const Default: Story = {
  args: fyndMarketingFooterPreset,
};

export const Minimal: Story = {
  args: {
    linkSections: fyndFooterLinkSections.slice(0, 4),
    legalLinks: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
    copyright: '© 2024 Shopsense Retail Technologies',
  },
};
