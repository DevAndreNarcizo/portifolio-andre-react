import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { Excerpt } from '../data/types';
import { highlight } from './highlight';

/** A quoted excerpt: file, line range, numbered rows, highlighted lines. Text stays verbatim. */
@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="code">
      <figcaption><span class="file">{{ excerpt().file }}</span><span>{{ range() }}</span></figcaption>
      <code>
        @for (row of rows(); track $index) {
          <span class="row" [class.hl]="row.hl" [style.--i]="$index"
            ><span class="ln" aria-hidden="true">{{ row.n }}</span
            ><span class="tx">@for (t of row.tokens; track $index) {<span [class]="t.kind ? 't-' + t.kind : ''">{{ t.text }}</span>}</span></span
          >
        }
      </code>
    </figure>
  `,
  styles: `
    .code {
      margin-top: 11px;
      background: #07090c;
      border: 1px solid #1a1f26;
      border-radius: 10px;
      overflow: hidden;
    }
    :host + :host .code {
      margin-top: 7px;
    }
    figcaption {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      font: 400 10.5px/1.4 var(--mono);
      color: var(--mut);
      padding: 6px 10px;
      border-bottom: 1px solid #161a20;
      white-space: nowrap;
    }
    .file {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    code {
      display: block;
      padding: 7px 0;
      font: 400 var(--code-size, 11.2px) / 1.6 var(--mono);
      color: #c9d1d9;
    }
    .row {
      display: grid;
      grid-template-columns: 34px 1fr;
      min-height: 1.6em;
      padding-right: 10px;
    }
    .row.hl {
      background: #3ddc8414;
      box-shadow: inset 2px 0 var(--acc);
    }
    .ln {
      color: #4b5562;
      text-align: right;
      padding-right: 10px;
      user-select: none;
    }
    .tx {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
    .t-k {
      color: #ff7b72;
    }
    .t-s {
      color: #a5d6ff;
    }
    .t-c {
      color: #7d8590;
      font-style: italic;
    }
    .t-n {
      color: #79c0ff;
    }
  `,
})
export class CodeBlock {
  readonly excerpt = input.required<Excerpt>();

  protected readonly rows = computed(() => {
    const x = this.excerpt();
    return x.code.split('\n').map((line, i) => ({
      n: x.start + i,
      hl: x.hl?.includes(x.start + i) ?? false,
      tokens: highlight(line, x.lang),
    }));
  });

  protected readonly range = computed(() => {
    const x = this.excerpt();
    const end = x.start + x.code.split('\n').length - 1;
    return end === x.start ? `${x.start}` : `${x.start}–${end}`;
  });
}
