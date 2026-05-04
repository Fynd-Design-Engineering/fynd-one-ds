import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    onDarkBg: { control: 'boolean' },
    showChevron: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Get started',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Learn more',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Button',
    variant: 'tertiary',
  },
};

export const WithChevron: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button label="Get started" variant="primary" showChevron />
      <Button label="Learn more" variant="secondary" showChevron />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#101319', padding: 32, display: 'flex', gap: 16 }}>
      <Button label="Get started" variant="primary" onDarkBg />
      <Button label="Learn more" variant="secondary" onDarkBg />
    </div>
  ),
};

export const OnDarkWithChevron: Story = {
  render: () => (
    <div style={{ background: '#101319', padding: 32, display: 'flex', gap: 16 }}>
      <Button label="Get started" variant="primary" onDarkBg showChevron />
      <Button label="Learn more" variant="secondary" onDarkBg showChevron />
    </div>
  ),
};

export const Anchor: Story = {
  name: 'As anchor (href)',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button label="Get started" variant="primary" href="/solutions" />
      <Button label="Learn more" variant="secondary" href="/solutions" />
      <Button label="Docs" variant="tertiary" href="/docs" />
    </div>
  ),
};

export const External: Story = {
  name: 'External link (href + external)',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button label="Visit fynd.com" variant="primary" href="https://fynd.com" external />
      <Button label="Open docs" variant="tertiary" href="https://fynd.com/docs" external />
    </div>
  ),
};

export const AsLink: Story = {
  name: 'Custom component (as prop)',
  render: () => {
    const MockLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
      ({ href, children, ...props }, ref) => (
        <a ref={ref} href={href} data-mock-link {...props}>{children}</a>
      )
    );
    MockLink.displayName = 'MockLink';
    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <Button label="Navigate" variant="primary" as={MockLink} href="/dashboard" />
        <Button label="Settings" variant="secondary" as={MockLink} href="/settings" />
      </div>
    );
  },
};
