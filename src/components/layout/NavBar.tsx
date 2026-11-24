'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Logo } from '@/components/brand';
import { navLinks } from '@/data/site';
import './NavBar.css';

/** Barra flutuante: some ao rolar para baixo, volta ao rolar para cima e marca a seção atual. */
export function NavBar() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('');
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 120 && y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6 || y <= 120) setHidden(false);
      lastY.current = y;

      let current = '';
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={hidden ? 'navbar navbar--hidden' : 'navbar'}>
      <div className="navbar__inner">
        <a className="navbar__home" href="#inicio" aria-label="Wesley Filho Dev, início">
          <Logo variant="mark" size="sm" />
        </a>
        <nav className="navbar__links" aria-label="Principal">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'navbar__link navbar__link--active' : 'navbar__link'}
              aria-current={active === id ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <Button variant="primary" href="#contato">
          Pedir orçamento
        </Button>
      </div>
    </header>
  );
}
