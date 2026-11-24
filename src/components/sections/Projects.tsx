import { revealDelay } from '@/components/reveal';
import { projects } from '@/data/site';
import { ProjectsCarousel } from './ProjectsCarousel';
import './Projects.css';

export function Projects() {
  // Segunda linha: mesmos projetos, começando do meio, para não empilhar o mesmo card.
  const half = Math.floor(projects.length / 2);
  const rotated = [...projects.slice(half), ...projects.slice(0, half)];
  return (
    <section id="projetos" className="projects">
      <ProjectsCarousel
        rows={[projects, rotated]}
        heading={
          <>
            <div className="section-head__titles">
              <p className="eyebrow" data-reveal="from-left">
                Portfólio
              </p>
              <h2 className="section-title" data-reveal style={revealDelay(100)}>
                Projetos que saíram do papel
              </h2>
            </div>
            <p className="section-lede" data-reveal style={revealDelay(200)}>
              Arraste ou use as setas para navegar. Clique para ver o projeto no ar.
            </p>
          </>
        }
      />
    </section>
  );
}
