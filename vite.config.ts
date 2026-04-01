import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import { resolve, relative, dirname } from 'path';
import { readdir, readFile, writeFile } from 'fs/promises';

/**
 * Custom plugin: injects `import './path/to/Component.module.css'` into
 * each `.module.css.js` file so consumers automatically load component CSS.
 */
function injectComponentCss(): Plugin {
  return {
    name: 'inject-component-css',
    apply: 'build',
    closeBundle: {
      sequential: true,
      async handler() {
        const distDir = resolve(__dirname, 'dist');
        const assetsDir = resolve(distDir, 'assets');

        // Find all .module.css files in dist/assets/
        const cssFiles = await findFiles(assetsDir, /\.module\.css$/);

        // Find all .module.css.js files in dist/
        const jsFiles = await findFiles(distDir, /\.module\.css\.js$/);

        for (const jsFile of jsFiles) {
          // Extract component name from path (e.g., Button.module.css.js → Button)
          const baseName = jsFile.split('/').pop()?.replace('.module.css.js', '');
          if (!baseName) continue;

          // Find matching CSS file
          const matchingCss = cssFiles.find((f) =>
            f.endsWith(`${baseName}.module.css`)
          );
          if (!matchingCss) continue;

          // Calculate relative path from the JS file to the CSS file
          const jsDir = dirname(jsFile);
          let relPath = relative(jsDir, matchingCss);
          if (!relPath.startsWith('.')) relPath = './' + relPath;

          // Prepend CSS import to the JS file
          const content = await readFile(jsFile, 'utf-8');
          await writeFile(jsFile, `import "${relPath}";\n${content}`);
        }
      },
    },
  };
}

async function findFiles(dir: string, pattern: RegExp): Promise<string[]> {
  const results: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  for (const entry of entries) {
    if (entry.isFile() && pattern.test(entry.name)) {
      const fullPath = resolve(entry.parentPath ?? entry.path, entry.name);
      results.push(fullPath);
    }
  }
  return results;
}

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({ rollupTypes: false, outDir: 'dist' }),
    injectComponentCss(),
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
