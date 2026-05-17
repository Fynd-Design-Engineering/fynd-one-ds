import type { Meta, StoryObj } from '@storybook/react';
import { GatedForm, GatedFormProps } from './GatedForm';

const meta: Meta<GatedFormProps> = {
  title: 'Marketing/GatedForm',
  component: GatedForm,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 560 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<GatedFormProps>;

export const Default: Story = {
  args: {
    submitLabel: 'Download',
    onSubmit: async (values) => {
      console.log('Submitted:', values);
    },
  },
};

export const CustomLabel: Story = {
  args: {
    submitLabel: 'Get the report',
    onSubmit: async (values) => {
      console.log('Submitted:', values);
    },
  },
};
