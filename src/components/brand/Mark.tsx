import { useId } from 'react';
import './brand.css';

/** Monogram WF: the last stroke of the W becomes the stem of the F. */
export const MARK_VIEWBOX = '16 25 107 67';
export const MARK_CLIP = { x: -60, y: 27, width: 300, height: 200 };
export const MARK_W_PATH = 'M-3.12 22 L17.5 88 L35 46 L52.5 88 L73.12 22';
export const MARK_BAR_PATH = 'M61.25 60 L87.49 60';
export const MARK_TOP = { x: 66.32, y: 27, width: 29.68, height: 10 };

const RATIO = 107 / 67;
const SIZES = { sm: 24, md: 36, lg: 64, xl: 112 } as const;

export type MarkSize = keyof typeof SIZES | number;
export type MarkTone = 'auto' | 'onBrand';

interface MarkProps {
  size?: MarkSize;
  tone?: MarkTone;
  title?: string;
  className?: string;
}

export function Mark({ size = 'md', tone = 'auto', title, className }: MarkProps) {
  const clipId = useId();
  const height = typeof size === 'number' ? size : SIZES[size];
  const classes = ['wf-mark', `wf-mark--${tone}`, className].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      width={Math.round(height * RATIO)}
      height={height}
      viewBox={MARK_VIEWBOX}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <rect {...MARK_CLIP} />
        </clipPath>
      </defs>
      <g transform="translate(25 0)">
        <g clipPath={`url(#${clipId})`}>
          <path className="wf-mark__accent" d={MARK_BAR_PATH} fill="none" strokeWidth={10} />
          <path
            className="wf-mark__main"
            d={MARK_W_PATH}
            fill="none"
            strokeWidth={10}
            strokeLinejoin="bevel"
            strokeMiterlimit={1}
          />
          <rect className="wf-mark__fill" {...MARK_TOP} />
        </g>
      </g>
    </svg>
  );
}
