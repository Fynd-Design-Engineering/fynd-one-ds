# Fynd One Design System — AI Rules

These rules MUST be followed when using this design system to build pages, sections, or components.

---

## Typography

- **ALWAYS** use the `<Text>` component for all text. Never use raw HTML tags (`<h1>`, `<p>`, `<span>`, etc.) directly.
- Available variants: `heading-xxl`, `heading-xl`, `heading-l`, `heading-m`, `heading-s`, `body-xl`, `body-l`, `body-m`, `body-s`, `body-xs`.
- Available weights: `regular` (400), `medium` (500), `semibold` (600). Headings XXL–M ignore weight (always 400).
- Available colors: `default` (#101319), `secondary` (#5b5c5d), `subtle` (#797a7c), `muted` (#a0a1a2), `white` (#ffffff).
- **Do NOT pass a `breakpoint` prop** — `<Text>` is responsive by default via CSS media queries (sm → md → lg scales automatically with viewport). If you believe a `breakpoint` override is needed to lock text to a specific size, **ASK the user first** before applying it.
- Use the `as` prop to override the HTML element when semantic meaning differs from the variant default.

## Semantic HTML & SEO

- **Title + description combos MUST use heading tags + paragraph tags.** When a title is followed by descriptive text, the title must render as a heading element (`h1`–`h6`) and the description as `<p>`. Use the `as` prop on `<Text>` to enforce this.
- **Follow HTML5 outline structure:**
  - `<h1>` — one per page, the main page title (hero heading).
  - `<h2>` — each major page section starts with an `h2`.
  - `<h3>` — subsections within an `h2` section (e.g., card titles inside a section).
  - `<h4>`–`<h6>` — deeper nesting as needed, always cascading down.
- **Visual style is independent of semantic level.** The `variant` prop controls how text looks; the `as` prop controls the HTML tag. A section title can look like `heading-xl` but render as `<h2>`. A card title can look like `heading-s` but render as `<h3>`. Example:
  ```jsx
  {/* Section title — visually large, semantically h2 */}
  <Text variant="heading-xl" as="h2">Platform</Text>

  {/* Card title inside that section — visually smaller, semantically h3 */}
  <Text variant="heading-s" as="h3">D2C website</Text>
  <Text variant="body-xl" as="p" color="secondary">
    Customized, high-performance websites...
  </Text>
  ```
- **Never skip heading levels.** Do not jump from `h2` to `h4`. Every level must be used in order.
- **Never use heading tags for non-heading content** (e.g., don't use `h3` for a stat number just because it's bold). Use `as="p"` or `as="span"` with a heading variant for visual-only emphasis.
- **Landmark elements:** Use `as="section"` on `<SectionWrapper>` / `<Section>`, `as="nav"` for navigation, `as="footer"` for footers.

## Colors

- **NEVER** hardcode hex colors in components or inline styles. Use design tokens from `src/tokens/colors.ts` or CSS variables from `src/styles/tokens.css`.
- The neutral scale is: 0 (`#ffffff`), 10 (`#f8f8f9`), 20 (`#f2f2f2`), 30 (`#e3e3e3`), 40 (`#a0a1a2`), 50 (`#797a7c`), 60 (`#5b5c5d`), 80 (`#4a4b4c`), 100 (`#101319`).
- Use semantic token objects (`textColors`, `backgroundColors`, `iconColors`, `borderColors`, `buttonColors`) over raw neutral values when the intent is clear.
- Status colors: `yes` (green), `partial` (gold), `no` (red). Use `statusColors` from tokens.

## Page & Section Structure

- Every page section MUST be wrapped in either `<Section>` (includes header with chip + title + subtext) or `<SectionWrapper>` (raw container, no header).
- `<Section>` props to know: `bg` (`default` | `muted` | `subtle` | `dark`), `align` (`left` | `center`), `fullWidthContent`, `chipLabel`, `title`, `subtext`.
- Use `<SectionWrapper>` only when you need a container without a section header (e.g., hero, footer, CTA banners).
- Never create custom section containers with raw `<div>` + padding. The wrapper components handle container max-width, page padding, and section spacing.

## Layout

- Use `<Grid>` for equal-column layouts. Props: `columns` (default 3), `gap` (default 20).
- Use `<BentoGrid>` for asymmetric card layouts. Props: `ratios` (array of `'5:4'` | `'3:2'` | `'3:4'` | `'wide'`), `gap` (default 20).
- Never use CSS Grid or Flexbox directly for page-level layouts when `Grid` or `BentoGrid` can do the job.

## Components — Usage Hierarchy

When building a card-like element, choose from existing molecules before creating custom markup:

| Need | Component | Key Props |
|---|---|---|
| Title + subtext + bottom-right image + arrow | `ContentCard` with `imagePosition="bottom-right"` | `clickable`, `alwaysShowArrow`, `hoverImageSrc` |
| Title + subtext + full background image | `ContentCard` with `imagePosition="behind"` | `chipLabel`, `clickable` |
| Title + subtext + full-width image below | `ContentCard` with `imagePosition="below"` | `chipLabel`, `showButton` |
| Icon + title + subtext + button | `RichIconCard` | `icon`, `buttonLabel` |
| Image + tags + title + meta | `ListingCard` | `tags`, `date`, `readTime` |
| Stat number/icon + label | `MetricCard` | `variant` (`icon` | `number`), `stat` |
| CTA with title + subtext + action buttons | `CTABanner` | Pass `<Button>` as children |

- ContentCard defaults: title is `body-xl` / `medium`, subtext is `body-m` / `regular` / `secondary`. Use `titleVariant` and `subtextVariant` props to override per instance.
- Typography in cards is responsive by default. Do not pass `breakpoint` unless explicitly asked.

## Styling

- **CSS Modules only.** Every component's styles live in a co-located `.module.css` file.
- Class naming convention: `fds-{component}__{element}` (configured in vite.config.ts).
- Never use inline styles for layout, spacing, or typography. Inline styles are acceptable only for truly dynamic values (e.g., computed colors from props).
- Do not introduce Tailwind, styled-components, or global CSS classes.

## Icons

- Use icons from `src/icons/` — they are SVGR React components organized by category (`actions`, `AI`, `commerce`, `navigation`, etc.).
- Import icons by category: `import { IconName } from '../../icons/category'` or from the barrel: `import { IconName } from '../../icons'`.
- Custom icons (`IconArrowDiagonal`, `IconChevronRight`, `IconStar`) are in `src/icons/` root.
- Never inline SVG markup in components. If an icon doesn't exist, add it to the icons directory via SVGR.

## Chips & Tags

- `<Chip>` — used for labels, categories, and section indicators. Variants: `filled`, `outlined`, `anchor`.
- `<Tag>` — used for metadata tags on content (e.g., "Retail", "Fashion").
- Never use raw `<span>` or `<div>` styled as a pill/badge. Use Chip or Tag.

## Tabs

- Use the `<Tabs>` component for tabbed content. Each tab takes `label`, optional `dotColor`, and `content` (ReactNode).
- Tab content should use `<Grid>` or `<BentoGrid>` for card layouts inside tabs.

## Tokens — Import Paths

```ts
// Design token objects
import { neutrals, textColors, backgroundColors, ... } from '@fynd-one/ds/tokens';

// CSS variables (global)
import '@fynd-one/ds/styles/tokens.css';

// Icons
import { IconName } from '@fynd-one/ds/icons/category';
```

## What NOT to Do

- Do not create one-off wrapper `<div>`s with hardcoded padding/margin for section spacing.
- Do not mix raw HTML text elements with `<Text>` on the same page.
- Do not duplicate component logic — if a molecule almost fits your need, extend it with a new prop rather than forking.
- Do not use `opacity: 0` / `display: none` for conditional rendering. Use conditional JSX (`{condition && <Component />}`).
- Do not add new color values without adding them to the token system first (`colors.ts` + `tokens.css`).
