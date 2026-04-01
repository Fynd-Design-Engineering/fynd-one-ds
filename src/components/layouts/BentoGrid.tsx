import React, { CSSProperties } from 'react';
import s from './BentoGrid.module.css';

export type BentoRatio = '5:4' | '3:2' | '3:4' | 'wide';

export interface BentoGridProps {
  children: React.ReactNode;
  /** Aspect ratio for each card slot. Length determines card count. */
  ratios?: BentoRatio[];
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

const ratioClassMap: Record<BentoRatio, string> = {
  '5:4': 'cell--5x4',
  '3:2': 'cell--3x2',
  '3:4': 'cell--3x4',
  'wide': 'cell--wide',
};

/** Default alternating pattern: 5:4, 3:2, 3:2, 5:4 */
const defaultRatios: BentoRatio[] = ['5:4', '3:2', '3:2', '5:4'];

/**
 * Two-column bento layout with configurable aspect ratios.
 *
 * Cards are distributed into two columns in order (odd index → col1, even → col2).
 * 'wide' ratio cards span full width below the columns.
 * Stacks to single column on screens ≤768px.
 */
export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  ratios = defaultRatios,
  gap = 20,
  className,
  style,
}) => {
  const childArray = React.Children.toArray(children);

  // Separate wide cards (full-width) from column cards
  const columnItems: { child: React.ReactNode; ratioClass: string }[] = [];
  const wideItems: { child: React.ReactNode; ratioClass: string }[] = [];

  childArray.forEach((child, i) => {
    const r = ratios[i] || '3:2';
    const ratioClass = ratioClassMap[r];
    if (r === 'wide') {
      wideItems.push({ child, ratioClass });
    } else {
      columnItems.push({ child, ratioClass });
    }
  });

  // Split column items into col1 (even index) and col2 (odd index)
  const col1 = columnItems.filter((_, i) => i % 2 === 0);
  const col2 = columnItems.filter((_, i) => i % 2 === 1);

  const wrapperClass = [s.root, className].filter(Boolean).join(' ');
  const cellClass = (ratioClass: string) => [s.cell, s[ratioClass]].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass} style={{ '--bento-gap': `${gap}px`, ...style } as CSSProperties}>
      {columnItems.length > 0 && (
        <div className={s.columns}>
          <div className={s.column}>
            {col1.map((item, i) => (
              <div key={`c1-${i}`} className={cellClass(item.ratioClass)}>{item.child}</div>
            ))}
          </div>
          {col2.length > 0 && (
            <div className={s.column}>
              {col2.map((item, i) => (
                <div key={`c2-${i}`} className={cellClass(item.ratioClass)}>{item.child}</div>
              ))}
            </div>
          )}
        </div>
      )}
      {wideItems.map((item, i) => (
        <div key={`wide-${i}`} className={cellClass(item.ratioClass)}>{item.child}</div>
      ))}
    </div>
  );
};

BentoGrid.displayName = 'BentoGrid';

export default BentoGrid;
