'use client';

import { useEffect } from 'react';
import { SHOW_SPLASH, SPLASH_DURATION } from '@/data/site';
import './ScrollReveal.css';

/**
 * Observa todos os elementos com `data-reveal` e marca com `.is-revealed`
 * quando entram na tela. A animação em si fica no CSS (ScrollReveal.css).
 */
export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const revealAll = () => elements.forEach((el) => el.classList.add('is-revealed'));

    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    // Espera a abertura sair para o que já está na tela animar à vista.
    const timer = window.setTimeout(
      () => elements.forEach((el) => observer.observe(el)),
      SHOW_SPLASH ? SPLASH_DURATION - 300 : 0,
    );

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
