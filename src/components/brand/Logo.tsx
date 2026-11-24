import { Mark, type MarkTone } from './Mark';
import './brand.css';

const LOGO_MARK = { sm: 30, md: 44, lg: 80, xl: 128 } as const;

interface LogoProps {
  variant?: 'lockup' | 'mark' | 'wordmark';
  size?: keyof typeof LOGO_MARK;
  tone?: MarkTone;
  className?: string;
}

export function Logo({ variant = 'lockup', size = 'md', tone = 'auto', className }: LogoProps) {
  const classes = ['wf-logo', `wf-logo--${size}`, `wf-logo--${tone}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes} role="img" aria-label="Wesley Filho Dev">
      {variant !== 'wordmark' && <Mark size={LOGO_MARK[size]} tone={tone} />}
      {variant !== 'mark' && (
        <span className="wf-logo__words" aria-hidden="true">
          <span className="wf-logo__name">Wesley Filho</span>
          <span className="wf-logo__dev">dev</span>
        </span>
      )}
    </span>
  );
}
