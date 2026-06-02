import { Meta, StoryObj } from '@storybook/react';
import { LogoMarquee, LogoItem } from './LogoMarquee';

const logos: LogoItem[] = [
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/being.jpg', alt: 'Being Human' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/west-elm.avif', alt: 'West Elm' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/jiomart.avif', alt: 'JioMart' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/asos.avif', alt: 'ASOS' },
  { src: 'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/puma.avif', alt: 'Puma' },
];

const meta: Meta<typeof LogoMarquee> = {
  title: 'Atoms/LogoMarquee',
  component: LogoMarquee,
};

export default meta;

type Story = StoryObj<typeof LogoMarquee>;

export const Default: Story = {
  args: {
    logos,
  },
};

export const LazyGrid: Story = {
  name: 'Lazy-loaded grid of 20 items',
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {Array.from({ length: 20 }, (_, i) => (
        <LogoMarquee key={i} logos={logos} />
      ))}
    </div>
  ),
};

/** Per-item intrinsic `width`/`height` hints reserve space and prevent CLS.
 *  Default 150 × 50 when omitted. */
export const WithIntrinsicDimensions: Story = {
  args: {
    logos: [
      { src: 'https://placehold.co/200x60/e3e3e3/5b5c5d?text=Wide', alt: 'Wide brand', width: 200, height: 60 },
      { src: 'https://placehold.co/100x50/e3e3e3/5b5c5d?text=Square', alt: 'Square brand', width: 100, height: 50 },
      { src: 'https://placehold.co/150x50/e3e3e3/5b5c5d?text=Default', alt: 'Default brand' },
    ],
  },
};
