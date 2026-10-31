import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { siteRepo } from '../content';
import { inside } from '../data/inside';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';
import { CodeBlock } from '../ui/code-block';
import { Rich } from '../ui/rich';

@Component({
  selector: 'app-inside',
  imports: [CodeBlock, Rich],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="por-dentro" class="section wrap">
      <p class="kick">{{ t().inside.kicker }}</p>
      <h2 class="h2">{{ t().inside.title }}</h2>
      <p class="lead">{{ t().inside.lead }}</p>
      <div class="grid">
        @for (c of cards; track $index) {
          <article class="eng">
            <h3>{{ c.title[lang()] }}</h3>
            <p><app-rich [text]="c.text[lang()]" /></p>
            @for (x of c.code; track $index) {
              <app-code-block [excerpt]="x" />
            }
          </article>
        }
      </div>
      <p class="repo"><a class="btn ext" [href]="repo" target="_blank" rel="noopener">{{ t().inside.repo }}</a></p>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 14px;
      margin-top: 36px;
    }
    .eng {
      min-width: 0;
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--panel);
    }
    h3 {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.25;
      letter-spacing: -0.015em;
    }
    .eng p {
      margin-top: 6px;
      color: #c3c9d1;
      font-size: 14px;
      line-height: 1.5;
    }
    .repo {
      margin-top: 24px;
    }
    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: start;
      }
    }
  `,
})
export class Inside {
  protected readonly lang = inject(LangService).lang;
  protected readonly t = inject(LangService).t;
  protected readonly cards = inside;
  protected readonly repo = siteRepo;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, root.querySelectorAll('.kick, .h2, .lead, .eng, .repo')));
  }
}
