import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import type { Case } from '../data/types';
import { LangService } from '../lang';
import { agentBuild } from '../agents';
import { sceneMotion } from '../motion';
import { CodeBlock } from '../ui/code-block';
import { Rich } from '../ui/rich';
import { pinScene } from './case-scene';

/**
 * One app case. The HTML is the static layout (first screen, phone, every card in a list): that is what
 * prerendering, phones, portrait screens and reduced motion get. Wide landscape screens pin it and play the steps.
 */
@Component({
  selector: 'app-case-study',
  imports: [CodeBlock, Rich],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './case-study.css',
  template: `
    <section class="case" [id]="'case-' + data().id" [attr.aria-labelledby]="'case-' + data().id + '-name'">
      <div class="in">
        <div class="stage">
          <div class="win">
            <div class="bar" aria-hidden="true"><i></i><i></i><i></i><span class="url">{{ urls()[step()] }}</span></div>
            <div class="vp">
              @for (s of data().shots; track s.key; let first = $first) {
                <div class="layer" [attr.data-k]="s.key">
                  <img
                    [src]="s.src"
                    [width]="s.w"
                    [height]="s.h"
                    [attr.alt]="first ? data().alt[lang()] : ''"
                    loading="lazy"
                    decoding="async"
                  />
                  <div class="spot"></div>
                </div>
              }
              <div class="cursor" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26">
                  <path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#000" stroke-width="1.4" stroke-linejoin="round" />
                </svg>
                <span class="rip"></span>
              </div>
            </div>
          </div>
          @if (data().device; as device) {
            <div class="phone">
              <span class="tag">{{ device.tag[lang()] }}</span>
              <div class="scr">
                @for (s of device.shots; track s.key) {
                  <img [src]="s.src" [width]="s.w" [height]="s.h" alt="" loading="lazy" decoding="async" />
                }
              </div>
            </div>
          }
        </div>

        <div class="side">
          <header>
            <p class="idx">{{ data().index[lang()] }}</p>
            <h3 [id]="'case-' + data().id + '-name'">{{ data().name }}</h3>
            <p class="pitch">{{ data().pitch[lang()] }}</p>
          </header>
          <ul class="chips">
            @for (chip of data().chips; track chip) {
              <li>{{ chip }}</li>
            }
          </ul>
          <dl class="nums">
            @for (n of data().nums; track n.value + n.label.en) {
              <div>
                <dt>{{ n.label[lang()] }}</dt>
                <dd>{{ n.value }}</dd>
              </div>
            }
          </dl>
          <p class="links">
            @for (link of data().links; track link.href) {
              <a class="ext" [href]="link.href" target="_blank" rel="noopener">{{ link.label[lang()] }}</a>
            }
            @if (data().note; as note) {
              <span class="note">{{ note[lang()] }}</span>
            }
          </p>
          <div class="cards">
            @for (c of data().cards; track $index; let i = $index) {
              <article class="eng" [class.on]="i === step()">
                <p class="k">{{ pad(i + 1) }} / {{ pad(data().cards.length) }} · {{ c.kicker[lang()] }}</p>
                <h4>{{ c.title[lang()] }}</h4>
                <p><app-rich [text]="c.text[lang()]" /></p>
                @for (x of c.code; track $index) {
                  <app-code-block [excerpt]="x" />
                }
              </article>
            }
          </div>
          <div class="progress" aria-hidden="true">
            <div class="rail">
              @for (s of data().steps; track $index) {
                <i><b></b></i>
              }
            </div>
            <div class="rail-l">
              <span>{{ t().apps.step }} {{ step() + 1 }} / {{ data().steps.length }}</span><span>{{ t().apps.scroll }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CaseStudy {
  readonly data = input.required<Case>();
  protected readonly lang = inject(LangService).lang;
  protected readonly t = inject(LangService).t;

  /** Step on screen while the case is pinned; stays 0 in the static layout. */
  readonly step = signal(0);

  /** Address bar text per step: a step without a url keeps the previous one. */
  protected readonly urls = computed(() => {
    let url = '';
    return this.data().steps.map((s) => (url = s.url ?? url));
  });

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  constructor() {
    sceneMotion((m, mode, root) =>
      mode === 'desktop'
        ? pinScene(m, root, this.data(), (n) => this.step.set(n))
        : agentBuild(root.querySelectorAll('.win, .phone, .side > header, .chips, .nums, .links, .eng')),
    );
  }
}
