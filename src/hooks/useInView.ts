'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Turns `true` once the element is at least `threshold` visible.
 * Observation starts after `startDelay` ms (used to wait for the splash screen).
 */
export function useInView<T extends Element>({ threshold = 0.25, startDelay = 0 } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;

    const timer = window.setTimeout(() => {
      if (typeof IntersectionObserver === 'undefined') {
        setInView(true);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setInView(true);
            io?.disconnect();
          }
        },
        { threshold },
      );
      io.observe(el);
    }, startDelay);

    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, [threshold, startDelay]);

  return [ref, inView] as const;
}
