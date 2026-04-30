# Fynd One Design System — AI Rules

> **Package:** `@fynd-design-engineering/fynd-one-ds`
> These rules are MANDATORY when using this design system to build pages, sections, or components.
> Treat this as a skill — not just guidelines, but the complete mental model for generating correct code.

---

## 0 · Build Requirements (every component, every PR)

Two checks are non-negotiable on every new component, feature, or layout/CSS change. Apply them inside this DS *and* inside any consumer (e.g. fynd-web).

### 0.1 — Surface responsive decisions before shipping

Components ship with mobile, tablet, and desktop behavior — not desktop-only. Before considering anything done:

- Decide and apply behavior at **mobile (< 768px), tablet (768–991px), desktop (≥ 992px)** and inside constrained containers (sidebars, columns).
- If the responsive behavior isn't obvious from the spec, **prompt the user** with the specific question (e.g. "On mobile, do the action buttons stack or stay inline?") and a proposed default. Don't guess silently.
- Verify Section / Grid / Rail / page-padding tokens are doing the responsive work; only add custom breakpoint CSS where the tokens aren't enough.
- If the change touches typography or spacing on mobile, double-check the change against the type-scale floor in §2 and the spacing scale in §5.

### 0.2 — Flag accessibility concerns proactively

Surface these to the user as soon as you notice them, even if they're outside the immediate request:

- Icon-only buttons / image-only links missing `aria-label` (or non-empty `alt`).
- Focus traps that never release (Modal, drawer, dropdown) — confirm Esc + outside-click + return-focus-on-close.
- Tab order that skips visible interactive content, or lands on the close button before the form fields.
- Click handlers on `<div>` / `<span>` without keyboard support — promote to a button or anchor.
- Color contrast that won't meet WCAG AA on the target background (especially on dark / gradient sections).
- Animations without a `prefers-reduced-motion` fallback.
- Form fields without labels (visible or `aria-label`), or error states without `aria-invalid` + `aria-describedby` linkage.

Phrase the flag as a brief, redirectable note ("Heads-up: the chevron button has no aria-label — adding `aria-label='Toggle menu'`. OK?") rather than a blocking gate. The DS exists to remove a11y guesswork, not push it onto consumers.

---

## Setup

Every consuming app MUST import the token stylesheet at its entry point:

```tsx
import '@fynd-design-engineering/fynd-one-ds/styles/tokens.css';
```

`tokens.css` bundles the DS CSS reset (via `@import './reset.css'`), so a single import gives you tokens + a sanitized browser baseline. **Consumers no longer need Tailwind preflight (or any third-party reset) for that purpose.**

The reset is opinionated. Decisions made:

- `box-sizing: border-box` on every element (predictable sizing math).
- `html`, `body`, headings, and `<p>` have margins zeroed; body gets a `1.5` line-height and a system-font fallback.
- Block-level media (`img`, `video`, `picture`, `svg`, `canvas`) is `display: block; max-width: 100%`.
- Form controls inherit `font` and `color` from their parent.
- Raw `<button>` elements lose UA chrome (transparent background, no border, pointer cursor) so they can be used as click targets without re-styling. The `Button` component re-applies its own styles on top.
- Lists with a class (`<ul class="...">`) lose default bullets; bare `<ul>` / `<ol>` keep them so prose markup stays readable.
- `<a>` colors and `<table>` defaults are **not** touched — those belong to component/page concerns.
- Focus rings are preserved.
- `prefers-reduced-motion` is honoured.

If you need to opt out, import only the reset standalone, or skip it entirely and bring your own:

```tsx
// Reset on its own (bring your own tokens):
import '@fynd-design-engineering/fynd-one-ds/styles/reset.css';
```

---

## Server vs Client Components

This package ships modules with the `'use client'` directive where it's required for React Server Components (Next.js App Router 15+, etc). Consumer server pages can import any DS component directly — interactive ones are client-bundled automatically; pure-render ones stay server-rendered (no extra hydration cost).

**Components that ship with `'use client'`** (use hooks or own internal interaction state):

- `Accordion`, `Tabs`, `TextField`, `SearchBar`, `Pagination`, `FilterButton`, `FilterChip`
- `Rail` (layout)
- `Navbar`, `Popover`, `Modal`, `ContactForm`, `SubNav`, `FilterPanel` (molecules)
- Marketing presets that contain hooks: `FyndMarketingNavActions`, `FyndMarketingNavMobileActions`, `FyndFooterLottieWordmark`

Everything else is a pure-render server component:

- `Text`, `Chip`, `Tag`, `Button`, `ImageHolder`, `VisualElement`, `TitleContentPair`, `SectionIndicator`, `LogoMarquee`
- `MetricCard`, `RichIconCard`, `ContentCard`, `ListingCard`, `PricingCard`, `CTABanner`, `Footer`, `Pointers`
- `Section`, `SectionWrapper`, `SectionHeader`, `Grid`, `BentoGrid`, `GradientSurface`
- The marketing-preset data modules (`fyndMarketingNavItems`, `fyndMarketingFooterPreset`, `fyndMarketingProductOptions`, …) are plain data exports and are RSC-server-importable. The Lottie wordmark referenced inside `fyndMarketingFooterPreset.wordmark` is itself a `'use client'` component, which is fine — server modules can compose client components in their JSX trees.

If you pass an event handler (e.g., `onClick`) to a pure-render component from a server component, that's still a server-component error per RSC rules — wrap your call site in a client component, or use a DS component that already ships with `'use client'`.

The `'use client'` directive is preserved in the built `dist/**` modules via `rollup-plugin-preserve-directives`, so consumer bundlers see it without the DS having to mark every file.

---

## Marketing Presets

`Navbar` and `Footer` ship with empty slots by default. The full fynd.com marketing nav + footer content (mega Solutions dropdown with 7 categories, Resources / Company simple dropdowns, all 10 footer link sections, mission copy, certification badges, social icons, animated Lottie wordmark) is exported as **opt-in presets** so any consuming app can drop the marketing chrome in with a single import — and override or trim any piece.

**Drop-in: no asset setup needed.** Every preset icon and brand mark is bundled as a React SVG component (via SVGR), so the bundler inlines the markup at consumer build time. There are no `/assets/...` paths to mirror in `public/` and nothing for consumers to wire up. Trailing certification badges (AICPA / GDPR / BSI) load from external CDN URLs and are safe to render as-is.

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

Override patterns:

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

Available exports:

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

### Building an asymmetric split hero (text left + image right, 40/60)?
→ Use `<HeroSplit>` — handles the SectionWrapper, grid, bullets, actions, and visual cell automatically.

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

### Need a dropdown / floating menu / region switcher?
→ Use `<Popover trigger={...} placement="bottom-end" role="menu">` — handles positioning, click-outside, Esc, focus trap, ARIA, arrow-key navigation. Pass any DS Button/Chip as the trigger; consumer composes the panel content.

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
| `imageHoverSrc` | `string` | — |
| `imageHoverAlt` | `string` | — (falls back to `imageAlt`) |
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
| `imageHoverSrc` | `string` | — |
| `imageHoverAlt` | `string` | — (falls back to `imageAlt`) |
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

#### HeroSplit
Asymmetric split hero: text-left + visual-right (40/60 desktop, stacked on mobile). Internally wraps `SectionWrapper`, so vertical/horizontal page padding is handled — drop it directly into a page, no outer Section needed.

| Prop | Type | Default |
|------|------|---------|
| `title` | `ReactNode` | required — rendered as `<h1>` with `heading-xl` |
| `description` | `ReactNode` | — |
| `bullets` | `string[]` | — |
| `actions` | `ReactNode` | — (1–2 `<Button>`s) |
| `image` | `{ src, alt, width?, height? }` | required |
| `imagePriority` | `boolean` | `true` (eager loading + sync decode for above-the-fold hero) |
| `bg` | `string` | — (any CSS color for the visual cell background, e.g. `'var(--fds-blue-20)'`) |
| `onDarkBg` | `boolean` | `false` |

Layout: 2-col `minmax(0, 40fr) minmax(0, 60fr)` grid with 60px gap on desktop, single column with 40px gap below 992px. Visual cell: max-width 45rem, border-radius 24px, `margin-left: auto`. Content cell: max-width 560px, flex-column gap 28px.

```jsx
<HeroSplit
  title={<>Launch a hyperlocal website in 30 minutes</>}
  description="Delight your customers with same-day deliveries"
  bullets={['Build a website', 'Automate orders', 'Run promotions']}
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

#### Popover
Generic positioned panel anchored to a trigger element. Use for region switchers, action menus, "more info" disclosures, custom dropdowns. Built on Floating UI — handles auto-flip, click-outside, Esc, focus trap, keyboard nav, ARIA.

| Prop | Type | Default |
|------|------|---------|
| `trigger` | `ReactElement` | required — must forward ref to its DOM element |
| `children` | `ReactNode` | required — panel content (consumer composes) |
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'right' \| 'right-start' \| 'right-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end'` | `'bottom-start'` |
| `offset` | `number` | `8` (pixels between trigger and panel) |
| `role` | `'menu' \| 'listbox' \| 'dialog'` | `'dialog'` |
| `onDarkBg` | `boolean` | `false` |
| `open` | `boolean` | — (controlled) |
| `onOpenChange` | `(open: boolean) => void` | — |
| `defaultOpen` | `boolean` | `false` |
| `matchTriggerWidth` | `boolean` | `false` |
| `width` | `number \| string` | — |
| `disableFocusTrap` | `boolean` | `false` |
| `modal` | `boolean` | `false` |

Behavior:
- Opens on trigger click, closes on outside-click, Esc, or trigger re-click.
- Focus is trapped inside the panel while open and returns to the trigger on close (unless `disableFocusTrap`).
- When `role="menu"` or `role="listbox"`, child elements with `role="menuitem"` (menu) or `role="option"` (listbox) gain arrow-key navigation automatically. Authors just put `role` on each item — no extra wiring needed.
- Trigger receives `aria-expanded`, `aria-haspopup`, `aria-controls` via `cloneElement`. **The trigger component must forward refs and accept HTML attrs.** DS `Button`, `Chip`, etc. already do.
- SSR-safe: panel is portaled client-side only.

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

For controlled mode, pass `open` + `onOpenChange`. To dismiss the popover from inside a menu item, call the `onOpenChange(false)` setter (or use the uncontrolled mode and rely on outside-click).

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
| Asymmetric split hero (text left, image right) | `HeroSplit` | `title`, `image`, `bullets`, `actions`, `bg` |

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

// Icons (barrel) — ergonomic; 1400+ Ic* names autocomplete
import { IcAdd, IcCart, IcTruckDelivery } from '@fynd-design-engineering/fynd-one-ds';

// Icons (by category) — smaller import surface for older bundlers
import { IcAdd } from '@fynd-design-engineering/fynd-one-ds/icons/actions';
import { IcAiStar } from '@fynd-design-engineering/fynd-one-ds/icons/AI';

// Trade-off: the barrel bundles every icon definition into one module so
// modern bundlers (Vite, Next.js 13+, Webpack 5) can tree-shake them.
// On older toolchains that don't tree-shake re-exports cleanly, the
// per-category subpath keeps the imported chunk small (only that
// category's icons are pulled in).

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

---

## 14 · Design Principles — Making Pages Look Great

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

## 15 · Battle-Tested Patterns (Lessons from Real Builds)

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
