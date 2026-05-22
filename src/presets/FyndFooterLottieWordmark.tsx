'use client';

/**
 * Animated Fynd wordmark sourced from a Lottie JSON. Lives in its own
 * `'use client'` module so the rest of the marketing-footer preset
 * (plain data + a JSX node referencing this component) can be imported
 * from a Next.js / RSC server boundary without "useState only works in
 * Client Components" errors. Server modules can compose this client
 * component into their JSX trees freely.
 */

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const FYND_LOTTIE_URL =
  'https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/ds-shared/fynd-logo-bottom.json';

export interface FyndFooterLottieWordmarkProps {
  /** Override the Lottie JSON source. Defaults to the Fynd marketing wordmark. */
  src?: string;
}

export const FyndFooterLottieWordmark = ({
  src = FYND_LOTTIE_URL,
}: FyndFooterLottieWordmarkProps) => {
  const [data, setData] = useState<object | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!data) return null;
  return (
    <Lottie
      animationData={data}
      loop
      autoplay
      style={{ width: '100%', maxWidth: 1272, height: 'auto' }}
    />
  );
};

export default FyndFooterLottieWordmark;
