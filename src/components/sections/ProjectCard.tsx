import Image from 'next/image';
import { ArrowUpRight } from '@/components/icons';
import { projectKindLabel, type Project } from '@/data/site';
import { ProjectPreview } from './ProjectPreview';

const hostOf = (href: string) => {
  try {
    return new URL(href).host;
  } catch {
    return href;
  }
};

export function ProjectCard({ project, index, decorative }: { project: Project; index: number; decorative: boolean }) {
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
