import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Tokens', 'Atoms', 'Shared', 'Molecules'],
      },
    },
    controls: { expanded: true },
    viewport: {
      viewports: {
        mobile:    { name: 'Mobile',        styles: { width: '375px',  height: '812px'  } },
        tablet:    { name: 'Tablet',        styles: { width: '768px',  height: '1024px' } },
        lDesktop:  { name: 'Large Desktop', styles: { width: '1280px', height: '800px'  } },
        xlDesktop: { name: 'XL Desktop',    styles: { width: '1440px', height: '900px'  } },
      },
    },
  },
};

export default preview;
