import { ChangeDetectionStrategy, Component, Injector, afterNextRender, inject } from '@angular/core';
import { LangService } from './lang';
import { refreshScroll } from './motion';
import { About } from './sections/about';
import { Contact } from './sections/contact';
import { Hero } from './sections/hero';
import { Projects } from './sections/projects';
import { RequestStory } from './sections/request-story';
import { StackBlueprint } from './sections/stack-blueprint';
import { Timeline } from './sections/timeline';

@Component({
  selector: 'app-root',
  imports: [Hero, RequestStory, About, Timeline, StackBlueprint, Projects, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#conteudo">{{ t().nav.skip }}</a>
    <header class="header">
      <div class="wrap bar">
        <a class="mark" href="#inicio" aria-label="André Narcizo">AN</a>
        <nav [attr.aria-label]="t().nav.label">
          <a class="hide-sm" href="#sobre">{{ t().nav.about }}</a>
          <a class="hide-sm" href="#trajetoria">{{ t().nav.experience }}</a>
          <a class="hide-sm" href="#stack">{{ t().nav.stack }}</a>
          <a class="hide-sm" href="#projetos">{{ t().nav.projects }}</a>
          <a href="#contato">{{ t().nav.contact }}</a>
        </nav>
        <button type="button" class="lang mono" [attr.aria-label]="t().nav.langSwitch" (click)="toggleLang()">
          {{ t().nav.langShort }}
        </button>
      </div>
    </header>
    <main id="conteudo" tabindex="-1">
      <app-hero />
      <app-request-story />
      <app-about />
      <app-timeline />
      <app-stack-blueprint />
      <app-projects />
      <app-contact />
    </main>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      height: var(--header);
      background: color-mix(in srgb, var(--paper) 90%, transparent);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(20, 20, 20, 0.12);
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 24px;
      height: 100%;
    }
    .mark {
      font: italic 400 28px/1 var(--serif);
      text-decoration: none;
      margin-right: auto;
    }
    nav {
      display: flex;
      gap: 24px;
    }
    nav a {
      font-weight: 600;
      font-size: 15px;
      text-decoration: none;
    }
    nav a:hover {
      color: var(--signal-text);
    }
    .lang {
      min-width: 44px;
      min-height: 36px;
      border: 1.5px solid var(--ink);
      border-radius: 2px;
      background: transparent;
      font-weight: 600;
      cursor: pointer;
    }
    .lang:hover {
      background: var(--ink);
      color: var(--paper);
    }
    main:focus {
      outline: none;
    }
    @media (max-width: 759.98px) {
      .hide-sm {
        display: none;
      }
    }
  `,
})
export class App {
  protected readonly lang = inject(LangService);
  protected readonly t = this.lang.t;
  private readonly injector = inject(Injector);

  constructor() {
    afterNextRender(() => this.lang.restore());
  }

  protected toggleLang(): void {
    this.lang.toggle();
    // New copy changes section heights; re-measure pins and triggers once the DOM has the new text
    afterNextRender(refreshScroll, { injector: this.injector });
  }
}
