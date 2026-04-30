import React, { CSSProperties, ReactNode } from 'react';
import { Text, TextVariant, TextWeight } from '../Typography/Text';
import { IcPointerTick } from '../../assets/icons/feedback';
import styles from './Pointers.module.css';

export interface PointerItem {
  /** Visible label rendered next to the tick. Either pass a string or
   *  pass `node` for a custom-formatted label. */
  label: string;
  /** Optional override of the rendered label content (for inline links,
   *  bold spans, etc.). When provided, replaces `label`. */
  node?: ReactNode;
}

export interface PointersProps {
  items: PointerItem[];
  /** Text variant for each label. Default `body-m`. */
  variant?: TextVariant;
  /** Text weight for each label. Default `regular`. */
  weight?: TextWeight;
  /** Inverted on dark backgrounds — flips the tick to white. */
  onDarkBg?: boolean;
  /** Replace the default tick icon. Pass any 22×22 React node. */
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Pointers: React.FC<PointersProps> = ({
  items,
  variant = 'body-m',
  weight = 'regular',
  onDarkBg = false,
  icon,
  className,
  style,
}) => {
  const rootClasses = [styles.root, onDarkBg && styles['root--dark'], className]
    .filter(Boolean)
    .join(' ');
  const labelColor = onDarkBg ? 'white' : 'subtle';
  return (
    <ul className={rootClasses} style={style}>
      {items.map((item, idx) => (
        <li key={idx} className={styles.item}>
          <span className={styles.icon} aria-hidden="true">
            {icon ?? <IcPointerTick />}
          </span>
          <span className={styles.label}>
            <Text variant={variant} weight={weight} color={labelColor} as="span">
              {item.node ?? item.label}
            </Text>
          </span>
        </li>
      ))}
    </ul>
  );
};

Pointers.displayName = 'Pointers';

export default Pointers;
