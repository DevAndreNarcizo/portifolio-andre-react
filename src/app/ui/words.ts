import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { words } from '../content';

/** Renders a headline as masked words (.w > span, styled in styles.css) so sections can animate them. */
@Component({
  selector: 'app-words',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@for (w of list(); track $index) {<span class="w"><span [class.em]="w.em" [style.--i]="$index">{{ w.text }}</span></span>&ngsp;}`,
})
export class Words {
  readonly text = input.required<string>();
  protected readonly list = computed(() => words(this.text()));
}
