import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { contactInfo } from '../content';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contato" class="section wrap">
      <p class="kick">{{ t().contact.kicker }}</p>
      <div class="about">
        <img src="/andre.webp" width="640" height="640" [attr.alt]="t().contact.photoAlt" loading="lazy" decoding="async" />
        <p>{{ t().contact.about }}</p>
      </div>

      <h2 class="title">{{ t().contact.title }}</h2>
      <p class="lead">{{ t().contact.lead }}</p>

      <ul class="channels">
        <li class="channel">
          <span class="label">{{ t().contact.email }}</span>
          <a #email [href]="'mailto:' + info.email">{{ info.email }}</a>
          <button type="button" class="copy" (click)="copy()">
            {{ copied() ? t().contact.copied : t().contact.copy }}
          </button>
          <span class="visually-hidden" role="status">{{ copied() ? t().contact.copied : '' }}</span>
        </li>
        <li class="channel">
          <span class="label">LinkedIn</span>
          <a [href]="info.linkedin" target="_blank" rel="noopener">linkedin.com/in/andrenarcizo</a>
        </li>
        <li class="channel">
          <span class="label">GitHub</span>
          <a [href]="info.github" target="_blank" rel="noopener">github.com/DevAndreNarcizo</a>
        </li>
        <li class="channel">
          <span class="label">WhatsApp</span>
          <a [href]="info.whatsappLink" target="_blank" rel="noopener">{{ info.whatsapp }}</a>
        </li>
      </ul>
      <p class="end">
        <a class="btn btn-primary" [href]="t().cv.href" download>{{ t().cv.label }}</a>
        <span class="hint">{{ t().contact.hint }}</span>
      </p>
    </section>
  `,
  styles: `
    .about {
      display: grid;
      gap: 20px 32px;
      align-items: center;
      margin-top: 24px;
    }
    .about img {
      width: 140px;
      height: 140px;
      border: 1px solid var(--line);
      border-radius: 16px;
      object-fit: cover;
    }
    .about p {
      max-width: 62ch;
      color: #c3c9d1;
      font-size: 17px;
    }
    .title {
      margin-top: clamp(56px, 9vw, 110px);
      font-size: clamp(44px, 9vw, 120px);
      font-weight: 600;
      line-height: 0.95;
      letter-spacing: -0.045em;
    }
    .channels {
      margin-top: 36px;
      border-top: 1px solid var(--line);
    }
    .channel {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 20px;
      padding: 16px 0;
      border-bottom: 1px solid var(--line);
    }
    .label {
      width: 96px;
      color: var(--mut);
      font: 400 12px var(--mono);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .channel a {
      font-size: clamp(18px, 2.4vw, 26px);
      font-weight: 500;
      letter-spacing: -0.01em;
      text-decoration: none;
      overflow-wrap: anywhere;
    }
    .channel a:hover {
      color: var(--acc);
    }
    .copy {
      min-height: 34px;
      padding: 0 12px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: transparent;
      font: 500 12px var(--mono);
      cursor: pointer;
    }
    .copy:hover {
      border-color: var(--acc);
      color: var(--acc);
    }
    .end {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px 20px;
      margin-top: 28px;
    }
    .hint {
      color: var(--mut);
      font: 400 12px var(--mono);
    }
    @media (min-width: 640px) {
      .about {
        grid-template-columns: 140px minmax(0, 1fr);
      }
    }
  `,
})
export class Contact {
  protected readonly t = inject(LangService).t;
  protected readonly info = contactInfo;
  readonly copied = signal(false);
  private timer?: ReturnType<typeof setTimeout>;
  private readonly email = viewChild.required<ElementRef<HTMLAnchorElement>>('email');

  constructor() {
    sceneMotion((_m, _mode, root) => reveal(root.querySelectorAll('.about, .title, .lead, .channel, .end')));
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
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 2000);
  }
}
