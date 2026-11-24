import Image from 'next/image';
import { Button } from '@/components/brand';
import { heroServices } from '@/data/site';
import heroImg from '@/assets/images/hero.jpg';
import './Hero.css';

export function Hero() {
  const last = heroServices.length - 1;
  return (
    <section id="inicio" className="hero">
      <Image
        className="hero__img"
        src={heroImg}
        alt="Wesley Filho sorrindo, de boné e moletom pretos, com as luzes da cidade à noite ao fundo"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
      />

      <ul className="orbit" aria-label="Serviços">
        {heroServices.map((label, i) => (
          <li key={label} className="orbit__item">
            <span className="orbit__y">
              <span className="orbit__center">
                <span
                  className={i === last ? 'chip chip--brand' : 'chip'}
                  style={{ animationDelay: `${3.3 + i * 0.08}s` }}
                >
                  <span className="chip__dot" aria-hidden="true" />
                  {label}
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="hero__content">
        <p className="hero__kicker">Dev</p>
        <h1 className="hero__title">
          Wesley Filho<span className="accent">.</span>
        </h1>
        <p className="hero__tagline">Seu negócio visível na internet.</p>
        <div className="hero__actions">
          <Button variant="primary" size="lg" href="#contato">
            Pedir orçamento
          </Button>
          <Button variant="outline" size="lg" href="#contato">
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
