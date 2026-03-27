import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { IconChevronRight } from './IconChevronRight';
import { IconArrowDiagonal } from './IconArrowDiagonal';
import { IconStar } from './IconStar';

const icons = [
  { name: 'IconChevronRight', Component: IconChevronRight },
  { name: 'IconArrowDiagonal', Component: IconArrowDiagonal },
  { name: 'IconStar', Component: IconStar },
];

const CopyIconCard = ({ name, Component }: { name: string; Component: React.FC<{ size?: number; color?: string }> }) => {
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
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        cursor: 'pointer', position: 'relative',
      }}
    >
      <div style={{
        width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 8, border: '1px solid #e3e3e3', backgroundColor: '#fff',
      }}>
        <Component size={24} color="#0e0e0e" />
      </div>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#5b5c5d' }}>{name}</span>
      {copied && (
        <span style={{
          position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#fff',
          backgroundColor: '#0e0e0e', padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap',
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

export const Catalog: Story = {
  render: () => (
    <div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#797a7c', marginBottom: 16 }}>
        Click any icon to copy its import statement
      </p>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {icons.map(({ name, Component }) => (
          <CopyIconCard key={name} name={name} Component={Component} />
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {[12, 16, 20, 24, 32].map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <IconStar size={size} color="#0e0e0e" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#5b5c5d' }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};
