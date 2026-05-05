import React, { CSSProperties } from 'react';
import { VisualElement } from '../atoms/VisualElement';
import styles from './MetricCard.module.css';

export interface MetricCardProps {
  variant?: 'icon' | 'number';
  icon?: React.ReactNode;
  stat?: string;
  title: string;
  breakpoint?: 'lg' | 'md' | 'sm';
  onDarkBg?: boolean;
  /** Adds a 1px #e3e3e3 border around the card. Default `false`. */
  bordered?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  variant = 'icon',
  icon,
  stat = '00',
  title,
  breakpoint = 'lg',
  onDarkBg = false,
  bordered = false,
  className,
  style,
}) => {
  const isMobile = breakpoint === 'sm';
  const isNumber = variant === 'number';

  const cardClass = [
    styles.root,
    styles[breakpoint],
    onDarkBg && styles.dark,
    bordered && styles.bordered,
    className,
  ].filter(Boolean).join(' ');

  const heroClass = [
    styles.hero,
    isMobile && !isNumber && styles['hero--sm-icon'],
  ].filter(Boolean).join(' ');

  const statClass = [
    styles.stat,
    isMobile && styles['stat--sm'],
    onDarkBg && styles['stat--dark'],
  ].filter(Boolean).join(' ');

  const titleAreaClass = [
    styles['title-area'],
    isMobile && !isNumber && styles['title-area--sm-icon'],
    isMobile && styles['title-area--sm'],
  ].filter(Boolean).join(' ');

  const titleClass = [
    styles.title,
    isMobile && styles['title--sm'],
    isNumber
      ? (onDarkBg ? styles['title--number-dark'] : styles['title--number'])
      : (onDarkBg ? styles['title--dark'] : undefined),
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} style={style} data-figma-id="1257:28959">
      <div className={heroClass}>
        {isNumber ? (
          <p className={statClass}>{stat}</p>
        ) : (
          <VisualElement size={isMobile ? 'logo-64' : 'logo-80'} style={{ border: 'none' }}>
            {icon}
          </VisualElement>
        )}
      </div>
      <div className={titleAreaClass}>
        <p className={titleClass}>{title}</p>
      </div>
    </div>
  );
};

MetricCard.displayName = 'MetricCard';

export default MetricCard;
