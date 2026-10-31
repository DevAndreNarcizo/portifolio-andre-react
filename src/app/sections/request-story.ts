import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../lang';
import { Motion, Mode, reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

const SIGNAL = '#e8452c';
const INK = '#141414';

type Point = [x: number, y: number];

// Route of the request in SVG coordinates (viewBox 0 0 800 480); see the template for the shapes.
const TO_LARAVEL: Point[] = [[290, 115], [290, 166], [350, 166], [440, 166]];
const STAGES: Point[] = [[440, 216], [440, 266], [440, 316]];
const TO_DB: Point[] = [[530, 316], [575, 316], [575, 240], [690, 240]];
const BACK_TO_SPLIT: Point[] = [[575, 240], [575, 316], [440, 316], [440, 166], [350, 166], [290, 166]];
const TO_BROWSER: Point[] = [[290, 115], [250, 115]];
const TO_PHONE: Point[] = [[290, 352], [200, 352]];

@Component({
  selector: 'app-request-story',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="requisicao" class="request">
      <div class="stage wrap">
        <div class="side">
          <p class="fig-label">{{ t().request.label }}</p>
          <h2 class="title"><app-words [text]="t().request.title" /></h2>
          <ol class="steps">
            @for (step of t().request.steps; track $index) {
              <li class="step">
                <span class="mono num">0{{ $index + 1 }}</span>
                <h3>{{ step.name }}</h3>
                <p>{{ step.text }}</p>
              </li>
            }
          </ol>
        </div>

        <svg class="diagram" viewBox="0 0 800 480" role="img" [attr.aria-label]="t().request.diagram">
          <path class="wire" data-node="http" d="M250 115 H290 V166 H350" />
          <path class="wire" data-node="mobile-http" d="M200 352 H290 V166" />
          <path class="wire" data-node="sql" d="M530 316 H575 V240 H610" />

          <g class="node" data-node="browser">
            <rect class="frame" x="20" y="30" width="230" height="170" rx="4" />
            <path d="M20 54 H250" />
            <circle cx="36" cy="42" r="3.5" />
            <circle cx="48" cy="42" r="3.5" />
            <circle cx="60" cy="42" r="3.5" />
            <rect x="40" y="72" width="190" height="18" />
            <rect x="40" y="100" width="150" height="18" />
            <rect x="40" y="128" width="170" height="18" />
            <rect class="row-new" x="40" y="156" width="190" height="18" />
            <text x="135" y="222">Angular</text>
          </g>

          <g class="node" data-node="phone">
            <rect class="frame" x="90" y="262" width="110" height="180" rx="16" />
            <path d="M130 276 H160" />
            <rect x="104" y="292" width="82" height="14" />
            <rect x="104" y="314" width="66" height="14" />
            <rect x="104" y="336" width="74" height="14" />
            <rect class="row-new" x="104" y="358" width="82" height="14" />
            <text x="145" y="468">Flutter</text>
          </g>

          <g class="node">
            <rect class="frame" x="330" y="100" width="220" height="270" rx="4" />
            <text x="440" y="128">Laravel</text>
          </g>
          @for (stage of stages; track stage; let i = $index) {
            <g class="node" [attr.data-node]="stage">
              <rect class="frame" x="350" [attr.y]="146 + i * 50" width="180" height="40" rx="2" />
              <text class="small" x="440" [attr.y]="171 + i * 50">{{ stage }}</text>
            </g>
          }

          <g class="node" data-node="db">
            <path class="frame" d="M610 180 V300 A80 18 0 0 0 770 300 V180" />
            <ellipse class="frame" cx="690" cy="180" rx="80" ry="18" />
            <text x="690" y="252">PostgreSQL</text>
          </g>

          <circle class="packet" data-packet="req" r="7" cx="250" cy="115" />
          <circle class="packet" data-packet="res-a" r="7" cx="690" cy="240" />
          <circle class="packet" data-packet="res-b" r="7" cx="690" cy="240" />
        </svg>
      </div>
    </section>
  `,
  styles: `
    .request {
      padding-block: var(--section-y);
    }
    .stage {
      display: grid;
      gap: 40px;
    }
    .steps {
      display: grid;
      gap: 20px;
      margin-top: 32px;
    }
    .step {
      border-top: 1px solid var(--rule);
      padding-top: 14px;
    }
    .num {
      color: var(--signal-text);
    }
    .step h3 {
      font: 400 28px/1.1 var(--serif);
      margin-top: 4px;
    }
    .step p {
      color: var(--muted);
      margin-top: 6px;
    }
    .diagram {
      width: 100%;
      color: var(--ink);
    }
    .wire,
    .node path,
    .node .frame {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
    }
    .node rect.frame {
      fill: var(--paper);
    }
    .node circle,
    .node rect:not(.frame) {
      fill: currentColor;
      opacity: 0.18;
    }
    .node rect.row-new {
      fill: var(--signal);
      opacity: 1;
    }
    text {
      font: 600 17px var(--mono);
      fill: currentColor;
      text-anchor: middle;
    }
    text.small {
      font-weight: 400;
      font-size: 15px;
    }
    .packet {
      fill: var(--signal);
      opacity: 0;
    }
    @media (min-width: 1024px) and (orientation: landscape) {
      .request {
        padding-block: 0;
      }
      .stage {
        grid-template-columns: 340px 1fr;
        align-items: center;
        min-height: calc(100svh - var(--header));
        padding-block: 48px;
      }
      :host(.is-pinned) .step {
        grid-area: 1 / 1;
      }
    }
  `,
})
export class RequestStory {
  protected readonly t = inject(LangService).t;
  protected readonly stages = ['auth', 'tenant', 'policy', 'controller'];

  constructor() {
    sceneMotion(story);
  }
}

function story(m: Motion, mode: Mode, root: HTMLElement): () => void {
  const { gsap } = m;
  const q = gsap.utils.selector(root);
  const steps = q('.step');
  const node = (name: string) => q(`[data-node="${name}"]`);
  const [req, resA, resB] = ['req', 'res-a', 'res-b'].map((name) => q(`[data-packet="${name}"]`));
  const desktop = mode === 'desktop';

  if (desktop) root.classList.add('is-pinned');
  gsap.set(q('.row-new'), { autoAlpha: 0 });
  if (desktop) gsap.set(steps.slice(1), { autoAlpha: 0, y: 16 });
  else reveal(m, steps);

  const tl = gsap.timeline({
    defaults: { ease: desktop ? 'none' : 'power1.inOut', duration: 0.3 },
    scrollTrigger: desktop
      ? { trigger: q('.stage')[0], start: 'top top+=64', end: '+=300%', pin: true, scrub: 0.6 }
      : { trigger: q('.diagram')[0], start: 'top 70%', once: true },
  });

  const caption = (i: number) => {
    if (!desktop) return;
    tl.to(steps, { autoAlpha: (j: number) => (j === i ? 1 : 0), y: (j: number) => (j === i ? 0 : -16) }, '<');
  };
  const travel = (packets: Element[], points: Point[]) => {
    for (const [cx, cy] of points) tl.to(packets, { attr: { cx, cy } });
  };
  const light = (name: string) => tl.to(node(name), { color: SIGNAL, duration: 0.15 });
  const dim = (name: string) => tl.to(node(name), { color: INK, duration: 0.15 }, '<');

  // 01 Angular
  light('browser');
  tl.to(req, { autoAlpha: 1, duration: 0.15 }, '<');
  caption(0);
  // 02 HTTP
  light('http');
  caption(1);
  dim('browser');
  travel(req, TO_LARAVEL.slice(0, 3));
  // 03 Laravel: auth → tenant → policy → controller
  dim('http');
  caption(2);
  travel(req, TO_LARAVEL.slice(3));
  light('auth');
  STAGES.forEach(([cx, cy], i) => {
    tl.to(req, { attr: { cx, cy } });
    dim(['auth', 'tenant', 'policy'][i]);
    light(['tenant', 'policy', 'controller'][i]);
  });
  // 04 PostgreSQL
  dim('controller');
  light('sql');
  caption(3);
  travel(req, TO_DB);
  dim('sql');
  light('db');
  tl.to(req, { autoAlpha: 0, duration: 0.15 });
  // 05 Response: back through the API, then split to both clients
  caption(4);
  tl.to([resA, resB], { autoAlpha: 1, duration: 0.15 });
  dim('db');
  travel([...resA, ...resB], BACK_TO_SPLIT);
  tl.addLabel('split');
  for (const [cx, cy] of TO_BROWSER) tl.to(resA, { attr: { cx, cy } });
  tl.to(resB, { attr: { cx: TO_PHONE[0][0], cy: TO_PHONE[0][1] } }, 'split');
  tl.to(resB, { attr: { cx: TO_PHONE[1][0], cy: TO_PHONE[1][1] } }, 'split+=0.3');
  light('browser');
  light('phone');
  tl.to(q('.row-new'), { autoAlpha: 1, duration: 0.2 }, '<');
  tl.to([resA, resB], { autoAlpha: 0, duration: 0.15 }, '<');
  // hold the finished frame for the last stretch of the pin
  tl.to({}, { duration: desktop ? 0.6 : 0 });

  return () => root.classList.remove('is-pinned');
}
