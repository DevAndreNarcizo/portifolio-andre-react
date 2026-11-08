import { ChangeDetectionStrategy, Component, DestroyRef, Injector, afterNextRender, inject, signal } from '@angular/core';
import { siteRepo } from './content';
import { LangService } from './lang';
import { refreshScroll } from './motion';
import { Apps } from './sections/apps';
import { Career } from './sections/career';
import { Contact } from './sections/contact';
import { Hero } from './sections/hero';
import { Inside } from './sections/inside';
import { More } from './sections/more';
import { Stack } from './sections/stack';

@Component({
  selector: 'app-root',
  imports: [Hero, Apps, Inside, More, Career, Stack, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#conteudo">{{ t().nav.skip }}</a>
    <header class="header" [class.hidden]="hidden()">
      <div class="wrap bar">
        <a class="mark" href="#inicio" aria-label="André Narcizo">andre.narcizo<span>_</span></a>
        <nav [attr.aria-label]="t().nav.label">
          <a class="hide-sm" href="#apps">{{ t().nav.apps }}</a>
          <a class="hide-sm" href="#trajetoria">{{ t().nav.career }}</a>
          <a class="hide-sm" href="#stack">{{ t().nav.stack }}</a>
          <a href="#contato">{{ t().nav.contact }}</a>
        </nav>
        <button type="button" class="lang" [attr.aria-label]="t().nav.langSwitch" (click)="toggleLang()">
          {{ t().nav.langShort }}
        </button>
      </div>
    </header>
    <main id="conteudo" tabindex="-1">
      <app-hero />
      <app-apps />
      <app-inside />
      <app-more />
      <app-career />
      <app-stack />
      <app-contact />
    </main>
    <footer class="footer">
      <div class="wrap row">
        <span>André Narcizo · {{ t().footer.role }}</span>
        <a class="ext" [href]="repo" target="_blank" rel="noopener">{{ t().footer.code }}</a>
      </div>
    </footer>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      height: var(--header);
      background: color-mix(in srgb, var(--bg) 85%, transparent);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--line);
      transition: transform 0.3s ease;
    }
    .header.hidden,
    :host-context(.case-pinned) .header {
      transform: translateY(-100%);
    }
    .header:focus-within {
      transform: none !important;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 24px;
      height: 100%;
      font: 500 13px var(--mono);
    }
    .mark {
      margin-right: auto;
      text-decoration: none;
    }
    .mark span {
      color: var(--acc);
    }
    nav {
      display: flex;
      gap: 24px;
    }
    nav a {
      color: var(--mut);
      text-decoration: none;
    }
    nav a:hover {
      color: var(--tx);
    }
    .lang {
      min-width: 44px;
      min-height: 34px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: transparent;
      font: 500 12px var(--mono);
      cursor: pointer;
    }
    .lang:hover {
      border-color: var(--acc);
      color: var(--acc);
    }
    main:focus {
      outline: none;
    }
    .footer {
      padding-block: 28px;
      border-top: 1px solid var(--line);
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px 24px;
      color: var(--mut);
      font: 400 12px var(--mono);
    }
    .row a {
      text-decoration: none;
    }
    .row a:hover {
      color: var(--acc);
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
  protected readonly repo = siteRepo;
  /** Header slides away while scrolling down and comes back on the way up. */
  protected readonly hidden = signal(false);
  private readonly injector = inject(Injector);
  private lastY = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.lang.restore();
      // A plain passive listener, not a host binding: the signal only schedules change detection
      // when the header actually flips, instead of on every (smooth-scrolled) frame.
      const onScroll = () => {
        const y = scrollY;
        this.hidden.set(y > this.lastY && y > 120);
        this.lastY = y;
      };
      addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => removeEventListener('scroll', onScroll));
    });
  }

  protected toggleLang(): void {
    this.lang.toggle();
    // New copy changes section heights; re-measure pins and triggers once the DOM has the new text
    afterNextRender(refreshScroll, { injector: this.injector });
  }
}
