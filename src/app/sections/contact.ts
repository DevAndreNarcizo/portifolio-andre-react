import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { contactInfo } from '../content';
import { LangService } from '../lang';
import { reducedMotion, reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-contact',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contato" class="section">
      <div class="wrap">
        <p class="fig-label">{{ t().contact.label }}</p>
        <h2 class="headline"><app-words [text]="t().contact.title" /></h2>

        <svg class="route" viewBox="0 0 520 60" aria-hidden="true">
          <text x="0" y="36">api</text>
          <path class="wire" d="M44 31 H440" />
          <text class="you" x="452" y="36">{{ t().contact.you }}</text>
          @if (live()) {
            <circle class="packet" r="6">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M44 31 H440" />
            </circle>
          } @else {
            <circle class="packet" r="6" cx="440" cy="31" />
          }
        </svg>

        <p class="lead">{{ t().contact.description }}</p>

        <ul class="channels">
          <li class="channel">
            <span class="mono label">{{ t().contact.email }}</span>
            <a #email [href]="'mailto:' + info.email">{{ info.email }}</a>
            <button type="button" class="copy mono" (click)="copy()">
              {{ copied() ? t().contact.copied : t().contact.copy }}
            </button>
          </li>
          <li class="channel">
            <span class="mono label">LinkedIn</span>
            <a [href]="info.linkedin" target="_blank" rel="noopener">linkedin.com/in/andrenarcizo</a>
          </li>
          <li class="channel">
            <span class="mono label">GitHub</span>
            <a [href]="info.github" target="_blank" rel="noopener">github.com/DevAndreNarcizo</a>
          </li>
          <li class="channel">
            <span class="mono label">WhatsApp</span>
            <a [href]="info.whatsappLink" target="_blank" rel="noopener">{{ info.whatsapp }}</a>
          </li>
        </ul>
        <p class="mono hint">{{ t().contact.hint }}</p>
      </div>
    </section>

    <footer class="footer">
      <div class="wrap row mono">
        <span>André Narcizo — {{ t().footer.role }}</span>
        <span>© {{ year }}</span>
      </div>
    </footer>
  `,
  styles: `
    .headline {
      font: 400 clamp(56px, 11vw, 160px) / 0.95 var(--serif);
      letter-spacing: -0.02em;
      margin-top: 12px;
    }
    .route {
      width: 100%;
      max-width: 520px;
      margin-top: 24px;
    }
    .route text {
      font: 600 16px var(--mono);
      fill: var(--ink);
    }
    .route .you {
      fill: var(--signal-text);
    }
    .wire {
      stroke: var(--ink);
      stroke-width: 1.4;
      stroke-dasharray: 4 6;
    }
    .packet {
      fill: var(--signal);
    }
    .channels {
      display: grid;
      margin-top: 40px;
      border-top: 1.5px solid var(--ink);
    }
    .channel {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 20px;
      padding: 18px 0;
      border-bottom: 1px solid var(--rule);
    }
    .label {
      width: 96px;
      text-transform: uppercase;
      color: var(--muted);
    }
    .channel a {
      font: 400 clamp(22px, 3vw, 34px) / 1.2 var(--serif);
      text-decoration-thickness: 1px;
      text-underline-offset: 6px;
      overflow-wrap: anywhere;
    }
    .channel a:hover {
      color: var(--signal-text);
    }
    .copy {
      min-height: 36px;
      padding: 0 12px;
      border: 1.5px solid var(--ink);
      border-radius: 2px;
      background: var(--paper);
      text-transform: uppercase;
      cursor: pointer;
    }
    .hint {
      margin-top: 24px;
      color: var(--muted);
    }
    .footer {
      border-top: 1.5px solid var(--ink);
      padding-block: 24px;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
      color: var(--muted);
    }
  `,
})
export class Contact {
  protected readonly t = inject(LangService).t;
  protected readonly info = contactInfo;
  protected readonly year = new Date().getFullYear();
  protected readonly live = signal(false);
  readonly copied = signal(false);
  private readonly email = viewChild.required<ElementRef<HTMLAnchorElement>>('email');

  constructor() {
    afterNextRender(() => this.live.set(!reducedMotion()));
    sceneMotion((m, _mode, root) => {
      const q = m.gsap.utils.selector(root);
      m.gsap.from(q('.headline .w > span'), {
        yPercent: 105,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: q('.headline')[0], start: 'top 80%', once: true },
      });
      reveal(m, q('.lead, .channel, .hint'));
    });
  }

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.info.email);
    } catch {
      // no clipboard (insecure context or denied): select the address so the visitor can copy it by hand
      getSelection()?.selectAllChildren(this.email().nativeElement);
      return;
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
