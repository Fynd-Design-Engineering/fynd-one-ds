import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalProps } from './Modal';
import { ContactForm } from './ContactForm';
import { Button } from '../atoms/Button';
import { Text } from '../Typography/Text';

const meta: Meta<ModalProps> = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Simple: Story = {
  args: {
    trigger: <Button label="Open modal" variant="primary" />,
    width: 480,
    children: (
      <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Text variant="heading-s" as="h2">Are you sure?</Text>
        <Text variant="body-m" color="secondary" as="p">
          This action can’t be undone. The records will be deleted permanently.
        </Text>
      </div>
    ),
  },
};

export const WithContactForm: Story = {
  name: 'With ContactForm',
  args: {
    trigger: <Button label="Book a demo" variant="primary" showChevron={false} />,
    width: 550,
    children: (
      <ContactForm
        productOptions={[
          'Building a website',
          'Supply chain solutions',
          'Retail store solutions',
          'Sell on Marketplaces',
          'AI solutions',
          'Fashion manufacturing solution',
        ]}
        onSubmit={async (data) => {
          console.log('submitted', data);
          await new Promise((r) => setTimeout(r, 600));
        }}
      />
    ),
  },
};
