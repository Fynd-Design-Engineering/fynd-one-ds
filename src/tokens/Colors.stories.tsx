import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { CSSProperties } from 'react';
import { neutrals, blue, peach, green, gold, lavender, red, textColors, backgroundColors, iconColors, borderColors, buttonColors, statusColors } from './colors';

const Swatch = ({ color, label }: { color: string; label: string }) => {
  const isLight = ['#ffffff', '#f8f8f9', '#f2f2f2', '#f9fbff', '#fbf7f4', '#f4fbf7', '#fdf5db', '#f0e9fd', '#f8cfd1'].includes(color);
  const swatch: CSSProperties = {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: color,
    border: isLight ? '1px solid #e3e3e3' : 'none',
  };
  const text: CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    color: '#5b5c5d',
    marginTop: 4,
    textAlign: 'center',
    maxWidth: 64,
    wordBreak: 'break-all',
  };
  const name: CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    color: '#101319',
    textAlign: 'center',
    maxWidth: 64,
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <div style={swatch} />
      <span style={name}>{label}</span>
      <span style={text}>{color}</span>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#101319' }}>{title}</h3>
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{children}</div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Colors',
};

export default meta;
type Story = StoryObj;

export const Primitives: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Section title="Neutrals">
        {(Object.entries(neutrals) as [string, string][]).map(([step, hex]) => (
          <Swatch key={step} color={hex} label={`N${step}`} />
        ))}
      </Section>
      <Section title="Blue">
        {(Object.entries(blue) as [string, string][]).map(([step, hex]) => (
          <Swatch key={step} color={hex} label={`B${step}`} />
        ))}
      </Section>
      <Section title="Peach">
        {(Object.entries(peach) as [string, string][]).map(([step, hex]) => (
          <Swatch key={step} color={hex} label={`P${step}`} />
        ))}
      </Section>
      <Section title="Green">
        {(Object.entries(green) as [string, string][]).map(([step, hex]) => (
          <Swatch key={step} color={hex} label={`G${step}`} />
        ))}
      </Section>
      <Section title="Gold">
        {(Object.entries(gold) as [string, string][]).map(([step, hex]) => (
          <Swatch key={step} color={hex} label={`Go${step}`} />
        ))}
      </Section>
      <Section title="Lavender">
        {(Object.entries(lavender) as [string, string][]).map(([step, hex]) => (
          <Swatch key={step} color={hex} label={`L${step}`} />
        ))}
      </Section>
      <Section title="Red">
        {(Object.entries(red) as [string, string][]).map(([step, hex]) => (
          <Swatch key={step} color={hex} label={`R${step}`} />
        ))}
      </Section>
    </div>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Section title="Text Colors">
        {(Object.entries(textColors) as [string, string][]).map(([name, hex]) => (
          <Swatch key={name} color={hex} label={name} />
        ))}
      </Section>
      <Section title="Background Colors">
        {(Object.entries(backgroundColors) as [string, string][]).map(([name, hex]) => (
          <Swatch key={name} color={hex} label={name} />
        ))}
      </Section>
      <Section title="Icon Colors">
        {(Object.entries(iconColors) as [string, string][]).map(([name, hex]) => (
          <Swatch key={name} color={hex} label={name} />
        ))}
      </Section>
      <Section title="Border Colors">
        {(Object.entries(borderColors) as [string, string][]).map(([name, hex]) => (
          <Swatch key={name} color={hex} label={name} />
        ))}
      </Section>
      {Object.entries(buttonColors).map(([variant, colors]) => (
        <Section key={variant} title={`Button — ${variant}`}>
          {Object.entries(colors).map(([prop, hex]) => (
            <Swatch key={prop} color={hex as string} label={prop} />
          ))}
        </Section>
      ))}
      <Section title="Status Colors">
        {(Object.entries(statusColors) as [string, string][]).map(([name, hex]) => (
          <Swatch key={name} color={hex} label={name} />
        ))}
      </Section>
    </div>
  ),
};