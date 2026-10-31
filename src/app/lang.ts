import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';
import { Lang, text } from './content';

const STORAGE_KEY = 'portfolio-lang';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly document = inject(DOCUMENT);

  // ponytail: always 'pt' until restore(); the prerendered HTML is PT and hydration must match it
  readonly lang = signal<Lang>('pt');
  readonly t = computed(() => text[this.lang()]);

  set(lang: Lang): void {
    this.lang.set(lang);
    this.document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage blocked (private mode, disabled cookies): the choice just isn't remembered
    }
  }

  toggle(): void {
    this.set(this.lang() === 'pt' ? 'en' : 'pt');
  }

  /** Browser only, after hydration: applies the language saved on a previous visit. */
  restore(): void {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (saved === 'pt' || saved === 'en') this.set(saved);
  }
}
