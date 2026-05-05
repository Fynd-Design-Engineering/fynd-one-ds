import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterPanel, FilterPanelProps } from './FilterPanel';
import { Popover } from './Popover';
import { FilterButton } from '../atoms/FilterButton';

const meta: Meta<FilterPanelProps> = {
  title: 'Marketing/FilterPanel',
  component: FilterPanel,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<FilterPanelProps>;

const SOLUTIONS = [
  'Fashion Manufacturing',
  'Events',
  'AI/ML',
  'AI Product Photography',
  'Endless Aisle',
  'Self-checkouts',
  'POS',
  'Quick Commerce',
  'AR & VR Shopping Experiences',
  'Warehouse Management System',
  'Transport Management System',
  'Storefronts',
  'B2B Commerce',
  'Order Management System',
  'Fynd & Go',
];

const INDUSTRIES = ['Fashion', 'Beauty', 'Grocery', 'F&B', 'Electronics', 'Home'];

const YEARS = ['2024', '2023', '2022', '2021'];

const toOptions = (values: string[]) =>
  values.map((v) => ({ value: v, label: v }));

const SAMPLE_GROUPS = [
  { key: 'product', heading: 'Solutions', options: toOptions(SOLUTIONS) },
  { key: 'industry', heading: 'Industry', options: toOptions(INDUSTRIES) },
  { key: 'year', heading: 'Year', options: toOptions(YEARS) },
];

const Standalone = () => {
  const [selected, setSelected] = useState<Record<string, string[]>>({
    product: ['POS', 'Storefronts'],
  });
  return (
    <div style={{ width: 480 }}>
      <FilterPanel groups={SAMPLE_GROUPS} selected={selected} onChange={setSelected} />
    </div>
  );
};

export const Default: Story = {
  render: () => <Standalone />,
};

const SingleGroup = () => {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  return (
    <div style={{ width: 480 }}>
      <FilterPanel
        groups={[{ key: 'product', heading: 'Solutions', options: toOptions(SOLUTIONS) }]}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
};

export const SingleGroupSolutions: Story = {
  name: 'Single group — matches Webflow ref',
  render: () => <SingleGroup />,
};

const InPopover = () => {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const total = Object.values(selected).reduce((n, arr) => n + arr.length, 0);
  return (
    <div style={{ padding: '120px 240px' }}>
      <Popover
        placement="bottom-start"
        offset={0}
        trigger={<FilterButton filterCount={total} />}
        disableFocusTrap
      >
        <FilterPanel groups={SAMPLE_GROUPS} selected={selected} onChange={setSelected} />
      </Popover>
    </div>
  );
};

export const TriggeredByFilterButton: Story = {
  name: 'End-to-end — FilterButton → Popover → FilterPanel',
  render: () => <InPopover />,
};
