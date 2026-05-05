import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { TextField } from './TextField';

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const meta: Meta<typeof TextField> = {
  title: 'Form/TextField',
  component: TextField,
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    showCharCount: { control: 'boolean' },
    showHelpIcon: { control: 'boolean' },
    icon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Placeholder Text',
    showHelpIcon: true,
  },
  decorators: [(Story) => <div style={{ maxWidth: 436 }}><Story /></div>],
};

export const WithIcon: Story = {
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Placeholder Text',
    showHelpIcon: true,
    icon: <HeartIcon />,
  },
  decorators: [(Story) => <div style={{ maxWidth: 436 }}><Story /></div>],
};

export const WithError: Story = {
  args: {
    label: 'Email',
    required: true,
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
  decorators: [(Story) => <div style={{ maxWidth: 436 }}><Story /></div>],
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'This will be your display name',
  },
  decorators: [(Story) => <div style={{ maxWidth: 436 }}><Story /></div>],
};

export const WithCharCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ maxWidth: 436 }}>
        <TextField
          label="Bio"
          placeholder="Tell us about yourself"
          value={value}
          onChange={setValue}
          maxLength={120}
          showCharCount
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Disabled field',
    disabled: true,
  },
  decorators: [(Story) => <div style={{ maxWidth: 436 }}><Story /></div>],
};

export const TwoColumn: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, maxWidth: 436 }}>
      <TextField label="First Name" required placeholder="First Name" showHelpIcon icon={<HeartIcon />} />
      <TextField label="Last Name" required placeholder="Last Name" showHelpIcon icon={<HeartIcon />} />
    </div>
  ),
};
