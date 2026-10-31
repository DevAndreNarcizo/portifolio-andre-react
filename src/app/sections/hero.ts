import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { LangService } from '../lang';
import { reducedMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-hero',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="inicio" class="hero wrap">
      <div class="copy">
        <p class="fig-label">{{ t().hero.label }}</p>
        <h1 class="headline"><app-words [text]="t().hero.title" /></h1>
        <p class="lead">{{ t().hero.description }}</p>
        <p class="mono stack-line">{{ t().hero.stackLine }}</p>
        <div class="ctas">
          <a class="btn btn-primary" href="#projetos">{{ t().hero.projects }}</a>
          <a class="btn btn-ghost" href="#contato">{{ t().hero.contact }}</a>
        </div>
      </div>

      <svg class="diagram" viewBox="0 0 520 300" role="img" [attr.aria-label]="t().hero.diagram">
        <path class="wire" pathLength="1" d="M130 62 C170 62 170 150 210 150" />
        <path class="wire" pathLength="1" d="M130 238 C170 238 170 150 210 150" />
        <path class="wire" pathLength="1" d="M330 150 H390" />
        <text class="note" x="192" y="100">HTTP</text>
        <text class="note" x="344" y="140">SQL</text>

        <g class="node">
          <rect x="10" y="40" width="120" height="44" rx="2" />
          <text x="70" y="67">Angular</text>
        </g>
        <g class="node">
          <rect x="10" y="216" width="120" height="44" rx="2" />
          <text x="70" y="243">Flutter</text>
        </g>
        <g class="node">
          <rect x="210" y="128" width="120" height="44" rx="2" />
          <text x="270" y="155">Laravel</text>
        </g>
        <g class="node">
          <rect x="390" y="128" width="120" height="44" rx="2" />
          <text x="450" y="155">PostgreSQL</text>
        </g>

        @if (live()) {
          <circle class="packet" r="5">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M130 62 C170 62 170 150 210 150 H390" />
          </circle>
          <circle class="packet" r="5">
            <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path="M130 238 C170 238 170 150 210 150 H390" />
          </circle>
        } @else {
          <circle class="packet" r="5" cx="130" cy="62" />
        }
      </svg>
    </section>
  `,
  styles: `
    .hero {
      display: grid;
      gap: 48px;
      align-items: center;
      min-height: calc(100svh - var(--header));
      padding-block: 48px 72px;
    }
    .headline {
      font: 400 clamp(44px, 6.6vw, 96px) / 0.98 var(--serif);
      letter-spacing: -0.015em;
      margin-top: 16px;
    }
    .headline .w > span {
      animation: rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
      animation-delay: calc(var(--i) * 60ms + 120ms);
    }
    .stack-line {
      margin-top: 20px;
      text-transform: uppercase;
    }
    .ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 32px;
    }
    .diagram {
      width: 100%;
      max-width: 560px;
      justify-self: center;
      color: var(--ink);
    }
    .wire {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.4;
      stroke-dasharray: 1;
      animation: draw 1.1s 0.5s cubic-bezier(0.6, 0, 0.4, 1) backwards;
    }
    .node {
      animation: fade 0.6s 0.25s backwards;
    }
    .node rect {
      fill: var(--paper);
      stroke: currentColor;
      stroke-width: 1.4;
    }
    text {
      font: 600 14px var(--mono);
      fill: currentColor;
      text-anchor: middle;
    }
    .note {
      font-weight: 400;
      font-size: 12px;
      fill: var(--muted);
    }
    .packet {
      fill: var(--signal);
    }
    @media (min-width: 1024px) {
      .hero {
        grid-template-columns: 1.15fr 0.85fr;
      }
    }
    @keyframes rise {
      from {
        transform: translateY(105%);
      }
    }
    @keyframes draw {
      from {
        stroke-dashoffset: 1;
      }
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
  `,
})
export class Hero {
  protected readonly t = inject(LangService).t;
  // SMIL ignores prefers-reduced-motion, so the moving packets are only added in the browser when motion is allowed
  protected readonly live = signal(false);

  constructor() {
    afterNextRender(() => this.live.set(!reducedMotion()));
  }
}
