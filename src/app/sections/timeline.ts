import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-timeline',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="trajetoria" class="section">
      <div class="wrap">
        <p class="fig-label">{{ t().timeline.label }}</p>
        <h2 class="title"><app-words [text]="t().timeline.title" /></h2>

        <div class="cols">
          <div class="track">
            <div class="rail" aria-hidden="true"><div class="fill"></div></div>
            <ol class="items">
              @for (item of t().timeline.items; track $index) {
                <li class="item" [class.current]="$first">
                  <span class="dot" aria-hidden="true"></span>
                  <p class="mono period">
                    {{ item.period }}
                    @if ($first) {
                      <span class="badge">{{ t().timeline.current }}</span>
                    }
                  </p>
                  <h3>{{ item.role }}</h3>
                  <p class="company">{{ item.company }}</p>
                  <p class="desc">{{ item.description }}</p>
                </li>
              }
            </ol>
          </div>

          <aside class="edu">
            <h3 class="mono">{{ t().timeline.educationTitle }}</h3>
            @for (e of t().timeline.education; track $index) {
              <div class="card">
                <p class="card-title">{{ e.title }}</p>
                <p>{{ e.institution }}</p>
                <p class="mono">{{ e.type }} · {{ e.status }}</p>
              </div>
            }
            <h3 class="mono">{{ t().timeline.certificatesTitle }}</h3>
            @for (c of t().timeline.certificates; track $index) {
              <div class="card">
                <p class="card-title">{{ c.title }}</p>
                <p class="mono">{{ c.issuer }} · {{ c.status }}</p>
              </div>
            }
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: `
    .cols {
      display: grid;
      gap: 56px;
      margin-top: 48px;
    }
    .track {
      position: relative;
      padding-left: 36px;
    }
    .rail {
      position: absolute;
      left: 7px;
      top: 6px;
      bottom: 6px;
      width: 2px;
      background: rgba(20, 20, 20, 0.12);
    }
    .fill {
      height: 100%;
      background: var(--ink);
      transform-origin: top;
    }
    .items {
      display: grid;
      gap: 40px;
    }
    .item {
      position: relative;
    }
    .dot {
      position: absolute;
      left: -36px;
      top: 4px;
      width: 16px;
      height: 16px;
      border: 2px solid var(--ink);
      border-radius: 50%;
      background: var(--ink);
      transition: background-color 0.3s;
    }
    :host(.drawing) .item:not(.lit, .current) .dot {
      background: var(--paper);
    }
    .current .dot {
      border-color: var(--signal);
      background: var(--signal);
    }
    .period {
      color: var(--muted);
      text-transform: uppercase;
    }
    .badge {
      margin-left: 8px;
      padding: 2px 8px;
      background: var(--signal-text);
      color: var(--paper);
    }
    .item h3 {
      font: 400 30px/1.1 var(--serif);
      margin-top: 6px;
    }
    .company {
      font-weight: 600;
      margin-top: 2px;
    }
    .desc {
      color: var(--muted);
      margin-top: 8px;
      max-width: 62ch;
    }
    .edu {
      display: grid;
      gap: 12px;
      align-content: start;
    }
    .edu h3 {
      color: var(--signal-text);
      text-transform: uppercase;
      margin-top: 12px;
    }
    .card {
      border: 1.5px solid var(--ink);
      padding: 14px 16px;
      background: var(--paper);
    }
    .card-title {
      font: 400 22px/1.2 var(--serif);
    }
    @media (min-width: 1024px) {
      .cols {
        grid-template-columns: 1fr 340px;
        gap: 72px;
      }
    }
  `,
})
export class Timeline {
  protected readonly t = inject(LangService).t;

  constructor() {
    sceneMotion((m, mode, root) => {
      const q = m.gsap.utils.selector(root);
      if (mode === 'flow') {
        reveal(m, q('.item, .card'));
        return;
      }
      root.classList.add('drawing');
      m.gsap.from(q('.fill'), {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: { trigger: q('.track')[0], start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
      });
      for (const item of q('.item')) {
        m.ScrollTrigger.create({ trigger: item, start: 'top 60%', toggleClass: 'lit' });
      }
      reveal(m, q('.card'));
      return () => root.classList.remove('drawing');
    });
  }
}
