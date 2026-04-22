import React, { useRef, useState, useCallback, useEffect, CSSProperties } from 'react';
import styles from './Rail.module.css';

export interface RailProps {
  children: React.ReactNode;
  /** Gap between items in px */
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

export const Rail: React.FC<RailProps> = ({
  children,
  gap = 20,
  className,
  style,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(track.scrollLeft);
    track.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - startX;
    trackRef.current.scrollLeft = scrollLeft - dx;
  }, [isDragging, startX, scrollLeft]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    trackRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  // Prevent click events after drag
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const preventClick = (e: MouseEvent) => {
      if (isDragging) e.preventDefault();
    };
    track.addEventListener('click', preventClick, true);
    return () => track.removeEventListener('click', preventClick, true);
  }, [isDragging]);

  const cls = [styles.root, className].filter(Boolean).join(' ');

  const trackStyle: CSSProperties = {
    '--rail-gap': `${gap}px`,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={trackRef}
      className={cls}
      style={trackStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </div>
  );
};

Rail.displayName = 'Rail';

export default Rail;
