import { Logo } from '@/components/brand';
import { navLinks } from '@/data/site';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer container-x">
      <Logo variant="lockup" size="sm" />
      <nav className="footer__nav" aria-label="Rodapé">
        {navLinks.map(({ id, label }) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <p className="footer__copy">© {new Date().getFullYear()} Wesley Filho Dev</p>
    </footer>
  );
}
