import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Copy text where `backticks` mark inline code. */
@Component({
  selector: 'app-rich',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@for (part of parts(); track $index) {@if ($odd) {<code>{{ part }}</code>} @else {<ng-container>{{ part }}</ng-container>}}`,
  styles: `
    code {
      font: 400 0.9em var(--mono);
      color: var(--tx);
      background: #161b22;
      border: 1px solid var(--line);
      border-radius: 5px;
      padding: 0 4px;
    }
  `,
})
export class Rich {
  readonly text = input.required<string>();
  protected readonly parts = computed(() => this.text().split('`'));
}
