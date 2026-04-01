# @fynd-design-engineering/fynd-one-ds

Fynd One Design System — React + TypeScript component library with design tokens, icons, and brand assets.

## Installation

```bash
npm install @fynd-design-engineering/fynd-one-ds
```

## Setup

Import the design tokens CSS in your app's entry point:

```tsx
import '@fynd-design-engineering/fynd-one-ds/styles/tokens.css';
```

## What's in v0.1.0

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
- `GradientSurface` — Gradient background container

### Design Tokens

CSS custom properties and JS exports for:

- **Typography** — font families, weights, letter spacing, type scale
- **Colors** — neutrals, blue, peach, green, gold, lavender, red, gradients, semantic colors (text, background, icon, border, button, status)
- **Spacing** — consistent spacing scale
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
    <Section>
      <Text as="h1">Welcome</Text>
      <Grid columns={3} gap="md">
        <Button variant="primary">Get Started</Button>
        <Button variant="secondary">Learn More</Button>
      </Grid>
    </Section>
  );
}
```

## License

MIT
