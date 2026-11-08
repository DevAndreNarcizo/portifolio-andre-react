import { DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerStatic = typeof import('gsap/ScrollTrigger').ScrollTrigger;

export interface Motion {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerStatic;
}

type Mode = 'desktop' | 'flow';

/**
 * Builds a section's animations for one mode. Runs inside a gsap.matchMedia context scoped to the section,
 * so tweens and ScrollTriggers revert by themselves; return a function to undo anything else (e.g. classes).
 */
export type Scene = (m: Motion, mode: Mode, root: HTMLElement) => void | (() => void);

// Same breakpoint as the CSS layouts: pinned stories only on wide landscape screens.
const DESKTOP =
  '(min-width: 1024px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)';
const FLOW =
  '((max-width: 1023.98px) or (orientation: portrait)) and (prefers-reduced-motion: no-preference)';

let loading: Promise<Motion> | undefined;
let scrollTrigger: ScrollTriggerStatic | undefined;

/** True when the visitor asked for reduced motion, or when matchMedia is missing (tests, old engines). */
export function reducedMotion(): boolean {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? true;
}

/** Loads GSAP, ScrollTrigger and Lenis once, after the window load event, outside the critical path. */
export function loadMotion(): Promise<Motion> {
  return (loading ??= (async () => {
    if (document.readyState !== 'complete') {
      await new Promise((resolve) => addEventListener('load', resolve, { once: true }));
    }
    const [{ gsap }, { ScrollTrigger }, { default: LenisCtor }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]);
    gsap.registerPlugin(ScrollTrigger);

    // anchors: Lenis smooth-scrolls #links itself and honours html { scroll-padding-top } (the sticky header)
    const lenis = new LenisCtor({ autoRaf: false, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    await document.fonts?.ready;
    // Pins add height above a #fragment, and their refresh stops the browser's jump midway
    // (Safari has no scroll anchoring either): land on the target again once every scene exists.
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        lenis.resize(); // Lenis' scroll limit is still the pre-pin height here
        lenis.scrollTo(target, { immediate: true });
      });
    }
    scrollTrigger = ScrollTrigger;
    return { gsap, ScrollTrigger };
  })());
}

/** Recomputes trigger positions after the page height changes (e.g. a language switch). No-op before load. */
export function refreshScroll(): void {
  scrollTrigger?.refresh();
}

/**
 * Registers a section's scene. Call from a component constructor (injection context).
 * ponytail: a visitor who starts with reduced motion never downloads GSAP; turning it off mid-visit needs a reload.
 */
export function sceneMotion(scene: Scene): void {
  const root = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  let revert: (() => void) | undefined;
  let destroyed = false;

  inject(DestroyRef).onDestroy(() => {
    destroyed = true;
    revert?.();
  });

  afterNextRender(() => {
    if (reducedMotion()) return;
    loadMotion().then((m) => {
      if (destroyed) return;
      const mm = m.gsap.matchMedia(root);
      mm.add({ desktop: DESKTOP, flow: FLOW }, (ctx) =>
        scene(m, ctx.conditions?.['desktop'] ? 'desktop' : 'flow', root),
      );
      revert = () => mm.revert();
    });
  });
}
