import type { Meta, StoryObj } from '@storybook/react';
import { FyndMarketingNavActions, FyndMarketingNavActionsProps } from './fyndMarketingNavActions';

/**
 * Right-hand action cluster for the marketing Navbar: phone dropdown,
 * "Book a demo" modal trigger, and a "Sign in" button.
 *
 * When the consumer detects an active console.fynd.com session, pass
 * `signedInUser` and the Sign-in button is swapped for an avatar + first
 * name pill that links to `signedInHref ?? signInHref`.
 */
const meta: Meta<FyndMarketingNavActionsProps> = {
  title: 'Presets/Fynd Marketing Nav Actions',
  component: FyndMarketingNavActions,
  parameters: { layout: 'fullscreen' },
  // Mimic the Navbar actions slot: a right-aligned flex row on a light surface.
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '1rem',
          padding: '1rem 1.5rem',
          background: '#ffffff',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    signInHref: 'https://console.fynd.com',
    onContactSubmit: (values) => console.log('Contact submit:', values),
  },
};

export default meta;
type Story = StoryObj<FyndMarketingNavActionsProps>;

/** Default: logged-out visitor sees the standard "Sign in" button. */
export const Default: Story = {};

/**
 * Signed-in visitor with a profile picture — the Sign-in button becomes an
 * avatar + first-name pill linking to the console session.
 */
export const SignedInWithAvatar: Story = {
  name: 'Signed-in (with avatar)',
  args: {
    signedInUser: {
      firstName: 'Deepak',
      profilePicUrl: 'https://i.pravatar.cc/48?img=12',
    },
    signedInHref: 'https://console.fynd.com',
  },
};

/**
 * Signed-in visitor without a profile picture — the avatar falls back to the
 * uppercased first initial on a neutral circle (no broken-image icon).
 */
export const SignedInInitialOnly: Story = {
  name: 'Signed-in (initial only)',
  args: {
    signedInUser: {
      firstName: 'Deepak',
      profilePicUrl: null,
    },
    signedInHref: 'https://console.fynd.com',
  },
};

/**
 * The icon-only contact dropdown trigger carries an accessible name via
 * `aria-label` (default "Open menu", flips to "Close menu" while open).
 * Override the closed-state label with `triggerAriaLabel` — inspect the
 * button to confirm the `aria-label` attribute.
 */
export const CustomTriggerLabel: Story = {
  name: 'Trigger aria-label override',
  args: {
    triggerAriaLabel: 'Contact Fynd',
  },
};
