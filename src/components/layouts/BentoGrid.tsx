import React, { CSSProperties } from 'react';

export type BentoRatio = '5:4' | '3:2' | '3:4' | 'wide';

export interface BentoGridProps {
  children: React.ReactNode;
  /** Aspect ratio for each card slot. Length determines card count. */
  ratios?: BentoRatio[];
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

const ratioMap: Record<BentoRatio, string> = {
  '5:4': '5 / 4',
  '3:2': '3 / 2',
  '3:4': '3 / 4',
  'wide': '1272 / 417',
};

/** Default alternating pattern: 5:4, 3:2, 3:2, 5:4 */
const defaultRatios: BentoRatio[] = ['5:4', '3:2', '3:2', '5:4'];

/**
 * Two-column bento layout with configurable aspect ratios.
 *
 * Cards are distributed into two columns in order (odd index → col1, even → col2).
 * 'wide' ratio cards span full width below the columns.
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
  const columnItems: { child: React.ReactNode; ratio: string }[] = [];
  const wideItems: { child: React.ReactNode; ratio: string }[] = [];

  childArray.forEach((child, i) => {
    const r = ratios[i] || '3:2';
    if (r === 'wide') {
      wideItems.push({ child, ratio: ratioMap[r] });
    } else {
      columnItems.push({ child, ratio: ratioMap[r] });
    }
  });

  // Split column items into col1 (even index) and col2 (odd index)
  const col1 = columnItems.filter((_, i) => i % 2 === 0);
  const col2 = columnItems.filter((_, i) => i % 2 === 1);

  const wrapper: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap,
    width: '100%',
    ...style,
  };

  const columns: CSSProperties = {
    display: 'flex',
    gap,
    alignItems: 'flex-start',
  };

  const column: CSSProperties = {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    gap,
    minWidth: 0,
  };

  const cell = (ratio: string): CSSProperties => ({
    width: '100%',
    aspectRatio: ratio,
    borderRadius: '16px',
    overflow: 'hidden',
  });

  return (
    <div className={className} style={wrapper}>
      {columnItems.length > 0 && (
        <div style={columns}>
          <div style={column}>
            {col1.map((item, i) => (
              <div key={`c1-${i}`} style={cell(item.ratio)}>{item.child}</div>
            ))}
          </div>
          {col2.length > 0 && (
            <div style={column}>
              {col2.map((item, i) => (
                <div key={`c2-${i}`} style={cell(item.ratio)}>{item.child}</div>
              ))}
            </div>
          )}
        </div>
      )}
      {wideItems.map((item, i) => (
        <div key={`wide-${i}`} style={cell(item.ratio)}>{item.child}</div>
      ))}
    </div>
  );
};

BentoGrid.displayName = 'BentoGrid';

export default BentoGrid;
