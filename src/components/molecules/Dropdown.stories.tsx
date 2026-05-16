import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const years = Array.from({ length: 10 }, (_, i) => String(2015 + i));
const regions = [
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East & Africa',
];
const longOptions = Array.from({ length: 25 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: String(i + 1),
}));

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Dropdown {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Choose year',
    options: years.map((y) => ({ label: y, value: y })),
    allLabel: 'All years',
  },
};

export const WithSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState('2020');
    return <Dropdown {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Choose year',
    options: years.map((y) => ({ label: y, value: y })),
    allLabel: 'All years',
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Dropdown {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Region',
    options: regions.map((r, i) => ({ label: r, value: r, disabled: i === 2 })),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Region',
    value: '',
    onChange: () => {},
    options: regions.map((r) => ({ label: r, value: r })),
    disabled: true,
  },
};

export const OnDarkBg: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div
        style={{
          background: 'var(--fds-neutral-100, #101319)',
          padding: '2rem',
          borderRadius: '1rem',
        }}
      >
        <Dropdown {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    label: 'Region',
    options: regions.map((r) => ({ label: r, value: r })),
    onDarkBg: true,
  },
};

export const LongList: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Dropdown {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Select option',
    options: longOptions,
    allLabel: 'All options',
  },
};
