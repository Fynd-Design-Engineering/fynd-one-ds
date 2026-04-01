import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { CSSProperties, useState } from 'react';
import { IconChevronRight, IconArrowDiagonal, IconStar } from '../icons';

// Load all SVG icons as React components via svgr
const iconModules = import.meta.glob('./icons/**/*.svg', { eager: true, query: '?react', import: 'default' }) as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;

// Also load URLs for fallback display
const iconUrls = import.meta.glob('./icons/**/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

// Group by category
const categories: Record<string, { name: string; path: string; Component: React.FC<React.SVGProps<SVGSVGElement>>; url: string }[]> = {};
Object.entries(iconModules).forEach(([path, Component]) => {
  const parts = path.replace('./icons/', '').split('/');
  const category = parts[0];
  const name = parts[1]?.replace('.svg', '') || '';
  const url = iconUrls[path] || '';
  if (!categories[category]) categories[category] = [];
  categories[category].push({ name, path, Component, url });
});

const sortedCategories = Object.keys(categories).sort();

// Hand-crafted React icon components
const reactIcons = [
  { name: 'IconChevronRight', Component: IconChevronRight },
  { name: 'IconArrowDiagonal', Component: IconArrowDiagonal },
  { name: 'IconStar', Component: IconStar },
];

const CopyCard = ({ name, url, importStr, isDark }: { name: string; url: string; importStr: string; isDark?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(importStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const card: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    padding: 12,
    borderRadius: 8,
    border: '1px solid #e3e3e3',
    backgroundColor: isDark ? '#101319' : '#fff',
    cursor: 'pointer',
    position: 'relative',
    minWidth: 0,
  };

  return (
    <div style={card} onClick={handleClick} title={`Click to copy: ${importStr}`}>
      <img src={url} alt={name} style={{ width: 24, height: 24, objectFit: 'contain' }} />
      <span style={{
        fontFamily: "'Inter', sans-serif", fontSize: 9, color: isDark ? '#a0a1a2' : '#5b5c5d',
        textAlign: 'center', wordBreak: 'break-all', lineHeight: 1.2,
      }}>
        {name}
      </span>
      {copied && (
        <span style={{
          position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#fff',
          backgroundColor: '#101319', padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap', zIndex: 10,
        }}>
          Copied!
        </span>
      )}
    </div>
  );
};

const ReactIconCard = ({ name, Component }: { name: string; Component: React.FC<{ size?: number; color?: string }> }) => {
  const [copied, setCopied] = useState(false);
  const importStr = `import { ${name} } from '@fynd-one/ds';`;

  const handleClick = () => {
    navigator.clipboard.writeText(importStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={handleClick}
      title={`Click to copy: ${importStr}`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        padding: 12, borderRadius: 8, border: '1px solid #e3e3e3', backgroundColor: '#fff',
        cursor: 'pointer', position: 'relative', minWidth: 0,
      }}
    >
      <Component size={24} color="#101319" />
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: '#5b5c5d', textAlign: 'center' }}>{name}</span>
      {copied && (
        <span style={{
          position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#fff',
          backgroundColor: '#101319', padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap', zIndex: 10,
        }}>
          Copied!
        </span>
      )}
    </div>
  );
};

const meta: Meta = {
  title: 'Tokens/Icons',
};

export default meta;
type Story = StoryObj;

export const AllIcons: Story = {
  render: () => {
    const totalAssets = Object.values(categories).reduce((sum, arr) => sum + arr.length, 0);
    return (
      <div style={{ padding: 24 }}>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
          Icon Library ({totalAssets + reactIcons.length} icons)
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#797a7c', marginBottom: 24 }}>
          Click any icon to copy its import statement.
        </p>

        <div style={{ marginBottom: 40 }}>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#101319', marginBottom: 8 }}>
            React Components ({reactIcons.length})
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8, paddingBottom: 16 }}>
            {reactIcons.map(({ name, Component }) => (
              <ReactIconCard key={name} name={name} Component={Component} />
            ))}
          </div>
        </div>

        {sortedCategories.map((cat) => (
          <div key={cat} style={{ marginBottom: 40 }}>
            <h4 style={{
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
              color: '#101319', marginBottom: 8, textTransform: 'capitalize',
            }}>
              {cat} ({categories[cat].length})
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: 8, paddingBottom: 16,
            }}>
              {categories[cat].map(({ name, url }) => (
                <CopyCard
                  key={name}
                  name={name}
                  url={url}
                  importStr={`import { ${name.replace(/(^|_)(.)/g, (_: string, __: string, c: string) => c.toUpperCase())} } from '@fynd-one/ds/icons/${cat}';`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
