import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../lang';
import { buildOnView } from '../agents';

@Component({
  selector: 'app-career',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="trajetoria" class="section wrap">
      <p class="kick">{{ t().career.kicker }}</p>
      <h2 class="h2">{{ t().career.title }}</h2>
      <ol class="jobs">
        @for (job of t().career.jobs; track job.company) {
          <li>
            <p class="when">{{ job.period }}</p>
            <div>
              <h3>{{ job.role }} <span>· {{ job.company }}</span></h3>
              <p>{{ job.text }}</p>
              @if (job.note) {
                <p class="note">{{ job.note }}</p>
              }
            </div>
          </li>
        }
      </ol>
      <div class="edu">
        <div>
          <h3>{{ t().career.educationTitle }}</h3>
          <p>{{ t().career.education }}</p>
        </div>
        <div>
          <h3>{{ t().career.studiesTitle }}</h3>
          <ul>
            @for (s of t().career.studies; track s) {
              <li>{{ s }}</li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .jobs {
      margin-top: 36px;
    }
    .jobs > li {
      display: grid;
      gap: 6px 32px;
      padding: 22px 0;
      border-top: 1px solid var(--line);
    }
    .when {
      color: var(--mut);
      font: 400 13px/1.6 var(--mono);
    }
    h3 {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.015em;
    }
    h3 span {
      color: var(--mut);
      font-weight: 400;
    }
    .jobs p:not(.when) {
      max-width: 70ch;
      margin-top: 6px;
      color: var(--tx2);
    }
    .jobs .note {
      padding-left: 12px;
      border-left: 2px solid var(--acc);
      color: var(--mut) !important;
      font-size: 14px;
    }
    .edu {
      display: grid;
      gap: 24px 32px;
      padding-top: 28px;
      border-top: 1px solid var(--line);
    }
    .edu h3 {
      color: var(--acc);
      font: 500 13px/1.4 var(--mono);
    }
    .edu p,
    .edu li {
      margin-top: 6px;
      color: var(--tx2);
    }
    @media (min-width: 900px) {
      .jobs > li {
        grid-template-columns: 200px minmax(0, 1fr);
      }
      .edu {
        grid-template-columns: 1fr 1fr;
      }
    }
  `,
})
export class Career {
  protected readonly t = inject(LangService).t;

  constructor() {
    buildOnView('.kick, .h2, .jobs > li, .edu > div');
  }
}
