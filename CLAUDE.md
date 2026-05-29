# Fynd One Design System — AI Rules

> **Package:** `@fynd-design-engineering/fynd-one-ds`
> These rules are MANDATORY when using this design system to build pages, sections, or components.
> Treat this as a skill — not just guidelines, but the complete mental model for generating correct code.
>
> **Companion file:** `CLAUDE_PATTERNS.md` (this directory) holds composition examples, design principles, battle-tested recipes, full Marketing Presets details, and reset.css decisions. Read it when you need worked-out examples or opinionated "make it look great" guidance.

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

`tokens.css` bundles the DS CSS reset (via `@import './reset.css'`), so a single import gives you tokens + a sanitized browser baseline. **Consumers no longer need Tailwind preflight (or any third-party reset) for that purpose.** For the full list of reset decisions and how to opt out, see `CLAUDE_PATTERNS.md` § A.

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

`Navbar` and `Footer` ship with empty slots by default. The fynd.com marketing nav + footer (mega Solutions dropdown, Resources / Company dropdowns, footer link sections, certification badges, social icons, animated Lottie wordmark) is exported as **opt-in presets** — drop in with one import, override any piece. Every preset icon/brand mark is bundled as a React SVG (via SVGR), inlined at build time; no `/assets/...` paths to mirror.

Key exports: `fyndMarketingNavItems`, `FyndMarketingNavActions`, `FyndMarketingNavMobileActions`, `fyndMarketingFooterPreset`, plus per-piece exports (`fyndSolutionsItem`, `fyndFooterLinkSections`, etc.) for composition. For the drop-in JSX, override patterns, subpath imports, and full export list, see `CLAUDE_PATTERNS.md` § B.

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
→ See the **Card Selection Matrix** in Section 7.

### Building an asymmetric split hero (text left + image right, 40/60)?
→ Use `<HeroSplit>` — handles the SectionWrapper, grid, bullets, actions, and visual cell automatically.

### Need a sitewide announcement bar above the nav?
→ Use `<SiteBanner>` — full-bleed dark strip with a centered content slot. Drop any text/link/button inside.

### Need a pricing table?
→ Use `<PricingCard>` with label, amount, features, optional popular badge.

### Need a colored surface?
→ Use `<GradientSurface gradient="blue|peach|green|grey|ai">`

### Need FAQ/collapsible content?
→ Use `<Accordion items={[{question, answer}]}>`

### Need a feature accordion paired with a sticky media panel?
→ Use `<InteractiveAccordion items={[{question, answer, media: {type: 'image' | 'video', src, alt?, poster?}}]}>` — two-column 50:50 with image/video on the right that swaps to match the open item. Plus/minus toggle (chevron is reserved for `<Accordion>`).

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
Asymmetric split hero: text-left + visual-right (40/60 desktop, stacked on mobile). Renders as `<header>` and wraps `SectionWrapper` — drop directly into a page, no outer Section needed.

| Prop | Type | Default |
|------|------|---------|
| `title` | `ReactNode` | required — rendered as `<h1>` with `heading-xl` |
| `description` | `ReactNode` | — |
| `bullets` | `PointerItem[]` | — (rendered via `<Pointers>` with the canonical tick icon; each item is `{ label: string; node?: ReactNode }`. `HeroSplitProps` and `PointerItem` are re-exported from the package root.) |
| `actions` | `ReactNode` | — (1–2 `<Button>`s) |
| `image` | `{ src, alt, width?, height? }` | required |
| `imagePriority` | `boolean` | `true` (eager loading + sync decode for above-the-fold hero) |
| `bg` | `string` | — (CSS color for the **section** background — paints both columns and the gutters, e.g. `'var(--fds-blue-20)'`) |
| `visualBg` | `string` | — (CSS color for the visual cell only; useful when the image has transparency and you want a different tint behind it) |
| `topOffset` | `'auto' \| string \| number` | — (pulls the hero up under sticky chrome above it; pads inner content by the same amount. `'auto'` reads `--fds-banner-h` + `--fds-nav-h` from `<SiteBanner>` / `<Navbar>`.) |
| `onDarkBg` | `boolean` | `false` |

Layout: 2-col `minmax(0, 40fr) minmax(0, 60fr)` grid with 60px gap on desktop, single column with 40px gap below 992px. Visual cell: max-width 45rem, border-radius 24px, `margin-left: auto`. Content cell: max-width 560px, flex-column gap 28px.

For a usage example, see `CLAUDE_PATTERNS.md` § F.

#### SiteBanner
Full-bleed announcement strip above `<Navbar>`. Dark bg, light text, centered. Single content slot for `<Text>`, anchors, `<Button>`s, icons.

| Prop | Type | Default |
|------|------|---------|
| `children` | `ReactNode` | required — banner content (pass `color="white"` / `onDarkBg` to nested `<Text>` / `<Button>`) |

Layout: padding `10px 20px` mobile → `12px 40px` tablet → `12px 120px` desktop. Centered flex row, 12px gap, `flex-wrap: wrap`. `role="region"` + `aria-label="Site notice"`. When mounted, publishes `--fds-banner-h: 44px` on `<body>` so top-of-page sections (e.g. `<HeroSplit topOffset="auto">`) can compose under it.

For a usage example and the full top-of-page chrome recipe (`SiteBanner` + `Navbar sticky scrollAware` + `HeroSplit topOffset="auto"`), see `CLAUDE_PATTERNS.md` § F.

#### InteractiveAccordion
Two-column 50:50 layout: accordion list + sticky media panel that swaps to match the open item. For feature lists where each item has a screenshot or short video. Plus/minus toggle (chevron is reserved for `<Accordion>`).

| Prop | Type | Default |
|------|------|---------|
| `items` | `InteractiveAccordionItem[]` | required — `{ question, answer, media: { type: 'image' \| 'video', src, alt?, poster? } }` |
| `mediaSide` | `'left' \| 'right'` | `'right'` (desktop/tablet only — mobile always renders media inline below the expanded item) |
| `defaultOpenIndex` | `number` | `0` |
| `openIndex` | `number` | — (controlled mode) |
| `onOpenIndexChange` | `(i: number) => void` | — |
| `mediaBg` | `string` | — (any CSS color for the panel/inline media background) |
| `onDarkBg` | `boolean` | `false` |

Behavior:
- Desktop (≥ 992px): true 50:50 grid; media panel is `position: sticky; top: calc(var(--fds-nav-h, 0px) + 24px)`.
- Tablet (768–991px): same 50:50 grid; media is **not** sticky.
- Mobile (< 768px): single column; media renders **inline below each expanded item**.
- Radio behavior — only one item open at a time.
- Cross-fade (~200ms) when swapping media; videos pause when not active. `prefers-reduced-motion` skips the fade.
- Keyboard: ArrowUp / ArrowDown moves focus between triggers; Home / End jump to first / last; Enter / Space toggles.
- ARIA: trigger is `<button aria-expanded aria-controls>`, panel is `role="region" aria-labelledby`.

For a usage example, see `CLAUDE_PATTERNS.md` § F.

#### Popover
Generic positioned panel anchored to a trigger. For region switchers, action menus, disclosures, custom dropdowns. Built on Floating UI — auto-flip, click-outside, Esc, focus trap, keyboard nav, ARIA.

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
- When `role="menu"` or `role="listbox"`, child elements with `role="menuitem"` (menu) or `role="option"` (listbox) gain arrow-key navigation automatically.
- Trigger receives `aria-expanded`, `aria-haspopup`, `aria-controls` via `cloneElement`. **The trigger component must forward refs and accept HTML attrs.** DS `Button`, `Chip`, etc. already do.
- SSR-safe: panel is portaled client-side only.

For controlled mode, pass `open` + `onOpenChange`. To dismiss the popover from inside a menu item, call the `onOpenChange(false)` setter (or use the uncontrolled mode and rely on outside-click). For a menu / region-switcher example, see `CLAUDE_PATTERNS.md` § F.

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
| `as` | `'section' \| 'div' \| 'footer' \| 'nav' \| 'header' \| 'main' \| 'aside' \| 'article'` | — |
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
| `as` | `'section' \| 'div' \| 'footer' \| 'nav' \| 'header' \| 'main' \| 'aside' \| 'article'` | — |

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
| Asymmetric split hero (text left, image right) | `HeroSplit` | `title`, `image`, `bullets`, `actions`, `bg` (section tint), `visualBg` (visual-cell tint) |

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

For full ready-to-paste examples (Standard Section, Hero, Dark Section, Gradient, Tabbed, CTA Banner, Bento, Rail, Pricing, FAQ, Search+Filter, Form, Paginated List), see `CLAUDE_PATTERNS.md` § C.

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

// Icons (by category) — smaller import surface for older bundlers that don't
// tree-shake re-exports cleanly (modern Vite / Next.js 13+ / Webpack 5 do).
import { IcAdd } from '@fynd-design-engineering/fynd-one-ds/icons/actions';
import { IcAiStar } from '@fynd-design-engineering/fynd-one-ds/icons/AI';

// Brand assets
import logo from '@fynd-design-engineering/fynd-one-ds/assets/brand-logos/fynd-horizontal-dark.svg';
import icon from '@fynd-design-engineering/fynd-one-ds/assets/brand-icons/commerce-dark.svg';
```

---

## 13 · Anti-Patterns & Troubleshooting

For full DO / DON'T code snippets across Typography, Layout, Section Spacing, Colors, Dark Backgrounds, Icons, Cards, and Responsive Text, see `CLAUDE_PATTERNS.md` § G.

### Common Mistakes
1. **Forgetting `onDarkBg`** — When `bg="dark"` on Section, EVERY child component needs `onDarkBg={true}`.
2. **Skipping heading levels** — Going from h2 to h4. Always use h3 in between.
3. **Using variant as semantic** — `variant="heading-xl"` doesn't make it an h1. Use `as="h1"` for semantics.
4. **Hardcoding container width** — Never set `max-width: 1320px` manually. Use Section/SectionWrapper.
5. **Creating custom pills/badges** — Use `<Chip>` or `<Tag>` instead of styled spans.
6. **Mixing Text with raw HTML** — Don't use `<Text>` for some text and `<p>` for others on the same page.
7. **Adding new colors without tokens** — Every color must exist in `colors.ts` + `tokens.css` before use.

---

## 14 · Design Principles & Battle-Tested Patterns

For opinionated guidance on visual hierarchy, whitespace, color usage, layout rhythm, dark mode design, page flow, plus battle-tested patterns (the right way to compose heroes, footers, dark sections, background rhythm) and a pre-flight checklist — see `CLAUDE_PATTERNS.md` §§ D–E.

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
