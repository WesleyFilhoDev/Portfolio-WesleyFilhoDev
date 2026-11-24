import type { CSSProperties } from 'react';

/**
 * Atraso da revelação ao rolar (ver ScrollReveal), para elementos entrarem em sequência:
 * `<h2 data-reveal style={revealDelay(120)}>`.
 */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;
