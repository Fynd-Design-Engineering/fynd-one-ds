# @fynd-design-engineering/fynd-one-ds

Fynd One Design System — React + TypeScript component library with design tokens, icons, and brand assets.

## Prerequisites

This is a **component library**, not a project starter. Install it into an existing React project (Next.js, Vite, CRA, etc.):

- **React 18+** and **React DOM 18+** must already be installed
- Your project should support ES modules and CSS imports

## Installation

```bash
npm install @fynd-design-engineering/fynd-one-ds
```

## Setup

Import the design tokens CSS **once** in your app's entry point (e.g., `main.tsx`, `_app.tsx`, `layout.tsx`):

```tsx
import '@fynd-design-engineering/fynd-one-ds/styles/tokens.css';
```

## What's in v0.1.3

### Components

**Atoms**
- `Button` — Primary, secondary, and tertiary variants
- `Chip` — Compact label element
- `Tag` — Status and category tags
- `Tabs` — Tabbed navigation with indicator
- `SectionIndicator` — Visual step/section indicator
- `ImageHolder` — Responsive image container
- `TitleContentPair` — Title + description block
- `VisualElement` — Decorative/visual wrapper
- `Text` — Typography component with token-based styles
- `LogoMarquee` — Scrolling logo ticker

**Molecules**
- `RichIconCard` — Card with icon, title, and description
- `ListingCard` — Product/feature listing card
- `MetricCard` — KPI/metric display card
- `ContentCard` — General-purpose content card
- `CTABanner` — Call-to-action banner

**Layout**
- `Grid` — Responsive grid system
- `BentoGrid` — Asymmetric bento-style grid layout
- `Section` — Page section with header, wrapper, and spacing
- `SectionWrapper` — Raw section container (no header)
- `GradientSurface` — Gradient background container

### Design Tokens

CSS custom properties and JS exports for:

- **Typography** — font families, weights, letter spacing, type scale
- **Colors** — neutrals, blue, peach, green, gold, lavender, red, gradients, semantic colors (text, background, icon, border, button, status)
- **Spacing** — consistent spacing scale (8px rhythm)
- **Borders** — border radius tokens
- **Effects** — shadows, blur
- **Layout** — container max-widths, page padding, section padding
- **Breakpoints** — responsive breakpoints and media queries
- **Component tokens** — button, badge, card, icon sizing

### Icons

500+ icons across 16 categories: actions, AI, code, commerce, communication, data, device, editor, features, feedback, hardware, location, media, miscellaneous, navigation, and user.

```tsx
import { IcAdd, IcCalendar } from '@fynd-design-engineering/fynd-one-ds';
```

### Brand Assets

Brand icons and logos for Fynd products (commerce, boltic, pixelbin, copilot, engage, etc.) with dark and light variants.

```tsx
import commerceDark from '@fynd-design-engineering/fynd-one-ds/assets/brand-icons/commerce-dark.svg';
import commerceLogo from '@fynd-design-engineering/fynd-one-ds/assets/brand-logos/commerce-dark.svg';
```

## Usage

```tsx
import { Button, Grid, Section, Text } from '@fynd-design-engineering/fynd-one-ds';
import '@fynd-design-engineering/fynd-one-ds/styles/tokens.css';

function App() {
  return (
    <Section title="Welcome" chipLabel="Getting Started">
      <Grid columns={3} gap={20}>
        <Button label="Get Started" variant="primary" />
        <Button label="Learn More" variant="secondary" />
        <Button label="Docs" variant="tertiary" />
      </Grid>
    </Section>
  );
}
```

## AI Integration (Claude Code)

This package ships with a `CLAUDE.md` file containing comprehensive rules for AI tools to use the design system correctly. To enable it in your project:

**Option 1 — Reference in your project's CLAUDE.md (recommended):**

```markdown
## Design System
This project uses `@fynd-design-engineering/fynd-one-ds`.
Before building any UI, read the design system rules at:
node_modules/@fynd-design-engineering/fynd-one-ds/CLAUDE.md
```

**Option 2 — Copy to project root:**

```bash
cp node_modules/@fynd-design-engineering/fynd-one-ds/CLAUDE.md ./CLAUDE_DS.md
```

This gives Claude Code the full component API, composition patterns, token system, and anti-patterns so it generates correct code on the first try.

## License

UNLICENSED
