import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({ rollupTypes: false, outDir: 'dist' }),
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
          LogoMarquee: 'marquee',
          SectionWrapper: 'section',
          SectionHeader: 'section-header',
          Section: 'section-full',
          GradientSurface: 'gradient',
        };
        const prefix = prefixMap[file] ?? file.toLowerCase();
        if (name === 'root') return `fds-${prefix}`;
        return `fds-${prefix}__${name}`;
      },
    },
  },
  build: {
    cssCodeSplit: true,
    copyPublicDir: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.ts'),
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      preserveEntrySignatures: 'strict',
      output: {
        format: 'es',
        dir: 'dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
