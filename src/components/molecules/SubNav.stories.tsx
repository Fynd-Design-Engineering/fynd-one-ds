import type { Meta, StoryObj } from '@storybook/react';
import { SubNav, SubNavProps } from './SubNav';

const meta: Meta<SubNavProps> = {
  title: 'Molecules/SubNav',
  component: SubNav,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<SubNavProps>;

const ITEMS = [
  { label: 'Storefront', href: '#storefront', brand: true, active: true },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#customers' },
  { label: 'Resources', href: '#resources' },
];

export const Default: Story = {
  args: {
    items: ITEMS,
  },
};

export const Dark: Story = {
  args: {
    items: ITEMS,
    onDarkBg: true,
  },
};

export const StickyUnderNavbar: Story = {
  name: 'Sticky stacked below a 64px nav',
  args: {
    items: ITEMS,
    sticky: true,
    stickyOffset: 64,
  },
  render: (args) => (
    <div>
      {/* Faux nav so the stacking offset is obvious. */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: 64,
          background: '#ffffff',
          borderBottom: '1px solid #f2f2f2',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          zIndex: 1000,
        }}
      >
        <strong>Faux Navbar (64px) — sticky</strong>
      </div>
      <SubNav {...args} />
      <div style={{ height: 1600, padding: 24, background: '#fff' }}>
        Scroll the canvas — the sub-nav pins below the nav.
      </div>
    </div>
  ),
};

export const OnlySubNavSticky: Story = {
  name: 'Only SubNav sticky (Navbar scrolls away)',
  args: {
    items: ITEMS,
    sticky: true,
    stickyOffset: 0,
  },
  render: (args) => (
    <div>
      {/* Faux nav rendered in normal flow — NOT sticky, so it scrolls
          off-screen with the rest of the page. */}
      <div
        style={{
          height: 64,
          background: '#ffffff',
          borderBottom: '1px solid #f2f2f2',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
        }}
      >
        <strong>Faux Navbar (64px) — NOT sticky</strong>
      </div>
      <SubNav {...args} />
      <div style={{ height: 1600, padding: 24, background: '#fff' }}>
        Scroll the canvas — the navbar disappears off the top, the
        sub-nav stays pinned at the top of the viewport.
      </div>
    </div>
  ),
};
