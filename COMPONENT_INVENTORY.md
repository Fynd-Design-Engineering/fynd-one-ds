# Fynd One Design System - Component API Inventory

**Project:** @fynd-design-engineering/fynd-one-ds v0.1.1  
**Type:** React + TypeScript Component Library  
**Generated:** April 1, 2026

---

## Table of Contents
1. [Atoms (10 components)](#atoms)
2. [Molecules (5 components)](#molecules)
3. [Shared/Layout (3 components + 2 layouts)](#shared--layouts)
4. [Accessibility Audit](#accessibility-audit)
5. [Export Summary](#export-summary)

---

## Atoms

### 1. **Button**
**File:** `/src/components/atoms/Button.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string` | **required** | Button text |
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | — |
| `onDarkBg` | `boolean` | `false` | Adapts colors for dark backgrounds |
| `showChevron` | `boolean` | `false` | Always true when `variant='tertiary'` |
| `onClick` | `(e: React.MouseEvent) => void` | — | Click handler |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** Primary/secondary/tertiary variants, chevron behavior, dark background modes

---

### 2. **Chip**
**File:** `/src/components/atoms/Chip.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string` | **required** | — |
| `variant` | `'anchor' \| 'filled' \| 'outlined'` | `'anchor'` | — |
| `showDot` | `boolean` | `true` | Shows colored indicator dot |
| `dotColor` | `'blue' \| 'green' \| 'peach' \| 'yellow' \| 'lavender' \| 'violet' \| 'red' \| 'gray' \| 'teal'` | `'blue'` | Only shown if no icon |
| `icon` | `React.ReactNode` | — | Replaces dot if provided |
| `breakpoint` | `'lg' \| 'md' \| 'sm'` | `'lg'` | Controls compact layout (md/sm) |
| `onDarkBg` | `boolean` | `false` | Dark theme styling |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** All color variants, responsive breakpoints, icon vs. dot behavior, dark modes

---

### 3. **Tag**
**File:** `/src/components/atoms/Tag.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string` | **required** | — |
| `onDarkBg` | `boolean` | `false` | Uses `neutrals[40]` text on dark bg |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** Dark vs. light backgrounds, inline badge display

---

### 4. **VisualElement**
**File:** `/src/components/atoms/VisualElement.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `size` | `'icon-32' \| 'icon-48' \| 'logo-64' \| 'logo-80' \| 'logo-horizontal'` | `'icon-32'` | Controls container dimensions |
| `children` | `React.ReactNode` | — | Icon/logo content |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** All size variants, empty state rendering

---

### 5. **Tabs**
**File:** `/src/components/atoms/Tabs.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `tabs` | `TabItem[]` | **required** | Array of tab definitions |
| `variant` | `'card' \| 'underline'` | `'card'` | Visual style |
| `defaultIndex` | `number` | `0` | Initial active tab |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**TabItem Type:**
```typescript
{
  label: string;
  content: React.ReactNode;
  dotColor?: string; // Optional colored dot on tab label
}
```

**Story Patterns:** Card vs. underline variants, colored dots, stateful switching

**⚠️ Accessibility Gap:** Missing `role="tablist"`, `role="tab"`, `aria-selected`, and keyboard navigation

---

### 6. **SectionIndicator**
**File:** `/src/components/atoms/SectionIndicator.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `color` | `'blue' \| 'green' \| 'peach' \| 'yellow' \| 'lavender' \| 'violet' \| 'red' \| 'gray' \| 'teal'` | **required** | Fixed color (required) |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** All 9 color variants, 8px solid dot

---

### 7. **ImageHolder**
**File:** `/src/components/atoms/ImageHolder.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | `''` | Alt text for accessibility |
| `aspectRatio` | `'16:9' \| '4:3' \| '1:1' \| '3:2'` | `'16:9'` | CSS aspect-ratio |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Native img loading attribute |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** All aspect ratio variants, lazy loading behavior

---

### 8. **TitleContentPair**
**File:** `/src/components/atoms/TitleContentPair.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `title` | `string` | **required** | Main heading |
| `subtext` | `React.ReactNode` | — | Optional supporting text |
| `titleSize` | `'xxl' \| 'xl' \| 'l' \| 'm'` | `'xl'` | Uses Text component variants |
| `onDarkBg` | `boolean` | `false` | Dark background styling |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** All title sizes, dark backgrounds, with/without subtext

---

### 9. **LogoMarquee**
**File:** `/src/components/atoms/LogoMarquee.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `logos` | `LogoItem[]` | Fynd default logos | Array of logo images |
| `duration` | `number` (seconds) | `45` | Animation speed |
| `repeat` | `number` | `4` | How many times list is duplicated for seamless loop |
| `logoHeight` | `number` (pixels) | `50` | Height; width scales proportionally |
| `hoverEffect` | `boolean` | `true` | Grayscale-to-color hover transition |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**LogoItem Type:**
```typescript
{
  src: string;
  alt?: string;
}
```

**Story Patterns:** Custom logos, animation duration, hover effects, responsive sizing

**Built-in Defaults:** 10 Fynd client logos (Being Human, ASOS, Superdry, Puma, etc.)

---

### 10. **Text**
**File:** `/src/components/Typography/Text.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `TextVariant` | **required** | See type variants below |
| `weight` | `'regular' \| 'medium' \| 'semibold'` | Inherited from variant | Headings XXL–M ignore this |
| `caps` | `boolean` | `false` | Force uppercase (meaningful for body-xs) |
| `color` | `'default' \| 'secondary' \| 'muted' \| 'subtle' \| 'white'` | `'default'` | Preset colors |
| `as` | `keyof JSX.IntrinsicElements` | Auto-mapped | Override HTML element |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |
| `children` | `React.ReactNode` | **required** | Text content |

**TextVariant Type:**
```typescript
// Headings
'heading-xxl' | 'heading-xl' | 'heading-l' | 'heading-m' | 'heading-s'

// Body
'body-xl' | 'body-l' | 'body-m' | 'body-s' | 'body-xs'
```

**Auto HTML Mapping:**
| Variant | Default Element |
|---------|-----------------|
| heading-xxl | `<h1>` |
| heading-xl | `<h2>` |
| heading-l | `<h3>` |
| heading-m | `<h4>` |
| heading-s | `<h5>` |
| body-* | `<p>` |
| body-xs | `<span>` |

**Story Patterns:** All 14 variants, weight overrides, color presets, semantic HTML override, caps modifier

**Note:** All type scales are **responsive by default** via CSS media queries.

---

## Molecules

### 1. **RichIconCard**
**File:** `/src/components/molecules/RichIconCard.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `icon` | `React.ReactNode` | — | Icon content (wrapped in VisualElement) |
| `iconSize` | `VisualElementSize` | `'icon-32'` | — |
| `title` | `string` | **required** | Card heading |
| `subtext` | `string` | — | Supporting text |
| `buttonLabel` | `string` | `'Button'` | CTA text |
| `onButtonClick` | `(e: React.MouseEvent) => void` | — | Button handler |
| `showButton` | `boolean` | `true` | Toggle button visibility |
| `onDarkBg` | `boolean` | `false` | Dark theme |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** Icon variants, button conditional rendering, dark modes

**Note:** Button variant is always `tertiary`

---

### 2. **ListingCard**
**File:** `/src/components/molecules/ListingCard.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `imageSrc` | `string` | — | Featured image URL |
| `imageAlt` | `string` | `''` | Image alt text |
| `imageAspectRatio` | `ImageHolderProps['aspectRatio']` | `'16:9'` | — |
| `tags` | `string[]` | — | Tag labels |
| `showTags` | `boolean` | `true` | Toggle tags row |
| `title` | `string` | **required** | Article headline |
| `subtext` | `string` | — | Article excerpt |
| `showSubtext` | `boolean` | `true` | — |
| `date` | `string` | — | Publication date |
| `showDate` | `boolean` | `true` | — |
| `readTime` | `string` | — | "5 min read", etc. |
| `showReadTime` | `boolean` | `true` | — |
| `buttonLabel` | `string` | `'Read story'` | — |
| `showButton` | `boolean` | `true` | — |
| `breakpoint` | `'lg' \| 'sm'` | `'lg'` | Responsive layout |
| `onClick` | `() => void` | — | Card click handler |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** Desktop vs. mobile layouts, tag toggles, metadata display, responsive text sizing

---

### 3. **MetricCard**
**File:** `/src/components/molecules/MetricCard.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'icon' \| 'number'` | `'icon'` | Display mode |
| `icon` | `React.ReactNode` | — | Shown in icon variant |
| `stat` | `string` | `'00'` | Numeric value (number variant) |
| `title` | `string` | **required** | Label text |
| `breakpoint` | `'lg' \| 'md' \| 'sm'` | `'lg'` | Size variant |
| `onDarkBg` | `boolean` | `false` | Dark theme |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** Icon vs. number variants, responsive sizing

---

### 4. **ContentCard**
**File:** `/src/components/molecules/ContentCard.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `imageSrc` | `string` | — | Main image URL |
| `hoverImageSrc` | `string` | — | Swap on hover |
| `imageAlt` | `string` | `''` | Alt text |
| `imagePosition` | `'below' \| 'behind' \| 'bottom-right'` | `'below'` | Image layout |
| `chipLabel` | `string` | — | Badge text |
| `showChip` | `boolean` | `true` | Toggle badge |
| `title` | `string` | **required** | Heading |
| `titleVariant` | `TextVariant` | `'body-xl'` | Uses Text variants |
| `subtext` | `string` | — | Description |
| `subtextVariant` | `TextVariant` | `'body-m'` | — |
| `showSubtext` | `boolean` | `true` | — |
| `buttonLabel` | `string` | `'Button'` | CTA text |
| `buttonVariant` | `'primary' \| 'secondary' \| 'tertiary'` | `'tertiary'` | — |
| `showButton` | `boolean` | `true` | — |
| `clickable` | `boolean` | `false` | Enable card interaction |
| `alwaysShowArrow` | `boolean` | `false` | Arrow shows on hover by default |
| `onClick` | `() => void` | — | Card handler |
| `size` | `'lg' \| 'md' \| 'sm'` | `'lg'` | Affects border-radius and padding |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** All 3 image position variants, gradient blur overlay (behind mode), size variants, hover image swap, arrow visibility states

**Special Features:**
- GradientBlur component when `imagePosition='behind'`
- Arrow button appears on hover (unless `alwaysShowArrow=true`)
- `tabIndex={-1}` and `aria-hidden` on arrow button

---

### 5. **CTABanner**
**File:** `/src/components/molecules/CTABanner.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `title` | `string` | **required** | Banner heading |
| `subtext` | `string` | — | Supporting text |
| `children` | `React.ReactNode` | — | Action slot (e.g., Button) |
| `align` | `'left' \| 'center'` | `'center'` | Layout direction |
| `onDarkBg` | `boolean` | `true` | Dark background default |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**Story Patterns:** Left vs. center alignment, action button positioning, dark vs. light modes

---

## Shared & Layouts

### 1. **SectionWrapper**
**File:** `/src/components/_shared/SectionWrapper.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `children` | `React.ReactNode` | **required** | Inner content |
| `outerChildren` | `React.ReactNode` | — | Full-width content (outside inner container) |
| `bg` | `'default' \| 'muted' \| 'subtle' \| 'dark'` | `'default'` | Background preset |
| `onDarkBg` | `boolean` | `false` | **Deprecated:** use `bg='dark'` |
| `noPaddingBottom` | `boolean` | `false` | Remove bottom padding |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |
| `as` | `'section' \| 'div' \| 'footer' \| 'nav'` | `'section'` | HTML element |

**Story Patterns:** All background colors, semantic HTML variants, padding control

---

### 2. **SectionHeader**
**File:** `/src/components/_shared/SectionHeader.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `chipLabel` | `string` | — | Badge text |
| `chipVariant` | `'anchor' \| 'filled' \| 'outlined'` | `'outlined'` | Badge style |
| `chipDotColor` | `ChipDotColor` | `'blue'` | Badge dot color |
| `chipIcon` | `React.ReactNode` | — | Badge icon |
| `showChip` | `boolean` | `true` | Toggle badge |
| `title` | `string` | **required** | Main heading |
| `subtext` | `string` | — | Supporting text |
| `titleSize` | `'xxl' \| 'xl' \| 'l' \| 'm'` | `'xl'` | Heading size |
| `onDarkBg` | `boolean` | `false` | Dark theme |
| `align` | `'left' \| 'center'` | `'left'` | Layout alignment |
| `actions` | `React.ReactNode` | — | Action buttons/CTA |
| `className` | `string` | — | — |

**Action Positioning:**
- **Left-aligned:** Actions appear to the right
- **Center-aligned:** Actions appear below heading

**Story Patterns:** All size/color combinations, action placement, chip toggles

---

### 3. **Section**
**File:** `/src/components/_shared/Section.tsx`

Extends **SectionHeader** props + adds container layer via **SectionWrapper**

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `children` | `React.ReactNode` | **required** | Section content |
| `bg` | `'default' \| 'muted' \| 'subtle' \| 'dark'` | `'default'` | Background |
| `noPaddingBottom` | `boolean` | `false` | Remove padding |
| `as` | `'section' \| 'div' \| 'footer' \| 'nav'` | — | HTML element |
| `hideHeader` | `boolean` | `false` | Skip SectionHeader |
| `fullWidthContent` | `boolean` | `false` | Render children outside inner container |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |
| `...SectionHeaderProps` | — | — | All SectionHeader props pass through |

**Story Patterns:** Header + content combinations, background variants, full-width content

---

### 4. **BentoGrid**
**File:** `/src/components/layouts/BentoGrid.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `children` | `React.ReactNode` | **required** | Grid items |
| `ratios` | `BentoRatio[]` | `['5:4', '3:2', '3:2', '5:4']` | Aspect ratios per card |
| `gap` | `number` | `20` | Gap in pixels |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |

**BentoRatio Type:** `'5:4' | '3:2' | '3:4' | 'wide'`

**Layout Rules:**
- Two-column grid (odd index → col1, even → col2)
- `'wide'` ratio cards span full width below columns
- Stacks to single column on screens ≤768px
- CSS variable `--bento-gap` for custom styling

**Story Patterns:** All ratio combinations, wide cards, responsive behavior

---

### 5. **Grid**
**File:** `/src/components/layouts/Grid.tsx`

Simple CSS Grid wrapper (minimal API)

---

### 6. **GradientSurface**
**File:** `/src/components/GradientSurface.tsx`

Core component for gradient backgrounds (details in `/src/components/GradientSurface.module.css`)

---

## Accessibility Audit

### ✅ Strengths
- **Text component:** Proper semantic HTML mapping (h1–h5, p, span)
- **ImageHolder:** Native `alt` attribute support
- **Native interactions:** Button, click handlers are native HTML
- **Inline badges:** Tag and SectionIndicator use `<span>` semantically

### ⚠️ Gaps Found

| Component | Issue | Recommendation |
|-----------|-------|-----------------|
| **Tabs** | No `role="tablist"`, `role="tab"`, `aria-selected` | Add ARIA attributes and keyboard navigation (Arrow keys) |
| **Button** | No `aria-label` for icon-only buttons (e.g., chevron) | Add labels when no text label exists |
| **ContentCard** | Arrow button has `tabIndex={-1}` and `aria-hidden="true"` | Consider whether arrow should be interactive/announced |
| **Chip** | Icon-only mode lacks label | Add `aria-label` when icon-only |
| **All interactive** | No focus indicators in component CSS | Add `:focus-visible` styles |
| **LogoMarquee** | No `aria-label` on img or container | Add descriptive labels |
| **Section components** | No skip-to-content mechanisms | Consider landmark roles (nav, main) |

### 📋 Notes on `data-figma-id` Attributes
Several components carry `data-figma-id` attributes (Button, Tag, Chip, VisualElement, etc.). These appear to be Figma integration markers and do not affect accessibility.

---

## Export Summary

**From `/src/index.ts`:**

### Tokens & Icons
- `export * from './tokens'` (design tokens)
- `export * from './icons'` (icon components)

### Components
- **Text:** Text, TextProps, TextVariant, TextWeight
- **GradientSurface:** GradientSurface, GradientSurfaceProps
- **Atoms:** Button, Chip, Tag, VisualElement, Tabs, SectionIndicator, ImageHolder, TitleContentPair, LogoMarquee (with prop types)
- **Shared:** SectionWrapper, SectionHeader, Section (with prop types)
- **Molecules:** RichIconCard, ListingCard, MetricCard, CTABanner, ContentCard (with prop types)
- **Layouts:** Grid, BentoGrid

### Styles
- Global CSS import: `./styles/tokens.css` (side-effect import)
- Consumer can also import directly: `import '@fynd-one/ds/styles/tokens.css'`

---

## Quick Reference

### Component Count
- **10 Atoms:** Button, Chip, Tag, VisualElement, Tabs, SectionIndicator, ImageHolder, TitleContentPair, LogoMarquee, Text
- **5 Molecules:** RichIconCard, ListingCard, MetricCard, ContentCard, CTABanner
- **3 Shared:** SectionWrapper, SectionHeader, Section
- **2 Layouts:** Grid, BentoGrid
- **1 Core:** GradientSurface

**Total: 21 Public Components**

### Common Props Patterns
- **onDarkBg:** Boolean for dark background adaptation (Button, Chip, Tag, Text, sections, molecules)
- **breakpoint:** Responsive sizing (Chip, MetricCard, ListingCard)
- **className/style:** Universal override support (all components)
- **variant/size:** Style variants (Button, Chip, Tabs, ContentCard, etc.)
- **show*:** Conditional rendering flags (Tabs, RichIconCard, ListingCard, etc.)

---

