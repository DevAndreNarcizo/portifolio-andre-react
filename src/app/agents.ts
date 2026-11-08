/**
 * "Agents building the page": every target stays clipped until an agent cursor flies in, drags a selection
 * frame over it and the content appears behind the drag, like a multiplayer design editor.
 * Browser-only and dependency-free (Web Animations + IntersectionObserver), so it can run before GSAP loads.
 * Clipped content stays in the accessibility tree and focusable; focusing it scrolls it in, which builds it.
 */

interface Agent {
  name: string;
  color: string;
}
interface Point {
  x: number;
  y: number;
}
export interface BuildOptions {
  /** Called once per element, the moment it is fully built (or revealed without animation). */
  onBuilt?: (el: HTMLElement) => void;
}

const AGENTS: Agent[] = [
  { name: 'Layout Agent', color: '#3ddc84' },
  { name: 'Copy Agent', color: '#4cc2ff' },
  { name: 'Style Agent', color: '#f5b041' },
  { name: 'UI Agent', color: '#b392f0' },
];

const MAX_AGENTS_PER_SECTION = 3;
const IDLE_BEFORE_EXIT = 900;
const MOVE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const DRAG_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
/** Also set by the inline script in index.html, so the prerendered hero starts clipped instead of flashing. */
export const AGENTS_CLASS = 'agents';

const CURSOR_SVG =
  '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">' +
  '<path d="M3.5 2.5 L20 11.2 L12.6 13.1 L9.2 20.5 Z" fill="currentColor" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>' +
  '</svg>';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Inspector-style label: `h2.h2`, `li`, `figure.w`. */
const describe = (el: Element) => {
  const cls = el.classList[0];
  return cls ? `${el.tagName.toLowerCase()}.${cls}` : el.tagName.toLowerCase();
};

const nearViewport = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.bottom > -160 && r.top < innerHeight + 160;
};

const callbacks = new WeakMap<Element, (el: HTMLElement) => void>();

function markBuilt(el: HTMLElement): void {
  if (el.hasAttribute('data-built')) return;
  el.setAttribute('data-built', '');
  const cb = callbacks.get(el);
  callbacks.delete(el);
  cb?.(el);
}

/** One crew per section: up to three agents share its queue and leave when it stays empty. */
class Crew {
  private readonly queue: HTMLElement[] = [];
  private readonly active = new Set<Agent>();

  constructor(
    private readonly layer: HTMLElement,
    private readonly offset: number,
  ) {}

  enqueue(el: HTMLElement): void {
    if (this.queue.includes(el)) return;
    this.queue.push(el);
    this.queue.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    this.staff();
  }

  private staff(): void {
    while (this.active.size < Math.min(MAX_AGENTS_PER_SECTION, this.queue.length)) {
      const agent = AGENTS.map((_, i) => AGENTS[(this.offset + i) % AGENTS.length]).find((a) => !this.active.has(a));
      if (!agent) return;
      this.active.add(agent);
      void this.work(agent);
    }
  }

  /** Layer-relative box; the layer sits at the document origin, so this is a page position. */
  private box(el: Element) {
    const o = this.layer.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height };
  }

  private async work(agent: Agent): Promise<void> {
    const cursor = document.createElement('div');
    cursor.className = 'agent-cursor';
    cursor.style.setProperty('--agent', agent.color);
    cursor.innerHTML = `${CURSOR_SVG}<span class="agent-cursor__label">${agent.name}</span>`;
    this.layer.appendChild(cursor);

    const o = this.layer.getBoundingClientRect();
    const first = this.queue[0];
    const pos: Point = {
      x: Math.random() > 0.5 ? -o.left - 40 : -o.left + innerWidth + 20,
      y: first ? this.box(first).y + Math.random() * 120 - 60 : -o.top + innerHeight / 2,
    };
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    cursor.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });

    const moveTo = async (to: Point, duration: number, easing = MOVE_EASE) => {
      const anim = cursor.animate(
        [{ transform: `translate(${pos.x}px, ${pos.y}px)` }, { transform: `translate(${to.x}px, ${to.y}px)` }],
        { duration, easing, fill: 'forwards' },
      );
      // near the right edge the name tag moves to the cursor's left, so it never leaves the screen;
      // flip only while the whole move stays there, and settle on where the cursor lands
      const edge = this.layer.clientWidth - 140;
      cursor.classList.toggle('is-flipped', Math.min(pos.x, to.x) > edge);
      pos.x = to.x;
      pos.y = to.y;
      await anim.finished;
      cursor.classList.toggle('is-flipped', to.x > edge);
    };

    try {
      for (;;) {
        let target = this.queue.shift();
        if (!target) {
          await wait(IDLE_BEFORE_EXIT);
          target = this.queue.shift();
          if (!target) {
            // leave the crew before the exit animation, so new work spawns a fresh agent instead of waiting
            this.active.delete(agent);
            break;
          }
        }
        if (target.hasAttribute('data-built')) continue;
        if (!nearViewport(target)) {
          markBuilt(target); // scrolled past too fast: no show for content nobody is looking at
          continue;
        }
        await this.build(target, agent, cursor, pos, moveTo);
      }
      cursor.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, fill: 'forwards' });
      await moveTo({ x: pos.x + (pos.x > this.layer.clientWidth / 2 ? 80 : -80), y: pos.y - 40 }, 420);
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
  ): Promise<void> {
    try {
      const start = this.box(target);
      await moveTo({ x: start.x, y: start.y }, clamp(Math.hypot(start.x - pos.x, start.y - pos.y) * 0.9, 280, 620));

      const r = this.box(target); // again: the page may have scrolled while the cursor travelled
      cursor.classList.add('is-pressing');

      const frame = document.createElement('div');
      frame.className = 'agent-frame';
      frame.style.setProperty('--agent', agent.color);
      frame.style.left = `${r.x}px`;
      frame.style.top = `${r.y}px`;
      frame.innerHTML =
        `<span class="agent-frame__tag">${describe(target)}</span>` +
        `<span class="agent-frame__size">${Math.round(r.w)} × ${Math.round(r.h)}</span>` +
        '<i class="tl"></i><i class="tr"></i><i class="bl"></i><i class="br"></i>';
      this.layer.appendChild(frame);

      const drag = clamp(380 + Math.sqrt(r.w * r.h) * 0.6, 460, 820);
      const grow = frame.animate([{ width: '0px', height: '0px' }, { width: `${r.w}px`, height: `${r.h}px` }], {
        duration: drag,
        easing: DRAG_EASE,
        fill: 'forwards',
      });
      const clip = target.animate([{ clipPath: 'inset(0 100% 100% 0)' }, { clipPath: 'inset(0 0% 0% 0)' }], {
        duration: drag,
        easing: DRAG_EASE,
        fill: 'forwards',
      });
      await Promise.all([moveTo({ x: r.x + r.w, y: r.y + r.h }, drag, DRAG_EASE), grow.finished, clip.finished]);

      markBuilt(target);
      clip.cancel();
      cursor.classList.remove('is-pressing');
      frame.classList.add('is-done');
      setTimeout(() => frame.remove(), 650);
      await wait(90);
    } catch {
      markBuilt(target);
    }
  }
}

let layer: HTMLElement | undefined;
let observer: IntersectionObserver | undefined;
const crews = new Map<Element, Crew>();

function crewFor(el: Element): Crew {
  const section = el.closest('section') ?? document.body;
  let crew = crews.get(section);
  if (!crew) {
    crew = new Crew(layer!, crews.size);
    crews.set(section, crew);
  }
  return crew;
}

function setup(): IntersectionObserver {
  document.documentElement.classList.add(AGENTS_CLASS);
  layer = document.createElement('div');
  layer.className = 'agent-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);
  // threshold 0: a clipped target has no visible area, so any ratio above zero would never fire
  return new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer!.unobserve(entry.target);
        crewFor(entry.target).enqueue(entry.target as HTMLElement);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0 },
  );
}

/**
 * Hides the targets now and lets agents build each one as it scrolls into view.
 * Returns an undo that shows whatever is still waiting (used when a matchMedia scene reverts).
 */
export function agentBuild(targets: Iterable<Element>, options: BuildOptions = {}): () => void {
  const list = Array.from(targets) as HTMLElement[];
  const supported = typeof Element.prototype.animate === 'function' && 'IntersectionObserver' in globalThis;
  if (!supported) {
    list.forEach((el) => options.onBuilt?.(el));
    return () => {};
  }
  observer ??= setup();
  for (const el of list) {
    if (el.hasAttribute('data-built')) continue;
    if (options.onBuilt) callbacks.set(el, options.onBuilt);
    el.setAttribute('data-build', '');
    observer.observe(el);
  }
  return () => {
    for (const el of list) {
      observer?.unobserve(el);
      markBuilt(el);
    }
  };
}
