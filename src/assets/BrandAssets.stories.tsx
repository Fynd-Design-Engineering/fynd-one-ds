import type { Meta, StoryObj } from '@storybook/react';
import React, { CSSProperties, useState } from 'react';

const brandIcons = import.meta.glob('./brand-icons/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const brandLogos = import.meta.glob('./brand-logos/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

const extractName = (path: string) => {
  const file = path.split('/').pop() || '';
  return file.replace('.svg', '');
};

const CopyCard = ({
  url, name, importPath, isDark, height,
}: {
  url: string; name: string; importPath: string; isDark: boolean; height: number;
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(importPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const card: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 8,
    border: '1px solid #e3e3e3',
    backgroundColor: isDark ? '#0e0e0e' : '#fff',
    cursor: 'pointer',
    position: 'relative',
    transition: 'border-color 0.2s',
  };

  const label: CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 10,
    color: isDark ? '#a0a1a2' : '#5b5c5d',
    textAlign: 'center',
    wordBreak: 'break-all',
  };

  const tooltip: CSSProperties = {
    position: 'absolute',
    bottom: -28,
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: "'Inter', sans-serif",
    fontSize: 10,
    color: '#fff',
    backgroundColor: '#0e0e0e',
    padding: '4px 8px',
    borderRadius: 4,
    whiteSpace: 'nowrap',
    zIndex: 10,
  };

  return (
    <div style={card} onClick={handleClick} title={`Click to copy: ${importPath}`}>
      <img src={url} alt={name} style={{ height, objectFit: 'contain', maxWidth: '100%' }} />
      <span style={label}>{name}</span>
      {copied && <span style={tooltip}>Copied!</span>}
    </div>
  );
};

const AssetGrid = ({ assets, assetType, height }: { assets: Record<string, string>; assetType: 'brand-icons' | 'brand-logos'; height: number }) => {
  const grid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: 16,
    paddingBottom: 32,
  };

  const entries = Object.entries(assets);
  const lightEntries = entries.filter(([p]) => p.includes('-light'));
  const darkEntries = entries.filter(([p]) => p.includes('-dark'));

  const getImport = (name: string) =>
    `import ${name.replace(/-./g, (m) => m[1].toUpperCase())} from '@fynd-one/ds/assets/${assetType}/${name}.svg';`;

  return (
    <div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#797a7c', marginBottom: 16 }}>
        Click any asset to copy its import statement
      </p>

      <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#0e0e0e', marginBottom: 12 }}>
        Light variants ({lightEntries.length})
      </h4>
      <div style={grid}>
        {lightEntries.map(([path, url]) => {
          const name = extractName(path);
          return <CopyCard key={path} url={url} name={name} importPath={getImport(name)} isDark height={height} />;
        })}
      </div>

      <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#0e0e0e', margin: '24px 0 12px' }}>
        Dark variants ({darkEntries.length})
      </h4>
      <div style={grid}>
        {darkEntries.map(([path, url]) => {
          const name = extractName(path);
          return <CopyCard key={path} url={url} name={name} importPath={getImport(name)} isDark={false} height={height} />;
        })}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Tokens/Brand Assets',
};

export default meta;
type Story = StoryObj;

export const BrandIcons: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
        Brand Icons ({Object.keys(brandIcons).length})
      </h3>
      <AssetGrid assets={brandIcons} assetType="brand-icons" height={32} />
    </div>
  ),
};

export const BrandLogos: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
        Brand Logos ({Object.keys(brandLogos).length})
      </h3>
      <AssetGrid assets={brandLogos} assetType="brand-logos" height={40} />
    </div>
  ),
};
