# Fynd One Design System — Patterns, Principles & Recipes

> Companion to `CLAUDE.md`. Load this when you need composition examples, opinionated design guidance, marketing-preset details, or full reset.css decisions. The main `CLAUDE.md` file holds the mandatory rules and component API reference; this file holds the "how to use them well" content.

---

## A · Setup — Reset.css Decisions

`tokens.css` bundles the DS reset (`@import './reset.css'`). Decisions:

- `box-sizing: border-box` on every element (predictable sizing math).
- `html`, `body`, headings, and `<p>` have margins zeroed; body gets a `1.5` line-height and a system-font fallback.
- Block-level media (`img`, `video`, `picture`, `svg`, `canvas`) is `display: block; max-width: 100%`.
- Form controls inherit `font` and `color` from their parent.
- Raw `<button>` elements lose UA chrome (transparent background, no border, pointer cursor) so they can be used as click targets without re-styling. The `Button` component re-applies its own styles on top.
- Lists with a class (`<ul class="...">`) lose default bullets; bare `<ul>` / `<ol>` keep them so prose markup stays readable.
- `<a>` colors and `<table>` defaults are **not** touched — those belong to component/page concerns.
- Focus rings are preserved.
- `prefers-reduced-motion` is honoured.

To opt out, import only the reset standalone, or skip it and bring your own:

```tsx
import '@fynd-design-engineering/fynd-one-ds/styles/reset.css';
```

---

## B · Marketing Presets — Full Details

`Navbar` and `Footer` ship with empty slots by default. The fynd.com marketing nav + footer content (mega Solutions dropdown with 7 categories, Resources / Company simple dropdowns, all 10 footer link sections, mission copy, certification badges, social icons, animated Lottie wordmark) is exported as **opt-in presets**.

**Drop-in: no asset setup needed.** Every preset icon and brand mark is bundled as a React SVG component (via SVGR), so the bundler inlines markup at consumer build time. There are no `/assets/...` paths to mirror in `public/`. Trailing certification badges (AICPA / GDPR / BSI) load from external CDN URLs and are safe to render as-is.

```tsx
import {
  Navbar,
  Footer,
  fyndMarketingNavItems,
  FyndMarketingNavActions,
  FyndMarketingNavMobileActions,
  fyndMarketingFooterPreset,
} from '@fynd-design-engineering/fynd-one-ds';

// Marketing site, drop-in. The Book-a-demo button opens a Modal
// containing ContactForm; wire `onContactSubmit` to your CRM/HubSpot.
<Navbar
  logo={<Logo />}
  navItems={fyndMarketingNavItems}
  actions={<FyndMarketingNavActions onContactSubmit={submit} />}
  mobileActions={<FyndMarketingNavMobileActions onContactSubmit={submit} />}
/>
<Footer {...fyndMarketingFooterPreset} />
```

### Override patterns

```tsx
// Trim items
import { fyndSolutionsItem, fyndCompanyItem } from '@fynd-design-engineering/fynd-one-ds';
<Navbar navItems={[fyndSolutionsItem, fyndCompanyItem]} />

// Edit a category in-place
const customSolutions = {
  ...fyndSolutionsItem,
  categories: fyndSolutionsItem.categories.filter((c) => c.key !== 'fsp'),
};

// Spread + override one Footer field
<Footer {...fyndMarketingFooterPreset} legalLinks={[{ label: 'Privacy', href: '/privacy' }]} />
```

Subpath imports keep the bundle small if you only need part of the preset:

```tsx
import { fyndFooterLinkSections } from '@fynd-design-engineering/fynd-one-ds/presets/fyndMarketingFooter';
```

### Available exports

- `fyndMarketingNavItems` — array, full top-nav (Solutions, Resources, Company, Customer stories).
- `fyndSolutionsItem`, `fyndResourcesItem`, `fyndCompanyItem`, `fyndCustomerStoriesItem` — individual `NavItem`s for composition.
- `FyndMarketingNavActions` — right-side action group (phone CTA + icon-only mobile circle, Book-a-demo trigger that opens `Modal` + `ContactForm`, Sign in). Override copy/URLs via props; pass `onContactSubmit` to wire the form to your CRM.
- `FyndMarketingNavMobileActions` — single Book-a-demo Modal trigger for the mobile drawer.
- `fyndMarketingProductOptions` — canonical "Product interested" select options used in the Book-a-demo form. Both `FyndMarketingNavActions` presets default to this list, so consumers don't have to maintain it. Override per-instance via the `productOptions` prop, or import it directly for your own ContactForm composition.
- `fyndMarketingFooterPreset` — partial `FooterProps` ready to spread.
- `fyndFooterLinkSections`, `fyndFooterContentPairs`, `fyndFooterLegalLinks`, `fyndFooterSocialLinks` — discrete pieces.
- `FyndFooterLottieWordmark` — animated Fynd wordmark (uses `lottie-react`, runtime dep).
- `FyndFooterTrailingBadges` — AICPA / GDPR / BSI cert images.

The DS components themselves stay generic — no preset coupling. Use the preset, replace it, or build your own.

---

## C · Composition Patterns

### Standard Page Section
```jsx
<Section
  bg="default"
  align="center"
  chipLabel="Platform"
  title="Everything you need"
  subtext="Build, manage, and scale your commerce."
>
  <Grid columns={3}>
    <RichIconCard icon={<IcCommerce />} title="Commerce" subtext="Online store" />
    <RichIconCard icon={<IcLogistics />} title="Logistics" subtext="Ship anywhere" />
    <RichIconCard icon={<IcEngage />} title="Engage" subtext="Reach customers" />
  </Grid>
</Section>
```

### Hero Section (No Header)
```jsx
<SectionWrapper bg="dark" as="section">
  <Text variant="heading-xxl" as="h1" color="white">
    Build your commerce
  </Text>
  <Text variant="body-xl" as="p" color="white">
    The complete platform for modern retail.
  </Text>
  <Button label="Get started" variant="primary" onDarkBg />
</SectionWrapper>
```

### Dark Section with Cards
```jsx
<Section bg="dark" title="By the numbers" chipLabel="Impact" onDarkBg>
  <Grid columns={4}>
    <MetricCard variant="number" stat="500+" title="Brands" onDarkBg />
    <MetricCard variant="number" stat="10M+" title="Orders" onDarkBg />
    <MetricCard variant="number" stat="99.9%" title="Uptime" onDarkBg />
    <MetricCard variant="number" stat="50+" title="Countries" onDarkBg />
  </Grid>
</Section>
```

### Gradient Section
```jsx
<GradientSurface gradient="ai" as="section">
  <SectionWrapper onDarkBg>
    <Text variant="heading-xl" as="h2" color="white">AI-Powered</Text>
    <Text variant="body-l" as="p" color="white">
      Intelligent automation across your workflow.
    </Text>
  </SectionWrapper>
</GradientSurface>
```

### Tabbed Content
```jsx
<Section title="Solutions" chipLabel="Products">
  <Tabs
    variant="card"
    tabs={[
      {
        label: 'Commerce',
        dotColor: 'blue',
        content: (
          <Grid columns={3}>
            <ContentCard title="D2C" subtext="Direct to consumer" imagePosition="bottom-right" imageSrc="/d2c.png" />
            <ContentCard title="B2B" subtext="Wholesale" imagePosition="bottom-right" imageSrc="/b2b.png" />
            <ContentCard title="QSR" subtext="Quick service" imagePosition="bottom-right" imageSrc="/qsr.png" />
          </Grid>
        ),
      },
      {
        label: 'Operations',
        dotColor: 'green',
        content: (
          <Grid columns={2}>
            <ContentCard title="OMS" subtext="Order management" imagePosition="below" imageSrc="/oms.png" />
            <ContentCard title="WMS" subtext="Warehouse" imagePosition="below" imageSrc="/wms.png" />
          </Grid>
        ),
      },
    ]}
  />
</Section>
```

### CTA Banner
```jsx
<SectionWrapper bg="dark">
  <CTABanner
    title="Ready to get started?"
    subtext="Join 500+ brands building with Fynd."
    onDarkBg
  >
    <Button label="Start free trial" variant="primary" onDarkBg />
    <Button label="Talk to sales" variant="secondary" onDarkBg />
  </CTABanner>
</SectionWrapper>
```

### Bento Layout
```jsx
<Section title="Features" chipLabel="Highlights">
  <BentoGrid ratios={['3:2', '3:4', '5:4']} gap={20}>
    <ContentCard title="Themes" subtext="Beautiful storefronts" imagePosition="behind" imageSrc="/themes.png" />
    <ContentCard title="Extensions" subtext="Add functionality" imagePosition="below" imageSrc="/ext.png" />
    <ContentCard title="Analytics" subtext="Data insights" imagePosition="bottom-right" imageSrc="/analytics.png" />
  </BentoGrid>
</Section>
```

### Rail with Cards
```jsx
<Section title="Explore our solutions" chipLabel="Solutions">
  <Rail gap={20}>
    <div style={{ width: 340 }}>
      <ContentCard title="D2C Storefront" subtext="Launch your brand" imagePosition="below" imageSrc="/d2c.png" />
    </div>
    <div style={{ width: 340 }}>
      <ContentCard title="Marketplace" subtext="Multi-channel selling" imagePosition="below" imageSrc="/mp.png" />
    </div>
    <div style={{ width: 340 }}>
      <ContentCard title="OMS" subtext="Order management" imagePosition="below" imageSrc="/oms.png" />
    </div>
  </Rail>
</Section>
```

### Pricing Section
```jsx
<Section title="Pricing" chipLabel="Plans" align="center">
  <Grid columns={3}>
    <PricingCard
      label="Starter"
      title="Ideal for"
      titleBold="new businesses"
      amount="4,999"
      buttonLabel="Get Started"
      buttonVariant="tertiary"
      features={[{ text: 'Feature one' }, { text: 'Feature two' }]}
    />
    <PricingCard
      label="Pro"
      popularText="Most popular"
      title="Ideal for"
      titleBold="growing brands"
      amount="11,111"
      buttonLabel="Get Started"
      features={[{ text: 'Feature one' }, { text: 'Feature two' }, { text: 'Feature three' }]}
    />
    <PricingCard
      label="Enterprise"
      title="Built for"
      titleBold="scale"
      amount="49,999"
      buttonLabel="Contact Sales"
      buttonVariant="secondary"
      features={[{ text: 'Feature one' }, { text: 'Feature two' }]}
    />
  </Grid>
</Section>
```

### FAQ Section
```jsx
<Section title="Frequently asked questions" chipLabel="Support" align="center">
  <Accordion items={[
    { question: 'What is Fynd Commerce?', answer: 'An AI-driven commerce platform.' },
    { question: 'How does pricing work?', answer: 'Flexible plans starting from ₹4,999/year.' },
    { question: 'Is there a free trial?', answer: 'Yes, 14 days with full access.' },
  ]} />
</Section>
```

### Search + Filter Bar
```jsx
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <SearchBar placeholder="Search products..." value={query} onChange={setQuery} />
  <FilterButton filterCount={activeFilters} onClick={openFilters} />
</div>
```

### Form with TextFields
```jsx
<Grid columns={2} gap={16}>
  <TextField label="First Name" required placeholder="John" />
  <TextField label="Last Name" required placeholder="Doe" />
  <TextField label="Email" required type="email" placeholder="john@example.com" icon={<IcMail />} />
  <TextField label="Phone" type="tel" placeholder="+91 98765 43210" />
</Grid>
```

### Paginated List
```jsx
<Section title="Blog" chipLabel="Stories">
  <Grid columns={3}>
    {posts.map(post => (
      <ListingCard key={post.id} title={post.title} tags={post.tags} date={post.date} />
    ))}
  </Grid>
  <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
</Section>
```

---

## D · Design Principles — Making Pages Look Great

These rules help you make strong visual design decisions when building pages with this DS.

### Visual Hierarchy
- **One dominant element per viewport.** Every screen fold needs exactly one focal point — a Heading XXL/XL or a hero image. Everything else is subordinate.
- **Size jumps create hierarchy.** Skip at least one type scale level between heading and body (e.g., heading-xl for title, body-l for description). Adjacent sizes (heading-m + heading-s) feel muddy.
- **Use `textColors.title` for primary content, `textColors.subtext` for secondary.** Never use more than these two text colors on light backgrounds.
- **Weight reinforces, never replaces, size.** Use font size first, then weight as a secondary signal.
- **Limit heading levels per section to two.** A SectionHeader title + card titles is enough. A third heading level makes the section cluttered.

### Whitespace & Breathing Room
- **Section padding is sacred.** Always use `sectionPadding.y` (56px desktop / 32px mobile). Never reduce it to "fit more in."
- **The larger the text, the more space around it.** Heading XXL needs `spacing[64]` or `spacing[80]` below. Body text needs `spacing[16]` or `spacing[24]`.
- **Card internal padding: `spacing[24]` minimum desktop, `spacing[16]` mobile.** Tighter makes content feel trapped.
- **Empty space is a feature.** A section with a heading, one sentence, and 3 cards beats one with 5 paragraphs and 6 cards.
- **Gap between grid items: `spacing[24]` desktop, `spacing[16]` mobile.**

### Typography Pairing
- **Hero pattern:** heading-xxl (72px) + body-xl (16px). The size contrast is dramatic — ideal for heroes.
- **Section header pattern:** heading-xl (56px) + body-l (18px).
- **Card title pattern:** heading-s (26px) or body-xl-medium + body-m-regular (16px).
- **Maximum line length: 720px.** Beyond this, reading comprehension drops.
- **Never center-align body text longer than 3 lines.** Center alignment is for headings and short descriptions only.

### Color Usage
- **60-30-10 rule:** 60% white/light backgrounds, 30% text/borders (neutrals), 10% one accent color.
- **Pick ONE accent color per page.** Use its 40/50 shade for emphasis, 10 shade for tinted backgrounds. Never use two accent families on the same page.
- **Gradients are decorative, not structural.** Use `GradientSurface` on 1-2 sections max.
- **Status colors (green, gold, red) are ONLY for status indicators.** Never use red as decorative accent.
- **Muted > Bold for most content.** Use accent-10 and accent-20 shades for card backgrounds. Reserve accent-50/60 for CTAs only.

### Layout Rhythm
- **Grid column counts:** 3 or 4 columns desktop, 2 tablet, 1 mobile. Avoid 5+ columns.
- **BentoGrid is for feature showcases with mixed content types.** Don't use bento for uniform card lists — use Grid.
- **Alignment is non-negotiable.** Every element must sit on the container grid.
- **Asymmetry that works:** A 2:1 split (large image left, text right) is intentional. Random sizing is not.

### Card Design
- **Shadow depth:** No shadow for flat cards on colored backgrounds. Subtle shadow on white. Shadow increase on hover only.
- **Hover states: one property change only.** Either lift OR background shift. Never animate multiple properties.
- **Content density per card:**
  - MetricCard: one number + one label. Nothing else.
  - RichIconCard: icon + title + 2-line description. No images.
  - ContentCard: image + title + description (3 lines max) + optional CTA.
  - PricingCard: price + plan name + 5-7 features max.
- **Cards in a row must be equal height.** Grid handles this automatically.

### Section Composition — Page Flow
Follow this proven order:
1. **Hero** — Heading XXL + subtitle + primary CTA
2. **Logo bar** — LogoMarquee for social proof
3. **Key metrics** — 3-4 MetricCards in a Grid
4. **Feature showcase** — BentoGrid or Rail with ContentCards
5. **Detailed features** — RichIconCard grid (3 or 4 col)
6. **Testimonials** — ContentCards or quote blocks
7. **Pricing** — PricingCard grid (2-3 options)
8. **Final CTA** — CTABanner (dark background)
9. **FAQ** — Accordion

Not every page needs all sections. A focused landing page should have 4-6 sections. More than 8 is almost always too many.

- **Alternate section backgrounds.** Light → muted → light → dark creates visual rhythm. Never use 3+ consecutive same-background sections.
- **Every section needs a clear job.** If you can't describe the section's purpose in 5 words, it shouldn't exist.
- **CTA placement: top and bottom.** Primary CTA in the hero, repeat in CTABanner near the footer.

### Responsive Design Thinking
- **Mobile is not "desktop but smaller."** Re-evaluate content priority per breakpoint.
- **Stacking order on mobile:** Heading → Description → Image → CTA. Never put image above heading.
- **Touch targets: 44px minimum height.** Buttons already handle this.
- **Mobile typography floor: 14px.** Never go below 12px for any text.
- **Reduce grid columns, not content.** 4→2→1. Don't hide cards — reflow them.
- **Horizontal scrolling is forbidden** except for intentional Rail/LogoMarquee.

### Modern Web Trends (2024-2026)
- **Bento grids:** 4-6 cells max, each cell a self-contained card.
- **Gradient surfaces:** Subtle, low-opacity. Section backgrounds, not on small elements.
- **Editorial layouts:** Large type (heading-xxl), generous whitespace, minimal UI chrome.
- **Dark sections as punctuation.** 1-2 per page for dramatic contrast breaks.
- **Reduced UI density.** Show less per viewport, let users scroll. 3 cards with breathing room beats 6 crammed cards.
- **Oversized section headings.** heading-xxl (72px) for hero, heading-xl (56px) for key sections. Big text works with ample whitespace.

### Common AI Design Mistakes
- **Too many colors.** Pick one accent family, use it sparingly.
- **Inconsistent spacing.** Only use the spacing scale: 4, 8, 12, 16, 24, 32, 40, 56, 64, 80.
- **Over-decorating.** Borders + shadows + gradients + rounded corners all on one element. Use one decorative treatment per element.
- **Every section looks the same.** Vary patterns — BentoGrid, then metrics, then full-width, then card grid.
- **Cramming content.** Card descriptions: 1-3 sentences max (under 120 characters ideal).
- **CTA below the fold.** Primary CTA must be in the first viewport.
- **Center-aligning everything.** Center section headers, but left-align card content and long text.
- **Making all buttons primary.** One primary Button per viewport. Use secondary/tertiary for other actions.
- **Ignoring text hierarchy.** Maintain at least 2 scale steps between section headings and card headings.

### Dark Mode Design
- **Use `backgroundColors.darkest` (#101319), not pure black.** The slight warmth reduces eye strain.
- **Dark text: white for titles, `neutrals.40` (#a0a1a2) for subtext.**
- **Shadows are invisible on dark.** Replace with subtle border (`neutrals.80` / #4a4b4c) for card elevation.
- **Buttons on dark:** Use `onDarkBg` — primary inverts to white bg, secondary gets white border.
- **Dark sections: 1-2 per page.** A fully dark page needs careful elevation hierarchy.
- **Images on dark:** Consider slightly reducing brightness to prevent "blow out" against dark backgrounds.

### Quick Reference: Spacing

| Context | Desktop | Mobile |
|---|---|---|
| Between sections | 56px | 32px |
| Section header → content | 40px | 32px |
| Grid gap | 24px | 16px |
| Card internal padding | 24-32px | 16-24px |
| Heading → body text | 16px | 12px |
| Body text → CTA button | 24px | 24px |
| Page horizontal padding | 120px | 20px |

### Quick Reference: Component Selection

| Need | Component | Columns |
|---|---|---|
| Page hero with CTA | SectionWrapper + heading-xxl + Button | 1 |
| Trust logos | LogoMarquee | scroll |
| Key numbers | MetricCard in Grid | 3-4 |
| Feature overview | BentoGrid with ContentCard | 2-3 |
| Feature list | RichIconCard in Grid | 3-4 |
| Blog/content cards | ContentCard in Grid | 3 |
| Pricing comparison | PricingCard in Grid | 2-3 |
| Horizontally scrollable | Rail with cards | scroll |
| Final CTA | CTABanner (dark bg) | 1 |
| FAQ | Accordion | 1 |
| Filters + Search | SearchBar + FilterButton | inline |
| Form fields | TextField in Grid | 1-2 |
| Pagination | Pagination | 1 |

---

## E · Battle-Tested Patterns (Lessons from Real Builds)

### Golden Rule: No Inline Styles for Layout

If you're reaching for `style={{ }}` for layout, spacing, or typography — stop. There's a component for it.

| "I want…" | Use this, NOT inline styles |
|---|---|
| Page section with padding | `<Section>` or `<SectionWrapper>` |
| Centered text with chip + title + subtext | `<Section align="center" chipLabel="..." title="..." subtext="...">` |
| Grid of cards | `<Grid columns={3}>` |
| Horizontal spacing between items | `gap` prop on Grid/BentoGrid/Rail |
| Text styling | `<Text variant="..." color="...">` |
| Buttons side by side | `actions` prop on Section, or a `<div>` with `display: flex; gap: 12px` |
| Full-width container | `<SectionWrapper>` — never `max-width` manually |

### Hero Section — The Right Way

```jsx
// ✅ DO — Use Section with center alignment and actions
<Section
  align="center"
  chipLabel="AI-Powered Commerce"
  title="AI-driven commerce for modern businesses"
  subtext="Build, manage, and scale your online business."
  titleSize="xxl"
  actions={
    <>
      <Button label="Get started" variant="primary" showChevron />
      <Button label="Book a demo" variant="secondary" />
    </>
  }
>
  <Grid columns={3}>
    <MetricCard variant="number" stat="300M+" title="Orders processed" />
    <MetricCard variant="number" stat="$2.1B" title="GMV processed" />
    <MetricCard variant="number" stat="200+" title="Integrations" />
  </Grid>
</Section>
```

```jsx
// ❌ DON'T — Raw components in SectionWrapper with manual spacing
<SectionWrapper>
  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Chip label="AI-Powered Commerce" />
    <Text variant="heading-xxl">Title</Text>
    <Text variant="body-xl">Subtitle</Text>
    <div style={{ display: 'flex', gap: 16 }}>
      <Button label="Get started" />
      <Button label="Book a demo" />
    </div>
  </div>
</SectionWrapper>
```

Why: Section handles chip + title + subtext + actions with proper spacing, alignment, and responsive behavior automatically. Manual assembly misses the 56px margin-bottom, responsive gap changes, and text width constraints.

### SectionWrapper vs Section — When to Use Which

| Scenario | Use | Why |
|---|---|---|
| Section with chip + title + subtext header | `<Section>` | Built-in SectionHeader with proper spacing |
| Hero (custom layout, no standard header) | `<SectionWrapper>` | You control the content entirely |
| CTA banner | `<SectionWrapper bg="dark">` + `<CTABanner>` | CTABanner IS the content |
| Footer | `<SectionWrapper bg="dark" as="footer">` | No section header needed |
| Content with standard header + actions | `<Section actions={<Button .../>}>` | Actions position handled automatically |
| Full-width content (tabs, rail) | `<Section fullWidthContent>` | Content breaks out of inner container |

### Dark Backgrounds — onDarkBg Must Cascade

When you use `bg="dark"` on Section or SectionWrapper, you MUST pass `onDarkBg` to **every** child component. Section passes it to its SectionHeader automatically, but NOT to children.

```jsx
// ✅ DO — Pass onDarkBg to every child
<Section bg="dark" title="Stats" chipLabel="Impact" onDarkBg>
  <Grid columns={4}>
    <MetricCard variant="number" stat="500+" title="Brands" onDarkBg />
    <MetricCard variant="number" stat="10M+" title="Orders" onDarkBg />
    <MetricCard variant="number" stat="99.9%" title="Uptime" onDarkBg />
    <MetricCard variant="number" stat="50+" title="Countries" onDarkBg />
  </Grid>
</Section>

// ❌ DON'T — Forget onDarkBg on children (text will be invisible)
<Section bg="dark" title="Stats" onDarkBg>
  <Grid columns={4}>
    <MetricCard variant="number" stat="500+" title="Brands" />  {/* WRONG — dark text on dark bg */}
  </Grid>
</Section>
```

Components that accept `onDarkBg`: Button, Chip, Tag, Text (`color="white"`), MetricCard, RichIconCard, ContentCard, ListingCard, PricingCard, CTABanner, TitleContentPair, Accordion, SectionHeader.

### Footer Pattern

```jsx
// ✅ DO — Use Grid for footer columns
<SectionWrapper bg="dark" as="footer">
  <Grid columns={4} gap={40}>
    <div>
      <Text variant="heading-m" color="white">Fynd</Text>
      <Text variant="body-m" color="muted">AI-driven commerce.</Text>
    </div>
    <div>
      <Text variant="body-s" weight="medium" color="white">Products</Text>
      <Text variant="body-s" color="muted">Commerce</Text>
      <Text variant="body-s" color="muted">OMS</Text>
    </div>
    <div>
      <Text variant="body-s" weight="medium" color="white">Company</Text>
      <Text variant="body-s" color="muted">About</Text>
      <Text variant="body-s" color="muted">Careers</Text>
    </div>
    <div>
      <Text variant="body-s" weight="medium" color="white">Resources</Text>
      <Text variant="body-s" color="muted">Docs</Text>
      <Text variant="body-s" color="muted">API</Text>
    </div>
  </Grid>
</SectionWrapper>

// ❌ DON'T — Inline flex for footer columns
<div style={{ display: 'flex', justifyContent: 'space-between', gap: 40 }}>
```

### Section Rhythm — Background Alternation

Follow this pattern for visual rhythm on a full landing page:

```
Section 1 (Hero):       bg="default"  (white)
Section 2 (Logos):      bg="default"  (white)
Section 3 (Features):   bg="muted"    (light gray)
Section 4 (Stories):    bg="default"  (white)
Section 5 (AI Tools):   bg="subtle"   (very light gray)
Section 6 (Bento):      bg="default"  (white)
Section 7 (CTA):        bg="dark"     (dark — contrast break)
Section 8 (FAQ):        bg="default"  (white)
Section 9 (Footer):     bg="dark"     (dark)
```

Rules:
- **Never 3+ consecutive same-background sections**
- **Dark sections: max 2 per page** (CTA + footer is the standard)
- **GradientSurface: max 1 per page** — use for the most important feature section
- **Muted/subtle alternate with default** to create gentle rhythm without jarring transitions

### Pre-Flight Checklist

Before considering a page done, verify:

1. [ ] **No inline styles for layout** — all spacing/padding via Section/SectionWrapper/Grid
2. [ ] **Every text element uses `<Text>`** — no raw `<h1>`, `<p>`, `<span>`
3. [ ] **Heading hierarchy is sequential** — h1 → h2 → h3, no skips
4. [ ] **`onDarkBg` cascaded to ALL children** on dark/gradient sections
5. [ ] **One primary Button per viewport** — secondary/tertiary for other actions
6. [ ] **Section backgrounds alternate** — no 3+ consecutive same-bg
7. [ ] **Card descriptions under 120 characters** — no walls of text in cards
8. [ ] **Grid columns responsive** — verified at desktop, tablet, mobile
9. [ ] **No hardcoded hex colors** — all from tokens
10. [ ] **Images have `alt` text** — meaningful for content, empty for decorative
11. [ ] **Primary CTA in first viewport** — hero section has the main action

---

## F · Component Usage Examples

JSX usage examples for components whose API tables live in `CLAUDE.md` § 6.

### HeroSplit

```jsx
<HeroSplit
  title={<>Launch a hyperlocal website in 30 minutes</>}
  description="Delight your customers with same-day deliveries"
  bullets={[
    { label: 'Build a website' },
    { label: 'Automate orders' },
    { label: 'Run promotions' },
  ]}
  image={{ src: '/hero.png', alt: 'Hyperlocal storefront', width: 1200, height: 900 }}
  bg="var(--fds-blue-20)"
  actions={
    <>
      <Button label="Get started" variant="primary" showChevron />
      <Button label="Book a demo" variant="secondary" />
    </>
  }
/>
```

### SiteBanner

```jsx
<SiteBanner>
  <Text variant="body-s" as="span" color="white">
    Free onboarding for the next 30 days.
  </Text>
  <Button label="Claim now" variant="tertiary" onDarkBg showChevron />
</SiteBanner>
```

### Top-of-page chrome composition

For marketing pages where the navbar should overlay (rather than push down) the hero:

```jsx
<SiteBanner>{/* optional announcement */}</SiteBanner>
<Navbar sticky scrollAware ... />
<HeroSplit topOffset="auto" bg="var(--fds-blue-20)" ... />
```

How it composes:
- `SiteBanner` (when present) sets `--fds-banner-h: 44px` on `<body>`.
- `Navbar` sets `--fds-nav-h: 4rem` on `<body>`. Its `sticky` prop makes it stick on scroll; `scrollAware` keeps it transparent at the top of the page so the hero color shows through.
- `HeroSplit topOffset="auto"` pulls the section up by `calc(var(--fds-banner-h, 0px) + var(--fds-nav-h, 0px))` and pads the inner content row by the same amount, so the `<h1>` lands just below the chrome while the section's `bg` paints from y=0.

If neither banner nor nav are on the page, both vars fall back to `0px` and the offset is a no-op — `topOffset="auto"` is safe to leave on permanently.

### InteractiveAccordion

```jsx
<InteractiveAccordion
  items={[
    {
      question: 'Logistics and shipping',
      answer: 'Manage and fulfill orders effortlessly with Fynd’s integrated delivery partners.',
      media: { type: 'image', src: '/logistics.png', alt: 'Delivery partner network' },
    },
    {
      question: 'No-code website builder',
      answer: 'Drag-and-drop your way to a polished storefront — no engineering required.',
      media: { type: 'video', src: '/builder.mp4', poster: '/builder-poster.jpg' },
    },
  ]}
  mediaBg="var(--fds-blue-20)"
/>
```

### Popover (region switcher / menu)

```jsx
<Popover
  role="menu"
  placement="bottom-end"
  trigger={<Button label="India" variant="tertiary" showChevron />}
>
  <ul style={{ listStyle: 'none', margin: 0, padding: 8 }}>
    <li><button role="menuitem">India</button></li>
    <li><button role="menuitem">United Kingdom</button></li>
    <li><button role="menuitem">United States</button></li>
  </ul>
</Popover>
```

---

## G · Anti-Patterns — Full DO / DON'T Reference

The numbered "Common Mistakes" summary lives in `CLAUDE.md` § 13. Code snippets are below.

**Typography**
```jsx
// ❌ DON'T
<h1>Welcome</h1>
<p>Build your store</p>

// ✅ DO
<Text variant="heading-xxl" as="h1">Welcome</Text>
<Text variant="body-xl" as="p" color="secondary">Build your store</Text>
```

**Layout**
```jsx
// ❌ DON'T
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>{cards}</div>

// ✅ DO
<Grid columns={3} gap={20}>{cards}</Grid>
```

**Section Spacing**
```jsx
// ❌ DON'T
<div style={{ padding: '56px 120px', maxWidth: '1320px', margin: '0 auto' }}>
  <h2>Features</h2>
  {content}
</div>

// ✅ DO
<Section title="Features" chipLabel="Platform">{content}</Section>
```

**Colors**
```jsx
// ❌ DON'T
<Text style={{ color: '#5b5c5d' }}>Description</Text>

// ✅ DO
<Text variant="body-m" color="secondary">Description</Text>
```

**Dark Backgrounds**
```jsx
// ❌ DON'T (forgetting onDarkBg)
<Section bg="dark" title="Stats">
  <MetricCard title="Users" stat="10K" />
</Section>

// ✅ DO
<Section bg="dark" title="Stats" onDarkBg>
  <MetricCard title="Users" stat="10K" onDarkBg />
</Section>
```

**Icons**
```jsx
// ❌ DON'T
<svg viewBox="0 0 24 24"><path d="M12 2L2 7..." /></svg>

// ✅ DO
import { IcCommerce } from '@fynd-design-engineering/fynd-one-ds';
<IcCommerce />
```

**Cards**
```jsx
// ❌ DON'T (building a custom card)
<div className="card">
  <img src="/product.png" />
  <h3>Product</h3>
  <p>Description</p>
  <button>Learn more</button>
</div>

// ✅ DO
<ContentCard
  title="Product"
  subtext="Description"
  imageSrc="/product.png"
  imagePosition="below"
  showButton
  buttonLabel="Learn more"
/>
```

**Responsive Text**
```jsx
// ❌ DON'T (forcing a breakpoint)
<Text variant="heading-xl" breakpoint="sm">Title</Text>

// ✅ DO (let CSS handle it)
<Text variant="heading-xl" as="h2">Title</Text>
```
