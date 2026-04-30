import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SiteBanner } from './SiteBanner';
import { Text } from '../Typography/Text';
import { Button } from '../atoms/Button';

const meta: Meta<typeof SiteBanner> = {
  title: 'Molecules/SiteBanner',
  component: SiteBanner,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof SiteBanner>;

export const Default: Story = {
  args: {
    children: (
      <Text variant="body-s" as="span" color="white">
        We're hiring across product, engineering, and design.
      </Text>
    ),
  },
};

export const WithInlineLink: Story = {
  args: {
    children: (
      <>
        <Text variant="body-s" as="span" color="white">
          Free onboarding for the next 30 days.
        </Text>
        <a
          href="#"
          style={{
            color: 'inherit',
            textDecoration: 'underline',
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          Claim now &rarr;
        </a>
      </>
    ),
  },
};

export const WithButton: Story = {
  args: {
    children: (
      <>
        <Text variant="body-s" as="span" color="white">
          New: Built-in AI assistant for every store.
        </Text>
        <Button label="Try it" variant="tertiary" onDarkBg showChevron />
      </>
    ),
  },
};

export const Multiline: Story = {
  args: {
    children: (
      <Text variant="body-s" as="span" color="white">
        Scheduled maintenance on Saturday, May 3 from 02:00–04:00 IST. Some
        services may be briefly unavailable.
      </Text>
    ),
  },
};
