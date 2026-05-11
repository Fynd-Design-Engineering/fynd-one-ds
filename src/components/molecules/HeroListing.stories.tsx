import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { HeroListing } from './HeroListing';
import { IcPodcasts } from '../../assets/icons/media';

const meta: Meta<typeof HeroListing> = {
  title: 'Content/HeroListing',
  component: HeroListing,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onDarkBg: { control: 'boolean' },
    showChip: { control: 'boolean' },
    showSubtext: { control: 'boolean' },
    chipSelected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof HeroListing>;

export const Default: Story = {
  args: {
    chipLabel: 'Podcast',
    chipIcon: <IcPodcasts size={20} />,
    title: 'The Fynd Podcast by Ragini, CBO at Fynd',
    subtext: 'Meaningful weekly conversations with entrepreneurs and industry experts',
  },
};

export const Toggleable: Story = {
  name: 'Toggleable chip',
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <HeroListing
        chipLabel="Podcast"
        chipIcon={<IcPodcasts size={20} />}
        chipSelected={selected}
        onChipClick={() => setSelected((s) => !s)}
        title="The Fynd Podcast by Ragini, CBO at Fynd"
        subtext="Meaningful weekly conversations with entrepreneurs and industry experts"
      />
    );
  },
};

export const NoChip: Story = {
  name: 'Title + subtext only',
  args: {
    showChip: false,
    title: 'Resources & Insights',
    subtext: 'Guides, case studies, and expert perspectives on modern commerce.',
  },
};

export const TitleOnly: Story = {
  name: 'Title only',
  args: {
    chipLabel: 'Blog',
    title: 'The Fynd Commerce Blog',
    showSubtext: false,
  },
};

export const OnDarkBackground: Story = {
  args: {
    chipLabel: 'Podcast',
    chipIcon: <IcPodcasts size={20} />,
    title: 'The Fynd Podcast by Ragini, CBO at Fynd',
    subtext: 'Meaningful weekly conversations with entrepreneurs and industry experts',
    onDarkBg: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#0e0e0e', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};
