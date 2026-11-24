import { ArrowUpRight } from '@/components/icons';
import { projectKindLabel, projects, type Project } from '@/data/site';
import { ProjectPreview } from './ProjectPreview';
import './Projects.css';

function ProjectCard({ project, index, decorative }: { project: Project; index: number; decorative: boolean }) {
  return (
    <a
      className="project-card"
      href={project.href}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
    >
      <div className={index % 2 === 0 ? 'project-card__thumb project-card__thumb--night' : 'project-card__thumb'}>
        <ProjectPreview kind={project.kind} />
      </div>
      <div className="project-card__meta">
        <div className="project-card__titles">
          <span className="project-card__type">{projectKindLabel[project.kind]}</span>
          <span className="project-card__name">{project.name}</span>
        </div>
        <ArrowUpRight className="project-card__arrow" />
      </div>
    </a>
  );
}

/**
 * Uma linha da esteira. Os itens são repetidos para preencher telas largas e
 * para o loop de -50% ficar contínuo; só a primeira cópia é lida por leitores de tela.
 */
function MarqueeRow({ items, offset, reverse }: { items: Project[]; offset: number; reverse?: boolean }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className={reverse ? 'marquee__row marquee__row--reverse' : 'marquee__row'}>
      <div className="marquee__track">
        {loop.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            index={offset + (i % items.length)}
            decorative={i >= items.length}
          />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const half = Math.ceil(projects.length / 2);
  return (
    <section id="projetos" className="projects">
      <div className="section-head container-x">
        <div className="section-head__titles">
          <p className="eyebrow">Portfólio</p>
          <h2 className="section-title">Projetos que saíram do papel</h2>
        </div>
        <p className="section-lede">Passe o mouse para parar a esteira e ver o projeto de perto.</p>
      </div>
      <div className="marquee">
        <MarqueeRow items={projects.slice(0, half)} offset={0} />
        <MarqueeRow items={projects.slice(half)} offset={half} reverse />
      </div>
    </section>
  );
}
