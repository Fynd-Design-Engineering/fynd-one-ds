import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SiteBanner } from './SiteBanner';
import { Navbar } from './Navbar';
import { HeroSplit } from './HeroSplit';
import { Text } from '../Typography/Text';
import { Button } from '../atoms/Button';
import { fyndMarketingNavItems } from '../../presets/fyndMarketingNav';
import {
  FyndMarketingNavActions,
  FyndMarketingNavMobileActions,
} from '../../presets/fyndMarketingNavActions';

const meta: Meta = {
  title: 'Pages/Marketing home stack',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const Logo = () => (
  <Text variant="heading-s" as="span" color="default" weight="semibold">
    ACME
  </Text>
);

const sampleImage = {
  src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=900&fit=crop',
  alt: 'Hyperlocal commerce illustration',
  width: 1200,
  height: 900,
};

const handleContactSubmit = async () => {
  await new Promise((r) => setTimeout(r, 300));
};

/**
 * Navbar overlay recipe:
 *  - `<Navbar sticky scrollAware>` floats over the hero. Its translucent
 *    / scroll-aware bg goes fully transparent while at the top of the
 *    page, so the hero color shows straight through.
 *  - `<HeroSplit topOffset="auto" ...>` reads `--fds-banner-h` and
 *    `--fds-nav-h` (auto-published when SiteBanner / Navbar are mounted)
 *    and pulls the section up under the chrome via negative margin while
 *    padding the inner content down by the same amount. No wrapping div,
 *    no manual measurements.
 */
export const NavbarAndHero: Story = {
  name: 'Navbar overlays hero',
  render: () => (
    <>
      <Navbar
        sticky
        logo={<Logo />}
        navItems={fyndMarketingNavItems}
        actions={
          <FyndMarketingNavActions onContactSubmit={handleContactSubmit} />
        }
        mobileActions={
          <FyndMarketingNavMobileActions onContactSubmit={handleContactSubmit} />
        }
      />
      <HeroSplit
        title={
          <>
            Launch a hyperlocal website in 30 minutes &amp; grow your local
            presence
          </>
        }
        description="Delight your customers with same-day deliveries."
        bullets={[
          { label: 'Build an attractive website' },
          { label: 'Automate order management' },
          { label: 'Run promotions across channels' },
        ]}
        actions={
          <>
            <Button label="Get started" variant="primary" showChevron />
            <Button label="Book a demo" variant="secondary" />
          </>
        }
        image={sampleImage}
        bg="var(--fds-blue-20, #e7eefe)"
        topOffset="auto"
      />
    </>
  ),
};

export const BannerNavbarAndHero: Story = {
  name: 'SiteBanner + Navbar overlay hero',
  render: () => (
    <>
      <SiteBanner>
        <Text variant="body-s" as="span" color="white">
          Free onboarding for the next 30 days.
        </Text>
        <Button label="Claim now" variant="tertiary" onDarkBg showChevron />
      </SiteBanner>
      <Navbar
        sticky
        logo={<Logo />}
        navItems={fyndMarketingNavItems}
        actions={
          <FyndMarketingNavActions onContactSubmit={handleContactSubmit} />
        }
        mobileActions={
          <FyndMarketingNavMobileActions onContactSubmit={handleContactSubmit} />
        }
      />
      <HeroSplit
        title="Compose your storefront with reusable building blocks"
        description="Drag, drop, and ship — every component pre-wired to your catalog."
        bullets={[
          { label: 'Theming engine' },
          { label: 'Headless commerce APIs' },
          { label: 'Edge-rendered pages' },
        ]}
        actions={
          <>
            <Button label="Get started" variant="primary" showChevron />
            <Button label="Book a demo" variant="secondary" />
          </>
        }
        image={sampleImage}
        bg="var(--fds-peach-20, #fde7d8)"
        topOffset="auto"
      />
    </>
  ),
};
