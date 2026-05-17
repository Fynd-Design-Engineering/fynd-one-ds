import React, { CSSProperties, ReactNode } from 'react';
import { Text } from '../Typography/Text';
import { SectionHeader, type SectionHeaderProps } from '../_shared/SectionHeader';
import styles from './FeatureSplit.module.css';

export interface FeatureSplitItem {
  title: string;
  description: string;
}

export interface FeatureSplitRow {
  items: FeatureSplitItem[];
  image: { src: string; alt?: string };
  /** Which side the image bleeds from. Default: 'left'. */
  imageSide?: 'left' | 'right';
  /** CSS color behind this row's image cell. */
  visualBg?: string;
}

export interface FeatureSplitProps
  extends Pick<
    SectionHeaderProps,
    | 'chipLabel'
    | 'chipVariant'
    | 'chipDotColor'
    | 'chipIcon'
    | 'showChip'
    | 'subtext'
    | 'narrowSubtext'
    | 'titleSize'
    | 'align'
    | 'actions'
    | 'actionsPlacement'
    | 'wideContent'
    | 'compactContent'
  > {
  /** Optional section header title. When omitted the header is not rendered. */
  title?: string;
  rows: FeatureSplitRow[];
  /** CSS color for the full section background. */
  bg?: string;
  onDarkBg?: boolean;
  as?: 'section' | 'div' | 'article';
  id?: string;
  className?: string;
  style?: CSSProperties;
}

export const FeatureSplit: React.FC<FeatureSplitProps> = ({
  title,
  chipLabel,
  chipVariant,
  chipDotColor,
  chipIcon,
  showChip,
  subtext,
  narrowSubtext,
  titleSize,
  align,
  actions,
  actionsPlacement,
  wideContent,
  compactContent,
  rows,
  bg,
  onDarkBg = false,
  as: Tag = 'section',
  id,
  className,
  style,
}) => {
  const hasHeader = Boolean(title);

  return (
    <Tag
      id={id}
      className={[styles.root, onDarkBg && styles['root--dark'], className]
        .filter(Boolean)
        .join(' ')}
      style={{ ...(bg ? { background: bg } : undefined), ...style }}
    >
      {hasHeader && (
        <div className={styles.header}>
          <div className={styles.headerInner}>
          <SectionHeader
            title={title!}
            chipLabel={chipLabel}
            chipVariant={chipVariant}
            chipDotColor={chipDotColor}
            chipIcon={chipIcon}
            showChip={showChip}
            subtext={subtext}
            narrowSubtext={narrowSubtext}
            titleSize={titleSize}
            align={align}
            actions={actions}
            actionsPlacement={actionsPlacement}
            wideContent={wideContent}
            compactContent={compactContent}
            onDarkBg={onDarkBg}
          />
          </div>
        </div>
      )}

      <div className={[styles.rows, hasHeader && styles['rows--belowHeader']].filter(Boolean).join(' ')}>
        {rows.map((row, i) => (
          <SplitRow key={i} row={row} onDarkBg={onDarkBg} />
        ))}
      </div>
    </Tag>
  );
};

FeatureSplit.displayName = 'FeatureSplit';

// ── Internal row ─────────────────────────────────────────────────────────────

interface SplitRowProps {
  row: FeatureSplitRow;
  onDarkBg: boolean;
}

const SplitRow: React.FC<SplitRowProps> = ({ row, onDarkBg }) => {
  const { items, image, imageSide = 'left', visualBg } = row;

  return (
    <div
      className={[
        styles.row,
        imageSide === 'right' && styles['row--imageRight'],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={styles.visual}
        style={visualBg ? { background: visualBg } : undefined}
      >
        <img
          src={image.src}
          alt={image.alt ?? ''}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.content}>
        <ul className={styles.items}>
          {items.map((item, i) => (
            <li key={i} className={styles.item}>
              <Text
                variant="heading-s"
                as="h3"
                color={onDarkBg ? 'white' : 'default'}
              >
                {item.title}
              </Text>
              <Text
                variant="body-m"
                as="p"
                color={onDarkBg ? 'white' : 'secondary'}
              >
                {item.description}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeatureSplit;
