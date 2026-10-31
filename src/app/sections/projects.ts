import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ProjectTier, projects } from '../content';
import { LangService } from '../lang';
import { refreshScroll, reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

export type Filter = ProjectTier | 'all';

export const FILTERS: Filter[] = ['all', 'enterprise', 'saas', 'web', 'landing'];

const COUNTS: Record<Filter, number> = { all: projects.length, enterprise: 0, saas: 0, web: 0, landing: 0 };
for (const p of projects) COUNTS[p.tier]++;

@Component({
  selector: 'app-projects',
  imports: [NgOptimizedImage, Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projetos" class="section">
      <div class="wrap">
        <p class="fig-label">{{ t().projects.label }}</p>
        <h2 class="title"><app-words [text]="t().projects.title" /></h2>
        <p class="lead">{{ t().projects.subtitle }}</p>

        <div class="filters" role="group" [attr.aria-label]="t().projects.type">
          @for (f of filters; track f) {
            <button type="button" class="chip mono" [attr.aria-pressed]="filter() === f" (click)="select(f)">
              {{ t().projects.filters[f] }} <span class="count">{{ counts[f] }}</span>
            </button>
          }
        </div>
        <p class="visually-hidden" aria-live="polite">{{ visible().length }} {{ t().projects.count }}</p>

        <div class="grid">
          @for (p of visible(); track p.id) {
            <article class="sheet" animate.enter="sheet-in">
              <div class="media">
                @if (p.image) {
                  <img [ngSrc]="p.image" fill alt="" />
                } @else {
                  <div class="hatch mono" aria-hidden="true">{{ p.title }}</div>
                }
              </div>
              <div class="body">
                <h3>{{ p.title }}</h3>
                <p class="summary">{{ p.summary[lang()] }}</p>
                <dl class="stamp mono">
                  <div>
                    <dt>{{ t().projects.type }}</dt>
                    <dd>{{ t().projects.filters[p.tier] }}</dd>
                  </div>
                  <div>
                    <dt>{{ t().projects.stack }}</dt>
                    <dd>{{ p.stack }}</dd>
                  </div>
                </dl>
                <div class="links">
                  @if (p.liveLink) {
                    <a class="btn btn-primary" [href]="p.liveLink" target="_blank" rel="noopener">{{ t().projects.live }}</a>
                  }
                  @if (p.githubLink) {
                    <a class="btn btn-ghost" [href]="p.githubLink" target="_blank" rel="noopener">{{ t().projects.github }}</a>
                  }
                </div>
                <details>
                  <summary class="mono">{{ t().projects.details }}</summary>
                  <dl class="facts">
                    <dt>{{ t().projects.problem }}</dt>
                    <dd>{{ p.problem[lang()] }}</dd>
                    <dt>{{ t().projects.solution }}</dt>
                    <dd>{{ p.solution[lang()] }}</dd>
                    <dt>{{ t().projects.outcome }}</dt>
                    <dd>{{ p.result[lang()] }}</dd>
                    <dt>{{ t().projects.role }}</dt>
                    <dd>{{ p.role[lang()] }}</dd>
                  </dl>
                </details>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 32px;
    }
    .chip {
      min-height: 40px;
      padding: 0 14px;
      border: 1.5px solid var(--ink);
      border-radius: 2px;
      background: var(--paper);
      text-transform: uppercase;
      cursor: pointer;
    }
    .chip[aria-pressed='true'] {
      background: var(--ink);
      color: var(--paper);
    }
    .count {
      opacity: 0.6;
    }
    .grid {
      display: grid;
      gap: 24px;
      margin-top: 32px;
    }
    .sheet {
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1.5px solid var(--ink);
      background: var(--paper);
    }
    .sheet::before,
    .sheet::after {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      border: 0 solid var(--signal);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .sheet::before {
      top: -7px;
      left: -7px;
      border-width: 2px 0 0 2px;
    }
    .sheet::after {
      right: -7px;
      bottom: -7px;
      border-width: 0 2px 2px 0;
    }
    .sheet:hover::before,
    .sheet:hover::after {
      opacity: 1;
    }
    .media {
      position: relative;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      border-bottom: 1.5px solid var(--ink);
    }
    .media img {
      object-fit: cover;
      object-position: top;
      transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .sheet:hover .media img {
      transform: scale(1.03);
    }
    .hatch {
      height: 100%;
      display: grid;
      place-items: center;
      padding: 16px;
      text-align: center;
      background: repeating-linear-gradient(45deg, transparent 0 9px, rgba(20, 20, 20, 0.1) 9px 10px);
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex: 1;
      padding: 20px;
    }
    .body h3 {
      font: 400 28px/1.1 var(--serif);
    }
    .summary {
      color: var(--muted);
    }
    .stamp {
      display: grid;
      border: 1px solid var(--ink);
    }
    .stamp div {
      display: grid;
      grid-template-columns: 64px 1fr;
    }
    .stamp div + div {
      border-top: 1px solid var(--ink);
    }
    .stamp dt,
    .stamp dd {
      padding: 6px 8px;
    }
    .stamp dt {
      border-right: 1px solid var(--ink);
      text-transform: uppercase;
      color: var(--muted);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: auto;
    }
    .links .btn {
      min-height: 40px;
      padding: 0 16px;
      font-size: 14px;
    }
    summary {
      cursor: pointer;
      text-transform: uppercase;
      color: var(--signal-text);
    }
    .facts dt {
      font-weight: 600;
      margin-top: 12px;
    }
    .facts dd {
      color: var(--muted);
    }
    .sheet-in {
      animation: sheet-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    @keyframes sheet-in {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
    }
    @media (min-width: 720px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1100px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `,
})
export class Projects {
  private readonly langService = inject(LangService);
  private readonly injector = inject(Injector);
  protected readonly t = this.langService.t;
  protected readonly lang = this.langService.lang;
  protected readonly filters = FILTERS;

  readonly filter = signal<Filter>('all');
  readonly visible = computed(() => {
    const f = this.filter();
    return f === 'all' ? projects : projects.filter((p) => p.tier === f);
  });
  readonly counts = COUNTS;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, m.gsap.utils.selector(root)('.sheet')));
  }

  select(f: Filter): void {
    this.filter.set(f);
    // the grid height changed: triggers below it (Fig. 07) need new positions
    afterNextRender(refreshScroll, { injector: this.injector });
  }
}
