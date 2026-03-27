import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SectionWrapper } from '../components/_shared/SectionWrapper';
import { SectionHeader } from '../components/_shared/SectionHeader';
import { Text } from '../components/Typography/Text';
import { Button } from '../components/atoms/Button';
import { Chip } from '../components/atoms/Chip';
import { Tag } from '../components/atoms/Tag';
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
    {/* ────── 1. Hero ────── */}
    <SectionWrapper style={{ paddingTop: '80px', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
        <Chip label="AI-Powered Commerce" variant="outlined" />
        <Text variant="heading-xxl" breakpoint="desktop" as="h1">
          AI-driven commerce for modern businesses
        </Text>
        <Text variant="body-xl" weight="regular" breakpoint="desktop" style={{ maxWidth: '560px' }}>
          Build, manage, and scale your online business with intelligent tools designed for speed, accuracy, and growth.
        </Text>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
          <Button label="Get started" variant="primary" showChevron />
          <Button label="Book a demo" variant="secondary" />
        </div>
        <Grid columns={3} gap={24} style={{ marginTop: '24px', maxWidth: '780px' }}>
          <MetricCard variant="number" stat="300M+" title="Orders processed" />
          <MetricCard variant="number" stat="$2.1B" title="GMV processed" />
          <MetricCard variant="number" stat="200+" title="Integrations" />
        </Grid>
      </div>
    </SectionWrapper>

    {/* ────── 2. Tabs — Products ────── */}
    <SectionWrapper style={{ backgroundColor: '#f2f2f2' }}>
      <SectionHeader
        chipLabel="Platform"
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
              <RichIconCard icon={<StarIcon />} title="B2B website" subtext="Digital wholesale selling with custom pricing, buyer workflows and order approvals" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="Quick commerce" subtext="Storefronts + OMS + Logistics optimized for 10–30 minute deliveries" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="Marketplace selling" subtext="Sell on Amazon, Flipkart, Myntra & more with real-time sync" buttonLabel="Learn more" />
              <RichIconCard icon={<StarIcon />} title="AI cataloging" subtext="AI-powered bulk uploads, attribute content generation & tagging" buttonLabel="Learn more" />
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

    {/* ────── 3. Success Stories ────── */}
    <SectionWrapper>
      <SectionHeader
        chipLabel="Customer Stories"
        chipDotColor="green"
        chipVariant="anchor"
        title="Success stories with real impact"
        subtext="See how leading brands are transforming their commerce with Fynd."
      />
      <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
        {/* Large featured story */}
        <div style={{ flex: '1 1 50%' }}>
          <ContentCard
            chipLabel="Featured"
            title="Fynd helps a major fashion brand go omnichannel"
            subtext="How unified commerce helped scale to 500+ stores"
            imagePosition="behind"
            imageSrc="https://placehold.co/626x626/1a1a2e/ffffff?text=Featured+Story"
            clickable
            breakpoint="desktop"
          />
        </div>
        {/* Listing cards column */}
        <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ListingCard
            tags={['Retail', 'Fashion']}
            title="How Brand X scaled to 10M orders with Fynd"
            subtext="From a single store to nationwide presence in under 18 months."
            date="12 MAR, 2025"
            readTime="8 min read"
            imageAspectRatio="16:9"
          />
          <ListingCard
            tags={['D2C']}
            title="The direct-to-consumer playbook for modern brands"
            subtext="Strategies that drive customer acquisition and retention at scale."
            date="5 MAR, 2025"
            readTime="5 min read"
            showDate={false}
            showReadTime={false}
          />
        </div>
      </div>
    </SectionWrapper>

    {/* ────── 4. AI Tools ────── */}
    <SectionWrapper style={{ backgroundColor: '#f8f8f9' }}>
      <SectionHeader
        chipLabel="AI Suite"
        chipDotColor="lavender"
        chipVariant="anchor"
        title="Intelligent AI tools designed for speed, accuracy, and scale"
        subtext="Automate the repetitive, focus on the creative."
        align="center"
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

    {/* ────── 5. Built for demands — Bento ────── */}
    <SectionWrapper>
      <SectionHeader
        chipLabel="Infrastructure"
        title="Built for the demands of modern commerce"
        subtext="Enterprise-grade reliability with startup-speed iteration."
      />
      <BentoGrid ratios={['5:4', '3:2', '3:2', '5:4']}>
        <ContentCard
          chipLabel="Scalability"
          title="99.99% uptime SLA"
          subtext="Multi-region infrastructure built for peak traffic"
          imagePosition="behind"
          imageSrc="https://placehold.co/626x500/e3e3e3/5b5c5d?text=Scalability"
          clickable
          breakpoint="desktop"
        />
        <ContentCard
          chipLabel="Security"
          title="Enterprise security"
          subtext="SOC 2 compliant with end-to-end encryption"
          imagePosition="behind"
          imageSrc="https://placehold.co/626x417/d8e2f5/07285a?text=Security"
          clickable
          breakpoint="desktop"
        />
        <ContentCard
          chipLabel="APIs"
          title="Developer-first APIs"
          subtext="RESTful and GraphQL APIs with comprehensive docs"
          imagePosition="behind"
          imageSrc="https://placehold.co/626x417/c4d9cd/124f2a?text=APIs"
          clickable
          breakpoint="desktop"
        />
        <ContentCard
          chipLabel="Integrations"
          title="200+ integrations"
          subtext="Connect your entire tech stack seamlessly"
          imagePosition="behind"
          imageSrc="https://placehold.co/626x500/e7cdbc/793c16?text=Integrations"
          clickable
          breakpoint="desktop"
        />
      </BentoGrid>
    </SectionWrapper>

    {/* ────── 6. CTA Banner ────── */}
    <SectionWrapper onDarkBg>
      <CTABanner
        title="Ready to try it out?"
        subtext="Start building your commerce experience today. No credit card required."
      >
        <Button label="Get started free" variant="primary" onDarkBg showChevron />
        <Button label="Talk to sales" variant="secondary" onDarkBg />
      </CTABanner>
    </SectionWrapper>

    {/* ────── 7. FAQ (placeholder) ────── */}
    <SectionWrapper>
      <SectionHeader
        chipLabel="Support"
        title="Frequently asked questions"
        subtext="Everything you need to know about Fynd's commerce platform."
        align="center"
      />
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {['What is Fynd Commerce?', 'How does pricing work?', 'Can I migrate from my existing platform?', 'What support options are available?', 'Is there a free trial?'].map((q, i) => (
          <div key={i} style={{
            padding: '20px 0',
            borderBottom: '1px solid #e3e3e3',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text variant="body-l" weight="medium" breakpoint="desktop">{q}</Text>
            <span style={{ fontSize: '20px', color: '#5b5c5d' }}>+</span>
          </div>
        ))}
      </div>
    </SectionWrapper>

    {/* ────── 8. Footer ────── */}
    <SectionWrapper onDarkBg as="footer" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', marginBottom: '48px' }}>
        <div style={{ maxWidth: '280px' }}>
          <Text variant="heading-m" breakpoint="desktop" style={{ color: 'white', marginBottom: '16px' }}>
            Fynd
          </Text>
          <Text variant="body-m" weight="regular" breakpoint="desktop" style={{ color: '#a0a1a2' }}>
            AI-driven commerce for modern businesses. Build, manage, scale.
          </Text>
        </div>
        {[
          { title: 'Products', links: ['Commerce', 'OMS', 'PIM', 'Extensions', 'Logistics'] },
          { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press', 'Contact'] },
          { title: 'Resources', links: ['Documentation', 'API Reference', 'Status', 'Community', 'Partners'] },
        ].map((col) => (
          <div key={col.title}>
            <Text variant="body-s" weight="medium" breakpoint="desktop" style={{ color: 'white', marginBottom: '16px' }}>
              {col.title}
            </Text>
            {col.links.map((link) => (
              <div key={link} style={{ marginBottom: '8px' }}>
                <Text variant="body-s" weight="regular" breakpoint="desktop" style={{ color: '#a0a1a2' }}>
                  {link}
                </Text>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #4a4b4c', paddingTop: '24px' }}>
        <Text variant="body-xs" weight="regular" breakpoint="desktop" style={{ color: '#797a7c' }}>
          © 2025 Fynd. All rights reserved.
        </Text>
      </div>
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
