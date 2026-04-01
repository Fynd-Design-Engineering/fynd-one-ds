# Fynd One Design System — AI Rules

> **Package:** `@fynd-design-engineering/fynd-one-ds`
> These rules are MANDATORY when using this design system to build pages, sections, or components.
> Treat this as a skill — not just guidelines, but the complete mental model for generating correct code.

---

## Setup

Every consuming app MUST import the token stylesheet at its entry point:

```tsx
import '@fynd-design-engineering/fynd-one-ds/styles/tokens.css';
```

---

## 1 · Decision Tree — "What Should I Use?"

### Rendering text?
→ **Always** use `<Text>`. Never use raw `<h1>`, `<p>`, `<span>`.

### Building a page section?
→ Need a section header (chip + title + subtext)? → `<Section>`
→ Just need the container (hero, footer, CTA)? → `<SectionWrapper>`
→ **Never** use raw `<div>` with padding/margin for sections.

### Laying out cards or content?
→ Equal columns? → `<Grid columns={N}>` (auto-collapses: 4→2→1 at breakpoints)
→ Asymmetric/magazine layout? → `<BentoGrid ratios={[...]}>`
→ Horizontally scrollable? → `<Rail gap={20}>` (edge-to-edge, draggable)
→ **Never** use raw CSS Grid or Flexbox for page-level layouts.

### Building a card?
→ See the **Card Selection Matrix** in Section 6.

### Need a pricing table?
→ Use `<PricingCard>` with label, amount, features, optional popular badge.

### Need a colored surface?
→ Use `<GradientSurface gradient="blue|peach|green|grey|ai">`

### Need FAQ/collapsible content?
→ Use `<Accordion items={[{question, answer}]}>`

### Need pagination?
→ Use `<Pagination totalPages={10} currentPage={page} onPageChange={setPage}>`

### Need a search input?
→ Use `<SearchBar>` for search. Use `<TextField>` for form fields.

### Need a filter trigger?
→ Use `<FilterButton filterCount={3}>` — icon-only on mobile, label on desktop.

### On a dark background?
→ Pass `onDarkBg` to every component that supports it (Button, Chip, Tag, Text, Section, MetricCard, RichIconCard, CTABanner, TitleContentPair).

---

## 2 · Typography

### Rules
- **ALWAYS** use `<Text>` for all text. No exceptions.
- `variant` controls visual style. `as` controls the HTML tag. They are independent.
- **Do NOT pass `breakpoint`** — Text is responsive by default via CSS media queries. If you think a breakpoint override is needed, **ASK the user first**.
- Headings XXL–M always render at weight 400 (Fynd Sans Compact). The `weight` prop is ignored for these variants.
- Headings S and all Body variants respect the `weight` prop.

### Text Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'heading-xxl' \| 'heading-xl' \| 'heading-l' \| 'heading-m' \| 'heading-s' \| 'body-xl' \| 'body-l' \| 'body-m' \| 'body-s' \| 'body-xs'` | required | |
| `as` | any HTML tag | auto from variant | Override semantic element |
| `color` | `'default' \| 'secondary' \| 'subtle' \| 'muted' \| 'white'` | `'default'` | |
| `weight` | `'regular' \| 'medium' \| 'semibold'` | varies | Ignored for heading-xxl through heading-m |
| `caps` | `boolean` | `false` | Uppercase transform |
| `className` | `string` | — | |
| `style` | `CSSProperties` | — | |

### Responsive Type Scale

| Variant | Mobile (<768px) | Tablet (768–991px) | Desktop (992px+) | Line Height | Font |
|---------|----------------|-------------------|-----------------|-------------|------|
| heading-xxl | 40px | 56px | 72px | 1.1 | Fynd Sans Compact |
| heading-xl | 32px | 40px | 56px | 1.1–1.2 | Fynd Sans Compact |
| heading-l | 24px | 32px | 40px | 1.1–1.3 | Fynd Sans Compact |
| heading-m | 20px | 24px | 32px | 1.2–1.4 | Fynd Sans Compact |
| heading-s | 18px | 22px | 26px | 1.2–1.4 | Inter Display |
| body-xl | 16px | 16px | 16px | 1.4 | Inter Display |
| body-l | 16px | 16px | 18px | 1.5 | Inter Display |
| body-m | 14px | 14px | 16px | 1.45–1.55 | Inter Display |
| body-s | 14px | 14px | 14px | 1.4 | Inter Display |
| body-xs | 12px | 12px | 12px | 1.3 | Inter Display |

### Font Families
- **Fynd Sans Compact** — headings XXL through M (display/title font)
- **Inter Display** — heading S and all body text
- **Inter** — UI elements (buttons, badges, table headers)

### Letter Spacing
| Token | Value | Used For |
|-------|-------|----------|
| n4 | -0.04em | heading-xxl |
| n3 | -0.03em | heading-xl |
| n2 | -0.02em | heading-l, heading-m |
| n1 | -0.01em | heading-s |
| none | 0em | body text |
| caps_d | 0.25em | desktop caps |
| caps_m | 0.24em | mobile caps |

---

## 3 · Semantic HTML & Accessibility

### Heading Hierarchy
- `<h1>` — one per page (hero heading)
- `<h2>` — each major section
- `<h3>` — subsections (e.g., card titles within an h2 section)
- `<h4>`–`<h6>` — deeper nesting, always cascading
- **Never skip levels.** No jumping from h2 to h4.
- **Never use heading tags for non-heading content.** Use `as="p"` or `as="span"` with a heading variant for visual-only emphasis.

```jsx
{/* Section title — visually large, semantically h2 */}
<Text variant="heading-xl" as="h2">Platform</Text>

{/* Card title inside that section — semantically h3 */}
<Text variant="heading-s" as="h3">D2C website</Text>
<Text variant="body-xl" as="p" color="secondary">
  Customized, high-performance websites...
</Text>
```

### Title + Description Pattern
When a title is followed by descriptive text, the title MUST render as a heading element and the description as `<p>`:
```jsx
<Text variant="heading-l" as="h2">Our Platform</Text>
<Text variant="body-l" as="p" color="secondary">Build, manage, scale.</Text>
```

### Landmark Elements
- Use `as="section"` on `<Section>` and `<SectionWrapper>`
- Use `as="nav"` for navigation sections
- Use `as="footer"` for footer sections

### Accessibility Requirements
- **Images**: Always provide meaningful `alt` text on `<ImageHolder>` and brand assets. Use `alt=""` only for purely decorative images.
- **Interactive cards**: When `ContentCard` or `ListingCard` has `onClick`, ensure the click target is clear to screen readers.
- **Color contrast**: All text must meet WCAG AA (4.5:1 for body text, 3:1 for large text). The token system's text/background pairings are designed to pass — don't override them with custom colors.
- **Icon-only buttons**: If a `<Button>` shows only a chevron or icon with no label text, add an `aria-label`.
- **Focus indicators**: Don't remove outline styles. Components inherit browser focus defaults.

---

## 4 · Color System

### Rule
**NEVER** hardcode hex colors. Use design tokens from `src/tokens/colors.ts` or CSS variables from `tokens.css`.

### Neutral Scale
| Stop | Hex | CSS Variable | Use For |
|------|-----|-------------|---------|
| 0 | #ffffff | `--fds-neutral-0` | White backgrounds |
| 10 | #f8f8f9 | `--fds-neutral-10` | Subtle/muted backgrounds |
| 20 | #f2f2f2 | `--fds-neutral-20` | Card backgrounds, dividers |
| 30 | #e3e3e3 | `--fds-neutral-30` | Borders, separators |
| 40 | #a0a1a2 | `--fds-neutral-40` | Muted text, disabled states |
| 50 | #797a7c | `--fds-neutral-50` | Subtle text |
| 60 | #5b5c5d | `--fds-neutral-60` | Secondary text |
| 80 | #4a4b4c | `--fds-neutral-80` | Dark UI elements |
| 100 | #101319 | `--fds-neutral-100` | Primary text, headings |

### Semantic Colors (Use These Over Raw Neutrals)
| Token | Purpose |
|-------|---------|
| `textColors.title` | Primary headings and titles |
| `textColors.subtext` | Secondary/descriptive text |
| `textColors.titleInverse` | Titles on dark backgrounds |
| `textColors.subtextInverse` | Subtext on dark backgrounds |
| `backgroundColors.light` | Default page background |
| `backgroundColors.medium` | Muted sections |
| `backgroundColors.dark` | Dark sections |
| `backgroundColors.darkest` | Darkest sections |
| `borderColors.light` | Subtle borders |
| `borderColors.medium` | Default borders |
| `borderColors.dark` | Emphasized borders |
| `iconColors.darkest / dark / medium / light` | Icon tints by emphasis |
| `statusColors.yes` | Success/positive (green) |
| `statusColors.partial` | Warning/partial (gold) |
| `statusColors.no` | Error/negative (red) |

### Color Palettes
Six palettes available, each with stops 10/20/40/50/60/90: **blue**, **peach**, **green**, **gold**, **lavender**, **red**.

### Gradients
| Key | Meaning | Use For |
|-----|---------|---------|
| `blue` | Information, trust | Feature highlights, platform sections |
| `peach` | Warmth, creativity | Design/creative sections |
| `green` | Growth, success | Success states, growth metrics |
| `grey` | Neutral, professional | Default/neutral surfaces |
| `ai` | AI/intelligence | AI-powered features |

### The `onDarkBg` Prop
When placing components on dark or gradient backgrounds, pass `onDarkBg={true}` to invert text/icon colors. Components that support it:
- Button, Chip, Tag, Text (use `color="white"`), MetricCard, RichIconCard, CTABanner, TitleContentPair, Section, SectionWrapper, SectionHeader

---

## 5 · Spacing & Layout Tokens

### Spacing Scale (8px Rhythm)
| Token | Value | Common Use |
|-------|-------|-----------|
| `spacing[4]` | 4px | Tight gaps (icon-to-text) |
| `spacing[8]` | 8px | Inline spacing, small gaps |
| `spacing[12]` | 12px | Compact padding |
| `spacing[16]` | 16px | Card padding, standard gaps |
| `spacing[24]` | 24px | Section internal spacing |
| `spacing[32]` | 32px | Between content groups |
| `spacing[40]` | 40px | Large spacing |
| `spacing[56]` | 56px | Section padding (desktop) |
| `spacing[64]` | 64px | Major section breaks |
| `spacing[80]` | 80px | Hero/page-level spacing |

### Layout Containers
| Token | Value | Use |
|-------|-------|-----|
| `container.default` | 1320px | Main content container |
| `container.sm` | 570px | Narrow content (text-heavy) |
| `container.header` | 720px | Section headers |
| `container.cta` | 640px | CTA banners |

### Page Padding (Handled by Section/SectionWrapper)
| Breakpoint | Horizontal Padding |
|-----------|-------------------|
| Desktop | 120px (7.5rem) |
| Tablet | 40px (2.5rem) |
| Mobile | 20px (1.25rem) |

### Section Padding
| Breakpoint | Vertical Padding |
|-----------|-----------------|
| Desktop | 56px (3.5rem) |
| Mobile | 32px (2rem) |

**Never hardcode padding/margin for sections.** `<Section>` and `<SectionWrapper>` handle all container widths, page padding, and section spacing automatically.

---

## 6 · Components — Full API Reference

### Atoms

#### Button
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | required |
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` |
| `onDarkBg` | `boolean` | `false` |
| `showChevron` | `boolean` | `false` |
| `onClick` | `(e: MouseEvent) => void` | — |

#### Chip
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | required |
| `variant` | `'anchor' \| 'filled' \| 'outlined'` | `'anchor'` |
| `showDot` | `boolean` | `true` |
| `dotColor` | `ChipDotColor` | `'blue'` |
| `icon` | `ReactNode` | — |
| `breakpoint` | `'lg' \| 'md' \| 'sm'` | `'lg'` |
| `onDarkBg` | `boolean` | `false` |

#### Tag
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | required |
| `onDarkBg` | `boolean` | `false` |

#### ImageHolder
| Prop | Type | Default |
|------|------|---------|
| `aspectRatio` | `'5:4' \| '1:1' \| '16:9' \| 'portrait'` | required |
| `src` | `string` | — |
| `alt` | `string` | `''` |

#### VisualElement
| Prop | Type | Default |
|------|------|---------|
| `size` | `'icon-32' \| 'icon-48' \| 'logo-64' \| 'logo-80' \| 'logo-horizontal'` | `'icon-32'` |
| `children` | `ReactNode` | — |

#### TitleContentPair
| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `subtext` | `string` | — |
| `titleSize` | `'xxl' \| 'xl' \| 'l' \| 'm'` | — |
| `onDarkBg` | `boolean` | — |

#### Tabs
| Prop | Type | Default |
|------|------|---------|
| `tabs` | `TabItem[]` | required |
| `variant` | `'card' \| 'underline'` | `'card'` |
| `defaultIndex` | `number` | `0` |

`TabItem` shape: `{ label: string, dotColor?: ChipDotColor, content: ReactNode }`

#### SectionIndicator
| Prop | Type | Default |
|------|------|---------|
| `color` | `SectionIndicatorColor` | required |

#### LogoMarquee
| Prop | Type | Default |
|------|------|---------|
| `logos` | `LogoItem[]` | — |
| `duration` | `number` | `45` |
| `repeat` | `number` | `4` |
| `logoHeight` | `number` | `50` |
| `hoverEffect` | `boolean` | `true` |

#### Accordion
| Prop | Type | Default |
|------|------|---------|
| `items` | `AccordionItem[]` | required |
| `multiple` | `boolean` | `false` |
| `onDarkBg` | `boolean` | `false` |

`AccordionItem` shape: `{ question: string, answer: string }`

Responsive: Desktop padding 24px/gap 24px → Tablet 20px/20px → Mobile 16px/16px. Question gap 80px desktop → 40px mobile. Answer padding-right 120px desktop → 40px mobile.

#### Pagination
| Prop | Type | Default |
|------|------|---------|
| `totalPages` | `number` | required |
| `currentPage` | `number` | required |
| `onPageChange` | `(page: number) => void` | — |
| `onDarkBg` | `boolean` | `false` |

Smart truncation: desktop shows 7 page numbers, mobile shows 4. Uses ellipsis for hidden ranges.

#### FilterButton
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | `'Filter'` |
| `filterCount` | `number` | `0` |
| `onClick` | `() => void` | — |

Desktop: icon + label. Mobile: icon-only (40px circle). Count badge appears top-right when `filterCount > 0`.

#### SearchBar
| Prop | Type | Default |
|------|------|---------|
| `placeholder` | `string` | `'Search'` |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `onSubmit` | `(value: string) => void` | — |
| `onDarkBg` | `boolean` | `false` |

#### TextField
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `required` | `boolean` | `false` |
| `placeholder` | `string` | `'Placeholder Text'` |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` |
| `helperText` | `string` | — |
| `error` | `string` | — |
| `disabled` | `boolean` | `false` |
| `maxLength` | `number` | — |
| `showCharCount` | `boolean` | `false` |
| `icon` | `ReactNode` | — |
| `showHelpIcon` | `boolean` | `false` |

### Molecules

#### ContentCard
| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `subtext` | `string` | — |
| `imageSrc` | `string` | — |
| `hoverImageSrc` | `string` | — |
| `imageAlt` | `string` | — |
| `imagePosition` | `'below' \| 'behind' \| 'bottom-right'` | — |
| `chipLabel` | `string` | — |
| `showChip` | `boolean` | — |
| `titleVariant` | `TextVariant` | `'body-xl'` |
| `subtextVariant` | `TextVariant` | `'body-m'` |
| `showSubtext` | `boolean` | — |
| `buttonLabel` | `string` | — |
| `buttonVariant` | `'primary' \| 'secondary' \| 'tertiary'` | — |
| `showButton` | `boolean` | — |
| `clickable` | `boolean` | — |
| `alwaysShowArrow` | `boolean` | — |
| `size` | `'lg' \| 'md' \| 'sm'` | — |
| `onClick` | `() => void` | — |

#### RichIconCard
| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `subtext` | `string` | — |
| `icon` | `ReactNode` | — |
| `iconSize` | `VisualElementSize` | `'icon-32'` |
| `buttonLabel` | `string` | `'Button'` |
| `showButton` | `boolean` | `true` |
| `onDarkBg` | `boolean` | `false` |
| `onButtonClick` | `(e: MouseEvent) => void` | — |

#### ListingCard
| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `subtext` | `string` | — |
| `showSubtext` | `boolean` | `true` |
| `imageSrc` | `string` | — |
| `imageAlt` | `string` | `''` |
| `imageAspectRatio` | `'5:4' \| '1:1' \| '16:9' \| 'portrait'` | `'16:9'` |
| `tags` | `string[]` | — |
| `showTags` | `boolean` | `true` |
| `date` | `string` | — |
| `showDate` | `boolean` | `true` |
| `readTime` | `string` | — |
| `showReadTime` | `boolean` | `true` |
| `buttonLabel` | `string` | `'Read story'` |
| `showButton` | `boolean` | `true` |
| `breakpoint` | `'lg' \| 'sm'` | `'lg'` |
| `onClick` | `() => void` | — |

#### MetricCard
| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `variant` | `'icon' \| 'number'` | `'icon'` |
| `icon` | `ReactNode` | — |
| `stat` | `string` | `'00'` |
| `breakpoint` | `'lg' \| 'md' \| 'sm'` | `'lg'` |
| `onDarkBg` | `boolean` | `false` |

#### CTABanner
| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `subtext` | `string` | — |
| `align` | `'left' \| 'center'` | `'center'` |
| `onDarkBg` | `boolean` | `true` |
| `children` | `ReactNode` | — |

#### PricingCard
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | required |
| `popularText` | `string` | — |
| `title` | `string` | required |
| `titleBold` | `string` | — |
| `currency` | `string` | `'₹'` |
| `amount` | `string` | required |
| `period` | `string` | `'/year + GST'` |
| `buttonLabel` | `string` | `'Get Started'` |
| `buttonVariant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` |
| `features` | `PricingFeature[]` | `[]` |
| `onDarkBg` | `boolean` | `false` |
| `onButtonClick` | `(e: MouseEvent) => void` | — |

`PricingFeature` shape: `{ text: string }`

### Layout

#### Grid
| Prop | Type | Default |
|------|------|---------|
| `columns` | `number` | `3` |
| `gap` | `number` | `20` |
| `children` | `ReactNode` | required |

Auto-collapses responsively: 4→2→1, 3→2→1, 2→2→1 at tablet/mobile breakpoints.

#### Rail
| Prop | Type | Default |
|------|------|---------|
| `gap` | `number` | `20` |
| `children` | `ReactNode` | required |

Horizontally draggable track. Breaks out of parent container to viewport edges. First item aligns with container left edge. Hidden scrollbar, touch-friendly. Use for pricing cards, content cards, or any horizontally scrollable content.

#### BentoGrid
| Prop | Type | Default |
|------|------|---------|
| `ratios` | `BentoRatio[]` | — |
| `gap` | `number` | `20` |
| `children` | `ReactNode` | required |

`BentoRatio`: `'5:4' | '3:2' | '3:4' | 'wide'`

### Shared

#### Section
Extends all SectionHeader props, plus:
| Prop | Type | Default |
|------|------|---------|
| `children` | `ReactNode` | required |
| `bg` | `'default' \| 'muted' \| 'subtle' \| 'dark'` | `'default'` |
| `noPaddingBottom` | `boolean` | `false` |
| `as` | `'section' \| 'div' \| 'footer' \| 'nav'` | — |
| `hideHeader` | `boolean` | `false` |
| `fullWidthContent` | `boolean` | `false` |

SectionHeader props available on Section:
| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `chipLabel` | `string` | — |
| `chipVariant` | `'anchor' \| 'filled' \| 'outlined'` | — |
| `chipDotColor` | `ChipDotColor` | — |
| `chipIcon` | `ReactNode` | — |
| `showChip` | `boolean` | — |
| `subtext` | `string` | — |
| `titleSize` | `'xxl' \| 'xl' \| 'l' \| 'm'` | — |
| `onDarkBg` | `boolean` | — |
| `align` | `'left' \| 'center'` | `'left'` |
| `actions` | `ReactNode` | — |

#### SectionWrapper
| Prop | Type | Default |
|------|------|---------|
| `children` | `ReactNode` | required |
| `outerChildren` | `ReactNode` | — |
| `bg` | `'default' \| 'muted' \| 'subtle' \| 'dark'` | — |
| `onDarkBg` | `boolean` | — |
| `noPaddingBottom` | `boolean` | — |
| `as` | `'section' \| 'div' \| 'footer' \| 'nav'` | — |

### Core

#### GradientSurface
| Prop | Type | Default |
|------|------|---------|
| `gradient` | `'blue' \| 'peach' \| 'green' \| 'grey' \| 'ai'` | required |
| `as` | any HTML tag | `'div'` |
| `children` | `ReactNode` | — |

---

## 7 · Card Selection Matrix

When building a card-like element, choose from existing molecules before creating custom markup:

| What you're building | Component | Key configuration |
|---------------------|-----------|-------------------|
| Title + subtext + bottom-right image + arrow | `ContentCard` | `imagePosition="bottom-right"`, `clickable`, `alwaysShowArrow` |
| Title + subtext + full background image | `ContentCard` | `imagePosition="behind"`, `chipLabel` |
| Title + subtext + full-width image below | `ContentCard` | `imagePosition="below"`, `showButton` |
| Icon + title + subtext + button | `RichIconCard` | `icon`, `buttonLabel`, `iconSize` |
| Image + tags + title + date + read time | `ListingCard` | `tags`, `date`, `readTime`, `imageAspectRatio` |
| Stat number or icon + label | `MetricCard` | `variant="number"` or `variant="icon"`, `stat` |
| Full-width CTA with buttons | `CTABanner` | Pass `<Button>` components as `children` |
| Pricing tier with features | `PricingCard` | `label`, `amount`, `features`, `popularText`, `onDarkBg` |

**ContentCard defaults**: title renders as `body-xl` / `medium`, subtext as `body-m` / `regular` / `secondary`. Use `titleVariant` and `subtextVariant` to override per instance.

---

## 8 · Responsive Design

### Breakpoints
| Name | Range | Media Query |
|------|-------|------------|
| mobile | < 768px | `@media (max-width: 767px)` |
| tablet | 768–991px | `@media (max-width: 991px)` |
| desktop | ≥ 992px | `@media (min-width: 992px)` |
| xlDesktop | ≥ 1440px | `@media (min-width: 1440px)` |

### What's Automatic (Don't Touch)
- **Text sizing** — scales via CSS media queries. Do NOT pass `breakpoint` to `<Text>`.
- **Page padding** — Section/SectionWrapper adjusts from 120px → 40px → 20px.
- **Section spacing** — vertical padding adjusts from 56px → 32px.
- **Grid** — collapses to fewer columns on smaller screens.

### What Accepts Manual `breakpoint` Override
These components accept a `breakpoint` prop to lock sizing at a specific tier:
- `Chip` — `'lg' | 'md' | 'sm'`
- `MetricCard` — `'lg' | 'md' | 'sm'`
- `ListingCard` — `'lg' | 'sm'`

Only use `breakpoint` when the component is placed in a constrained container (e.g., a sidebar) where viewport-based sizing would be wrong.

---

## 9 · Composition Patterns

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

## 10 · Icons & Brand Assets

### Icons
- All icons are **SVGR React components** (not string URLs).
- 500+ icons across 16 categories: `actions`, `AI`, `code`, `commerce`, `communication`, `data`, `device`, `editor`, `features`, `feedback`, `hardware`, `location`, `media`, `miscellaneous`, `navigation`, `user`.
- Naming convention: `ic_snake_case.svg` → `IcCamelCase` component.
- **Never inline SVG markup.** If an icon doesn't exist, add it to the icons directory.

```tsx
// From the barrel export
import { IcAdd, IcCalendar, IcCommerce } from '@fynd-design-engineering/fynd-one-ds';

// From a specific category
import { IcAdd } from '@fynd-design-engineering/fynd-one-ds/icons/actions';
```

### Icon Sizing Tokens
| Token | Size | Use For |
|-------|------|---------|
| `iconSize.ui` | 16px | Inline/UI icons |
| `iconSize.feature` | 20px | Feature icons in cards |
| `iconSize.decorative` | 24px | Decorative/hero icons |

### Brand Assets
Brand icons and logos come in **dark** and **light** variants:
```tsx
// Brand icons (compact, for nav/lists)
import commerceIcon from '@fynd-design-engineering/fynd-one-ds/assets/brand-icons/commerce-dark.svg';

// Brand logos (full wordmark)
import commerceLogo from '@fynd-design-engineering/fynd-one-ds/assets/brand-logos/commerce-dark.svg';
```

---

## 11 · Styling Rules

### CSS Modules Only
- Every component's styles live in a co-located `.module.css` file.
- Scoped class naming: `fds-{component}__{element}` (configured in vite.config.ts).
- **Never** use Tailwind, styled-components, Emotion, or global CSS classes.
- **Never** use inline styles for layout, spacing, or typography. Inline styles are acceptable only for truly dynamic values (e.g., computed colors from props).

### Border Radius by Component Type
| Element | Radius | Token |
|---------|--------|-------|
| Buttons | 250px (pill) | `borderRadius.pill` |
| Badges/Tags | 2000px | `borderRadius.tag` |
| Cards | 16px | `borderRadius[16]` |
| CTA boxes | 24px | `borderRadius[24]` |
| Inputs/small elements | 8px | `borderRadius[8]` |

### Shadows
| Token | Use For |
|-------|---------|
| `shadows.s` | Subtle elevation (small elements) |
| `shadows.m` | Medium elevation (cards, dropdowns) |
| `shadows['card-high']` | High elevation (featured/floating cards) |

### Transitions
Standard transition for all interactive elements: `all 0.3s`

---

## 12 · Import Paths

```ts
// Components
import { Button, Text, Section, Grid, ContentCard } from '@fynd-design-engineering/fynd-one-ds';

// Design tokens (JS objects)
import { neutrals, textColors, backgroundColors, gradients, spacing } from '@fynd-design-engineering/fynd-one-ds/tokens';

// CSS variables (global stylesheet)
import '@fynd-design-engineering/fynd-one-ds/styles/tokens.css';

// Icons (barrel)
import { IcAdd, IcCommerce } from '@fynd-design-engineering/fynd-one-ds';

// Icons (by category)
import { IcAdd } from '@fynd-design-engineering/fynd-one-ds/icons/actions';
import { IcAiStar } from '@fynd-design-engineering/fynd-one-ds/icons/AI';

// Brand assets
import logo from '@fynd-design-engineering/fynd-one-ds/assets/brand-logos/fynd-horizontal-dark.svg';
import icon from '@fynd-design-engineering/fynd-one-ds/assets/brand-icons/commerce-dark.svg';
```

---

## 13 · Anti-Patterns & Troubleshooting

### DO / DON'T Reference

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
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
  {cards}
</div>

// ✅ DO
<Grid columns={3} gap={20}>
  {cards}
</Grid>
```

**Section Spacing**
```jsx
// ❌ DON'T
<div style={{ padding: '56px 120px', maxWidth: '1320px', margin: '0 auto' }}>
  <h2>Features</h2>
  {content}
</div>

// ✅ DO
<Section title="Features" chipLabel="Platform">
  {content}
</Section>
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

### Common Mistakes
1. **Forgetting `onDarkBg`** — When `bg="dark"` on Section, EVERY child component needs `onDarkBg={true}`.
2. **Skipping heading levels** — Going from h2 to h4. Always use h3 in between.
3. **Using variant as semantic** — `variant="heading-xl"` doesn't make it an h1. Use `as="h1"` for semantics.
4. **Hardcoding container width** — Never set `max-width: 1320px` manually. Use Section/SectionWrapper.
5. **Creating custom pills/badges** — Use `<Chip>` or `<Tag>` instead of styled spans.
6. **Mixing Text with raw HTML** — Don't use `<Text>` for some text and `<p>` for others on the same page.
7. **Adding new colors without tokens** — Every color must exist in `colors.ts` + `tokens.css` before use.
