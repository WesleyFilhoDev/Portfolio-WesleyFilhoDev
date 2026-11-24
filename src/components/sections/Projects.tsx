import Image from 'next/image';
import { ArrowUpRight } from '@/components/icons';
import { revealDelay } from '@/components/reveal';
import { projectKindLabel, projects, type Project } from '@/data/site';
import { ProjectPreview } from './ProjectPreview';
import './Projects.css';

const hostOf = (href: string) => {
  try {
    return new URL(href).host;
  } catch {
    return href;
  }
};

function ProjectCard({ project, index, decorative }: { project: Project; index: number; decorative: boolean }) {
  const external = project.href.startsWith('http');
  return (
    <a
      className="project-card"
      href={project.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
    >
      {project.image ? (
        <div className="project-card__browser">
          <div className="project-card__bar" aria-hidden="true">
            <span className="project-card__dots">
              <span />
              <span />
              <span />
            </span>
            <span className="project-card__url">{hostOf(project.href)}</span>
          </div>
          <div className="project-card__shot">
            <Image src={project.image} alt="" fill sizes="360px" placeholder="blur" />
          </div>
        </div>
      ) : (
        <div className={index % 2 === 0 ? 'project-card__thumb project-card__thumb--night' : 'project-card__thumb'}>
          <ProjectPreview kind={project.kind} />
        </div>
      )}
      <div className="project-card__meta">
        <div className="project-card__titles">
          <span className="project-card__type">{projectKindLabel[project.kind]}</span>
          <span className="project-card__name">{project.name}</span>
        </div>
        <ArrowUpRight className="project-card__arrow" />
        {external && <span className="visually-hidden">(abre em nova aba)</span>}
      </div>
    </a>
  );
}

/**
 * Uma linha da esteira. Os itens são repetidos para preencher telas largas e
 * para o loop de -50% ficar contínuo; só a primeira cópia é lida por leitores de tela.
 */
function MarqueeRow({ items, reverse }: { items: Project[]; reverse?: boolean }) {
  const copies = Math.max(2, Math.ceil(16 / items.length / 2) * 2);
  const loop = Array.from({ length: copies }, () => items).flat();
  return (
    <div
      className={reverse ? 'marquee__row marquee__row--reverse' : 'marquee__row'}
      data-reveal={reverse ? 'from-left' : 'from-right'}
      style={revealDelay(reverse ? 150 : 0)}
    >
      <div className="marquee__track">
        {loop.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            index={i % items.length}
            decorative={reverse || i >= items.length}
          />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  // Segunda linha: mesmos projetos, começando do meio, para não empilhar o mesmo card.
  const half = Math.floor(projects.length / 2);
  const rotated = [...projects.slice(half), ...projects.slice(0, half)];
  return (
    <section id="projetos" className="projects">
      <div className="section-head container-x">
        <div className="section-head__titles">
          <p className="eyebrow" data-reveal="from-left">
            Portfólio
          </p>
          <h2 className="section-title" data-reveal style={revealDelay(100)}>
            Projetos que saíram do papel
          </h2>
        </div>
        <p className="section-lede" data-reveal style={revealDelay(200)}>Passe o mouse para parar a esteira e clique para ver o projeto no ar.</p>
      </div>
      <div className="marquee">
        <MarqueeRow items={projects} />
        <MarqueeRow items={rotated} reverse />
      </div>
    </section>
  );
}
