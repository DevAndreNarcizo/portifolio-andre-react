import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { agentBuild } from '../agents';
import { LangService } from '../lang';
import { reducedMotion, sceneMotion } from '../motion';

const NOISE = '!<>-_/[]{}=+*^?#01';
const FRAMES = 34;

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="inicio" class="hero">
      <p class="kick" data-build>{{ t().hero.kicker }}</p>
      <h1 data-build [attr.aria-label]="t().hero.title">{{ scrambled() ?? t().hero.title }}</h1>
      <p class="sub" data-build>{{ t().hero.sub }}</p>
      <p class="ctas" data-build>
        <a class="btn btn-primary" href="#apps">{{ t().hero.apps }}</a>
        <a class="btn" href="#contato">{{ t().hero.contact }}</a>
        <a class="btn" [href]="t().cv.href" download>{{ t().cv.label }}</a>
      </p>

      <div class="fan" role="img" [attr.aria-label]="t().hero.fan">
        <div class="slot s1" data-build>
          <figure class="w">
            <div class="bar"><i></i><i></i><i></i><span class="url">foco-vida.vercel.app</span></div>
            <img src="/apps/hero-fv.webp" width="1100" height="729" alt="" decoding="async" />
          </figure>
        </div>
        <div class="slot s2" data-build>
          <figure class="w">
            <div class="bar"><i></i><i></i><i></i><span class="url">agenda-facil · /dashboard</span></div>
            <img src="/apps/hero-af.webp" width="1100" height="729" alt="" decoding="async" />
          </figure>
        </div>
        <div class="slot s0" data-build>
          <figure class="w">
            <div class="bar"><i></i><i></i><i></i><span class="url">myfinance · /inicio</span></div>
            <img src="/apps/hero-mf.webp" width="1600" height="1060" alt="" fetchpriority="high" />
          </figure>
        </div>
        <div class="slot sp" data-build>
          <div class="phone"><img src="/apps/hero-phone.webp" width="560" height="1188" alt="" decoding="async" /></div>
        </div>
      </div>

      <ul class="proof" [attr.aria-label]="t().hero.proofLabel">
        @for (p of t().hero.proof; track p.value) {
          <li data-build>
            <b>{{ p.value }}</b><span class="l">{{ p.label }}</span><span class="src">{{ p.source }}</span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .hero {
      padding: 56px var(--gutter) 0;
      text-align: center;
      overflow: hidden;
    }
    h1 {
      max-width: 14ch;
      margin: 18px auto;
      font-size: clamp(40px, 6.4vw, 88px);
      font-weight: 600;
      line-height: 1.02;
      letter-spacing: -0.035em;
    }
    .sub {
      max-width: 50ch;
      margin: 0 auto;
      color: var(--mut);
      font-size: clamp(16px, 1.4vw, 19px);
    }
    .ctas {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 28px;
    }
    .fan {
      position: relative;
      width: min(1240px, 94vw);
      height: min(52vw, 580px);
      margin: 52px auto 0;
      perspective: 1800px;
      transform-style: preserve-3d;
    }
    .slot {
      position: absolute;
      transform-style: preserve-3d;
    }
    .s0 {
      left: 17%;
      top: 10%;
      z-index: 3;
      width: 66%;
    }
    .s1 {
      left: 0;
      top: 0;
      z-index: 1;
      width: 44%;
    }
    .s2 {
      right: 0;
      top: 3%;
      z-index: 2;
      width: 44%;
    }
    .sp {
      right: 12%;
      top: 34%;
      z-index: 4;
      width: 13%;
    }
    .w {
      aspect-ratio: 16 / 10.6;
      overflow: hidden;
      border: 1px solid #262c35;
      border-radius: 12px;
      background: #111;
      box-shadow: 0 50px 120px -30px #000;
    }
    .s0 .w {
      transform: rotateX(8deg);
    }
    .s1 .w {
      transform: rotateY(22deg) rotateX(6deg) translateZ(-260px);
      filter: brightness(0.62);
    }
    .s2 .w {
      transform: rotateY(-22deg) rotateX(6deg) translateZ(-260px);
      filter: brightness(0.62);
    }
    .w img {
      width: 100%;
      height: calc(100% - 22px);
      object-fit: cover;
      object-position: top left;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 22px;
      padding: 0 9px;
      background: #15191f;
      border-bottom: 1px solid #232830;
    }
    .bar i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2c323b;
    }
    .url {
      flex: 1;
      max-width: 240px;
      height: 13px;
      margin-left: 8px;
      padding: 0 8px;
      border-radius: 4px;
      background: #0d1014;
      color: #7d8692;
      font: 8px/13px var(--mono);
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
    }
    .phone {
      padding: 5%;
      border: 1px solid #2a3038;
      border-radius: 18% / 8.5%;
      background: #05070a;
      box-shadow: 0 40px 90px -20px #000;
      transform: rotateY(-10deg) translateZ(90px);
    }
    .phone img {
      width: 100%;
      height: auto;
      border-radius: 14% / 6.6%;
    }
    .proof {
      position: relative;
      z-index: 5;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      max-width: 1000px;
      margin: -36px auto 64px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: #0a0c0fe0;
      backdrop-filter: blur(10px);
      text-align: left;
    }
    .proof li {
      padding: 14px 16px;
      border-right: 1px solid var(--line);
    }
    .proof li:last-child {
      border-right: 0;
    }
    .proof b {
      display: block;
      font-size: 28px;
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .l {
      display: block;
      margin-top: 6px;
      font-size: 14px;
    }
    .src {
      display: block;
      margin-top: 4px;
      color: var(--mut);
      font: 400 11px/1.4 var(--mono);
    }
    @media (max-width: 759.98px) {
      .fan {
        height: 70vw;
      }
      .sp {
        right: 6%;
        width: 18%;
      }
      .proof {
        grid-template-columns: 1fr 1fr;
        margin-top: 0;
      }
      .proof li:nth-child(2) {
        border-right: 0;
      }
      .proof li:nth-child(-n + 2) {
        border-bottom: 1px solid var(--line);
      }
    }
  `,
})
export class Hero {
  protected readonly t = inject(LangService).t;
  /** The headline while it decodes itself, once; null shows the real text. */
  protected readonly scrambled = signal<string | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    // The prerendered hero arrives clipped (index.html sets html.agents); agents build it right away,
    // and the headline decodes itself once its agent has dragged it in.
    const decode = () => {
      const title = this.t().hero.title;
      let frame = 0;
      const id = setInterval(() => {
        frame++;
        if (frame >= FRAMES) {
          clearInterval(id);
          this.scrambled.set(null);
          return;
        }
        const shown = (title.length * frame) / FRAMES;
        this.scrambled.set(
          [...title].map((c, i) => (c === ' ' || i < shown ? c : NOISE[(Math.random() * NOISE.length) | 0])).join(''),
        );
      }, 30);
      destroyRef.onDestroy(() => clearInterval(id));
    };
    afterNextRender(() => {
      if (reducedMotion()) return;
      agentBuild(host.querySelectorAll('[data-build]'), { onBuilt: (el) => el.tagName === 'H1' && decode() });
    });

    sceneMotion((m, mode, root) => {
      if (mode !== 'desktop') return;
      const { gsap } = m;
      const hero = root.querySelector('.hero')!;
      const fan = root.querySelector<HTMLElement>('.fan')!;
      const rx = gsap.quickTo(fan, 'rotationX', { duration: 0.9, ease: 'power3' });
      const ry = gsap.quickTo(fan, 'rotationY', { duration: 0.9, ease: 'power3' });
      const tilt = (e: PointerEvent) => {
        ry((e.clientX / innerWidth - 0.5) * 8);
        rx(-(e.clientY / innerHeight - 0.5) * 6);
      };
      addEventListener('pointermove', tilt);

      const scrub = (start: string) => ({ trigger: hero, start, end: 'bottom top', scrub: true });
      gsap.to(fan, { y: -140, scale: 1.12, ease: 'none', scrollTrigger: scrub('top top') });
      gsap.to(root.querySelector('.s1'), { xPercent: -30, opacity: 0, ease: 'none', scrollTrigger: scrub('30% top') });
      gsap.to(root.querySelector('.s2'), { xPercent: 30, opacity: 0, ease: 'none', scrollTrigger: scrub('30% top') });
      gsap.to(root.querySelector('.sp'), { yPercent: -18, ease: 'none', scrollTrigger: scrub('top top') });
      return () => removeEventListener('pointermove', tilt);
    });
  }
}
