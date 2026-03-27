import React, { CSSProperties, useState } from 'react';
import { neutrals, shadows } from '../../tokens';

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultIndex?: number;
  className?: string;
  style?: CSSProperties;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultIndex = 0,
  className,
  style,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const wrapper: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    ...style,
  };

  const tabBar: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-end',
  };

  const tabButton = (isActive: boolean): CSSProperties => ({
    flex: '1 1 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '18px 24px',
    fontFamily: "'Inter Display', 'Inter', sans-serif",
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.5,
    color: isActive ? neutrals[100] : neutrals[60],
    backgroundColor: isActive ? neutrals[0] : 'transparent',
    border: 'none',
    borderRadius: isActive ? '12px 12px 0 0' : '8px 8px 0 0',
    boxShadow: isActive ? 'none' : shadows.s,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s, background-color 0.2s',
  });

  const panel: CSSProperties = {
    backgroundColor: neutrals[0],
    borderRadius: '12px',
    padding: '48px 120px 80px',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <div className={className} style={wrapper}>
      <div style={tabBar}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            style={tabButton(i === activeIndex)}
            onClick={() => setActiveIndex(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={panel}>
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
