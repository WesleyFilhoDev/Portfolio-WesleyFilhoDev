'use client';

import { Button } from '@/components/brand';
import { ArrowUpRight, ChatIcon, InstagramIcon, MailIcon } from '@/components/icons';
import { contacts, QUOTE_URL, SHOW_SPLASH, SPLASH_DURATION, type Contact as ContactItem } from '@/data/site';
import { useInView } from '@/hooks/useInView';
import './Contact.css';

const ZIGZAG = '0,60 120,200 240,60 360,200 480,60 600,200 720,60';

const icons: Record<ContactItem['icon'], typeof ChatIcon> = {
  chat: ChatIcon,
  mail: MailIcon,
  instagram: InstagramIcon,
};

/** Em telas estreitas, deixa o e-mail quebrar antes do "@" em vez de no meio do domínio. */
function breakBeforeAt(value: string) {
  const at = value.indexOf('@');
  if (at <= 0) return value;
  return (
    <>
      {value.slice(0, at)}
      <wbr />
      {value.slice(at)}
    </>
  );
}

export function Contact() {
  const [ref, on] = useInView<HTMLElement>({ startDelay: SHOW_SPLASH ? SPLASH_DURATION : 0 });

  return (
    <section id="contato" ref={ref} className={on ? 'contact contact--on container-x' : 'contact container-x'}>
      <div className="contact__draw" aria-hidden="true">
        <svg width="720" height="260" viewBox="0 0 720 260">
          <polyline className="contact__line" points={ZIGZAG} />
        </svg>
      </div>
      <div className="contact__flow" aria-hidden="true">
        <svg width="720" height="260" viewBox="0 0 720 260">
          <polyline className="contact__line-flow" points={ZIGZAG} />
        </svg>
      </div>
      <span className="contact__bar" aria-hidden="true" />

      <div className="contact__head contact__rise">
        <div className="contact__titles">
          <div className="eyebrow-row">
            <span className="eyebrow-bar" aria-hidden="true" />
            <p className="eyebrow">Contato</p>
          </div>
          <h2 className="contact__title">
            Vamos tirar seu projeto do papel<span className="accent">?</span>
          </h2>
          <p className="contact__lede">
            A trilha termina aqui, e o seu projeto começa. Me conta o que você precisa e eu respondo com uma proposta
            pensada para o seu negócio.
          </p>
        </div>
        <div className="contact__cta">
          <Button variant="primary" size="lg" href={QUOTE_URL} target="_blank" rel="noopener noreferrer">
            Pedir orçamento
          </Button>
        </div>
      </div>

      <div className="contact__rise">
        <div className="contact__tiles">
          {contacts.map((contact) => {
            const Icon = icons[contact.icon];
            return (
              <a
                key={contact.label}
                className="contact-tile"
                href={contact.href}
                {...(contact.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact-tile__icon">
                  <Icon />
                </span>
                <span className="contact-tile__text">
                  <span className="contact-tile__label">{contact.label}</span>
                  <span className="contact-tile__value">{breakBeforeAt(contact.value)}</span>
                </span>
                <ArrowUpRight className="contact-tile__arrow" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
