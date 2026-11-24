import { Logo } from '@/components/brand';
import { revealDelay } from '@/components/reveal';
import { navLinks } from '@/data/site';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer container-x">
      <div data-reveal="fade">
        <Logo variant="lockup" size="sm" />
      </div>
      <nav className="footer__nav" aria-label="Rodapé" data-reveal="fade" style={revealDelay(100)}>
        {navLinks.map(({ id, label }) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <p className="footer__copy" data-reveal="fade" style={revealDelay(200)}>© {new Date().getFullYear()} Wesley Filho Dev</p>
    </footer>
  );
}
