import { revealDelay } from '@/components/reveal';
import { ServicesTrail } from './ServicesTrail';
import './Services.css';

export function Services() {
  return (
    <section id="servicos" className="services">
      <div className="section-head container-x">
        <div className="section-head__titles">
          <p className="eyebrow" data-reveal="from-left">
            Serviços
          </p>
          <h2 className="section-title" data-reveal style={revealDelay(100)}>
            Um traço, várias soluções
          </h2>
        </div>
      </div>
      <ServicesTrail />
    </section>
  );
}
