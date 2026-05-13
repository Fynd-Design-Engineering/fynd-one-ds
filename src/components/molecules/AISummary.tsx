import React, { CSSProperties, ReactNode } from 'react';
import { IcAiStar } from '../../assets/icons/AI';
import styles from './AISummary.module.css';

export interface AISummaryProps {
  children: ReactNode;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export const AISummary: React.FC<AISummaryProps> = ({
  children,
  label = 'AI summary',
  className,
  style,
}) => {
  const rootClass = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div
      className={rootClass}
      style={style}
      role="region"
      aria-label={label}
    >
      <div className={styles.tab}>
        <span className={styles.icon} aria-hidden="true">
          <IcAiStar />
        </span>
        <span className={styles['tab-label']}>{label}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

AISummary.displayName = 'AISummary';

export default AISummary;
