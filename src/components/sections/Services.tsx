import { ServicesTrail } from './ServicesTrail';
import './Services.css';

export function Services() {
  return (
    <section id="servicos" className="services">
      <div className="section-head container-x">
        <div className="section-head__titles">
          <p className="eyebrow">Serviços</p>
          <h2 className="section-title">Um traço, várias soluções</h2>
        </div>
        <p className="section-lede">
          Assim como o W vira F na marca, cada serviço puxa o próximo: do link bio ao sistema completo.
        </p>
      </div>
      <ServicesTrail />
    </section>
  );
}
