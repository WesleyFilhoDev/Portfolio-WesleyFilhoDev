'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { revealDelay } from '@/components/reveal';
import type { Project } from '@/data/site';
import { ProjectCard } from './ProjectCard';

/** Velocidade da rolagem automática, em px/s (uma por linha). */
const SPEEDS = [64, 55];
/** Depois de uma interação manual, quanto tempo esperar para voltar a andar sozinha. */
const RESUME_AFTER = 2500;
/** Cards mínimos por linha, para o loop nunca mostrar a "emenda" mesmo em telas largas. */
const MIN_CARDS = 24;

interface RowState {
  el: HTMLDivElement;
  dir: 1 | -1;
  speed: number;
  /** Posição contínua (float); o scrollLeft do navegador é arredondado. */
  pos: number;
  /** Último scrollLeft que nós mesmos aplicamos, para separar rolagem nossa da manual. */
  applied: number;
  /** Deslocamento ainda a percorrer pelos botões de seta (animado). */
  pending: number;
}

interface Props {
  rows: Project[][];
  /** Título e texto da seção (renderizados no servidor). */
  heading: ReactNode;
}

/**
 * Esteira de projetos: anda sozinha em loop infinito e também aceita rolagem manual
 * (arrastar com o mouse, deslizar no celular, trackpad e as setas).
 */
export function ProjectsCarousel({ rows, heading }: Props) {
  const rowEls = useRef<(HTMLDivElement | null)[]>([]);
  const state = useRef<RowState[]>([]);
  const control = useRef({ hovered: false, focused: false, dragging: false, idleUntil: 0 });

  const markInteraction = () => {
    control.current.idleUntil = performance.now() + RESUME_AFTER;
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rowsState: RowState[] = rowEls.current
      .filter((el): el is HTMLDivElement => !!el)
      .map((el, i) => ({ el, dir: i % 2 === 0 ? 1 : -1, speed: SPEEDS[i] ?? SPEEDS[0], pos: 0, applied: 0, pending: 0 }));
    state.current = rowsState;

    // A faixa é duas metades iguais; a posição fica numa janela de uma metade
    // no meio da faixa, com folga dos dois lados para a rolagem manual.
    const bounds = (row: RowState) => {
      const half = row.el.scrollWidth / 2;
      const start = Math.max(0, (half - row.el.clientWidth) / 2);
      return { half, start, end: start + half };
    };
    const wrap = (row: RowState) => {
      const { half, start, end } = bounds(row);
      if (half <= 0) return;
      while (row.pos < start) row.pos += half;
      while (row.pos >= end) row.pos -= half;
    };
    const apply = (row: RowState) => {
      wrap(row);
      row.el.scrollLeft = row.pos;
      row.applied = row.el.scrollLeft;
    };

    for (const row of rowsState) {
      const { start, half } = bounds(row);
      row.pos = start + (row.dir === 1 ? 0 : half / 2);
      apply(row);
    }

    // Rolagem manual (dedo, trackpad, teclado): adota a posição do navegador.
    // Só reposiciona ao dar a volta no loop, para não cortar a inércia do toque.
    const onScroll = (row: RowState) => () => {
      if (Math.abs(row.el.scrollLeft - row.applied) <= 1) return;
      row.pos = row.el.scrollLeft;
      row.pending = 0;
      markInteraction();
      const before = row.pos;
      wrap(row);
      if (row.pos !== before) row.el.scrollLeft = row.pos;
      row.applied = row.el.scrollLeft;
    };
    const listeners = rowsState.map((row) => {
      const fn = onScroll(row);
      row.el.addEventListener('scroll', fn, { passive: true });
      return () => row.el.removeEventListener('scroll', fn);
    });

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      const c = control.current;
      const auto = !reduced && !c.hovered && !c.focused && !c.dragging && now > c.idleUntil;
      for (const row of rowsState) {
        if (c.dragging) continue;
        if (row.pending !== 0) {
          const step = reduced || Math.abs(row.pending) < 0.5 ? row.pending : row.pending * Math.min(1, dt * 9);
          row.pos += step;
          row.pending -= step;
          apply(row);
        } else if (auto) {
          row.pos += row.dir * row.speed * dt;
          apply(row);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      listeners.forEach((off) => off());
    };
  }, []);

  /* Arrastar com o mouse (no toque, a rolagem nativa já resolve). */
  const drag = useRef<{ row: RowState; x: number; pos: number; moved: boolean } | null>(null);

  const onPointerDown = (index: number) => (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const row = state.current[index];
    if (!row) return;
    drag.current = { row, x: e.clientX, pos: row.pos, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 6) return;
    if (!d.moved) {
      d.moved = true;
      control.current.dragging = true;
      d.row.el.classList.add('marquee__row--dragging');
      d.row.el.setPointerCapture(e.pointerId);
    }
    d.row.pos = d.pos - dx;
    d.row.pending = 0;
    // mesma lógica de "apply", inline para não depender do efeito
    const half = d.row.el.scrollWidth / 2;
    const start = Math.max(0, (half - d.row.el.clientWidth) / 2);
    if (d.row.pos < start) {
      d.row.pos += half;
      d.pos += half;
    } else if (d.row.pos >= start + half) {
      d.row.pos -= half;
      d.pos -= half;
    }
    d.row.el.scrollLeft = d.row.pos;
    d.row.applied = d.row.el.scrollLeft;
  };

  const endDrag = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    if (d.moved) {
      control.current.dragging = false;
      d.row.el.classList.remove('marquee__row--dragging');
      markInteraction();
      // Um arrasto não deve abrir o projeto embaixo do cursor.
      const block = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      d.row.el.addEventListener('click', block, { capture: true, once: true });
      window.setTimeout(() => d.row.el.removeEventListener('click', block, { capture: true }), 0);
    }
  };

  const nudge = (direction: 1 | -1) => {
    for (const row of state.current) {
      const card = row.el.querySelector<HTMLElement>('.project-card');
      const step = card ? card.offsetWidth + 24 : 384;
      row.pending += direction * step;
    }
    markInteraction();
  };

  return (
    <>
      <div className="section-head container-x">
        {heading}
        <div className="marquee-nav" data-reveal style={revealDelay(300)}>
          <button type="button" className="marquee-nav__btn" aria-label="Projetos anteriores" onClick={() => nudge(-1)}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="square">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="marquee-nav__btn" aria-label="Próximos projetos" onClick={() => nudge(1)}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="square">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="marquee"
        onPointerEnter={(e) => e.pointerType === 'mouse' && (control.current.hovered = true)}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') control.current.hovered = false;
        }}
        onFocus={() => (control.current.focused = true)}
        onBlur={() => (control.current.focused = false)}
        onTouchStart={markInteraction}
        onTouchEnd={markInteraction}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
      >
        {rows.map((items, r) => {
          const copies = Math.max(2, Math.ceil(MIN_CARDS / items.length / 2) * 2);
          const loop = Array.from({ length: copies }, () => items).flat();
          const reverse = r % 2 === 1;
          return (
            <div
              key={r}
              ref={(el) => {
                rowEls.current[r] = el;
              }}
              className={reverse ? 'marquee__row marquee__row--reverse' : 'marquee__row'}
              data-reveal={reverse ? 'from-left' : 'from-right'}
              style={revealDelay(reverse ? 150 : 0)}
              onPointerDown={onPointerDown(r)}
            >
              <div className="marquee__track">
                {loop.map((project, i) => (
                  <ProjectCard
                    key={i}
                    project={project}
                    index={i % items.length}
                    // Só a primeira cópia da primeira linha é lida por leitores de tela.
                    decorative={reverse || i >= items.length}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
