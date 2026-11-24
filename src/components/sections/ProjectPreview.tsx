import type { ProjectKind } from '@/data/site';

/** Wireframe ilustrativo de cada tipo de projeto (decorativo). */
export function ProjectPreview({ kind }: { kind: ProjectKind }) {
  switch (kind) {
    case 'site':
      return (
        <div className="mock mock--site" aria-hidden="true">
          <div className="mock__bar">
            <span />
            <span />
            <span />
          </div>
          <div className="mock__body">
            <div className="mock__col">
              <span className="ln" style={{ height: 12, width: '90%' }} />
              <span className="ln" style={{ height: 12, width: '60%' }} />
              <span className="ln ln--muted" style={{ height: 5, width: '80%' }} />
              <span className="btn" style={{ marginTop: 4, width: 60, height: 18 }} />
            </div>
            <span className="mock__pic" />
          </div>
        </div>
      );
    case 'lp':
      return (
        <div className="mock mock--lp" aria-hidden="true">
          <span className="mock__accent" />
          <span className="ln" style={{ height: 11, width: '90%' }} />
          <span className="ln" style={{ height: 11, width: '65%' }} />
          <span className="mock__input" />
          <span className="btn" style={{ height: 22, width: '100%', borderRadius: 6 }} />
        </div>
      );
    case 'sys':
      return (
        <div className="mock mock--sys" aria-hidden="true">
          <div className="mock__side">
            <span className="btn" style={{ height: 5, width: '70%', borderRadius: 3 }} />
            <span className="ln ln--muted" style={{ height: 4, width: '90%' }} />
            <span className="ln ln--muted" style={{ height: 4, width: '80%' }} />
          </div>
          <div className="mock__main">
            <div className="mock__kpis">
              <span />
              <span />
              <span />
            </div>
            <div className="mock__chart">
              <span style={{ height: '45%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '55%' }} />
              <span className="hi" style={{ height: '90%' }} />
              <span style={{ height: '65%' }} />
            </div>
          </div>
        </div>
      );
    case 'bio':
      return (
        <div className="mock mock--bio" aria-hidden="true">
          <span className="mock__avatar" />
          <span className="ln" style={{ height: 5, width: '60%' }} />
          <span className="mock__link mock__link--brand" />
          <span className="mock__link" />
          <span className="mock__link mock__link--outline" />
        </div>
      );
  }
}
