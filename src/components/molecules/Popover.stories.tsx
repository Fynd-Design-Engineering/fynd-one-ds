import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverProps, PopoverPlacement } from './Popover';
import { Button } from '../atoms/Button';
import { Text } from '../Typography/Text';

const PLACEMENTS: PopoverPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
];

const RegionMenuItems = ({ onPick }: { onPick?: (label: string) => void }) => (
  <ul style={{ listStyle: 'none', margin: 0, padding: 8, minWidth: 220 }}>
    {['India', 'United Kingdom', 'United States', 'Australia', 'Singapore'].map((label) => (
      <li key={label}>
        <button
          role="menuitem"
          onClick={() => onPick?.(label)}
          style={{
            display: 'block',
            width: '100%',
            background: 'transparent',
            border: 0,
            padding: '10px 12px',
            borderRadius: 8,
            textAlign: 'left',
            font: 'inherit',
            color: 'inherit',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--fds-neutral-10, #f8f8f9)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          onFocus={(e) => (e.currentTarget.style.background = 'var(--fds-neutral-10, #f8f8f9)')}
          onBlur={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {label}
        </button>
      </li>
    ))}
  </ul>
);

const meta: Meta<PopoverProps> = {
  title: 'Molecules/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const MenuTrigger: Story = {
  args: {
    role: "dialog",
    placement: 'bottom-end',
    trigger: <Button label="India" variant="tertiary" showChevron />,
    children: <RegionMenuItems />,
  },
};

export const DialogTrigger: Story = {
  args: {
    role: 'dialog',
    placement: 'bottom-start',
    trigger: <Button label="More info" variant="secondary" />,
    children: (
      <div style={{ padding: 20, maxWidth: 320 }}>
        <Text variant="body-m" weight="medium" as="p">
          Free trial details
        </Text>
        <Text variant="body-s" color="secondary" as="p" style={{ marginTop: 8 }}>
          14-day full-feature trial. No credit card required. Cancel anytime from your dashboard.
        </Text>
      </div>
    ),
  },
};

export const DarkBackground: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          background: '#101319',
          padding: 80,
          minHeight: 320,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    role: 'menu',
    onDarkBg: true,
    placement: 'bottom-end',
    trigger: <Button label="Region" variant="tertiary" onDarkBg showChevron />,
    children: <RegionMenuItems />,
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 80,
        padding: 120,
      }}
    >
      {PLACEMENTS.map((placement) => (
        <div key={placement} style={{ display: 'flex', justifyContent: 'center' }}>
          <Popover
            role="menu"
            placement={placement}
            trigger={<Button label={placement} variant="secondary" />}
          >
            <RegionMenuItems />
          </Popover>
        </div>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Popover
          role="menu"
          placement="bottom-start"
          open={open}
          onOpenChange={setOpen}
          trigger={<Button label="Region" variant="tertiary" showChevron />}
        >
          <RegionMenuItems onPick={() => setOpen(false)} />
        </Popover>
        <Text variant="body-s" color="secondary" as="span">
          Open: {String(open)}
        </Text>
      </div>
    );
  },
};

export const RTL: Story = {
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ padding: 40 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    role: 'menu',
    placement: 'bottom-end',
    trigger: <Button label="منطقة" variant="tertiary" showChevron />,
    children: <RegionMenuItems />,
  },
};

export const MatchTriggerWidth: Story = {
  args: {
    role: 'listbox',
    placement: 'bottom-start',
    matchTriggerWidth: true,
    trigger: <Button label="Select an option" variant="secondary" style={{ width: 280 }} />,
    children: <RegionMenuItems />,
  },
};
