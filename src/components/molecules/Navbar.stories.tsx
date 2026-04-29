import type { Meta, StoryObj } from '@storybook/react';
import { Navbar, NavbarProps } from './Navbar';
import { Button } from '../atoms/Button';
import { Text } from '../Typography/Text';
import {
  fyndMarketingNavItems,
  fyndSolutionsItem,
  fyndResourcesItem,
  fyndCompanyItem,
} from '../../presets/fyndMarketingNav';
import fyndLogoDark from '../../assets/brand-logos/fynd-horizontal-dark.svg';
import fyndLogoLight from '../../assets/brand-logos/fynd-horizontal-light.svg';

const meta: Meta<NavbarProps> = {
  title: 'Molecules/Navbar',
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
    navItems: fyndMarketingNavItems,
    actions: (
      <>
        <Button label="+91 74001 56169" variant="tertiary" onClick={() => {}} />
        <Button label="Book a demo" variant="secondary" onClick={() => {}} />
        <Button label="Sign in" variant="primary" onClick={() => {}} />
      </>
    ),
    mobileActions: (
      <>
        <Button label="Book a demo" variant="secondary" onClick={() => {}} />
        <Button label="Sign in" variant="primary" onClick={() => {}} />
      </>
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
        <Button label="Book a demo" variant="secondary" onDarkBg onClick={() => {}} />
        <Button label="Sign in" variant="primary" onDarkBg onClick={() => {}} />
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
