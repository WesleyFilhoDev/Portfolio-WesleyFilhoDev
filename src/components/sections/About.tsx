import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Button } from '@/components/brand';
import { revealDelay } from '@/components/reveal';
import { reasons } from '@/data/site';
import aboutImg from '@/assets/images/about.jpg';
import './About.css';

/** Posição de cada ponto de luz sobre a foto (desktop). */
const SPOTS = [
  { x: '10.4%', y: '350px' },
  { x: '33.3%', y: '420px' },
  { x: '13.2%', y: '520px' },
  { x: '38.9%', y: '600px' },
];

export function About() {
  return (
    <section id="sobre" className="about">
      <Image
        className="about__img"
        src={aboutImg}
        alt="Wesley Filho de perfil, olhando para as luzes da cidade à noite"
        fill
        sizes="100vw"
        quality={90}
        placeholder="blur"
      />

      <div className="about__text">
        <div className="eyebrow-row" data-reveal="from-left">
          <span className="eyebrow-bar" aria-hidden="true" />
          <p className="eyebrow">Sobre mim</p>
        </div>
        <h2 className="about__title" data-reveal style={revealDelay(100)}>
          Prazer, eu sou Wesley<span className="accent">.</span>
        </h2>
        <p className="about__bio" data-reveal style={revealDelay(200)}>
          Sou desenvolvedor web e trato cada projeto como se fosse meu. Antes de criar qualquer coisa, gosto de
          entender a história do negócio e da pessoa por trás dele.
        </p>
      </div>

      <ul className="about__spots" aria-label="Por que estar na internet">
        {reasons.map((reason, i) => (
          <li
            key={reason}
            className="about__spot"
            data-reveal="scale"
            style={{ '--x': SPOTS[i].x, '--y': SPOTS[i].y, ...revealDelay(i * 140) } as CSSProperties}
          >
            <span className="about__dot" aria-hidden="true">
              <span className="about__ring" style={{ animationDelay: `${i * 0.65}s` }} />
            </span>
            <span className="about__pill">{reason}</span>
          </li>
        ))}
      </ul>

      <div className="about__bottom">
        <p className="about__statement" data-reveal>
          Se o seu negócio não está na internet, ele está <span className="accent">invisível</span>.
        </p>
        <div className="about__cta" data-reveal="scale" style={revealDelay(150)}>
          <Button variant="primary" size="lg" href="#contato">
            Quero aparecer
          </Button>
        </div>
      </div>
    </section>
  );
}
