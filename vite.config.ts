import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({ rollupTypes: true }),
  ],
  css: {
    modules: {
      generateScopedName(name, filename) {
        const file = filename.split('/').pop()?.replace('.module.css', '') ?? '';
        const prefixMap: Record<string, string> = {
          Button: 'button',
          Text: 'text',
          Chip: 'chip',
          Tabs: 'tabs',
          TitleContentPair: 'title-pair',
          ImageHolder: 'image',
          VisualElement: 'visual',
          BentoGrid: 'bento',
          Grid: 'grid',
          RichIconCard: 'rich-icon',
          ListingCard: 'listing',
          MetricCard: 'metric',
          ContentCard: 'content-card',
          CTABanner: 'cta',
          SectionWrapper: 'section',
          GradientSurface: 'gradient',
        };
        const prefix = prefixMap[file] ?? file.toLowerCase();
        if (name === 'root') return `fds-${prefix}`;
        return `fds-${prefix}__${name}`;
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FyndOneDS',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
  },
});
