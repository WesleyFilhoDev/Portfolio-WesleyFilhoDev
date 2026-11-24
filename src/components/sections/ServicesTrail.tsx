'use client';

import { Button } from '@/components/brand';
import { useInView } from '@/hooks/useInView';
import { SHOW_SPLASH, SPLASH_DURATION, services } from '@/data/site';

const VIEW_W = 1440;
const POINTS = [140, 380, 620, 860, 1100, 1340].map((x, i) => ({ x, y: i % 2 === 0 ? 170 : 370 }));
const POLYLINE = POINTS.map((p) => `${p.x},${p.y}`).join(' ');
const pct = (x: number) => `${((x / VIEW_W) * 100).toFixed(2)}%`;

export function ServicesTrail() {
  const [ref, on] = useInView<HTMLDivElement>({ startDelay: SHOW_SPLASH ? SPLASH_DURATION : 0 });
  const last = services.length - 1;

  return (
    <div ref={ref} className={on ? 'trail trail--on' : 'trail'}>
      <div className="trail__svg trail__reveal" aria-hidden="true">
        <svg viewBox={`0 0 ${VIEW_W} 520`} preserveAspectRatio="none">
          <polyline className="trail__line" points={POLYLINE} />
        </svg>
      </div>
      <div className="trail__svg trail__flow" aria-hidden="true">
        <svg viewBox={`0 0 ${VIEW_W} 520`} preserveAspectRatio="none">
          <polyline className="trail__line-flow" points={POLYLINE} />
        </svg>
      </div>
      <span className="trail__fbar" aria-hidden="true" />

      {POINTS.map((p, i) => (
        <span
          key={p.x}
          aria-hidden="true"
          className={i === last ? 'trail__node trail__node--end' : 'trail__node'}
          style={{ left: pct(p.x), top: p.y, animationDelay: `${0.23 + i * 0.4}s` }}
        />
      ))}

      <ol className="trail__list">
        {services.map((service, i) => {
          const top = i % 2 === 0 ? 20 : 400;
          const position = i === last ? { right: 0 } : { left: `calc(${pct(POINTS[i].x)} - 110px)` };
          return (
            <li
              key={service.title}
              className="trail__item"
              style={{ ...position, top, animationDelay: `${0.23 + i * 0.4}s` }}
            >
              <span className="trail__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="trail__title">{service.title}</h3>
              <p className="trail__desc">{service.description}</p>
              {i === last && (
                <Button variant="outline" href="#contato">
                  Conversar sobre a ideia
                </Button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
