import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm, ContactFormProps } from './ContactForm';

const meta: Meta<ContactFormProps> = {
  title: 'Molecules/ContactForm',
  component: ContactForm,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 550, border: '1px solid #e3e3e3', borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<ContactFormProps>;

const PRODUCT_OPTIONS = [
  'Building a website',
  'Supply chain solutions',
  'Retail store solutions',
  'Sell on Marketplaces',
  'AI solutions',
  'Fashion manufacturing solution',
];

const logSubmit = async (values: unknown) => {
  console.log('ContactForm submit →', values);
  await new Promise((r) => setTimeout(r, 600));
};

export const Default: Story = {
  args: {
    productOptions: PRODUCT_OPTIONS,
    onSubmit: logSubmit,
  },
};

export const ValidationDemo: Story = {
  name: 'Validation — submit empty form',
  args: {
    formTitle: 'Tab into a field, then click Submit to see all errors',
    productOptions: PRODUCT_OPTIONS,
    onSubmit: logSubmit,
  },
};

/**
 * Manual smoke-test guide for per-country phone validation. Open the
 * country dropdown and pick each ISO. Try the "valid" and "invalid"
 * sample inputs — only the valid one should pass libphonenumber-js's
 * `isValid()` check.
 *
 * | Country | Valid          | Invalid         |
 * | ------- | -------------- | --------------- |
 * | IN +91  | 98765 43210    | 12345           |
 * | US +1   | (415) 555-2671 | 555 1234        |
 * | GB +44  | 7400 123456    | 12345           |
 * | DE +49  | 30 12345678    | 1               |
 *
 * Expected: invalid input → red border + "Enter a valid phone number."
 * Valid input on submit → values.phone is normalized to E.164
 * (e.g. "+919876543210") in the console.
 */
export const PhoneCountryShowcase: Story = {
  name: 'Phone — flags + per-country validation',
  args: {
    formTitle: 'Try changing the country and entering a number',
    productOptions: PRODUCT_OPTIONS,
    onSubmit: logSubmit,
  },
};

export const NoProductSelect: Story = {
  args: {
    onSubmit: logSubmit,
  },
};

export const CustomAgreement: Story = {
  args: {
    productOptions: PRODUCT_OPTIONS,
    agreement: (
      <span style={{ fontSize: 12, color: '#797a7c', textAlign: 'center', display: 'block' }}>
        Custom legal copy goes here.
      </span>
    ),
    onSubmit: logSubmit,
  },
};
