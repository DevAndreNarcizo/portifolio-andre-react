import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { contactInfo } from '../content';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="sobre" class="section">
      <div class="wrap grid">
        <figure class="photo">
          <div class="frame">
            <img ngSrc="/Imagens/Foto.webp" width="1440" height="1440" [alt]="t().about.photoAlt" />
            @for (c of t().about.callouts; track $index) {
              <span class="marker mono" [class]="'m' + $index" aria-hidden="true">{{ $index + 1 }}</span>
            }
          </div>
          <figcaption>
            <ol class="legend">
              @for (c of t().about.callouts; track $index) {
                <li class="mono"><span class="n">{{ $index + 1 }}</span>{{ c }}</li>
              }
            </ol>
          </figcaption>
        </figure>

        <div class="text">
          <p class="fig-label">{{ t().about.label }}</p>
          <h2 class="title"><app-words [text]="t().about.title" /></h2>
          <p class="first">{{ t().about.paragraphs[0] }}</p>
          @for (p of t().about.paragraphs.slice(1); track $index) {
            <p class="para">{{ p }}</p>
          }
          <blockquote class="quote">{{ t().about.quote }}</blockquote>
          <a class="btn btn-ghost" [href]="linkedin" target="_blank" rel="noopener">{{ t().about.linkedin }}</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 48px;
      align-items: start;
    }
    .frame {
      position: relative;
      max-width: 420px;
      border: 1.5px solid var(--ink);
      padding: 10px;
      background: var(--paper);
    }
    .frame img {
      width: 100%;
      height: auto;
      filter: grayscale(1) contrast(1.05);
    }
    .marker {
      position: absolute;
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--signal);
      color: var(--paper);
      font-weight: 600;
    }
    .m0 {
      top: 14%;
      left: 70%;
    }
    .m1 {
      top: 46%;
      left: 12%;
    }
    .m2 {
      top: 80%;
      left: 62%;
    }
    .legend {
      display: grid;
      gap: 8px;
      margin-top: 16px;
    }
    .legend li {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .n {
      display: inline-grid;
      place-items: center;
      width: 22px;
      height: 22px;
      border: 1px solid var(--signal-text);
      border-radius: 50%;
      color: var(--signal-text);
    }
    .first {
      font: 400 clamp(24px, 2.6vw, 32px) / 1.25 var(--serif);
      margin-top: 24px;
    }
    .para {
      color: var(--muted);
      margin-top: 16px;
      max-width: 62ch;
    }
    .quote {
      margin: 28px 0;
      padding-left: 18px;
      border-left: 2px solid var(--signal);
      font-style: italic;
      max-width: 62ch;
    }
    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: 420px 1fr;
        gap: 72px;
      }
    }
  `,
})
export class About {
  protected readonly t = inject(LangService).t;
  protected readonly linkedin = contactInfo.linkedin;

  constructor() {
    sceneMotion((m, _mode, root) => {
      const q = m.gsap.utils.selector(root);
      // only pop the markers in when the photo is still below the fold
      if (q('.frame')[0].getBoundingClientRect().top > innerHeight) {
        m.gsap.from(q('.marker'), {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(3)',
          stagger: 0.15,
          scrollTrigger: { trigger: q('.frame')[0], start: 'top 75%', once: true },
        });
      }
      reveal(m, q('.legend li, .text > *'));
    });
  }
}
