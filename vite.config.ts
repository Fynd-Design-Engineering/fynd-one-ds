import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import { resolve, relative, dirname } from 'path';
import { readdir, readFile, writeFile, rename } from 'fs/promises';

/**
 * Custom plugin: renames .module.css → .css in dist/assets/ to prevent
 * consumer bundlers from re-processing already-scoped class names,
 * then injects CSS import statements into each .module.css.js file.
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

        // 1. Rename .module.css → .css to prevent consumer re-scoping
        const cssFiles = await findFiles(assetsDir, /\.module\.css$/);
        const renamedMap = new Map<string, string>();
        for (const cssFile of cssFiles) {
          const newPath = cssFile.replace('.module.css', '.css');
          await rename(cssFile, newPath);
          const baseName = cssFile.split('/').pop()?.replace('.module.css', '');
          if (baseName) renamedMap.set(baseName, newPath);
        }

        // 2. Inject CSS import into each .module.css.js file
        const jsFiles = await findFiles(distDir, /\.module\.css\.js$/);
        for (const jsFile of jsFiles) {
          const baseName = jsFile.split('/').pop()?.replace('.module.css.js', '');
          if (!baseName) continue;

          const matchingCss = renamedMap.get(baseName);
          if (!matchingCss) continue;

          const jsDir = dirname(jsFile);
          let relPath = relative(jsDir, matchingCss);
          if (!relPath.startsWith('.')) relPath = './' + relPath;

          const content = await readFile(jsFile, 'utf-8');
          await writeFile(jsFile, `import "${relPath}";\n${content}`);
        }

        // 3. Fix stripped global CSS imports (e.g., gradient-blur.css in ContentCard)
        const contentCardJs = resolve(distDir, 'components/molecules/ContentCard.js');
        const gradientBlurCss = resolve(assetsDir, 'styles/gradient-blur.css');
        try {
          let ccContent = await readFile(contentCardJs, 'utf-8');
          let gradientRelPath = relative(dirname(contentCardJs), gradientBlurCss);
          if (!gradientRelPath.startsWith('.')) gradientRelPath = './' + gradientRelPath;
          ccContent = ccContent.replace(
            /\/\* empty css\s+\*\//,
            `import "${gradientRelPath}";`
          );
          await writeFile(contentCardJs, ccContent);
        } catch { /* ContentCard not found, skip */ }
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
