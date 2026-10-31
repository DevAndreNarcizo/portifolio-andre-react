import { TestBed } from '@angular/core/testing';
import { LangService } from './lang';

describe('LangService', () => {
  let lang: LangService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'pt-BR';
    lang = TestBed.inject(LangService);
  });

  afterEach(() => vi.restoreAllMocks());

  it('starts in Portuguese', () => {
    expect(lang.lang()).toBe('pt');
    expect(lang.t().nav.contact).toBe('Contato');
  });

  it('toggles pt → en → pt, updating the copy, storage and <html lang>', () => {
    lang.toggle();
    expect(lang.t().nav.contact).toBe('Contact');
    expect(localStorage.getItem('portfolio-lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');

    lang.toggle();
    expect(lang.t().nav.contact).toBe('Contato');
    expect(localStorage.getItem('portfolio-lang')).toBe('pt');
    expect(document.documentElement.lang).toBe('pt-BR');
  });

  it('restores a language saved on a previous visit', () => {
    localStorage.setItem('portfolio-lang', 'en');
    lang.restore();
    expect(lang.lang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('ignores unknown saved values', () => {
    localStorage.setItem('portfolio-lang', 'fr');
    lang.restore();
    expect(lang.lang()).toBe('pt');
  });

  it('still switches when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    lang.set('en');
    expect(lang.lang()).toBe('en');
    expect(() => lang.restore()).not.toThrow();
  });
});
