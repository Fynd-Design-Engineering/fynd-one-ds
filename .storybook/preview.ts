import type { Preview } from '@storybook/react-vite';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Tokens', 'Atoms', 'Shared', 'Molecules', 'Layouts', 'Pages'],
      },
    },
    backgrounds: {
      options: {
        "light-gray": { name: 'light-gray', value: '#f2f2f2' },
        white: { name: 'white', value: '#ffffff' },
        dark: { name: 'dark', value: '#0e0e0e' }
      }
    },
    controls: { expanded: true },
    viewport: {
      options: {
        mobile:    { name: 'Mobile',        styles: { width: '375px',  height: '812px'  } },
        tablet:    { name: 'Tablet',        styles: { width: '768px',  height: '1024px' } },
        lDesktop:  { name: 'Large Desktop', styles: { width: '1280px', height: '800px'  } },
        xlDesktop: { name: 'XL Desktop',    styles: { width: '1440px', height: '900px'  } },
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light-gray'
    }
  }
};

export default preview;
