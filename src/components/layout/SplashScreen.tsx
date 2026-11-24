'use client';

import { useEffect, useState } from 'react';
import { MARK_BAR_PATH, MARK_CLIP, MARK_TOP, MARK_VIEWBOX, MARK_W_PATH } from '@/components/brand/Mark';
import { SPLASH_DURATION } from '@/data/site';
import './SplashScreen.css';

/** Abertura: o monograma WF é desenhado traço a traço e some em seguida. */
export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), SPLASH_DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="splash">
      <svg width="240" height="150" viewBox={MARK_VIEWBOX} role="img" aria-label="Wesley Filho Dev, carregando">
        <defs>
          <clipPath id="splash-clip">
            <rect {...MARK_CLIP} />
          </clipPath>
        </defs>
        <g transform="translate(25 0)">
          <g clipPath="url(#splash-clip)">
            <path className="splash__track" d={MARK_BAR_PATH} fill="none" strokeWidth={10} />
            <path className="splash__bar" d={MARK_BAR_PATH} fill="none" strokeWidth={10} />
            <path
              className="splash__w"
              d={MARK_W_PATH}
              fill="none"
              strokeWidth={10}
              strokeLinejoin="bevel"
              strokeMiterlimit={1}
            />
            <rect className="splash__top" {...MARK_TOP} />
          </g>
        </g>
      </svg>
    </div>
  );
}
