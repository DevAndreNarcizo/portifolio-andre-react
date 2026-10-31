import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { stackLayers, targetStack } from '../content';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-stack-blueprint',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="stack">
      <div class="stage wrap">
        <div class="head">
          <p class="fig-label">{{ t().stack.label }}</p>
          <h2 class="title"><app-words [text]="t().stack.title" /></h2>
          <p class="lead">{{ t().stack.subtitle }}</p>
        </div>

        <div class="board">
          <div class="rail" aria-hidden="true"><span class="packet"></span></div>
          <ol class="plates">
            @for (layer of layers; track $index) {
              <li class="plate">
                <p class="mono name">0{{ $index + 1 }} · {{ layer.name[lang()] }}</p>
                <ul class="techs">
                  @for (tech of layer.techs; track tech) {
                    <li [class.target]="targets.has(tech)">{{ tech }}</li>
                  }
                </ul>
              </li>
            }
          </ol>
        </div>
      </div>
    </section>
  `,
  styles: `
    .stack {
      padding-block: var(--section-y);
    }
    .stage {
      display: grid;
      gap: 40px;
    }
    .board {
      position: relative;
      padding-left: 32px;
    }
    .rail {
      position: absolute;
      left: 8px;
      top: 0;
      bottom: 0;
      border-left: 1.5px dashed var(--rule);
    }
    .packet {
      position: absolute;
      left: -8px;
      top: 0;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--signal);
      opacity: 0;
    }
    .plates {
      display: grid;
      gap: 16px;
      perspective: 1400px;
    }
    .plate {
      border: 1.5px solid var(--ink);
      background: var(--paper);
      padding: 16px 20px;
      box-shadow: 6px 6px 0 rgba(20, 20, 20, 0.08);
    }
    .name {
      color: var(--signal-text);
      text-transform: uppercase;
      font-weight: 600;
    }
    .techs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 18px;
      margin-top: 8px;
      font: 400 22px/1.3 var(--serif);
    }
    .target {
      text-decoration: underline 2px var(--signal);
      text-underline-offset: 5px;
    }
    @media (min-width: 1024px) and (orientation: landscape) {
      .stack {
        padding-block: 0;
      }
      .stage {
        grid-template-columns: 340px 1fr;
        align-items: center;
        min-height: calc(100svh - var(--header));
        padding-block: 48px;
      }
    }
  `,
})
export class StackBlueprint {
  private readonly langService = inject(LangService);
  protected readonly t = this.langService.t;
  protected readonly lang = this.langService.lang;
  protected readonly layers = stackLayers;
  protected readonly targets = new Set(targetStack);

  constructor() {
    sceneMotion((m, mode, root) => {
      const q = m.gsap.utils.selector(root);
      const plates = q('.plate') as HTMLElement[];
      if (mode === 'flow') {
        reveal(m, plates);
        return;
      }
      const rail = q('.rail')[0] as HTMLElement;
      const tl = m.gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: q('.stage')[0], start: 'top top+=64', end: '+=200%', pin: true, scrub: 0.6 },
      });
      // Exploded view: the plates start as a tilted, overlapping stack and separate into the readable list
      tl.from(plates, {
        y: (i: number, el: HTMLElement) => plates[0].offsetTop - el.offsetTop + i * 40,
        rotateX: 58,
        transformOrigin: '50% 0%',
        boxShadow: '0 0 0 rgba(20, 20, 20, 0)',
        duration: 1,
        stagger: 0.08,
      });
      tl.to(q('.packet'), { autoAlpha: 1, duration: 0.05 });
      tl.to(q('.packet'), { y: () => rail.offsetHeight - 14, duration: 0.6, ease: 'none' });
      tl.to(q('.packet'), { autoAlpha: 0, duration: 0.05 });
    });
  }
}
