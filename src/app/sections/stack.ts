import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { stackGroups } from '../content';
import { LangService } from '../lang';
import { buildOnView } from '../agents';

@Component({
  selector: 'app-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="section wrap">
      <p class="kick">{{ t().stack.kicker }}</p>
      <h2 class="h2">{{ t().stack.title }}</h2>
      <p class="lead">{{ t().stack.lead }}</p>
      <div class="groups">
        @for (g of groups; track g.name.en) {
          <div class="group">
            <h3>{{ g.name[lang()] }}</h3>
            <ul>
              @for (item of g.items; track item.name) {
                <li>
                  <a [href]="'#' + item.at">{{ item.name }}<span>{{ t().stack.at[item.at] }}</span></a>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .groups {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 28px 32px;
      margin-top: 36px;
    }
    h3 {
      color: var(--acc);
      font: 500 13px/1.4 var(--mono);
    }
    ul {
      margin-top: 10px;
      border-top: 1px solid var(--line);
    }
    a {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      padding: 9px 0;
      border-bottom: 1px solid var(--line);
      text-decoration: none;
    }
    a span {
      color: var(--mut);
      font: 400 11px var(--mono);
      white-space: nowrap;
    }
    a:hover,
    a:hover span {
      color: var(--acc);
    }
  `,
})
export class Stack {
  protected readonly lang = inject(LangService).lang;
  protected readonly t = inject(LangService).t;
  protected readonly groups = stackGroups;

  constructor() {
    buildOnView('.kick, .h2, .lead, .group');
  }
}
