import { useLayoutEffect, useRef } from 'react';
import './AgentBuilder.css';

/**
 * "Agentes construindo a página": cada elemento marcado com `data-build`
 * fica oculto até que um cursor de agente chegue, desenhe a seleção e o
 * revele. Vários agentes trabalham em paralelo, como num editor multiplayer.
 */

type Agent = { name: string; color: string };
type Point = { x: number; y: number };

const AGENTS: Agent[] = [
  { name: 'Layout Agent', color: '#38bdf8' },
  { name: 'Copy Agent', color: '#22c55e' },
  { name: 'Style Agent', color: '#f59e0b' },
  { name: 'UI Agent', color: '#a78bfa' },
];

const MAX_AGENTS_PER_SECTION = 3;
const IDLE_BEFORE_EXIT = 900;
const MOVE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const DRAG_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const READY_CLASS = 'agent-build-ready';

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const CURSOR_SVG =
  '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">' +
  '<path d="M3.5 2.5 L20 11.2 L12.6 13.1 L9.2 20.5 Z" fill="currentColor" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>' +
  '</svg>';

/** Rótulo curto do elemento, no estilo de inspector de editor: `h2.section-title`. */
const describe = (el: HTMLElement) => {
  const firstClass = el.classList[0];
  return firstClass ? `${el.tagName.toLowerCase()}.${firstClass}` : el.tagName.toLowerCase();
};

const isNearViewport = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return r.bottom > -160 && r.top < window.innerHeight + 160;
};

const reveal = (el: HTMLElement) => {
  el.setAttribute('data-built', '');
};

class Crew {
  private queue: HTMLElement[] = [];
  private active = new Set<Agent>();
  private agentOffset: number;
  private layer: HTMLElement;

  constructor(layer: HTMLElement, sectionIndex: number) {
    this.layer = layer;
    this.agentOffset = sectionIndex % AGENTS.length;
  }

  enqueue(el: HTMLElement) {
    if (this.queue.includes(el)) return;
    this.queue.push(el);
    this.queue.sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
    this.staff();
  }

  /** Coloca um agente novo em cena enquanto houver trabalho sem dono. */
  private staff() {
    while (this.active.size < Math.min(MAX_AGENTS_PER_SECTION, this.queue.length)) {
      const agent = Array.from({ length: AGENTS.length }, (_, i) =>
        AGENTS[(this.agentOffset + i) % AGENTS.length],
      ).find((candidate) => !this.active.has(candidate));
      if (!agent) return;
      this.active.add(agent);
      void this.work(agent);
    }
  }

  private origin() {
    const r = this.layer.getBoundingClientRect();
    return { x: r.left, y: r.top };
  }

  private rectOf(el: HTMLElement) {
    const o = this.origin();
    const r = el.getBoundingClientRect();
    return { x: r.left - o.x, y: r.top - o.y, w: r.width, h: r.height };
  }

  private async work(agent: Agent) {
    const cursor = document.createElement('div');
    cursor.className = 'agent-cursor';
    cursor.style.setProperty('--agent', agent.color);
    cursor.innerHTML = `${CURSOR_SVG}<span class="agent-cursor__label">${agent.name}</span>`;
    this.layer.appendChild(cursor);

    const first = this.queue[0];
    const o = this.origin();
    const fromLeft = Math.random() > 0.5;
    const pos: Point = {
      x: fromLeft ? -o.x - 40 : -o.x + window.innerWidth + 20,
      y: first ? this.rectOf(first).y + Math.random() * 120 - 60 : -o.y + window.innerHeight / 2,
    };
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    cursor.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });

    const moveTo = async (to: Point, duration: number, easing = MOVE_EASE) => {
      const anim = cursor.animate(
        [
          { transform: `translate(${pos.x}px, ${pos.y}px)` },
          { transform: `translate(${to.x}px, ${to.y}px)` },
        ],
        { duration, easing, fill: 'forwards' },
      );
      pos.x = to.x;
      pos.y = to.y;
      // Perto da borda direita, o nome do agente passa para a esquerda do cursor.
      cursor.classList.toggle('is-flipped', to.x > this.layer.clientWidth - 140);
      await anim.finished;
    };

    try {
      for (;;) {
        let target = this.queue.shift();
        if (!target) {
          await wait(IDLE_BEFORE_EXIT);
          target = this.queue.shift();
          if (!target) {
            // Sai da equipe antes da animação de saída, para não segurar trabalho novo.
            this.active.delete(agent);
            break;
          }
        }
        if (target.hasAttribute('data-built')) continue;
        if (!isNearViewport(target)) {
          reveal(target);
          continue;
        }
        await this.build(target, agent, cursor, pos, moveTo);
      }

      const exitX = pos.x + (pos.x > this.layer.clientWidth / 2 ? 80 : -80);
      cursor.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, fill: 'forwards' });
      await moveTo({ x: exitX, y: pos.y - 40 }, 420);
    } finally {
      this.active.delete(agent);
      cursor.remove();
      this.staff();
    }
  }

  private async build(
    target: HTMLElement,
    agent: Agent,
    cursor: HTMLElement,
    pos: Point,
    moveTo: (to: Point, duration: number, easing?: string) => Promise<void>,
  ) {
    try {
      const start = this.rectOf(target);
      const distance = Math.hypot(start.x - pos.x, start.y - pos.y);
      await moveTo({ x: start.x, y: start.y }, clamp(distance * 0.9, 280, 620));

      // Recalcula após o deslocamento: o usuário pode ter rolado a página.
      const r = this.rectOf(target);
      cursor.classList.add('is-pressing');

      const frame = document.createElement('div');
      frame.className = 'agent-frame';
      frame.style.setProperty('--agent', agent.color);
      frame.style.left = `${r.x}px`;
      frame.style.top = `${r.y}px`;
      frame.innerHTML =
        `<span class="agent-frame__tag">${describe(target)}</span>` +
        `<span class="agent-frame__size">${Math.round(r.w)} × ${Math.round(r.h)}</span>` +
        '<i class="agent-frame__handle is-tl"></i><i class="agent-frame__handle is-tr"></i>' +
        '<i class="agent-frame__handle is-bl"></i><i class="agent-frame__handle is-br"></i>';
      this.layer.appendChild(frame);

      const drag = clamp(380 + Math.sqrt(r.w * r.h) * 0.6, 460, 820);
      const frameAnim = frame.animate(
        [
          { width: '0px', height: '0px' },
          { width: `${r.w}px`, height: `${r.h}px` },
        ],
        { duration: drag, easing: DRAG_EASE, fill: 'forwards' },
      );
      const clipAnim = target.animate(
        [{ clipPath: 'inset(0 100% 100% 0)' }, { clipPath: 'inset(0 0% 0% 0)' }],
        { duration: drag, easing: DRAG_EASE, fill: 'forwards' },
      );
      await Promise.all([
        moveTo({ x: r.x + r.w, y: r.y + r.h }, drag, DRAG_EASE),
        frameAnim.finished,
        clipAnim.finished,
      ]);

      reveal(target);
      clipAnim.cancel();
      cursor.classList.remove('is-pressing');

      frame.classList.add('is-done');
      window.setTimeout(() => frame.remove(), 650);
      await wait(90);
    } catch {
      reveal(target);
    }
  }
}

const AgentBuilder = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supported = typeof Element.prototype.animate === 'function' && 'IntersectionObserver' in window;
    if (!layer || reduceMotion || !supported) return;

    root.classList.add(READY_CLASS);

    const crews = new Map<Element, Crew>();
    const crewFor = (el: HTMLElement) => {
      const section = el.closest('section') ?? document.body;
      let crew = crews.get(section);
      if (!crew) {
        crew = new Crew(layer, crews.size);
        crews.set(section, crew);
      }
      return crew;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          crewFor(el).enqueue(el);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );

    const watched = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>('[data-build]:not([data-built])').forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        observer.observe(el);
      });
    };
    scan();

    // Elementos que surgem depois (troca de idioma, listas dinâmicas).
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.classList.remove(READY_CLASS);
    };
  }, []);

  return <div ref={layerRef} className="agent-layer" aria-hidden="true" />;
};

export default AgentBuilder;
