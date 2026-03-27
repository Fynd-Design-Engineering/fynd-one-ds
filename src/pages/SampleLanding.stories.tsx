import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SectionWrapper } from '../components/_shared/SectionWrapper';
import { SectionHeader } from '../components/_shared/SectionHeader';
import { Text } from '../components/Typography/Text';
import { Button } from '../components/atoms/Button';
import { Chip } from '../components/atoms/Chip';
import { Tabs } from '../components/atoms/Tabs';
import { MetricCard } from '../components/molecules/MetricCard';
import { RichIconCard } from '../components/molecules/RichIconCard';
import { ListingCard } from '../components/molecules/ListingCard';
import { ContentCard } from '../components/molecules/ContentCard';
import { CTABanner } from '../components/molecules/CTABanner';
import { BentoGrid } from '../components/layouts/BentoGrid';
import { Grid } from '../components/layouts/Grid';

const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#5c98f7" />
    <path d="M16 8L18.47 13.86L24.5 14.41L20 17.97L21.18 24.5L16 21.09L10.82 24.5L12 17.97L7.5 14.41L13.53 13.86L16 8Z" fill="white" />
  </svg>
);

const SampleLanding = () => (
  <div>
    {/* Hero Section */}
    <SectionWrapper style={{ textAlign: 'center', paddingTop: '80px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        <Chip label="AI-Powered Commerce" variant="outlined" />
        <Text variant="heading-xxl" breakpoint="desktop" as="h1">
          AI-driven commerce for modern businesses
        </Text>
        <Text variant="body-xl" weight="regular" breakpoint="desktop" style={{ maxWidth: '560px' }}>
          Build, manage, and scale your online business with intelligent tools designed for speed, accuracy, and growth.
        </Text>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button label="Get started" variant="primary" showChevron />
          <Button label="Book a demo" variant="secondary" />
        </div>
        <Grid columns={3} gap={24}>
          <MetricCard variant="number" stat="300+" title="Brands powered" />
          <MetricCard variant="number" stat="$2.1B" title="GMV processed" />
          <MetricCard variant="number" stat="200+" title="Integrations" />
        </Grid>
      </div>
    </SectionWrapper>

    {/* Tabs Section */}
    <SectionWrapper style={{ backgroundColor: '#f2f2f2' }}>
      <SectionHeader
        chipLabel="Products"
        title="Power every step of your commerce journey"
        subtext="From storefront to fulfillment, our modular platform gives you complete control."
        align="center"
      />
      <Tabs tabs={[
        {
          label: 'Online commerce',
          content: (
            <Grid columns={3} gap={20}>
              <RichIconCard icon={<StarIcon />} title="D2C website" subtext="Customized, high-performance websites with built-in SEO, order management, payments & logistics" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="B2B website" subtext="Digital wholesale selling with custom pricing, buyer workflows and order approvals for large distributors" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="Quick commerce" subtext="Storefronts + OMS + Logistics optimized for 10–30 minute deliveries" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="Marketplace selling" subtext="Sell on Amazon, Flipkart, Myntra & more with real-time sync and centralized management" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="AI cataloging" subtext="AI-powered bulk uploads, attribute content generation, mapping, tagging & error-free publishing" buttonLabel="Learn more" />
            </Grid>
          ),
        },
        {
          label: 'Supply chain & logistics',
          content: (
            <Grid columns={3} gap={20}>
              <RichIconCard icon={<StarIcon />} title="Order management" subtext="End-to-end order orchestration across all channels" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="Warehouse management" subtext="Inventory tracking, picking, packing, and shipping automation" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="Last mile delivery" subtext="Route optimization and real-time delivery tracking" buttonLabel="Learn more" />
            </Grid>
          ),
        },
        {
          label: 'In-store tech',
          content: (
            <Grid columns={3} gap={20}>
              <RichIconCard icon={<StarIcon />} title="Point of sale" subtext="Modern POS with unified inventory and customer data" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="Endless aisle" subtext="Never lose a sale — access full catalog from any store" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="Clienteling" subtext="Personalized in-store experiences powered by customer data" buttonLabel="Learn more" />
            </Grid>
          ),
        },
      ]} />
    </SectionWrapper>

    {/* Products Bento Section */}
    <SectionWrapper>
      <SectionHeader
        chipLabel="Platform"
        title="Power every step of your commerce journey"
        subtext="From storefront to fulfillment, our modular platform gives you complete control."
        align="center"
      />
      <BentoGrid ratios={['5:4', '3:2', '3:2', '5:4', 'wide']}>
        <ContentCard
          chipLabel="Storefront"
          title="Beautiful online stores"
          subtext="Theme-powered storefronts that convert"
          imagePosition="behind"
          imageSrc="https://placehold.co/626x500/e3e3e3/5b5c5d?text=Storefront"
          clickable
          breakpoint="desktop"
        />
        <ContentCard
          chipLabel="OMS"
          title="Order management"
          subtext="End-to-end order orchestration"
          imagePosition="behind"
          imageSrc="https://placehold.co/626x417/d8e2f5/07285a?text=OMS"
          clickable
          breakpoint="desktop"
        />
        <ContentCard
          chipLabel="Logistics"
          title="Smart fulfillment"
          subtext="AI-optimized shipping and delivery"
          imagePosition="behind"
          imageSrc="https://placehold.co/626x417/c4d9cd/124f2a?text=Logistics"
          clickable
          breakpoint="desktop"
        />
        <ContentCard
          chipLabel="Analytics"
          title="Data-driven insights"
          subtext="Real-time dashboards for every metric"
          imagePosition="behind"
          imageSrc="https://placehold.co/626x500/e7cdbc/793c16?text=Analytics"
          clickable
          breakpoint="desktop"
        />
        <ContentCard
          chipLabel="Extensions"
          title="Extend with 200+ integrations"
          subtext="Connect your favorite tools and services"
          imagePosition="behind"
          imageSrc="https://placehold.co/1272x417/f2f2f2/5b5c5d?text=Extensions+Marketplace"
          buttonLabel="Explore marketplace"
          breakpoint="desktop"
        />
      </BentoGrid>
    </SectionWrapper>

    {/* Success Stories */}
    <SectionWrapper style={{ backgroundColor: '#f8f8f9' }}>
      <SectionHeader
        chipLabel="Customer Stories"
        chipDotColor="green"
        chipVariant="anchor"
        title="Success stories with real impact"
        subtext="See how leading brands are transforming their commerce with Fynd."
      />
      <Grid columns={3} gap={24}>
        <ListingCard
          tags={['Retail', 'Fashion']}
          title="How Brand X scaled to 10M orders with Fynd"
          subtext="From a single store to nationwide presence in under 18 months."
          date="12 MAR, 2025"
          readTime="8 min read"
        />
        <ListingCard
          tags={['D2C']}
          title="The direct-to-consumer playbook for modern brands"
          subtext="Strategies that drive customer acquisition and retention at scale."
          date="5 MAR, 2025"
          readTime="5 min read"
        />
        <ListingCard
          tags={['Enterprise', 'B2B']}
          title="Enterprise commerce: building for complexity"
          subtext="Multi-brand, multi-region commerce with unified management."
          date="28 FEB, 2025"
          readTime="6 min read"
        />
      </Grid>
    </SectionWrapper>

    {/* AI Tools Section */}
    <SectionWrapper>
      <SectionHeader
        chipLabel="AI Suite"
        chipDotColor="lavender"
        chipVariant="anchor"
        title="Intelligent AI tools designed for speed, accuracy, and scale"
        subtext="Automate the repetitive, focus on the creative."
      />
      <Grid columns={3} gap={24}>
        <RichIconCard icon={<StarIcon />} title="AI-Powered PIM" subtext="Auto-generate product descriptions, tags, and attributes from images." buttonLabel="Learn more" />
        <RichIconCard icon={<StarIcon />} title="Smart Search" subtext="Natural language search that understands shopper intent." buttonLabel="Learn more" />
        <RichIconCard icon={<StarIcon />} title="Visual Merchandising" subtext="AI-curated collections and automated catalog management." buttonLabel="Learn more" />
        <RichIconCard icon={<StarIcon />} title="Dynamic Pricing" subtext="Real-time pricing optimization based on demand and competition." buttonLabel="Learn more" />
        <RichIconCard icon={<StarIcon />} title="Fraud Detection" subtext="ML-powered fraud prevention that adapts to new patterns." buttonLabel="Learn more" />
        <RichIconCard icon={<StarIcon />} title="Personalization" subtext="1:1 product recommendations across every touchpoint." buttonLabel="Learn more" />
      </Grid>
    </SectionWrapper>

    {/* CTA Section */}
    <SectionWrapper onDarkBg>
      <CTABanner
        title="Ready to try it out?"
        subtext="Start building your commerce experience today. No credit card required."
      >
        <Button label="Get started free" variant="primary" onDarkBg showChevron />
        <Button label="Talk to sales" variant="secondary" onDarkBg />
      </CTABanner>
    </SectionWrapper>
  </div>
);

const meta: Meta = {
  title: 'Pages/Sample Landing',
};

export default meta;
type Story = StoryObj;

export const FullPage: Story = {
  render: () => <SampleLanding />,
};
