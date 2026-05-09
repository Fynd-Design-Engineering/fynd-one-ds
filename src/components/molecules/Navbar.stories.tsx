import type { Meta, StoryObj } from '@storybook/react';
import { Navbar, NavbarProps } from './Navbar';
import { Button } from '../atoms/Button';
import { Text } from '../Typography/Text';
import { IcCall } from '../../assets/icons/communication';
import {
  fyndMarketingNavItems,
  fyndSolutionsItem,
  fyndResourcesItem,
  fyndCompanyItem,
} from '../../presets/fyndMarketingNav';
import fyndLogoDark from '../../assets/brand-logos/fynd-horizontal-dark.svg';
import fyndLogoLight from '../../assets/brand-logos/fynd-horizontal-light.svg';

const meta: Meta<NavbarProps> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200vh' }}>
        <Story />
        <div style={{ padding: '40px 20px' }}>
          <Text variant="body-l" as="p" color="secondary">
            Hover over nav items to preview dropdowns. Scroll to test sticky behavior.
          </Text>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<NavbarProps>;

export const Default: Story = {
  args: {
    logo: <img src={fyndLogoDark} alt="Fynd" />,
    logoHref: '/',
    navItems: fyndMarketingNavItems,
    actions: (
      <>
        {/* Phone CTA — full text + icon on desktop, icon-only circle below 992px */}
        <Button
          className="fds-actions__desktop-only"
          label="+91 74001 56169"
          variant="tertiary"
          iconLeft={<IcCall />}
          showChevron={false}
          style={{
            fontFamily: "'Inter Display', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: 0,
          }}
          onClick={() => {}}
        />
        <a
          className="fds-actions__phone-circle"
          href="tel:+917400156169"
          aria-label="Call +91 74001 56169"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '999px',
            border: '1px solid #0000001f',
            color: 'var(--fds-neutral-100, #101319)',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <IcCall />
        </a>
        <Button
          className="fds-actions__desktop-only"
          label="Book a demo"
          variant="secondary"
          size="md"
          style={{ borderColor: '#0000001f' }}
          onClick={() => {}}
        />
        <Button label="Sign in" variant="primary" size="md" onClick={() => {}} />
        <style>{`
          @media (max-width: 991px) {
            .fds-actions__phone-circle { display: inline-flex !important; }
          }
        `}</style>
      </>
    ),
    /* Inside the open mobile drawer — sits below the nav links list
       (which already contains Customer Stories). Only the Book-a-demo
       CTA renders here; the bar already has the phone + Sign in. */
    mobileActions: (
      <Button
        label="Book a demo"
        variant="primary"
        showChevron={false}
        style={{ marginTop: '1.5rem' }}
        onClick={() => {}}
      />
    ),
    sticky: true,
  },
};

export const MegaOnly: Story = {
  args: {
    logo: <img src={fyndLogoDark} alt="Fynd" />,
    navItems: [fyndSolutionsItem, { label: 'Pricing', href: '#' }],
    actions: <Button label="Sign in" variant="primary" onClick={() => {}} />,
  },
};

export const SimpleDropdownOnly: Story = {
  args: {
    logo: <img src={fyndLogoDark} alt="Fynd" />,
    navItems: [fyndResourcesItem, fyndCompanyItem, { label: 'Customer stories', href: '#' }],
    actions: <Button label="Get started" variant="primary" onClick={() => {}} />,
  },
};

export const DirectLinksOnly: Story = {
  args: {
    logo: <img src={fyndLogoDark} alt="Fynd" />,
    navItems: [
      { label: 'Products', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Docs', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    actions: <Button label="Sign in" variant="primary" onClick={() => {}} />,
  },
};

export const DarkBackground: Story = {
  args: {
    logo: <img src={fyndLogoLight} alt="Fynd" />,
    navItems: fyndMarketingNavItems,
    onDarkBg: true,
    actions: (
      <>
        <Button label="Book a demo" variant="secondary" size="md" onDarkBg onClick={() => {}} />
        <Button label="Sign in" variant="primary" size="md" onDarkBg onClick={() => {}} />
      </>
    ),
  },
};

export const LogoOnly: Story = {
  args: {
    logo: <img src={fyndLogoDark} alt="Fynd" />,
    actions: <Button label="Sign in" variant="primary" onClick={() => {}} />,
  },
};

/* ─── Preview-only stories: dropdowns rendered open for design iteration ─── */

export const SolutionsOpen: Story = {
  name: 'Preview / Solutions open',
  args: {
    ...Default.args,
    defaultOpenDropdown: 'Solutions',
  },
};

export const ResourcesOpen: Story = {
  name: 'Preview / Resources open',
  args: {
    ...Default.args,
    defaultOpenDropdown: 'Resources',
  },
};

export const CompanyOpen: Story = {
  name: 'Preview / Company open',
  args: {
    ...Default.args,
    defaultOpenDropdown: 'Company',
  },
};
