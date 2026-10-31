import type { CaseStep, Case, Rect } from '../data/types';
import type { Motion } from '../motion';
import { cam, overview, spotBox } from './camera';

interface Step extends CaseStep {
  /** Region framed by this step, and the camera padding (1 for overviews). */
  R: Rect;
  P?: number;
  liftEls?: HTMLElement[];
}

/** A phone screen this much taller than the phone (relative) scrolls slowly; a shorter one just settles. */
const LONG_SCREEN = (19.1 / 9) * 1.3;

/**
 * Desktop: pins the case and plays its steps with the scroll (port of the approved prototype v3).
 * Runs inside the gsap.matchMedia context of sceneMotion, which reverts every tween and ScrollTrigger;
 * the returned function undoes the rest (classes, created elements, inline widths).
 */
export function pinScene(m: Motion, root: HTMLElement, data: Case, onStep: (n: number) => void): () => void {
  const { gsap, ScrollTrigger } = m;
  const q = (selector: string) => root.querySelector<HTMLElement>(selector)!;
  root.classList.add('is-pinned');

  const sec = q('section');
  const vp = q('.vp');
  const win = q('.win');
  const cursor = q('.cursor');
  const ripple = q('.rip');
  const phone = root.querySelector<HTMLElement>('.phone');
  const segs = Array.from(root.querySelectorAll<HTMLElement>('.rail b'));
  const shots = new Map(data.shots.map((s) => [s.key, s]));
  const layer = (k: string) => q(`.layer[data-k="${k}"]`);
  const spot = (k: string) => layer(k).querySelector<HTMLElement>('.spot')!;
  const ov = (k: string) => overview(shots.get(k)!);
  const camAt = (k: string, r: Rect, pad?: number) => cam({ w: vp.clientWidth, h: vp.clientHeight }, shots.get(k)!, r, pad);
  // functions, so invalidateOnRefresh recomputes the camera when the window is resized
  const camTo = (k: string, r: Rect, pad?: number) => ({
    x: () => camAt(k, r, pad).x,
    y: () => camAt(k, r, pad).y,
    scale: () => camAt(k, r, pad).scale,
  });

  const steps: Step[] = data.steps.map((st) => ({ ...st, R: st.ov ? ov(st.k) : st.r!, P: st.ov ? 1 : undefined }));

  for (const s of data.shots) {
    gsap.set(layer(s.key), { width: s.w, height: s.h, opacity: s.key === steps[0].k ? 1 : 0 });
    gsap.set(spot(s.key), { left: 0, top: 0, width: s.w, height: s.h, opacity: 0 });
  }

  // Cards copied out of the screenshot (same image, offset background) so they can rise above it
  const lifts: HTMLElement[] = [];
  for (const st of steps) {
    if (!st.lift) continue;
    const s = shots.get(st.k)!;
    st.liftEls = st.lift.map(([x, y, w, h]) => {
      const d = document.createElement('div');
      Object.assign(d.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: '24px',
        opacity: '0',
        boxShadow: '0 70px 120px -20px #000, 0 0 0 5px var(--acc)',
        background: `url(${s.src}) -${x}px -${y}px / ${s.w}px ${s.h}px`,
      });
      layer(st.k).appendChild(d);
      lifts.push(d);
      return d;
    });
  }

  gsap.fromTo(
    win,
    { rotationX: 22, y: 110, scale: 0.92, opacity: 0.2 },
    {
      rotationX: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top top', scrub: true },
    },
  );
  gsap.from(root.querySelectorAll('.side > *'), {
    x: 30,
    opacity: 0,
    stagger: 0.07,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: { trigger: sec, start: 'top 55%' },
  });
  gsap.set(layer(steps[0].k), camTo(steps[0].k, steps[0].R, steps[0].P));

  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
  tl.addLabel('s0').to({}, { duration: 1.4 });
  steps.forEach((st, i) => {
    if (!i) return;
    const pv = steps[i - 1];
    const prev = layer(pv.k);
    const next = layer(st.k);
    tl.addLabel(`s${i}`);
    if (pv.liftEls) tl.to(pv.liftEls, { y: 0, scale: 1, duration: 0.3 }).set(pv.liftEls, { opacity: 0 });
    if (st.k !== pv.k || st.click || st.device) tl.to(spot(pv.k), { opacity: 0, duration: 0.3 });
    if (st.out) tl.to(prev, { ...camTo(pv.k, ov(pv.k), 1), duration: 0.7 });
    if (st.click) {
      const [cx, cy] = st.click;
      const from = st.out ? { R: ov(pv.k), P: 1 } : pv;
      const px = () => {
        const c = camAt(pv.k, from.R, from.P);
        return c.x + cx * c.scale;
      };
      const py = () => {
        const c = camAt(pv.k, from.R, from.P);
        return c.y + cy * c.scale;
      };
      tl.fromTo(
        cursor,
        { x: () => px() + 160, y: () => py() + 120, opacity: 0 },
        { x: px, y: py, opacity: 1, duration: 0.7, ease: 'power3.out' },
      ).fromTo(ripple, { scale: 0.2, opacity: 0.9 }, { scale: 2.2, opacity: 0, duration: 0.35, ease: 'power1.out' });
    }
    if (st.k !== pv.k) {
      tl.set(next, camTo(st.k, st.click ? ov(st.k) : st.R, st.click ? 1 : st.P))
        .to(prev, { opacity: 0, duration: 0.25 }, '>-.05')
        .fromTo(next, { opacity: 0, yPercent: 1.5 }, { opacity: 1, yPercent: 0, duration: 0.35, ease: 'power2.out' }, '<')
        .to(cursor, { opacity: 0, duration: 0.2 }, '<');
    }
    if (!(st.click && st.ov)) tl.to(next, { ...camTo(st.k, st.R, st.P), duration: 1 });
    const s = shots.get(st.k)!;
    tl.to(
      spot(st.k),
      st.ov
        ? { left: 0, top: 0, width: s.w, height: s.h, opacity: 0, duration: 0.6 }
        : { ...spotBox(st.R), opacity: 1, duration: 1 },
      '<',
    );
    if (st.liftEls) {
      tl.set(st.liftEls, { opacity: 1 }).to(st.liftEls, { y: -50, scale: 1.05, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' });
    }
    if (st.device && phone && data.device) {
      const screen = phone.querySelector<HTMLElement>('.scr')!;
      const imgs = Array.from(screen.querySelectorAll('img'));
      tl.to(win, { xPercent: -4, scale: 0.8, opacity: 0.45, transformOrigin: '0% 50%', duration: 0.8 }, '<').fromTo(
        phone,
        { yPercent: 60, opacity: 0, rotationY: -16 },
        { yPercent: 0, opacity: 1, rotationY: 0, duration: 0.9, ease: 'power3.out' },
        '<.1',
      );
      imgs.forEach((img, j) => {
        const shot = data.device!.shots[j];
        if (j) tl.to(img, { opacity: 1, duration: 0.45 }, '+=.9').set(imgs[j - 1], { opacity: 0 });
        tl.to(img, {
          y: () => Math.min(0, screen.clientHeight - img.offsetHeight),
          duration: shot.h / shot.w > LONG_SCREEN ? 2.6 : 0.6,
          ease: 'none',
        });
      });
    }
    tl.to({}, { duration: 1.4 });
  });

  const labels = Object.values(tl.labels).sort((a, b) => a - b);
  let on = 0;
  ScrollTrigger.create({
    trigger: sec,
    start: 'top top',
    end: () => `+=${steps.length * 100}%`,
    pin: true,
    scrub: 0.6,
    animation: tl,
    invalidateOnRefresh: true,
    onToggle: (self) => document.documentElement.classList.toggle('case-pinned', self.isActive),
    onUpdate: (self) => {
      const t = self.progress * tl.duration() + 0.05;
      let n = 0;
      labels.forEach((v, j) => {
        if (t >= v) n = j;
      });
      const end = labels[n + 1] ?? tl.duration();
      segs.forEach((b, j) => {
        b.style.width = j < n ? '100%' : j > n ? '0%' : `${Math.min(100, ((t - labels[n]) / (end - labels[n])) * 100)}%`;
      });
      if (n !== on) onStep((on = n));
    },
  });

  return () => {
    lifts.forEach((d) => d.remove());
    segs.forEach((b) => (b.style.width = ''));
    root.classList.remove('is-pinned');
    document.documentElement.classList.remove('case-pinned');
    onStep(0);
  };
}
