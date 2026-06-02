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
