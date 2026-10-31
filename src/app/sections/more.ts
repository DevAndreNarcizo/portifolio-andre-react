import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { moreProjects } from '../content';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';

@Component({
  selector: 'app-more',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projetos" class="section wrap">
      <p class="kick">{{ t().more.kicker }}</p>
      <h2 class="h2">{{ t().more.title }}</h2>
      <ul class="list">
        @for (p of projects; track p.name.en) {
          <li>
            <h3>{{ p.name[lang()] }}</h3>
            <div>
              <p>{{ p.summary[lang()] }}</p>
              <p class="stack">{{ p.stack }}</p>
            </div>
            <p class="links">
              @for (link of p.links; track link.href) {
                <a class="ext" [href]="link.href" target="_blank" rel="noopener">{{ link.label[lang()] }}</a>
              }
            </p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .list {
      margin-top: 36px;
      border-bottom: 1px solid var(--line);
    }
    li {
      display: grid;
      gap: 6px 32px;
      padding: 18px 0;
      border-top: 1px solid var(--line);
    }
    h3 {
      font: 500 15px/1.4 var(--mono);
      overflow-wrap: anywhere;
    }
    li p {
      color: #c3c9d1;
      font-size: 15px;
    }
    .stack {
      margin-top: 4px;
      color: var(--mut) !important;
      font: 400 12px/1.5 var(--mono);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      font: 500 13px var(--mono);
    }
    .links a {
      color: var(--acc);
      text-decoration: none;
      white-space: nowrap;
    }
    .links a:hover {
      text-decoration: underline;
    }
    @media (min-width: 900px) {
      li {
        grid-template-columns: 280px minmax(0, 1fr) 220px;
      }
      .links {
        flex-direction: column;
        align-items: flex-end;
      }
    }
  `,
})
export class More {
  protected readonly lang = inject(LangService).lang;
  protected readonly t = inject(LangService).t;
  protected readonly projects = moreProjects;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, root.querySelectorAll('.kick, .h2, li')));
  }
}
