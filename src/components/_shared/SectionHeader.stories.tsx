import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SectionHeader } from './SectionHeader';
import { Button } from '../atoms/Button';

const meta: Meta<typeof SectionHeader> = {
  title: 'Layout/SectionHeader',
  component: SectionHeader,
  argTypes: {
    chipVariant: { control: 'select', options: ['anchor', 'filled', 'outlined'] },
    chipDotColor: { control: 'select', options: ['blue', 'green', 'peach', 'yellow', 'lavender', 'violet', 'red', 'gray', 'teal'] },
    titleSize: { control: 'select', options: ['xxl', 'xl', 'l', 'm'] },
    align: { control: 'select', options: ['left', 'center'] },
    showChip: { control: 'boolean' },
    onDarkBg: { control: 'boolean' },
    actions: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  args: {
    chipLabel: 'Platform',
    chipDotColor: 'blue',
    title: 'Build your commerce experience',
    subtext:
      'Everything you need to launch, manage, and scale your online business — all in one place.',
    titleSize: 'xl',
  },
};

export const WithoutChip: Story = {
  args: {
    showChip: false,
    title: 'Title only — no chip',
    subtext: 'The chip is disabled via showChip={false}.',
  },
};

export const AnchorChip: Story = {
  args: {
    chipLabel: 'Platform',
    chipVariant: 'anchor',
    chipDotColor: 'blue',
    title: 'Section with anchor chip',
    subtext: 'Using the anchor variant with a colored dot.',
  },
};

export const AllDotColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <SectionHeader chipLabel="Platform" chipDotColor="blue" title="Blue chip" />
      <SectionHeader chipLabel="Growth" chipDotColor="green" title="Green chip" />
      <SectionHeader chipLabel="Commerce" chipDotColor="peach" title="Peach chip" />
    </div>
  ),
};

export const AllTitleSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <SectionHeader chipLabel="XXL" title="Heading size XXL" titleSize="xxl" />
      <SectionHeader chipLabel="XL" title="Heading size XL" titleSize="xl" />
      <SectionHeader chipLabel="L" title="Heading size L" titleSize="l" />
      <SectionHeader chipLabel="M" title="Heading size M" titleSize="m" />
    </div>
  ),
};

export const CenterAligned: Story = {
  args: {
    chipLabel: 'Platform',
    chipDotColor: 'green',
    title: 'Center-aligned section header',
    subtext: 'This header is centered within its container.',
    align: 'center',
  },
};

export const LeftWithActions: Story = {
  render: () => (
    <SectionHeader
      chipLabel="Platform"
      chipDotColor="blue"
      title="Build your commerce experience"
      subtext="Everything you need to launch, manage, and scale your online business."
      align="left"
      actions={
        <>
          <Button label="Get started" variant="primary" />
          <Button label="Learn more" variant="secondary" />
        </>
      }
    />
  ),
};

export const CenterWithActions: Story = {
  render: () => (
    <SectionHeader
      chipLabel="Platform"
      chipDotColor="green"
      title="Center-aligned with actions"
      subtext="Buttons appear below the text stack in center mode."
      align="center"
      actions={
        <>
          <Button label="Get started" variant="primary" />
          <Button label="Learn more" variant="secondary" />
        </>
      }
    />
  ),
};

export const LeftWithActionsBelow: Story = {
  name: 'Left-aligned with actions below',
  render: () => (
    <div style={{ maxWidth: 480, padding: 32, background: '#f2f2f2' }}>
      <SectionHeader
        chipLabel="Platform"
        chipDotColor="blue"
        title="Left-aligned header"
        subtext="Actions sit below the subtext instead of inline — useful in narrow columns."
        actionsPlacement="below"
        actions={<Button label="Get started" variant="primary" showChevron />}
      />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#101319', padding: 32 }}>
      <SectionHeader
        chipLabel="Platform"
        chipDotColor="blue"
        title="Section header on dark background"
        subtext="Text colors adapt for dark surfaces."
        onDarkBg
      />
    </div>
  ),
};
