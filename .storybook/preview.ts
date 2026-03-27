import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Tokens', 'Atoms', 'Shared', 'Molecules'],
      },
    },
    backgrounds: {
      default: 'light-gray',
      values: [
        { name: 'light-gray', value: '#f2f2f2' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#0e0e0e' },
      ],
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
