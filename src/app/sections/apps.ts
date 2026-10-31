import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CaseStudy } from '../cases/case-study';
import { cases } from '../data/cases';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';

@Component({
  selector: 'app-apps',
  imports: [CaseStudy],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="apps" class="intro wrap">
      <p class="kick">{{ t().apps.kicker }}</p>
      <h2 class="h2">{{ t().apps.title }}</h2>
      <p class="lead">{{ t().apps.lead }}</p>
    </section>
    @for (c of cases; track c.id) {
      <app-case-study [data]="c" />
    }
  `,
  styles: `
    .intro {
      padding-block: 16vh 6vh;
      text-align: center;
    }
    .h2,
    .lead {
      margin-inline: auto;
    }
  `,
})
export class Apps {
  protected readonly t = inject(LangService).t;
  protected readonly cases = cases;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, root.querySelectorAll('.intro > *')));
  }
}
