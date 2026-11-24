/** Inline stroke icons used across the site (24×24 grid, square caps). */
interface IconProps {
  size?: number;
  className?: string;
}

const common = {
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 2,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'bevel' as const,
  'aria-hidden': true,
};

export const ArrowUpRight = ({ size = 22, className }: IconProps) => (
  <svg {...common} width={size} height={size} className={className}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const ChatIcon = ({ size = 22, className }: IconProps) => (
  <svg {...common} width={size} height={size} className={className}>
    <path d="M4 5h16v11H10l-6 4z" />
  </svg>
);

export const MailIcon = ({ size = 22, className }: IconProps) => (
  <svg {...common} width={size} height={size} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const InstagramIcon = ({ size = 22, className }: IconProps) => (
  <svg {...common} width={size} height={size} className={className}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17 7h.01" />
  </svg>
);
